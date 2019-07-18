/**
 * Created by hoho on 10/04/2019.
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

const Listener = function(adsManager, provider, adsSpec, OnAdError){
    let that = {};
    let lowLevelEvents = {};

    let intervalTimer = null;

    const AD_BUFFERING = google.ima.AdEvent.Type.AD_BUFFERING;
    const CONTENT_PAUSE_REQUESTED = google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED;
    const CONTENT_RESUME_REQUESTED = google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED;
    const AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
    const ALL_ADS_COMPLETED = google.ima.AdEvent.Type.ALL_ADS_COMPLETED;
    const CLICK = google.ima.AdEvent.Type.CLICK;
    const SKIPPED = google.ima.AdEvent.Type.SKIPPED;
    const COMPLETE = google.ima.AdEvent.Type.COMPLETE;
    const FIRST_QUARTILE= google.ima.AdEvent.Type.FIRST_QUARTILE;
    const LOADED = google.ima.AdEvent.Type.LOADED;
    const MIDPOINT= google.ima.AdEvent.Type.MIDPOINT;
    const PAUSED = google.ima.AdEvent.Type.PAUSED;
    const RESUMED = google.ima.AdEvent.Type.RESUMED;
    const STARTED = google.ima.AdEvent.Type.STARTED;
    const USER_CLOSE = google.ima.AdEvent.Type.USER_CLOSE;
    const THIRD_QUARTILE = google.ima.AdEvent.Type.THIRD_QUARTILE;

    let isAllAdCompelete = false;   //Post roll을 위해
    let adCompleteCallback = null;
    let currentAd = null;
    OvenPlayerConsole.log("IMA : Listener Created");
     lowLevelEvents[CONTENT_PAUSE_REQUESTED] = (adEvent) => {
         OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);

         //This callls when player is playing contents for ad.
         if(adsSpec.started){
             adsSpec.active = true;
             provider.pause();
         }

    };

    lowLevelEvents[CONTENT_RESUME_REQUESTED] = (adEvent) => {
        OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);
        //This calls when one ad ended.
        //And this is signal what play the contents.
        adsSpec.active = false;

        if(adsSpec.started && (provider.getPosition() === 0 || !adsSpec.isVideoEnded)  ){
            provider.play();
        }

    };
    lowLevelEvents[AD_ERROR] = (adEvent) => {
        isAllAdCompelete = true;
        OnAdError(adEvent);
    } ;

    lowLevelEvents[ALL_ADS_COMPLETED] = (adEvent) => {
        OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);

        isAllAdCompelete = true;
        if(adsSpec.isVideoEnded){
            provider.setState(STATE_COMPLETE);
        }
    };
    lowLevelEvents[CLICK] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
        provider.trigger(PLAYER_CLICKED, {type : PLAYER_AD_CLICK});
    };
    lowLevelEvents[FIRST_QUARTILE] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
    };
    //
    lowLevelEvents[AD_BUFFERING] = (adEvent) => {
        OvenPlayerConsole.log("AD_BUFFERING",adEvent.type);
    };
    lowLevelEvents[LOADED] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
        console.log(adEvent.getAd());
        console.log(adEvent.getAdData());
        let remainingTime = adsManager.getRemainingTime();
        let ad = adEvent.getAd();
        /*var metadata = {
            duration: remainingTime,
            type :"ad"
        };*/
        provider.trigger(STATE_AD_LOADED, {remaining : remainingTime, isLinear : ad.isLinear() });

    };
    lowLevelEvents[MIDPOINT] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
    };
    lowLevelEvents[PAUSED] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
        provider.setState(STATE_AD_PAUSED);
    };
    lowLevelEvents[RESUMED] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
        provider.setState(STATE_AD_PLAYING);
    };


    lowLevelEvents[STARTED] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
        let ad = adEvent.getAd();
        currentAd = ad;

        let adObject = {
            isLinear : ad.isLinear() ,
            duration : ad.getDuration(),
            skipTimeOffset : ad.getSkipTimeOffset()     //The number of seconds of playback before the ad becomes skippable.
        };
        provider.trigger(AD_CHANGED, adObject);


        if (ad.isLinear()) {

            provider.setState(STATE_AD_PLAYING);
            adsSpec.started = true;
            // For a linear ad, a timer can be started to poll for
            // the remaining time.
            intervalTimer = setInterval(
                function() {
                    let remainingTime = adsManager.getRemainingTime();
                    let duration = ad.getDuration();

                    provider.trigger(AD_TIME, {
                        duration : duration,
                        skipTimeOffset : ad.getSkipTimeOffset(),
                        remaining : remainingTime,
                        position : duration - remainingTime,
                        skippable : adsManager.getAdSkippableState()
                    });
                },
                300); // every 300ms
        }else{
            provider.play();
        }
    };
    lowLevelEvents[COMPLETE] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
        let ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(STATE_AD_COMPLETE);
    };
    //User skipped ad. same process on complete.
    lowLevelEvents[SKIPPED] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);

        let ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(STATE_AD_COMPLETE);
    };
    lowLevelEvents[USER_CLOSE] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
        let ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(STATE_AD_COMPLETE);
    };
    lowLevelEvents[THIRD_QUARTILE] = (adEvent) => {
        OvenPlayerConsole.log(adEvent.type);
    };


    Object.keys(lowLevelEvents).forEach(eventName => {
        adsManager.removeEventListener(eventName, lowLevelEvents[eventName]);
        adsManager.addEventListener(eventName, lowLevelEvents[eventName]);
    });
    that.setAdCompleteCallback = (_adCompleteCallback) => {
        adCompleteCallback = _adCompleteCallback;
    };
    that.isAllAdComplete = () => {
        return isAllAdCompelete;
    };
    that.isLinearAd = () => {
        return currentAd  ? currentAd.isLinear() : true;
    };
    that.destroy = () =>{
        OvenPlayerConsole.log("IMAEventListener : destroy()");
        //provider.trigger(STATE_AD_COMPLETE);
        Object.keys(lowLevelEvents).forEach(eventName => {
            adsManager.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;

};

export default Listener;