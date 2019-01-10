import {
    ERRORS,
    ERROR,
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_PAUSED,
    STATE_ERROR,
    CONTENT_COMPLETE,
    CONTENT_SEEK,
    CONTENT_BUFFER_FULL,
    CONTENT_SEEKED,
    CONTENT_BUFFER,
    CONTENT_TIME,
    CONTENT_VOLUME,
    CONTENT_META,
    PLAYER_UNKNWON_ERROR,
    PLAYER_UNKNWON_OPERATION_ERROR,
    PLAYER_UNKNWON_NEWWORK_ERROR,
    PLAYER_UNKNWON_DECODE_ERROR,
    PLAYER_FILE_ERROR,
    PROVIDER_HTML5,
    PROVIDER_WEBRTC,
    PROVIDER_DASH,
    PROVIDER_HLS
} from "api/constants";
import {extractVideoElement, separateLive, errorTrigger} from "api/provider/utils";

/**
 * @brief   Trigger on various video events.
 * @param   extendedElement extended media object by mse.
 * @param   Provider provider  html5Provider
 * */


const Listener = function(extendedElement, provider){
    const lowLevelEvents = {};

    OvenPlayerConsole.log("EventListener loaded.",extendedElement ,provider );
    const that = {};

    let elVideo = extractVideoElement(extendedElement);
    const between = function (num, min, max) {
        return Math.max(Math.min(num, max), min);
    }

    //Fires when the browser can start playing the audio/video
    lowLevelEvents.canplay = () => {
        provider.setCanSeek(true);
        provider.trigger(CONTENT_BUFFER_FULL);
        OvenPlayerConsole.log("EventListener : on canplay");
    };
    //Fires when the duration of the audio/video is changed
    lowLevelEvents.durationchange = () => {
        lowLevelEvents.progress();
        OvenPlayerConsole.log("EventListener : on durationchange");
    };
    //Fires when the current playlist is ended
    lowLevelEvents.ended = () => {
        OvenPlayerConsole.log("EventListener : on ended");
        if(provider.getState() != STATE_IDLE && provider.getState() != STATE_COMPLETE){
            provider.trigger(CONTENT_COMPLETE);
            provider.setState(STATE_COMPLETE);
        }
    };
    //Fires when the browser has loaded the current frame of the audio/video
    lowLevelEvents.loadeddata = () => {
        //Do nothing Because this causes chaos by loadedmetadata.
        /*
        var metadata = {
            duration: elVideo.duration,
            height: elVideo.videoHeight,
            width: elVideo.videoWidth
        };
        provider.trigger(CONTENT_META, metadata);*/
        OvenPlayerConsole.log("EventListener : on loadeddata");
    };
    //Fires when the browser has loaded meta data for the audio/video
    lowLevelEvents.loadedmetadata = () => {
        let isLive = (elVideo.duration === Infinity) ? true : separateLive(extendedElement);
        let sources = provider.getSources();
        let sourceIndex = provider.getCurrentSource();
        let type = sourceIndex > -1 ? sources[sourceIndex].type : "";
        var metadata = {
            duration: isLive ?  Infinity : elVideo.duration,
            type :type
        };

        OvenPlayerConsole.log("EventListener : on loadedmetadata", metadata);
        provider.trigger(CONTENT_META, metadata);
    };
    //Fires when the audio/video has been paused
    lowLevelEvents.pause = () => {
        if(provider.getState() === STATE_COMPLETE ||provider.getState() === STATE_ERROR){
            return false;
        }
        if(elVideo.ended){
            return false;
        }
        if(elVideo.error){
            return false;
        }
        if(elVideo.currentTime === elVideo.duration){
            return false;
        }
        OvenPlayerConsole.log("EventListener : on pause");
        provider.setState(STATE_PAUSED);
    };
    //Fires when the audio/video has been started or is no longer paused
    lowLevelEvents.play = () => {
        if (!elVideo.paused && provider.getState() !== STATE_PLAYING) {
            OvenPlayerConsole.log("EventListener : on play");
            provider.setState(STATE_LOADING);
        }

    };
    //Fires when the audio/video is playing after having been paused or stopped for buffering
    lowLevelEvents.playing = () => {
        OvenPlayerConsole.log("EventListener : on playing");
        provider.setState(STATE_PLAYING);
        //provider.trigger(PROVIDER_FIRST_FRAME);
    };
    //Fires when the browser is downloading the audio/video
    lowLevelEvents.progress = () => {
        let timeRanges = elVideo.buffered;
        if(!timeRanges ){
            return false;
        }

        let duration = elVideo.duration, position = elVideo.currentTime;
        let buffered = between( (timeRanges.length> 0 ? timeRanges.end(timeRanges.length - 1) : 0 ) / duration, 0, 1);

        OvenPlayerConsole.log("EventListener : on progress", buffered*100);

        provider.setBuffer(buffered*100);
        provider.trigger(CONTENT_BUFFER, {
            bufferPercent: buffered*100,
            position:  position,
            duration: duration
        });
    };
    //Fires when the browser is trying to get media data, but data is not available
    lowLevelEvents.stalled = () => {
        OvenPlayerConsole.log("EventListener : on stall");
    };
    //Fires when the current playback position has changed
    lowLevelEvents.timeupdate = () => {
        const position = elVideo.currentTime;
        const duration = elVideo.duration;
        if (isNaN(duration)) {
            return;
        }

        if(!provider.isSeeking() && !elVideo.paused){
            provider.setState(STATE_PLAYING);
        }
        /*OvenPlayerConsole.log("EventListener : on timeupdate" , {
            position: position,
            duration: duration
        });*/
        if (provider.getState() === STATE_PLAYING || provider.isSeeking()) {
            provider.trigger(CONTENT_TIME, {
                position: position,
                duration: duration
            });
        }

    };
    lowLevelEvents.resize = () => {
        OvenPlayerConsole.log("EventListener : on resize");
    };
    lowLevelEvents.seeking = () => {
        provider.setSeeking(true);
        OvenPlayerConsole.log("EventListener : on seeking", elVideo.currentTime);
        provider.trigger(CONTENT_SEEK,{
            position : elVideo.currentTime
        });
    };
    lowLevelEvents.seeked = () => {
        if(!provider.isSeeking()){
            return;
        }
        OvenPlayerConsole.log("EventListener : on seeked");
        provider.setSeeking(false);
        provider.trigger(CONTENT_SEEKED);
    };

    //Fires when the video stops because it needs to buffer the next frame
    lowLevelEvents.waiting = () => {
        OvenPlayerConsole.log("EventListener : on waiting", provider.getState());
        if(provider.isSeeking()){
            provider.setState(STATE_LOADING);
        }else if(provider.getState() === STATE_PLAYING){
            provider.setState(STATE_STALLED);
        }
    };

    lowLevelEvents.volumechange = () => {

        OvenPlayerConsole.log("EventListener : on volumechange", Math.round(elVideo.volume * 100));
        provider.trigger(CONTENT_VOLUME, {
            volume: Math.round(elVideo.volume * 100),
            mute: elVideo.muted
        });
    };

    lowLevelEvents.error = () => {
        const code = (elVideo.error && elVideo.error.code) || 0;
        let convertedErroCode = ({
            0: PLAYER_UNKNWON_ERROR,
            1: PLAYER_UNKNWON_OPERATION_ERROR,
            2: PLAYER_UNKNWON_NEWWORK_ERROR,
            3: PLAYER_UNKNWON_DECODE_ERROR,
            4: PLAYER_FILE_ERROR
        }[code]||0);

        OvenPlayerConsole.log("EventListener : on error", convertedErroCode);
        errorTrigger(ERRORS[convertedErroCode]);
    };

    Object.keys(lowLevelEvents).forEach(eventName => {
        elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        elVideo.addEventListener(eventName, lowLevelEvents[eventName]);
    });

    that.destroy = () =>{
        OvenPlayerConsole.log("EventListener : destroy()");

        Object.keys(lowLevelEvents).forEach(eventName => {
            elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
};

export default Listener;