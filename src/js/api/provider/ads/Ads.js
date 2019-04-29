/**
 * Created by hoho on 08/04/2019.
 */
import AdsEventsListener from "api/provider/ads/Listener";
import LA$ from "utils/likeA$.js";
import {errorTrigger} from "api/provider/utils";
import {
    ERRORS, CONTENT_VOLUME, STATE_LOADING
} from "api/constants";

const Ads = function(elVideo, provider, playerConfig, adTagUrl){
    const ADS_MANAGER_LOADED = google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
    const AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;

    let that = {};
    let adsManagerLoaded = false;
    let spec = {
        started: false,
        active : false,
        isVideoEnded : false
    };
    google.ima.settings.setLocale("ko");
    google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

    //google.ima.settings.setLocale('ko');
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    //google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
    let adDisplayContainer = null;
    let adsLoader = null;
    let adsManager = null;
    let listener = null;
    let adsRequest = null;

    const createAdContainer = () => {
        let adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'ovp-ads');
        adContainer.setAttribute('id', 'ovp-ads');
        playerConfig.getContainer().append(adContainer);

        return adContainer;
    };
    const OnManagerLoaded = function(adsManagerLoadedEvent){
        let adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        //adsRenderingSettings.useStyledNonLinearAds = true;
        adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);
        adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);

        listener = AdsEventsListener(adsManager, provider, spec);

        provider.on(CONTENT_VOLUME, function(data) {
            adsManager.setVolume(data.volume/100);
        }, that);

        adsManagerLoaded = true;

    };
    const OnAdError = function(adErrorEvent){
        errorTrigger({
            message : adErrorEvent.getError().getMessage() + " ["+adErrorEvent.getError().getVastErrorCode()+"]",
            code : adErrorEvent.getError().getVastErrorCode(),
            reason : adErrorEvent.getError().getMessage()
        }, provider);
        if (adsManager) {
            adsManager.destroy();
        }
        spec.active = false;
        spec.started = true;
        provider.play();
    };

    adDisplayContainer = new google.ima.AdDisplayContainer(createAdContainer(), elVideo);
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
    adsLoader.addEventListener(AD_ERROR, OnAdError, false);

    const initAndStart = function(){
        adsRequest = new google.ima.AdsRequest();

       /* adsRequest.nonLinearAdSlotWidth = 150;
        adsRequest.nonLinearAdSlotHeight = 60;*/

        adsRequest.forceNonLinearFullSlot = false;
        adsRequest.setAdWillAutoPlay(false);
        adsRequest.setAdWillPlayMuted(false);
        adsRequest.adTagUrl = adTagUrl;

        adsLoader.requestAds(adsRequest);
    };
    initAndStart();



    that.isActive = () => {
        return spec.active;
    };
    that.started = () => {
        return spec.started;
    };
    that.play = () => {
        provider.setState(STATE_LOADING);
        if(spec.started){
            adsManager.resume();
        }else{
            let retryCount = 0;

            return new Promise(function (resolve, reject) {
                (function checkAdsManagerIsReady(){
                    retryCount ++;
                    if(adsManagerLoaded){
                        elVideo.load();
                        adDisplayContainer.initialize();
                        adsManager.start();
                        spec.started = true;
                        return resolve();
                    }else{
                        if(retryCount < 100){
                            setTimeout(checkAdsManagerIsReady, 100);
                        }else{
                            return reject();
                        }
                    }

                })();
            });


        }
    };
    that.pause = () => {
        adsManager.pause();
    };
    that.videoEndedCallback = (completeContentCallback) => {
        //listener.isLinearAd : get current ad's status whether linear ad or not.
        if(listener.isAllAdComplete() || !listener.isLinearAd()){
            completeContentCallback();
        }else{
            //Post - Roll 을 재생하기 위해서는 콘텐츠가 끝났음을 adsLoader에게 알려야 한다
            spec.isVideoEnded = true;
            adsLoader.contentComplete();
        }
    };

    that.destroy = () => {
        if(adsManager){
            adsManager.destroy();
        }
        if(adDisplayContainer){
            adDisplayContainer.destroy();
        }
        if(listener){
            listener.destroy();
        }
        if(adsLoader){
            adsLoader.removeEventListener(ADS_MANAGER_LOADED, OnManagerLoaded);
            adsLoader.removeEventListener(AD_ERROR, OnAdError);
        }

        let $ads =LA$(playerConfig.getContainer()).find(".ovp-ads");
        if($ads){
            $ads.remove();
        }
        provider.off(CONTENT_VOLUME, null, that);


    };
    return that;
};


export default Ads;