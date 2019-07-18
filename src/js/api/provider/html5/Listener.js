import {
    ERRORS,
    ERROR,
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_AD_PLAYING,
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
import {extractVideoElement, errorTrigger} from "api/provider/utils";

/**
 * @brief   Trigger on various video events.
 * @param   extendedElement extended media object by mse.
 * @param   Provider provider  html5Provider
 * */


const Listener = function(element, provider, videoEndedCallback){
    const lowLevelEvents = {};

    OvenPlayerConsole.log("EventListener loaded.",element ,provider );
    const that = {};

    let stalled = -1;
    let elVideo =  element;
    const between = function (num, min, max) {
        return Math.max(Math.min(num, max), min);
    }
    const compareStalledTime = function(stalled, position){
        //Original Code is stalled !== position
        //Because Dashjs is very meticulous. Then always diffrence stalled and position.
        //That is why when I use toFixed(2).
        return stalled.toFixed(2) === position.toFixed(2);
    };

    lowLevelEvents.canplay = () => {
        //Fires when the browser can start playing the audio/video
        provider.setCanSeek(true);
        provider.trigger(CONTENT_BUFFER_FULL);
        OvenPlayerConsole.log("EventListener : on canplay");
    };

    lowLevelEvents.durationchange = () => {
        //Fires when the duration of the audio/video is changed
        lowLevelEvents.progress();
        OvenPlayerConsole.log("EventListener : on durationchange");
    };

    lowLevelEvents.ended = () => {
        //Fires when the current playlist is ended
        OvenPlayerConsole.log("EventListener : on ended");

        if(provider.getState() !== STATE_IDLE && provider.getState() !== STATE_COMPLETE){
            if(videoEndedCallback){
                videoEndedCallback(function(){
                    provider.setState(STATE_COMPLETE);
                });
            }else{
                provider.setState(STATE_COMPLETE);
            }
        }
    };

    lowLevelEvents.loadeddata = () => {
        //Fires when the browser has loaded the current frame of the audio/video
        //Do nothing Because this causes chaos by loadedmetadata.
        /*
        var metadata = {
            duration: elVideo.duration,
            height: elVideo.videoHeight,
            width: elVideo.videoWidth
        };
        provider.trigger(CONTENT_META, metadata);*/
    };

    lowLevelEvents.loadedmetadata = () => {
        //Fires when the browser has loaded meta data for the audio/video

        let sources = provider.getSources();
        let sourceIndex = provider.getCurrentSource();
        let type = sourceIndex > -1 ? sources[sourceIndex].type : "";
        var metadata = {
            duration: provider.isLive() ?  Infinity : elVideo.duration,
            type :type
        };

        provider.setMetaLoaded();

        OvenPlayerConsole.log("EventListener : on loadedmetadata", metadata);
        provider.trigger(CONTENT_META, metadata);
    };

    lowLevelEvents.pause = () => {
        //Fires when the audio/video has been paused
        if(provider.getState() === STATE_COMPLETE || provider.getState() === STATE_ERROR){
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

    lowLevelEvents.play = () => {

        //Fires when the audio/video has been started or is no longer paused
        stalled = -1;
        if (!elVideo.paused && provider.getState() !== STATE_PLAYING) {
            provider.setState(STATE_LOADING);
        }
    };

    lowLevelEvents.playing = () => {
        //Fires when the audio/video is playing after having been paused or stopped for buffering
        OvenPlayerConsole.log("EventListener : on playing");
        if(stalled < 0){
            provider.setState(STATE_PLAYING);
        }
    };

    lowLevelEvents.progress = () => {
        //Fires when the browser is downloading the audio/video
        let timeRanges = elVideo.buffered;
        if(!timeRanges ){
            return false;
        }

        let duration = elVideo.duration, position = elVideo.currentTime;
        let buffered = between( (timeRanges.length> 0 ? timeRanges.end(timeRanges.length - 1) : 0 ) / duration, 0, 1);

        provider.setBuffer(buffered*100);
        provider.trigger(CONTENT_BUFFER, {
            bufferPercent: buffered*100,
            position:  position,
            duration: duration
        });
        OvenPlayerConsole.log("EventListener : on progress", buffered*100);
    };


    lowLevelEvents.timeupdate = () => {
        //Fires when the current playback position has changed
        let position = elVideo.currentTime;
        let duration = elVideo.duration;
        if (isNaN(duration)) {
            return;
        }

        //Sometimes dash live gave to me crazy duration. (9007199254740991...) why???
        if(duration > 9000000000000000){    //9007199254740991
            duration = Infinity;
        }

        if(!provider.isSeeking() && !elVideo.paused && (provider.getState() === STATE_STALLED || provider.getState() === STATE_LOADING || provider.getState() === STATE_AD_PLAYING) &&
            !compareStalledTime(stalled, position) ){
            stalled = -1;
            provider.setState(STATE_PLAYING);
        }

        if (provider.getState() === STATE_PLAYING || provider.isSeeking()) {
            provider.trigger(CONTENT_TIME, {
                position: position,
                duration: duration
            });
        }

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

    lowLevelEvents.stalled = () => {
        OvenPlayerConsole.log("EventListener : on stalled");
        //This callback does not work on chrome. This calls on Firefox intermittent. Then do not work here. using waiting event.
    };

    lowLevelEvents.waiting = () => {
        //Fires when the video stops because it needs to buffer the next frame
        OvenPlayerConsole.log("EventListener : on waiting", provider.getState());
        if(provider.isSeeking()){
            provider.setState(STATE_LOADING);
        }else if(provider.getState() === STATE_PLAYING){
            stalled = elVideo.currentTime;
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
        errorTrigger(ERRORS.codes[convertedErroCode], provider);
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