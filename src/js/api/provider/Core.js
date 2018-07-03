/**
 * Created by hoho on 2018. 6. 27..
 */
import EventEmitter from "api/EventEmitter";
import EventsListener from "api/provider/Listener";
import {
    STATE_IDLE, STATE_PLAYING, STATE_PAUSED, STATE_COMPLETE,
    PLAYER_STATE, PLAYER_COMPLETE, PLAYER_PAUSE, PLAYER_PLAY,
    CONTENT_LEVELS, CONTENT_LEVEL_CHANGED, CONTENT_TIME, CONTENT_CAPTION_CUE_CHANGED,
    PLAYBACK_RATE_CHANGED, CONTENT_MUTE, PROVIDER_HTML5, PROVIDER_WEBRTC, PROVIDER_DASH, PROVIDER_HLS
} from "api/constants";
import _ from "utils/underscore.js";
import Promise, {resolved} from "api/shims/promise";

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
 * @brief   Core Provider.
 * @param   providerName provider name
 * @param   extendedElement extended media object by mse. or video element.
 * @param   playerConfig  player config
 * @param   onLoad on load handler
 * */
const Core = function (providerName, extendedElement, playerConfig, onLoad){
    OvenPlayerConsole.log("CORE loaded. ");

    let that = {};
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

    const setQualityLevelBySources = (sources) =>{
        const pickQuality = (sources) =>{
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

        currentQuality = pickQuality(sources);
    };

    const _load = (lastPlayPosition) =>{
        const source =  sources[currentQuality];
        if(onLoad){
            onLoad(source, lastPlayPosition);
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


    that.getCurrentSource = () => {
        OvenPlayerConsole.log("CORE : getCurrentSource() ", sources[currentQuality]);
        return sources[currentQuality];
    };

    that.canSeek = () => { OvenPlayerConsole.log("CORE : canSeek() ", canSeek); return canSeek;};
    that.setCanSeek = (canSeek_) => {  OvenPlayerConsole.log("CORE : setCanSeek() ", canSeek_);  canSeek = canSeek_; };

    that.isSeeking = ()=>{OvenPlayerConsole.log("CORE : isSeeking() ", seeking); return seeking;};
    that.setSeeking = (seeking_)=>{ OvenPlayerConsole.log("CORE : setSeeking() ", seeking_); seeking = seeking_;};

    //that.isLive = ()=>{return isLive;};
    //that.setLive = (live)=>{isLive = live;};

    that.setPlayerElement = (element) => {
        OvenPlayerConsole.log("CORE : setPlayerElement() ", element);
        elVideo = element;
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
            OvenPlayerConsole.log("CORE : setState() ", state);
            that.trigger(PLAYER_STATE, {
                prevstate: prevState,
                newstate: state
            });
        }
    };
    that.getState = () =>{
        OvenPlayerConsole.log("CORE : getState() ", state);
        return state;
    };
    that.setBuffer = (newBuffer) => {
        OvenPlayerConsole.log("CORE : setBuffer() ", newBuffer);
        buffer = newBuffer;
    };
    that.getBuffer = () => {
        OvenPlayerConsole.log("CORE : getBuffer() ", buffer);
        return buffer;
    };
    that.getDuration = () => {
        //ToDo : You consider hlsjs. But not now because we don't support hlsjs.
        let isLive = (elVideo.duration == Infinity? true : (providerName === PROVIDER_DASH? extendedElement.isDynamic() : false));
        OvenPlayerConsole.log("CORE : getDuration() ", isLive ?  Infinity : elVideo.duration);
        return isLive ?  Infinity : elVideo.duration;
    };
    that.getPosition = () => {
        OvenPlayerConsole.log("CORE : getPosition() ", elVideo.currentTime);
        return elVideo.currentTime;
    };
    that.setVolume = (volume) =>{
        OvenPlayerConsole.log("CORE : setVolume() ", volume);
        elVideo.volume = volume/100;
    };
    that.getVolume = () =>{
        OvenPlayerConsole.log("CORE : getVolume() ", elVideo.volume*100);
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
        OvenPlayerConsole.log("CORE : setMute() ", elVideo.muted);
        return elVideo.muted;
    };
    that.getMute = () =>{
        OvenPlayerConsole.log("CORE : setMute() ", elVideo.muted);
        return elVideo.muted;
    };

    that.preload = (sources_, lastPlayPosition) =>{
        OvenPlayerConsole.log("CORE : preload() ", sources_, lastPlayPosition);
        sources = sources_;
        setQualityLevelBySources(sources);
        _load(lastPlayPosition || 0);
    };
    that.load = (sources_) =>{
        OvenPlayerConsole.log("CORE : load() ", sources_);
        sources = sources_;
        setQualityLevelBySources(sources);
        _load(sources_.starttime || 0);
    };

    that.play = () =>{
        OvenPlayerConsole.log("CORE : play() ");
        if( that.getState() !== STATE_PLAYING){
            elVideo.play();
        }
    }
    that.pause = () =>{
        OvenPlayerConsole.log("CORE : pause() ");
        if( that.getState() == STATE_PLAYING){
            elVideo.pause();
        }
    };
    that.seek = (position) =>{
        OvenPlayerConsole.log("CORE : seek() ", position);
        elVideo.currentTime = position;
    };
    that.setPlaybackRate = (playbackRate) =>{
        that.trigger(PLAYBACK_RATE_CHANGED, {playbackRate : playbackRate});
        OvenPlayerConsole.log("CORE : setPlaybackRate() ", playbackRate);
        return elVideo.playbackRate = elVideo.defaultPlaybackRate = playbackRate;
    };
    that.getPlaybackRate = () =>{
        OvenPlayerConsole.log("CORE : getPlaybackRate() ", elVideo.playbackRate);
        return elVideo.playbackRate;
    };
    that.getQualityLevels = () => {
        var getQualityLevel = function(source) {
            return {
                bitrate: source.bitrate,
                label: source.label,
                width: source.width,
                height: source.height
            };
        }
        let qualityLevels = sources.map(function(source){return getQualityLevel(source)});
        OvenPlayerConsole.log("CORE : getQualityLevels() ", qualityLevels);
        return qualityLevels;
    };
    that.getCurrentQuality = () => {
        OvenPlayerConsole.log("CORE : getCurrentQuality() ", currentQuality);
        return currentQuality;
    };
    that.setCurrentQuality = (qualityIndex, needLoad) => {
        OvenPlayerConsole.log("CORE : setCurrentQuality() ", qualityIndex, needLoad);
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
                if(needLoad){

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

    //XXX : This is es6. So we can't "prototype export". Finally I consider this method.
    that.super = (name) => {
        const method = that[name];
        return function(){
            return method.apply(that, arguments);
        };
    };
    return that;

};

export default Core;