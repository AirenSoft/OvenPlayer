/**
 * Created by hoho on 2018. 6. 27..
 */
import EventEmitter from "api/EventEmitter";
import EventsListener from "api/provider/html5/Listener";
import {extractVideoElement, separateLive, pickCurrentSource} from "api/provider/utils";
import {
    STATE_IDLE, STATE_PLAYING, STATE_PAUSED, STATE_COMPLETE,
    PLAYER_STATE, PLAYER_COMPLETE, PLAYER_PAUSE, PLAYER_PLAY,
    CONTENT_TIME, CONTENT_CAPTION_CUE_CHANGED, CONTENT_SOURCE_CHANGED,
    PLAYBACK_RATE_CHANGED, CONTENT_MUTE, PROVIDER_HTML5, PROVIDER_WEBRTC, PROVIDER_DASH, PROVIDER_HLS
} from "api/constants";

/**
 * @brief   Core For Html5 Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * @param   onExtendedLoad on load handler
 * */
const Provider = function (spec, playerConfig, onExtendedLoad){
    OvenPlayerConsole.log("CORE loaded. ");

    let that ={};
    EventEmitter(that);

    let listener = EventsListener(spec.extendedElement, that);
    let elVideo = extractVideoElement(spec.extendedElement);
    let posterImage = playerConfig.getConfig().image||"";
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getDefaultPlaybackRate();


    const _load = (lastPlayPosition) =>{
        const source =  spec.sources[spec.currentSource];
        if(onExtendedLoad){
            onExtendedLoad(source, lastPlayPosition);
        }else{
            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : "+ lastPlayPosition);
            let previousSource = elVideo.src;
            const sourceElement = document.createElement('source');

            sourceElement.src = source.file;
            const sourceChanged = (sourceElement.src !== previousSource);
            if (sourceChanged) {
                elVideo.src = spec.sources[spec.currentSource].file;
                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource) {
                    elVideo.load();
                }
            }else if(lastPlayPosition === 0 && elVideo.currentTime > 0){
                that.seek(lastPlayPosition);
            }
            if(lastPlayPosition > 0){
                that.seek(lastPlayPosition);
                that.play();
            }
            /*that.trigger(CONTENT_SOURCE_CHANGED, {
                currentSource: spec.currentSource
            });*/

            if(posterImage){
                elVideo.poster = posterImage;
            }
        }
    };

    that.getName = () => {
        return spec.name;
    };
    that.canSeek = () => {
        return spec.canSeek;
    };
    that.setCanSeek = (canSeek) => {
        spec.canSeek = canSeek;
    };
    that.isSeeking = ()=>{
        return spec.seeking;
    };
    that.setSeeking = (seeking)=>{
        spec.seeking = seeking;
    };

    that.setState = (newState) => {
        if(spec.state !== newState){
            let prevState = spec.state;
            switch(newState){
                case STATE_COMPLETE :
                    that.trigger(PLAYER_COMPLETE);
                    break;
                case STATE_PAUSED :
                    that.trigger(PLAYER_PAUSE, {
                        prevState: spec.state
                    });
                    break;
                case STATE_PLAYING :
                    that.trigger(PLAYER_PLAY, {
                        prevState: spec.state
                    });
                    break;
            }
            spec.state = newState;
            that.trigger(PLAYER_STATE, {
                prevstate : prevState,
                newstate: spec.state
            });
        }
    };
    that.getState = () =>{
        return spec.state;
    };
    that.setBuffer = (newBuffer) => {
        spec.buffer = newBuffer;
    };
    that.getBuffer = () => {
        return spec.buffer;
    };
    that.getDuration = () => {
        let isLive = (elVideo.duration === Infinity) ? true : separateLive(spec.extendedElement);
        return isLive ?  Infinity : elVideo.duration;
    };
    that.getPosition = () => {
        if(!elVideo){
            return 0;
        }
        return elVideo.currentTime;
    };
    that.setVolume = (volume) =>{
        if(!elVideo){
            return false;
        }
        elVideo.volume = volume/100;
    };
    that.getVolume = () =>{
        if(!elVideo){
            return 0;
        }
        return elVideo.volume*100;
    };
    that.setMute = (state) =>{
        if(!elVideo){
            return false;
        }
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
        if(!elVideo){
            return false;
        }
        return elVideo.muted;
    };

    that.preload = (sources, lastPlayPosition) =>{
        spec.sources = sources;
        spec.currentSource = pickCurrentSource(sources, spec.currentSource, playerConfig);
        _load(lastPlayPosition || 0);

        return new Promise(function (resolve, reject) {
            resolve();
        });

    };
    that.load = (sources) =>{
        spec.sources = sources;
        spec.currentSource = pickCurrentSource(sources, spec.currentSource, playerConfig);
        _load(spec.sources.starttime || 0);
    };

    that.play = () =>{
        if(!elVideo){
            return false;
        }

        if(that.getState() !== STATE_PLAYING){
            let promise = elVideo.play();
            if (promise !== undefined) {
                promise.then(_ => {
                    // Autoplay started!
                }).catch(error => {
                    //Can't play because User doesn't any interactions.
                    //Wait for User Interactions. (like click)
                    setTimeout(function(){
                        that.play();
                    }, 1000);

                });
            }

        }
    }
    that.pause = () =>{
        if(!elVideo){
            return false;
        }
        if(that.getState() === STATE_PLAYING){
            elVideo.pause();
        }
    };
    that.seek = (position) =>{
        if(!elVideo){
            return false;
        }
        elVideo.currentTime = position;
    };
    that.setPlaybackRate = (playbackRate) =>{
        if(!elVideo){
            return false;
        }
        that.trigger(PLAYBACK_RATE_CHANGED, {playbackRate : playbackRate});
        return elVideo.playbackRate = elVideo.defaultPlaybackRate = playbackRate;
    };
    that.getPlaybackRate = () =>{
        if(!elVideo){
            return 0;
        }
        return elVideo.playbackRate;
    };

    that.getSources = () => {
        if(!elVideo){
            return [];
        }

        return spec.sources.map(function(source, index) {
            return {
                file: source.file,
                type: source.type,
                label: source.label,
                index : index
            };
        });
    };
    that.getCurrentSource = () =>{
        return spec.currentSource;
    };
    that.setCurrentSource = (sourceIndex, needProviderChange) => {
        if(spec.currentQuality === sourceIndex){
            return false;
        }

        if(sourceIndex > -1){
            if(spec.sources && spec.sources.length > sourceIndex){
                //that.pause();
                that.setState(STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });

                playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
                if(needProviderChange){

                    _load(elVideo.currentTime || 0);
                }
                return spec.currentSource;
            }
        }
    };


    that.getQualityLevels = () => {
        if(!elVideo){
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = () => {
        if(!elVideo){
            return null;
        }
        return spec.currentQuality;
    };
    that.setCurrentQuality = (qualityIndex, needProviderChange) => {

    };

    that.stop = () =>{
        if(!elVideo){
            return false;
        }
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
        if(!elVideo){
            return false;
        }
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
