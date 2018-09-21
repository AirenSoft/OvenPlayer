/**
 * Created by hoho on 2018. 6. 27..
 */
import EventEmitter from "api/EventEmitter";
import EventsListener from "api/provider/html5/Listener";
import _ from "utils/underscore.js";
import {
    STATE_IDLE, STATE_PLAYING, STATE_PAUSED, STATE_COMPLETE,
    PLAYER_STATE, PLAYER_COMPLETE, PLAYER_PAUSE, PLAYER_PLAY,
    CONTENT_LEVELS, CONTENT_LEVEL_CHANGED, CONTENT_TIME, CONTENT_CAPTION_CUE_CHANGED,
    PLAYBACK_RATE_CHANGED, CONTENT_MUTE, PROVIDER_HTML5, PROVIDER_WEBRTC, PROVIDER_DASH, PROVIDER_HLS
} from "api/constants";

let extractVideoElement = function(providerName, extendedElement){
    if(_.isElement(extendedElement)){
        return extendedElement;
    }
    if(providerName === PROVIDER_DASH){
        return extendedElement.getVideoElement();
    }else if(providerName === PROVIDER_HLS){
        return extendedElement.media;
    }
    return null;
};

/**
 * @brief   Core For Html5 Video.
 * @param   providerName provider name
 * @param   extendedElement extended media object by mse. or video element.
 * @param   playerConfig  player config
 * @param   onLoad on load handler
 * */
