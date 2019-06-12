/**
 * Created by hoho on 08/04/2019.
 */
import AdsEventsListener from "api/provider/ads/Listener";
import LA$ from "utils/likeA$.js";
import {errorTrigger} from "api/provider/utils";
import {
    ERROR, ERRORS,
    CONTENT_VOLUME,
    STATE_LOADING,
    INIT_ADS_ERROR,
    STATE_AD_ERROR,
    PLAYER_WARNING,
    CONTENT_META,
    WARN_MSG_MUTEDPLAY,
    STATE_AD_LOADING,
    UI_ICONS
} from "api/constants";

const Ads = function(elVideo, provider, playerConfig, adTagUrl, errorCallback){
    //Todo : move createAdContainer to MediaManager
    const AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";
    const ADMANGER_LOADING_ERROR = "admanagerLoadingTimeout";
    let ADS_MANAGER_LOADED = "";
    let AD_ERROR = "";

    let that = {};
    let adsManagerLoaded = false;
    let spec = {
        started: false, //player started
        active : false, //on Ad
        isVideoEnded : false,
        checkAutoplayPeriod : true
    };
    let OnAdError = null;
    let OnManagerLoaded = null;

    let adDisplayContainer = null;
    let adsLoader = null;
    let adsManager = null;
    let listener = null;
    let adsRequest = null;
    let autoplayAllowed = false, autoplayRequiresMuted = false;


    // google.ima.settings.setAutoPlayAdBreaks(false);
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

    //google.ima.settings.setLocale('ko');
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    //google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
    const sendWarningMessageForMutedPlay = function(){
        provider.trigger(PLAYER_WARNING, {
            message : WARN_MSG_MUTEDPLAY,
            timer : 10 * 1000,
            iconClass : UI_ICONS.volume_mute,
            onClickCallback : function(){
                provider.setMute(false);
            }
        });
    };
    OvenPlayerConsole.log("ADS : started ", adTagUrl);

    try{
        ADS_MANAGER_LOADED = google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
        AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
        google.ima.settings.setLocale("ko");
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);




        const createAdContainer = () => {
            let adContainer = document.createElement('div');
            adContainer.setAttribute('class', 'ovp-ads');
            adContainer.setAttribute('id', 'ovp-ads');
            playerConfig.getContainer().append(adContainer);

            return adContainer;
        };
        OnAdError = function(adErrorEvent){
            //note : adErrorEvent.getError().getInnerError().getErrorCode() === 1205 & adErrorEvent.getError().getVastErrorCode() === 400 is Browser User Interactive error.

            //Do not triggering ERROR. becuase It just AD!

            console.log(adErrorEvent.getError().getVastErrorCode(), adErrorEvent.getError().getMessage());

            let innerError = adErrorEvent.getError().getInnerError();
            if(innerError){
                console.log(innerError.getErrorCode(), innerError.getMessage());
            }
            if (adsManager) {
                adsManager.destroy();
            }
            provider.trigger(STATE_AD_ERROR, {code : adErrorEvent.getError().getVastErrorCode() , message : adErrorEvent.getError().getMessage()});
            spec.active = false;
            spec.started = true;
            provider.play();

            /*if(innerError && innerError.getErrorCode() === 1205){
             }else{

             }*/


        };
        OnManagerLoaded = function(adsManagerLoadedEvent){
            let adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            //adsRenderingSettings.useStyledNonLinearAds = true;
            adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);


            listener = AdsEventsListener(adsManager, provider, spec, OnAdError);

            provider.on(CONTENT_VOLUME, function(data) {
                if(data.mute){
                    adsManager.setVolume(0);
                }else{
                    adsManager.setVolume(data.volume/100);
                }

            }, that);

            adsManagerLoaded = true;

        };


        adDisplayContainer = new google.ima.AdDisplayContainer(createAdContainer(), elVideo);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);

        adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
        adsLoader.addEventListener(AD_ERROR, OnAdError, false);


        function initRequest(){

            OvenPlayerConsole.log("ADS : AutoPlay Support : ", "autoplayAllowed",autoplayAllowed, "autoplayRequiresMuted",autoplayRequiresMuted);

            adsRequest = new google.ima.AdsRequest();

            adsRequest.forceNonLinearFullSlot = false;
            /*if(playerConfig.getBrowser().browser === "Safari" && playerConfig.getBrowser().os === "iOS" ){
             autoplayAllowed = false;
             autoplayRequiresMuted = false;
             }*/

            adsRequest.setAdWillAutoPlay(autoplayAllowed);
            adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
            if(autoplayRequiresMuted){
                sendWarningMessageForMutedPlay();
            }
            adsRequest.adTagUrl = adTagUrl;

            adsLoader.requestAds(adsRequest);
            OvenPlayerConsole.log("ADS : requestAds Complete");
            //two way what ad starts.
            //adsLoader.requestAds(adsRequest); or  adsManager.start();
            //what? why?? wth??
        }

        function checkAutoplaySupport() {
            OvenPlayerConsole.log("ADS : checkAutoplaySupport() ");
            spec.checkAutoplayPeriod = true;
            //let cloneVideo = elVideo.cloneNode(true);
            console.log(elVideo);
            if(!elVideo.play){
                autoplayAllowed = true;
                autoplayRequiresMuted = false;
                spec.checkAutoplayPeriod = false;
                initRequest();
                return false;
            }

            let playPromise = elVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(function(){
                    console.log("ADS : CHECK AUTO PLAY success");
                    // If we make it here, unmuted autoplay works.
                    elVideo.pause();
                    autoplayAllowed = true;
                    autoplayRequiresMuted = false;
                    spec.checkAutoplayPeriod = false;
                    initRequest();

                }).catch(function(error){
                    console.log("ADS : CHECK AUTO PLAY fail", error.message);
                    autoplayAllowed = false;
                    autoplayRequiresMuted = false;
                    spec.checkAutoplayPeriod = false;
                    initRequest();

                    /*
                    //Disable Muted Play
                    elVideo.muted = true;
                    var playPromise = elVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(function () {
                            // If we make it here, muted autoplay works but unmuted autoplay does not.
                            elVideo.pause();
                            autoplayAllowed = true;
                            autoplayRequiresMuted = true;
                            spec.checkAutoplayStart = false;
                            initRequest();
                        }).catch(function (error) {
                            // Both muted and unmuted autoplay failed. Fall back to click to play.
                            elVideo.muted = false;
                            autoplayAllowed = false;
                            autoplayRequiresMuted = false;
                            spec.checkAutoplayStart = false;
                            initRequest();
                        });
                    }*/
                });
            }else{
                //Maybe this is IE11....
                elVideo.pause();
                autoplayAllowed = true;
                autoplayRequiresMuted = false;
                spec.checkAutoplayPeriod = false;
                initRequest();
            }
        }



        that.isActive = () => {
            return spec.active;
        };
        that.started = () => {
            return spec.started;
        };
        that.play = () => {
            //provider.setState(STATE_LOADING);

            if(spec.started){
                return new Promise(function (resolve, reject) {
                    try{
                        adsManager.resume();
                        resolve();
                    } catch (error){
                        reject(error);
                    }
                });

            }else{
                let retryCount = 0;
                //provider.setState(STATE_AD_LOADING);

                return new Promise(function (resolve, reject) {
                    checkAutoplaySupport();
                    (function checkAdsManagerIsReady(){
                        retryCount ++;
                        if(adsManagerLoaded){
                            if((playerConfig.isAutoStart() && !autoplayAllowed) ){
                                autoplayAllowed = true; //autoplay fail. set forced autoplayAllowed
                                spec.started = false;
                                reject(new Error(AUTOPLAY_NOT_ALLOWED));
                            }else{
                                //I think do not nessessary this code anymore. Because muted play solves everything. 2019-06-04
                                /*if(playerConfig.getBrowser().os  === "iOS" || playerConfig.getBrowser().os  === "Android"){
                                 //Don't playing video when player complete playing AD.
                                 //Only iOS Safari First loaded.
                                    elVideo.load();
                                }*/

                                adDisplayContainer.initialize();
                                adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);
                                adsManager.start();
                                spec.started = true;
                                resolve();
                            }
                        }else{
                            if(retryCount < 300){
                                setTimeout(checkAdsManagerIsReady, 100);
                            }else{
                                reject(new Error(ADMANGER_LOADING_ERROR));
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
            if(listener && (listener.isAllAdComplete() || !listener.isLinearAd())){
                completeContentCallback();
            }else{
                //Post - Roll 을 재생하기 위해서는 콘텐츠가 끝났음을 adsLoader에게 알려야 한다
                spec.isVideoEnded = true;
                adsLoader.contentComplete();
            }
        };
        that.isAutoPlaySupportCheckTime = () => {
            return spec.checkAutoplayPeriod;
        }
        that.destroy = () => {
            if(adsLoader){
                adsLoader.removeEventListener(ADS_MANAGER_LOADED, OnManagerLoaded);
                adsLoader.removeEventListener(AD_ERROR, OnAdError);
            }

            if(adsManager){
                adsManager.destroy();
            }

            if(adDisplayContainer){
                adDisplayContainer.destroy();
            }

            if(listener){
                listener.destroy();
            }

            let $ads = LA$(playerConfig.getContainer()).find(".ovp-ads");
            if($ads){
                $ads.remove();
            }

            provider.off(CONTENT_VOLUME, null, that);
        };
        return that;

    }catch (error){
        //let tempError = ERRORS[INIT_ADS_ERROR];
        //tempError.error = error;
        //errorCallback(tempError);
        return null;
    }


};


export default Ads;