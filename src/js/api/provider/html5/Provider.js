/**
 * Created by hoho on 2018. 6. 27..
 */
import Ima from "api/ads/ima/Ad";
import Vast from "api/ads/vast/Ad";
import EventEmitter from "api/EventEmitter";
import EventsListener from "api/provider/html5/Listener";
import {extractVideoElement, pickCurrentSource} from "api/provider/utils";
import {
    WARN_MSG_MUTEDPLAY,
    UI_ICONS, PLAYER_WARNING,
    STATE_IDLE, STATE_PLAYING, STATE_PAUSED, STATE_COMPLETE, STATE_ERROR,
    PLAYER_STATE, PLAYER_COMPLETE, PLAYER_PAUSE, PLAYER_PLAY, STATE_AD_PLAYING, STATE_AD_PAUSED,
    CONTENT_TIME, CONTENT_CAPTION_CUE_CHANGED, CONTENT_SOURCE_CHANGED,
    AD_CLIENT_GOOGLEIMA, AD_CLIENT_VAST,
    PLAYBACK_RATE_CHANGED, CONTENT_MUTE, PROVIDER_HTML5, PROVIDER_WEBRTC, PROVIDER_DASH, PROVIDER_HLS
} from "api/constants";

/**
 * @brief   Core For Html5 Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * @param   onExtendedLoad on load handler
 * */
