/**
 * Created by hoho on 2018. 8. 23..
 */
import Ima from "api/ads/ima/Ad";
import Vast from "api/ads/vast/Ad";
import EventEmitter from "api/EventEmitter";
import EventsListener from "api/provider/flash/Listener";
import {extractVideoElement, pickCurrentSource} from "api/provider/utils";
import {
    ERRORS, INIT_RTMP_SETUP_ERROR,
    STATE_IDLE, STATE_PLAYING, STATE_PAUSED, STATE_COMPLETE, STATE_ERROR,
    PLAYER_STATE, PLAYER_COMPLETE, PLAYER_PAUSE, PLAYER_PLAY, STATE_AD_PLAYING, STATE_AD_PAUSED,
    CONTENT_SOURCE_CHANGED, CONTENT_LEVEL_CHANGED, CONTENT_TIME, CONTENT_CAPTION_CUE_CHANGED,
    AD_CLIENT_GOOGLEIMA, AD_CLIENT_VAST,
    PLAYBACK_RATE_CHANGED, CONTENT_MUTE, PROVIDER_HTML5, PROVIDER_WEBRTC, PROVIDER_DASH, PROVIDER_HLS
} from "api/constants";

/**
 * @brief   Core For Flash Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * */


const Provider = function(spec, playerConfig){
    OvenPlayerConsole.log("CORE loaded. ");

    let that = {};
    EventEmitter(that);

    let elFlash = spec.element;
    let ads = null, listener = null, videoEndedCallback = null;

    //It means to support ad for flash. Set the same specifications like a Video Tag.
    Object.defineProperty(elFlash, 'currentTime',
        {value :0, writable : true}
    );

    if(spec.adTagUrl){
        OvenPlayerConsole.log("[Provider] Ad Client - ", playerConfig.getAdClient());
        if(playerConfig.getAdClient() === AD_CLIENT_VAST){
            ads = Vast(elFlash, that, playerConfig, spec.adTagUrl);
        }else{
            ads = Ima(elFlash, that, playerConfig, spec.adTagUrl);
        }

        if(!ads){
            console.log("Can not load due to google ima for Ads.");
        }
    }
    listener = EventsListener(elFlash, that, ads ? ads.videoEndedCallback : null);

    const _load = (lastPlayPosition) =>{

        const source =  spec.sources[spec.currentSource];
        OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : "+ lastPlayPosition);
        const previousSource = elFlash.getCurrentSource();

        const sourceChanged = (source.file !== previousSource);
        if (sourceChanged) {
            elFlash.load(source.file);
        }else if(lastPlayPosition === 0 && that.getPosition() > 0){
            that.seek(lastPlayPosition);
        }

    };
    //Flash has two init states. FlashLoaded and FileLoaded.
    //_load calls after FlashLoaded. _afterLoad calls after FileLoaded.
    const _afterLoad = function(lastPlayPosition){
        spec.isLoaded = true;
        if(lastPlayPosition > 0){
            if(!playerConfig.isAutoStart()){
                that.play();
            }
            that.seek(lastPlayPosition);
        }
        if(playerConfig.isAutoStart()){

            that.play();
        }
    };

    //This is why. Flash does not self trig to ads,lmalm,
    that.triggerEventFromExternal = (funcName, funcData) => {
        if(listener[funcName]){
            return listener[funcName](funcData);
        }else{
            return null;
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
            //ToDo : This is temporary code. avoid background content error.
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
            switch(newState){
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
                prevstate : prevState,
                newstate: spec.state
            });
        }
    };
    that.getState = () =>{
        return spec.state;
    };
    that.setBuffer = (newBuffer) => {

    };
    that.getBuffer = () => {
        if(!elFlash){
            return ;
        }
        return elFlash.getBuffer ? elFlash.getBuffer() : null;
    };
    that.getDuration = () => {
        if(!elFlash){
            return ;
        }
        return elFlash.getDuration ? elFlash.getDuration() : 0;
    };
    that.getPosition = () => {
        if(!elFlash){
            return ;
        }
        return elFlash.getPosition ? elFlash.getPosition() : 0;
    };
    that.setVolume = (volume) => {
        if(!elFlash){
            return ;
        }
        return elFlash.setVolume ? elFlash.setVolume(volume) : 0;
    };
    that.getVolume = () => {
        if(!elFlash){
            return ;
        }
        return elFlash.setVolume ? elFlash.getVolume() : 0;
    };
    that.setMute = () =>{
        if(!elFlash){
            return ;
        }
        elFlash.setMute();
    };
    that.getMute = () =>{
        if(!elFlash){
            return ;
        }
        return elFlash.getMute ? elFlash.getMute() : false;
    };

    that.preload = (sources, lastPlayPosition) =>{
        OvenPlayerConsole.log("CORE : preload() ", sources, lastPlayPosition);
        let retryCount = 0;

        spec.sources = sources;
        spec.currentSource = pickCurrentSource(sources, spec.currentSource, playerConfig);

        return new Promise(function (resolve, reject) {
            //First : checkSwfIsReady -> It checks swf loading complete by polling.
            //Second : checkFileLoaded -> It checks src loading complete by polling too.
            //Why complex is it? -> It againsts flash timing issue.
            (function checkSwfIsReady(){
                retryCount ++;
                if(elFlash.isFlashReady && elFlash.isFlashReady()){
                    Object.defineProperty(elFlash, 'duration',
                        {value :elFlash.getDuration()}
                    );
                    _load(lastPlayPosition || 0);
                    retryCount = 0;

                    return (function checkFileLoaded(){
                        retryCount ++;
                        if(elFlash.isFileLoaded && elFlash.isFileLoaded()){
                            _afterLoad(lastPlayPosition);
                            if(playerConfig.isMute()){
                                that.setMute(true);
                            }
                            if(playerConfig.getVolume() && playerConfig.getVolume() < 100){
                                that.setVolume(playerConfig.getVolume());
                            }

                            return resolve();
                        }else{

                            if(retryCount < 300){
                                setTimeout(checkFileLoaded, 100);
                            }else{
                                return reject(ERRORS.codes[INIT_RTMP_SETUP_ERROR]);
                            }
                        }
                    })();

                }else{
                    if(retryCount < 100){
                        setTimeout(checkSwfIsReady, 100);
                    }else{
                        return reject(ERRORS.codes[INIT_RTMP_SETUP_ERROR]);
                    }
                }

            })();
        });
    };
    that.load = (sources) =>{
        spec.sources = sources;
        spec.currentSource = pickCurrentSource(sources, spec.currentSource, playerConfig);
        _load(0);   //spec.sources_.starttime ||
        _afterLoad(0);
    };

    that.play = () =>{
        if(!elFlash){
            return false;
        }
        if(that.getState() !== STATE_PLAYING){
            if ( (ads && ads.isActive()) || (ads && !ads.started()) ) {
                ads.play();
            }else{
                elFlash.play();
            }

        }
    }
    that.pause = () =>{
        if(!elFlash){
            return false;
        }
        if (that.getState() === STATE_PLAYING) {
            elFlash.pause();
        }else if(that.getState() === STATE_AD_PLAYING){
            ads.pause();
        }

    };
    that.seek = (position) =>{
        elFlash.seek(position);
    };
    that.setPlaybackRate = (playbackRate) =>{
        return 0;
    };
    that.getPlaybackRate = () =>{
        return 0;
    };
    that.getSources = () => {
        if(!elFlash){
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
                that.pause();
                that.setState(STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });

                playerConfig.setSourceIndex(sourceIndex);
                //playerConfig.setSourceLabel(spec.sources[sourceIndex].label);

                if(needProviderChange){
                    let lastPlayPosition = elFlash.getCurrentTime()|| 0;
                    let retryCount = 0;
                    _load(lastPlayPosition);

                    (function checkFileLoaded(){
                        retryCount ++;
                        if(elFlash.isFileLoaded && elFlash.isFileLoaded()){
                            _afterLoad(lastPlayPosition);
                        }else{

                            if(retryCount < 300){
                                setTimeout(checkFileLoaded, 100);
                            }else{
                                console.log("FileLoad failed");
                            }
                        }
                    })();

                }
                return spec.currentSource;
            }
        }
    };

    that.getQualityLevels = () => {
        if(!elFlash){
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = () => {
        if(!elFlash){
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
        let currentFrames = elFlash.getCurrentTime() * fps;
        let newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
    };

    that.stop = () =>{
        OvenPlayerConsole.log("CORE : stop() ");
        elFlash.stop();
    };

    that.destroy = () =>{
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");
        that.stop();

        /*try{
            elFlash.remove();
        }catch(error){
            console.log(error);
        }*/


        if(ads){
            ads.destroy();
        }
        that.off();
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