const Provider = function (providerName, extendedElement, playerConfig, onBeforeLoad){
    OvenPlayerConsole.log("CORE loaded. ");

    let that ={};
    EventEmitter(that);

    let elVideo = extractVideoElement(providerName, extendedElement);
    let listener = EventsListener(providerName, extendedElement, elVideo, that);
    let canSeek = false;
    let seeking = false;
    let state = STATE_IDLE;
    let buffer = 0;
    let currentQuality = -1;
    let sources = [];
    //let isLive = false;

    let posterImage = playerConfig.getConfig().image||"";
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getDefaultPlaybackRate();

    const pickCurrentQuality = (sources) =>{
        var quality = Math.max(0, currentQuality);
        const label ="";
        if (sources) {
            for (var i = 0; i < sources.length; i++) {
                if (sources[i].default) {
                    quality = i;
                }
                if (playerConfig.getQualityLabel() && sources[i].label === playerConfig.getQualityLabel() ) {
                    return i;
                }
            }
        }
        return quality;
    };

    const _load = (lastPlayPosition) =>{
        const source =  sources[currentQuality];
        if(onBeforeLoad){
            onBeforeLoad(source, lastPlayPosition);
        }else{
            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : "+ lastPlayPosition);
            let previousSource = elVideo.src;
            const sourceElement = document.createElement('source');

            sourceElement.src = source.file;
            const sourceChanged = (sourceElement.src !== previousSource);
            if (sourceChanged) {
                elVideo.src = sources[currentQuality].file;
                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource) {
                    elVideo.load();
                }
            }else if(lastPlayPosition == 0 && elVideo.currentTime > 0){
                that.seek(lastPlayPosition);
            }
            if(lastPlayPosition > 0){
                that.seek(lastPlayPosition);
                that.play();
            }
            that.trigger(CONTENT_LEVELS, {
                currentQuality: currentQuality
            });

            if(posterImage){
                elVideo.poster = posterImage;
            }
        }
    };

    that.getName = () => {
        return providerName;
    };
    that.canSeek = () => {
        return canSeek;
    };
    that.setCanSeek = (canSeek_) => {
        canSeek = canSeek_;
    };
    that.isSeeking = ()=>{
        return seeking;
    };
    that.setSeeking = (seeking_)=>{
        seeking = seeking_;
    };

    that.setState = (newState) => {
        if(state != newState){
            let prevState = state;
            switch(newState){
                case STATE_COMPLETE :
                    that.trigger(PLAYER_COMPLETE);
                    break;
                case STATE_PAUSED :
                    that.trigger(PLAYER_PAUSE, {
                        prevState: state
                    });
                    break;
                case STATE_PLAYING :
                    that.trigger(PLAYER_PLAY, {
                        prevState: state
                    });
                    break;
            }
            state= newState;
            that.trigger(PLAYER_STATE, {
                prevstate: prevState,
                newstate: state
            });
        }
    };
    that.getState = () =>{
        return state;
    };
    that.setBuffer = (newBuffer) => {
        buffer = newBuffer;
    };
    that.getBuffer = () => {
        return buffer;
    };
    that.getDuration = () => {
        //ToDo : You consider hlsjs. But not now because we don't support hlsjs.
        let isLive = (elVideo.duration == Infinity? true : (providerName === PROVIDER_DASH? extendedElement.isDynamic() : false));
        return isLive ?  Infinity : elVideo.duration;
    };
    that.getPosition = () => {
        return elVideo.currentTime;
    };
    that.setVolume = (volume) =>{
        elVideo.volume = volume/100;
    };
    that.getVolume = () =>{
        return elVideo.volume*100;
    };
    that.setMute = (state) =>{

        if (typeof state === 'undefined') {

            elVideo.muted = !elVideo.muted;

            that.trigger(CONTENT_MUTE, {
                mute: elVideo.muted
            });

        } else {

            elVideo.muted = state;

            that.trigger(CONTENT_MUTE, {
                mute: elVideo.muted
            });
        }
        return elVideo.muted;
    };
    that.getMute = () =>{
        return elVideo.muted;
    };

    that.preload = (sources_, lastPlayPosition) =>{
        sources = sources_;
        currentQuality = pickCurrentQuality(sources);
        _load(lastPlayPosition || 0);

        return new Promise(function (resolve, reject) {
            resolve();
        });

    };
    that.load = (sources_) =>{
        sources = sources_;
        currentQuality = pickCurrentQuality(sources);
        _load(sources_.starttime || 0);
    };

    that.play = () =>{
        if( that.getState() !== STATE_PLAYING){
            elVideo.play();
        }
    }
    that.pause = () =>{
        if( that.getState() == STATE_PLAYING){
            elVideo.pause();
        }
    };
    that.seek = (position) =>{
        elVideo.currentTime = position;
    };
    that.setPlaybackRate = (playbackRate) =>{
        that.trigger(PLAYBACK_RATE_CHANGED, {playbackRate : playbackRate});
        return elVideo.playbackRate = elVideo.defaultPlaybackRate = playbackRate;
    };
    that.getPlaybackRate = () =>{
        return elVideo.playbackRate;
    };
    that.getQualityLevels = () => {
        let qualityLevels = sources.map(function(source, index) {
            return {
                file: source.file,
                type: source.type,
                label: source.label,
                index : index
            };
        });
        return qualityLevels;
    };
    that.getCurrentQuality = () => {
        var source = sources[currentQuality];
        return {
            file: source.file,
            type: source.type,
            label: source.label,
            index : currentQuality
        };
    };
    that.setCurrentQuality = (qualityIndex, needProviderChange) => {
        if(currentQuality == qualityIndex){
            return false;
        }

        if(qualityIndex > -1){
            if(sources && sources.length > qualityIndex){
                //that.pause();
                that.setState(STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + qualityIndex);
                currentQuality = qualityIndex;

                that.trigger(CONTENT_LEVEL_CHANGED, {
                    currentQuality: qualityIndex
                });

                playerConfig.setQualityLabel(sources[qualityIndex].label);
                if(needProviderChange){

                    _load(elVideo.currentTime || 0);
                }
                return currentQuality;
            }
        }
    };

    that.stop = () =>{
        OvenPlayerConsole.log("CORE : stop() ");
        elVideo.removeAttribute('preload');
        elVideo.removeAttribute('src');
        while (elVideo.firstChild) {
            elVideo.removeChild(elVideo.firstChild);
        }
        that.pause();
        that.setState(STATE_IDLE);
    };

    that.destroy = () =>{
        that.stop();
        listener.destroy();
        //elVideo.remove();
        that.off();
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");
    };

    //XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
    // use : let super_destroy  = that.super('destroy'); ... super_destroy();
    that.super = (name) => {
        const method = that[name];
        return function(){
            return method.apply(that, arguments);
        };
    };
    return that;

};

export default Provider;
