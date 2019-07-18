/**
 * Created by hoho on 25/06/2019.
 */

import { VASTClient, VASTTracker } from 'utils/vast-client';
import AdsEventsListener from "api/ads/vast/Listener";
import {TEMP_VIDEO_URL} from "api/ads/utils";
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
    STATE_AD_ERROR,
    CONTENT_META,
    PROVIDER_DASH
} from "api/constants";

const Ad = function(elVideo, provider, playerConfig, adTagUrl){
    const AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";

    let that = {};
    let spec = {
        started: false, //player started
        active : false, //on Ad
        isVideoEnded : false,
        lang : playerConfig.getLanguage()
    };
    let adsErrorOccurred = false;
    let listener = null;

    let container = "";
    let elAdVideo = null;
    let textView = "";
    let adButton = "";

    let autoplayAllowed = false, autoplayRequiresMuted = false;
    let browser = playerConfig.getBrowser();
    let isMobile = browser.os === "Android" || browser.os === "iOS";

    const createAdContainer = () => {
        let adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'op-ads');
        adContainer.setAttribute('id', 'op-ads');
        playerConfig.getContainer().append(adContainer);

        elAdVideo = document.createElement('video');
        elAdVideo.setAttribute('playsinline', 'true');
        elAdVideo.setAttribute('title', 'Advertisement');
        elAdVideo.setAttribute('class', 'op-ads-vast-video');

        adButton = document.createElement('div');
        adButton.setAttribute('class', 'op-ads-button');

        textView = document.createElement('div');
        textView.setAttribute('class', 'op-ads-textview');

        adButton.append(textView);
        adContainer.append(elAdVideo);
        adContainer.append(adButton);

        return adContainer;
    };

    container = createAdContainer();

    let vastClient = new VASTClient();
    let vastTracker = null;
    let ad = null;


    const OnAdError = function(error){
        console.log(error);
        adsErrorOccurred = true;
        elAdVideo.style.display = "none";
        provider.trigger(STATE_AD_ERROR, {code : error.code, message : error.message});
        spec.active = false;
        spec.started = true;
        provider.play();
    };

    const initRequest = function () {
        vastClient.get(adTagUrl) .then(res => {
            // Do something with the parsed VAST response
            OvenPlayerConsole.log("VAST : initRequest()");
            ad = res.ads[0];
            if(!ad){
                throw {code : 401, message : "File not found. Unable to find Linear/MediaFile from URI."};
            }
            vastTracker = new VASTTracker(vastClient, ad, ad.creatives[0]);

            OvenPlayerConsole.log("VAST : created ad tracker.");

            listener = AdsEventsListener(elAdVideo, vastTracker, provider, spec, adButton, textView, OnAdError);

            let videoURL =  "";
            if(ad.creatives && ad.creatives.length > 0 && ad.creatives[0].mediaFiles && ad.creatives[0].mediaFiles.length > 0 && ad.creatives[0].mediaFiles[0].fileURL){
                videoURL = ad.creatives[0].mediaFiles[0].fileURL;
                OvenPlayerConsole.log("VAST : media url : ", videoURL);
            }
            elAdVideo.src = videoURL;

            //keep volume even if playlist item changes.
            elAdVideo.volume = elVideo.volume;
            elAdVideo.muted = elVideo.muted;

        }).catch(function(error){
            OnAdError(error);
        });

    };



    const checkAutoplaySupport = function () {
        OvenPlayerConsole.log("VAST : checkAutoplaySupport() ");

        let temporarySupportCheckVideo = document.createElement('video');
        temporarySupportCheckVideo.setAttribute('playsinline', 'true');
        temporarySupportCheckVideo.src = TEMP_VIDEO_URL;
        temporarySupportCheckVideo.load();


        elAdVideo.load();   //for ios User Interaction problem
        //Dash has already loaded when triggered provider.play() always.
        if(isMobile && provider.getName() !== PROVIDER_DASH ){
            //Main video sets user gesture when temporarySupportCheckVideo triggered checking.
            elVideo.load();
        }
        const clearAndReport = function(_autoplayAllowed, _autoplayRequiresMuted){
            autoplayAllowed = _autoplayAllowed;
            autoplayRequiresMuted = _autoplayRequiresMuted;
            temporarySupportCheckVideo.pause();
            temporarySupportCheckVideo.remove();
        };

        return new Promise(function(resolve, reject){
            if(!temporarySupportCheckVideo.play){
                //I can't remember this case...
                OvenPlayerConsole.log("VAST : !temporarySupportCheckVideo.play");
                clearAndReport(true, false);
                resolve();
            }else{
                let playPromise = temporarySupportCheckVideo.play();
                if (playPromise !== undefined) {
                    playPromise.then(function(){
                        OvenPlayerConsole.log("VAST : auto play allowed.");
                        // If we make it here, unmuted autoplay works.
                        clearAndReport(true, false);
                        resolve();
                    }).catch(function(error){
                        OvenPlayerConsole.log("VAST : auto play failed", error.message);
                        clearAndReport(false, false);
                        resolve();
                    });
                }else{
                    OvenPlayerConsole.log("VAST : promise not support");
                    //Maybe this is IE11....
                    clearAndReport(true, false);
                    resolve();
                }
            }
        });
    }
    that.isActive = () => {
        return spec.active;
    };
    that.started = () => {
        return spec.started;
    };
    that.play = () => {
        if(spec.started){
            return elAdVideo.play();
        }else{
            return new Promise(function (resolve, reject) {

                const checkMainContentLoaded = function(){

                    //wait for main contents meta loaded.
                    //have to trigger CONTENT_META first. next trigger AD_CHANGED.
                    //initControlUI first ->  init ad UI
                    //Maybe google ima waits content loaded internal.
                    if(provider.metaLoaded()){
                        OvenPlayerConsole.log("VAST : main contents meta loaded.");
                        checkAutoplaySupport().then(function(){
                            if( (playerConfig.isAutoStart() && !autoplayAllowed) ){
                                OvenPlayerConsole.log("VAST : autoplayAllowed : false");
                                spec.started = false;
                                reject(new Error(AUTOPLAY_NOT_ALLOWED));
                            }else{
                                initRequest();

                                resolve();
                            }
                        });

                    }else{
                        setTimeout(checkMainContentLoaded, 100);
                    }

                };
                checkMainContentLoaded();

            });
        }
    };
    that.pause = () => {
        elAdVideo.pause();
    };

    //End Of Main Contents.
    that.videoEndedCallback = (completeContentCallback) => {

        completeContentCallback();
        //check true when main contents ended.
        spec.isVideoEnded = true;
    };
    that.destroy = () => {
        if(listener){
            listener.destroy();
            listener = null;
        }
        vastTracker = null;
        vastClient = null;

        container.remove();

    };
    return that;
};

export default Ad;