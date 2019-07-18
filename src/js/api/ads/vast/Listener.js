/**
 * Created by hoho on 26/06/2019.
 */
import {
    ERROR,
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_AD_LOADED,
    STATE_AD_PLAYING,
    STATE_AD_PAUSED,
    STATE_AD_COMPLETE,
    AD_CHANGED,
    AD_TIME,
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
    PLAYER_STATE,
    PLAYER_CLICKED,
    PLAYER_AD_CLICK,
    PROVIDER_HTML5,
    PROVIDER_WEBRTC,
    PROVIDER_DASH,
    PROVIDER_HLS
} from "api/constants";
import LA$ from "utils/likeA$.js";

const Listener = function(elAdVideo, vastTracker, provider, adsSpec, adButton, textView, OnAdError){
    const lowLevelEvents = {};
    let that = {};
    const MEDIAFILE_PLAYBACK_ERROR = '405';

    let $textView = LA$(textView);
    let $adButton = LA$(adButton);
    let $elAdVideo = LA$(elAdVideo);

    provider.on(CONTENT_VOLUME, function(data) {
        if(data.mute){
            elAdVideo.muted = true;
        }else{
            elAdVideo.muted = false;
            elAdVideo.volume = data.volume/100;
        }
    }, that);

    //Like a CONTENT_RESUME_REQUESTED
    const processEndOfAd = function(){
        adsSpec.active = false;

        $adButton.hide();

        if(adsSpec.started && (provider.getPosition() === 0 || !adsSpec.isVideoEnded)  ){
            $elAdVideo.hide();
            provider.play();
        }
        provider.trigger(STATE_AD_COMPLETE);
    };
    //Like a CONTENT_PAUSE_REQUESTED
    const processStartOfAd = function(){

        $elAdVideo.show();
        $adButton.show();

    };
    const skipButtonClicked = function(event){
        if($textView.hasClass("videoAdUiAction")){
            vastTracker.skip();
            elAdVideo.pause();
            processEndOfAd();
        }
    };

    textView.addEventListener("click", skipButtonClicked, false);


    lowLevelEvents.error = function(){
        OvenPlayerConsole.log("VAST : listener : error.", elAdVideo.error);
        console.log("VAST : listener : error.", elAdVideo.error);
        let error = {};
        const code = (elAdVideo.error && elAdVideo.error.code) || 0;

        if(code === 2) {
            error.code = 402;
            error.message = "Timeout of MediaFile URI.";
        }else if(code === 3){
            error.code = 405;
            error.message = "Problem displaying MediaFile. Video player found a MediaFile with supported type but couldn’t display it. MediaFile may include: unsupported codecs, different MIME type than MediaFile@type, unsupported delivery method, etc.";
        }else if(code === 4){
            error.code = 403;
            error.message = "Couldn’t find MediaFile that is supported by this video player, based on the attributes of the MediaFile element.";
        }else{
            error.code = 400;
            error.message = "General Linear error. Video player is unable to display the Linear Ad.";
        }
        vastTracker.errorWithCode(error.code);
        OnAdError(MEDIAFILE_PLAYBACK_ERROR);
    };

    lowLevelEvents.canplay = function(){

    };
    lowLevelEvents.ended = function(){
        vastTracker.complete();

        processEndOfAd();
    };
    lowLevelEvents.click = function(event){
        vastTracker.click();
    };
    lowLevelEvents.play = function(){
        vastTracker.setPaused(false);
    };
    lowLevelEvents.pause = function(){
        vastTracker.setPaused(true);
    };
    lowLevelEvents.timeupdate = function(event){
        vastTracker.setProgress(event.target.currentTime);
        provider.trigger(AD_TIME, {
            duration : elAdVideo.duration,
            position : elAdVideo.currentTime
        });
    };
    lowLevelEvents.volumechange = function(event){
        OvenPlayerConsole.log("VAST : listener : Ad Video Volumechange.");
        vastTracker.setMuted(event.target.muted);
    };
    lowLevelEvents.loadedmetadata = function(){
        OvenPlayerConsole.log("VAST : listener : Ad CONTENT LOADED .");

        //Flash play is very fast...
        if(STATE_PLAYING === provider.getState()){
            provider.pause();
        }

        vastTracker.trackImpression();

        provider.trigger(STATE_AD_LOADED, {remaining : elAdVideo.duration, isLinear : true});
        elAdVideo.play();
    };

    vastTracker.on('skip', () => {
        // skip tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : skipped");
    });

    vastTracker.on('mute', () => {
        // mute tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : muted");
    });

    vastTracker.on('unmute', () => {
        // unmute tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : unmuted");
    });

    vastTracker.on('resume', () => {
        // resume tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : vastTracker resumed.");

        //prevent to set STATE_AD_PLAYING when first play.
        if(adsSpec.started){
            provider.setState(STATE_AD_PLAYING);
        }

    });
    vastTracker.on('pause', () => {
        // pause tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : vastTracker paused.");
        provider.setState(STATE_AD_PAUSED);
    });

    vastTracker.on('clickthrough', url => {
        // Open the resolved clickThrough url
        OvenPlayerConsole.log("VAST : listener : clickthrough :", url);
        //document.location.href = url;
        window.open(url, '_blank');

    });

    vastTracker.on('skip-countdown', (data) => {
        if(data === 0){
            if(adsSpec.lang === "ko"){
                $textView.html("광고 건너뛰기<i class='op-con op-arrow-right btn-right'></i>");
            }else{
                $textView.html("Ad Skip<i class='op-con op-arrow-right btn-right'></i>");
            }
            $textView.addClass("videoAdUiAction");
        }else{
            if(adsSpec.lang === "ko"){
                $textView.html((parseInt(data)+1)+"초 후에 이 광고를 건너뛸 수 있습니다.");
            }else{
                $textView.html("You can skip this ad in "+(parseInt(data)+1));

            }
        }
    });
    vastTracker.on('rewind', () => {
        OvenPlayerConsole.log("VAST : listener : rewind");
    });

    vastTracker.on('start', () => {
        OvenPlayerConsole.log("VAST : listener : started");

        adsSpec.started = true;
        adsSpec.active = true;
        processStartOfAd();

        provider.trigger(AD_CHANGED, {isLinear : true});
        provider.setState(STATE_AD_PLAYING);
    });
    vastTracker.on('firstQuartile', () => {
        // firstQuartile tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : firstQuartile");
    });
    vastTracker.on('midpoint', () => {
        OvenPlayerConsole.log("VAST : listener : midpoint");
    });
    vastTracker.on('thirdQuartile', () => {
        OvenPlayerConsole.log("VAST : listener : thirdQuartile");
    });

    vastTracker.on('creativeView', () => {
        // impression tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : creativeView");

    });

    Object.keys(lowLevelEvents).forEach(eventName => {
        elAdVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        elAdVideo.addEventListener(eventName, lowLevelEvents[eventName]);
    });

    that.destroy = () =>{
        OvenPlayerConsole.log("EventListener : destroy()");
        textView.removeEventListener("click", skipButtonClicked, false);
        Object.keys(lowLevelEvents).forEach(eventName => {
            elAdVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
};

export default Listener;