const Provider = function (spec, playerConfig, onExtendedLoad){
    OvenPlayerConsole.log("[Provider] loaded. ");

    let that ={};
    EventEmitter(that);

    let dashAttachedView = false;

    let elVideo = spec.element;
    let ads = null, listener = null, videoEndedCallback = null;

    let isPlayingProcessing = false;

    if(spec.adTagUrl){
        OvenPlayerConsole.log("[Provider] Ad Client - ", playerConfig.getAdClient());
        if(playerConfig.getAdClient() === AD_CLIENT_VAST){
            ads = Vast(elVideo, that, playerConfig, spec.adTagUrl);
        }else{
            ads = Ima(elVideo, that, playerConfig, spec.adTagUrl);
        }

        if(!ads){
            console.log("Can not load due to google ima for Ads.");
        }
    }

    listener = EventsListener(elVideo, that, ads ? ads.videoEndedCallback : null);
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getPlaybackRate();

    const _load = (lastPlayPosition) =>{
        const source =  spec.sources[spec.currentSource];
        spec.framerate = source.framerate;

        that.setVolume(playerConfig.getVolume());

        if(!spec.framerate){
            //init timecode mode
            playerConfig.setTimecodeMode(true);
        }
        if(onExtendedLoad){
            onExtendedLoad(source, lastPlayPosition);

        }else{
            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : "+ lastPlayPosition);
            let previousSource = elVideo.src;
            const sourceElement = document.createElement('source');

            sourceElement.src = source.file;
            const sourceChanged = (sourceElement.src !== previousSource);
            if (sourceChanged) {

                elVideo.src = source.file;

                //Don't use this. https://stackoverflow.com/questions/30637784/detect-an-error-on-html5-video
                //elVideo.append(sourceElement);

                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource) {
                    elVideo.load();
                }
            }else if(lastPlayPosition === 0 && elVideo.currentTime > 0){
                that.seek(lastPlayPosition);
            }


            if(lastPlayPosition > 0){
                that.seek(lastPlayPosition);
                if(!playerConfig.isAutoStart()){
                    that.play();
                }

            }

            if(playerConfig.isAutoStart()){
                that.play();
            }
            /*that.trigger(CONTENT_SOURCE_CHANGED, {
                currentSource: spec.currentSource
            });*/
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
    that.setMetaLoaded = () => {
        spec.isLoaded = true;
    }
    that.metaLoaded = () => {
        return spec.isLoaded;
    }

    that.setState = (newState) => {
        if(spec.state !== newState){
            let prevState = spec.state;

            OvenPlayerConsole.log("Provider : setState()", newState);

            //ToDo : This is temporary code. If main video occur error, player avoid error message on ad playing.
            if(prevState === STATE_AD_PLAYING && (newState === STATE_ERROR || newState === STATE_IDLE) ){
                return false;
            }

            /*
             * 2019-06-13
             * No more necessary this codes.
             * Checking the autoPlay support was using main video element. elVideo.play() -> yes or no??
             * And then that causes triggering play and pause event.
             * And that checking waits for elVideo loaded. Dash load completion time is unknown.
             * Then I changed check method. I make temporary video tag and insert empty video.
             * */
            //if ((prevState === STATE_AD_PLAYING || prevState === STATE_AD_PAUSED ) && (newState === STATE_PAUSED || newState === STATE_PLAYING)) {
            //    return false;
            //Ads checks checkAutoplaySupport(). It calls real play() and pause() to video element.
            //And then that triggers "playing" and "pause".
            //I prevent these process.
            //}

            OvenPlayerConsole.log("Provider : triggerSatatus", newState);

            switch (newState) {
                case STATE_COMPLETE :
                    that.trigger(PLAYER_COMPLETE);
                    break;
                case STATE_PAUSED :
                    that.trigger(PLAYER_PAUSE, {
                        prevState: spec.state,
                        newstate: STATE_PAUSED
                    });
                    break;
                case STATE_AD_PAUSED :
                    that.trigger(PLAYER_PAUSE, {
                        prevState: spec.state,
                        newstate: STATE_AD_PAUSED
                    });
                    break;
                case STATE_PLAYING :
                    that.trigger(PLAYER_PLAY, {
                        prevState: spec.state,
                        newstate: STATE_PLAYING
                    });
                case STATE_AD_PLAYING :
                    that.trigger(PLAYER_PLAY, {
                        prevState: spec.state,
                        newstate: STATE_AD_PLAYING
                    });
                    break;
            }
            spec.state = newState;
            that.trigger(PLAYER_STATE, {
                prevstate: prevState,
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
    that.isLive = () => {
        return spec.isLive ? true : (elVideo.duration === Infinity);
    };
    that.getDuration = () => {
        return that.isLive() ?  Infinity : elVideo.duration;
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
            if(playerConfig.isMute()){
                that.setMute(true);
            }
            if(playerConfig.getVolume()){
                that.setVolume(playerConfig.getVolume());
            }

            resolve();
        });

    };
    that.load = (sources) =>{
        spec.sources = sources;
        spec.currentSource = pickCurrentSource(sources, spec.currentSource, playerConfig);
        _load(spec.sources.starttime || 0);
    };

    that.play = () =>{
        OvenPlayerConsole.log("Provider : play()");
        if(!elVideo){
            return false;
        }

        //ToDo : Test it thoroughly and remove isPlayingProcessing. Most of the hazards have been removed. a lot of nonblocking play() way -> blocking play()
        if(isPlayingProcessing){
            return false;
        }

        isPlayingProcessing = true;
        if(that.getState() !== STATE_PLAYING){
            if (  (ads && ads.isActive()) || (ads && !ads.started()) ) {
                ads.play().then(_ => {
                    //ads play success
                    isPlayingProcessing = false;
                    OvenPlayerConsole.log("Provider : ads play success");

                }).catch(error => {
                    //ads play fail maybe cause user interactive less
                    isPlayingProcessing = false;
                    OvenPlayerConsole.log("Provider : ads play fail", error);
                });

            }else{
                let promise = elVideo.play();
                if (promise !== undefined) {
                    promise.then(function(){
                        isPlayingProcessing = false;
                        OvenPlayerConsole.log("Provider : video play success");
                        /*
                        if(mutedPlay){
                            that.trigger(PLAYER_WARNING, {
                                message : WARN_MSG_MUTEDPLAY,
                                timer : 10 * 1000,
                                iconClass : UI_ICONS.volume_mute,
                                onClickCallback : function(){
                                    that.setMute(false);
                                }
                            });
                        }*/
                    }).catch(error => {
                        OvenPlayerConsole.log("Provider : video play error", error.message);

                        isPlayingProcessing = false;
                        /*
                        if(!mutedPlay){
                            that.setMute(true);
                            that.play(true);
                        }
                        */
                    });
                }else{
                    //IE promise is undefinded.
                    OvenPlayerConsole.log("Provider : video play success (ie)");
                    isPlayingProcessing = false;
                }

            }

        }

    }
    that.pause = () =>{
        OvenPlayerConsole.log("Provider : pause()");
        if(!elVideo){
            return false;
        }

        if (that.getState() === STATE_PLAYING) {
            elVideo.pause();
        }else if(that.getState() === STATE_AD_PLAYING){
            ads.pause();
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
            if(spec.currentSource === sourceIndex){
            return false;
        }

        if(sourceIndex > -1){
            if(spec.sources && spec.sources.length > sourceIndex){
                //that.pause();
                //that.setState(STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });
                playerConfig.setSourceIndex(sourceIndex);
                //playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
                //spec.currentQuality = sourceIndex;
                //that.pause();
                that.setState(STATE_IDLE);
                if(needProviderChange){
                    _load(elVideo.currentTime || 0);
                }
                //
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
    that.setCurrentQuality = (qualityIndex) => {
        //Do nothing
    };
    that.isAutoQuality = () => {
        //Do nothing
    };
    that.setAutoQuality = (isAuto) => {
        //Do nothing
    };

    that.getFramerate = () => {
        return spec.framerate;
    };
    that.setFramerate = (framerate) => {
        return spec.framerate = framerate;
    };
    that.seekFrame = (frameCount) =>{
        let fps = spec.framerate;
        let currentFrames = elVideo.currentTime * fps;
        let newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
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

        if(ads){
            ads.destroy();
            ads = null;
        }
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
