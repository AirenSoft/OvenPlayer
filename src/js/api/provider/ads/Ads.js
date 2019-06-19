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
    PROVIDER_DASH,
    UI_ICONS
} from "api/constants";
const TEMP_VIDEO_URL = "data:video/mp4;base64, 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";

const Ads = function(elVideo, provider, playerConfig, adTagUrl, errorCallback){
    //Todo : move createAdContainer to MediaManager
    const AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";
    const ADMANGER_LOADING_ERROR = "admanagerLoadingTimeout";
    let ADS_MANAGER_LOADED = "";
    let AD_ERROR = "";

    let that = {};
    let adsManagerLoaded = false;
    let adsErrorOccurred = false;
    let spec = {
        started: false, //player started
        active : false, //on Ad
        isVideoEnded : false
    };
    let OnAdError = null;
    let OnManagerLoaded = null;

    let adDisplayContainer = null;
    let adDisplayInitialized = false;
    let adsLoader = null;
    let adsManager = null;
    let listener = null;
    let adsRequest = null;
    let autoplayAllowed = false, autoplayRequiresMuted = false;
    let browser = playerConfig.getBrowser();
    let isMobile = browser.os === "Android" || browser.os === "iOS";

    let adDisplayContainerInitialized = false;

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
    OvenPlayerConsole.log("ADS : started ", "isMobile : ", isMobile, adTagUrl);

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
            adsErrorOccurred = true;
            let innerError = adErrorEvent.getError().getInnerError();
            if(innerError){
                console.log(innerError.getErrorCode(), innerError.getMessage());
            }
            /*if (adsManager) {
                adsManager.destroy();
            }*/
            provider.trigger(STATE_AD_ERROR, {code : adErrorEvent.getError().getVastErrorCode() , message : adErrorEvent.getError().getMessage()});
            spec.active = false;
            spec.started = true;
            provider.play();

            /*if(innerError && innerError.getErrorCode() === 1205){
             }else{

             }*/


        };
        OnManagerLoaded = function(adsManagerLoadedEvent){

            OvenPlayerConsole.log("ADS : OnManagerLoaded ");
            let adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            //adsRenderingSettings.useStyledNonLinearAds = true;
            if(adsManager){
                OvenPlayerConsole.log("ADS : destroy adsManager----");
                listener.destroy();
                listener = null;
                adsManager.destroy();
                adsManager = null;
            }
            adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);

            listener = AdsEventsListener(adsManager, provider, spec, OnAdError);

            OvenPlayerConsole.log("ADS : created admanager and listner ");

            adsManagerLoaded = true;
        };


        adDisplayContainer = new google.ima.AdDisplayContainer(createAdContainer(), elVideo);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);

        /*let videos = document.getElementsByTagName("video");
        if(videos.length === 3){
            videos[2].parentElement.remove();
        }*/
        adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
        adsLoader.addEventListener(AD_ERROR, OnAdError, false);

        OvenPlayerConsole.log("ADS : adDisplayContainer initialized");
        provider.on(CONTENT_VOLUME, function(data) {
            if(adsManager){
                if(data.mute){
                    adsManager.setVolume(0);
                }else{
                    adsManager.setVolume(data.volume/100);
                }
            }
        }, that);

        const setAutoPlayToAdsRequest = function (){
            if(adsRequest){
                OvenPlayerConsole.log("ADS : setADWillAutoPlay ", "autoplayAllowed",autoplayAllowed, "autoplayRequiresMuted",autoplayRequiresMuted);

                adsRequest.setAdWillAutoPlay(autoplayAllowed);
                adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
                if(autoplayRequiresMuted){
                    sendWarningMessageForMutedPlay();
                }
            }
        };

        const initRequest = function(){
            adsManagerLoaded = false;
            OvenPlayerConsole.log("ADS : initRequest() AutoPlay Support : ", "autoplayAllowed",autoplayAllowed, "autoplayRequiresMuted",autoplayRequiresMuted);
            /*if(adsRequest){
             return false;
             }*/
            adsRequest = new google.ima.AdsRequest();

            adsRequest.forceNonLinearFullSlot = false;
            /*if(playerConfig.getBrowser().browser === "Safari" && playerConfig.getBrowser().os === "iOS" ){
             autoplayAllowed = false;
             autoplayRequiresMuted = false;
             }*/

            setAutoPlayToAdsRequest();
            adsRequest.adTagUrl = adTagUrl;

            adsLoader.requestAds(adsRequest);
            OvenPlayerConsole.log("ADS : requestAds Complete");
            //two way what ad starts.
            //adsLoader.requestAds(adsRequest); or  adsManager.start();
            //what? why?? wth??
        };


        const checkAutoplaySupport = function () {
            OvenPlayerConsole.log("ADS : checkAutoplaySupport() ");

            let temporarySupportCheckVideo = document.createElement('video');
            temporarySupportCheckVideo.setAttribute('playsinline', 'true');
            temporarySupportCheckVideo.src = TEMP_VIDEO_URL;
            temporarySupportCheckVideo.load();

            //Dash has already loaded when triggered provider.play() always.
            if(isMobile && provider.getName() !== PROVIDER_DASH ){
                //Main video sets user gesture when temporarySupportCheckVideo triggered checking.
                elVideo.load();
            }
            /* The policy that proxy the User Interaction on Mobile. My Guess. 2019-06-19
            *   (temporarySupportCheckVideo's User Interaction proxy to elVideo.)
            *   Mobile Chrome WebView :
            *   You have to run elVideo.load() when temporarySupportCheckVideo issues within 5 seconds of user interaction.
            *
            *   Mobile ios safari :
            *   You have to run elVideo.load() before temporarySupportCheckVideo run play().
            * */

            const clearAndReport = function(_autoplayAllowed, _autoplayRequiresMuted){
                autoplayAllowed = _autoplayAllowed;
                autoplayRequiresMuted = _autoplayRequiresMuted;
                temporarySupportCheckVideo.pause();
                temporarySupportCheckVideo.remove();

                setAutoPlayToAdsRequest();
            };

            return new Promise(function(resolve, reject){
                if(!temporarySupportCheckVideo.play){
                    //I can't remember this case...
                    OvenPlayerConsole.log("ADS : !temporarySupportCheckVideo.play");
                    clearAndReport(true, false);
                    resolve();
                }else{
                    let playPromise = temporarySupportCheckVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(function(){
                            OvenPlayerConsole.log("ADS : auto play allowed.");
                            // If we make it here, unmuted autoplay works.
                            clearAndReport(true, false);
                            resolve();

                        }).catch(function(error){
                            OvenPlayerConsole.log("ADS : auto play failed", error.message);
                            clearAndReport(false, false);
                            resolve();
                        });
                    }else{
                        OvenPlayerConsole.log("ADS : promise not support");
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
                return new Promise(function (resolve, reject) {
                    try{
                        adsManager.resume();
                        resolve();
                    } catch (error){
                        reject(error);
                    }
                });
            }else{
                adDisplayContainer.initialize();

                return new Promise(function (resolve, reject) {
                    let retryCount = 0;
                    const checkAdsManagerIsReady = function(){
                        retryCount ++;
                        if(adsManagerLoaded){
                            OvenPlayerConsole.log("ADS : ad start!");
                            adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);
                            adsManager.start();
                            spec.started = true;

                            resolve();
                        }else{
                            if(adsErrorOccurred){
                                reject(new Error(ADMANGER_LOADING_ERROR));
                            }else{
                                if(retryCount < 150){
                                    setTimeout(checkAdsManagerIsReady, 100);
                                }else{
                                    reject(new Error(ADMANGER_LOADING_ERROR));
                                }
                            }

                        }

                    };
                    checkAutoplaySupport().then(function () {
                        if( (playerConfig.isAutoStart() && !autoplayAllowed) ){
                            OvenPlayerConsole.log("ADS : autoplayAllowed : false");
                            spec.started = false;
                            reject(new Error(AUTOPLAY_NOT_ALLOWED));
                        }else{
                            initRequest();
                            checkAdsManagerIsReady();
                        }
                    });
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
            }else if(adsErrorOccurred){
                completeContentCallback();
            }else{
                //If you need play the post-roll, you have to call to adsLoader when contents was completed.
                spec.isVideoEnded = true;
                adsLoader.contentComplete();
            }
        };

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

