/**
 * Created by hoho on 08/04/2019.
 */
import AdsEventsListener from "api/ads/ima/Listener";
import {TEMP_VIDEO_URL} from "api/ads/utils";
import LA$ from "utils/likeA$.js";
import {errorTrigger} from "api/provider/utils";
import {
    ERROR,
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

const Ad = function(elVideo, provider, playerConfig, adTagUrl, errorCallback){
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
    let OnManagerLoaded = null;
    let OnAdError = null;

    let adDisplayContainer = null;
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
    OvenPlayerConsole.log("IMA : started ", "isMobile : ", isMobile, adTagUrl);

    try{
        ADS_MANAGER_LOADED = google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
        AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
        google.ima.settings.setLocale(playerConfig.getLanguage());
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);

        const createAdContainer = () => {
            let adContainer = document.createElement('div');
            adContainer.setAttribute('class', 'op-ads');
            adContainer.setAttribute('id', 'op-ads');
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

            OvenPlayerConsole.log("IMA : OnManagerLoaded ");
            let adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            //adsRenderingSettings.useStyledNonLinearAds = true;
            if(adsManager){
                OvenPlayerConsole.log("IMA : destroy adsManager----");
                listener.destroy();
                listener = null;
                adsManager.destroy();
                adsManager = null;
            }
            adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);

            listener = AdsEventsListener(adsManager, provider, spec, OnAdError);

            OvenPlayerConsole.log("IMA : created admanager and listner ");

            adsManagerLoaded = true;
        };
        let adConatinerElment = createAdContainer();
        adDisplayContainer = new google.ima.AdDisplayContainer(adConatinerElment, elVideo);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);

        adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
        adsLoader.addEventListener(AD_ERROR, OnAdError, false);

        OvenPlayerConsole.log("IMA : adDisplayContainer initialized");
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
                OvenPlayerConsole.log("IMA : setADWillAutoPlay ", "autoplayAllowed",autoplayAllowed, "autoplayRequiresMuted",autoplayRequiresMuted);

                adsRequest.setAdWillAutoPlay(autoplayAllowed);
                adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
                if(autoplayRequiresMuted){
                    sendWarningMessageForMutedPlay();
                }
            }
        };

        const initRequest = function(){
            adsManagerLoaded = false;
            OvenPlayerConsole.log("IMA : initRequest() AutoPlay Support : ", "autoplayAllowed",autoplayAllowed, "autoplayRequiresMuted",autoplayRequiresMuted);
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
            OvenPlayerConsole.log("IMA : requestAds Complete");
            //two way what ad starts.
            //adsLoader.requestAds(adsRequest); or  adsManager.start();
            //what? why?? wth??
        };


        const checkAutoplaySupport = function () {
            OvenPlayerConsole.log("IMA : checkAutoplaySupport() ");

            let temporarySupportCheckVideo = document.createElement('video');
            temporarySupportCheckVideo.setAttribute('playsinline', 'true');
            temporarySupportCheckVideo.src = TEMP_VIDEO_URL;
            temporarySupportCheckVideo.load();

            //Dash has already loaded when triggered provider.play() always.
            if(isMobile && provider.getName() !== PROVIDER_DASH ){
                //Main video sets user gesture when temporarySupportCheckVideo triggered checking.
                elVideo.load();
            }
            /* Different browser-specific ways to delivery UI to other elements.  My Guess. 2019-06-19
            *   (temporarySupportCheckVideo's User Interaction delivery to elVideo.)
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
                    OvenPlayerConsole.log("IMA : !temporarySupportCheckVideo.play");
                    clearAndReport(true, false);
                    resolve();
                }else{
                    let playPromise = temporarySupportCheckVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(function(){
                            OvenPlayerConsole.log("IMA : auto play allowed.");
                            // If we make it here, unmuted autoplay works.
                            clearAndReport(true, false);
                            resolve();

                        }).catch(function(error){

                            OvenPlayerConsole.log("IMA : auto play failed", error.message);
                            clearAndReport(false, false);
                            resolve();


                            //Disable Muted Play
                            /*temporarySupportCheckVideo.muted = true;
                            temporarySupportCheckVideo.volume = 0;
                            playPromise = temporarySupportCheckVideo.play();

                            playPromise.then(function () {
                                // If we make it here, muted autoplay works but unmuted autoplay does not.

                                OvenPlayerConsole.log("ADS : muted auto play success.");
                                provider.setMute(true);
                                clearAndReport(true, true);
                                resolve();

                            }).catch(function (error) {
                                OvenPlayerConsole.log("ADS : muted auto play failed", error.message);
                                clearAndReport(false, false);
                                resolve();
                            });*/
                        });
                    }else{
                        OvenPlayerConsole.log("IMA : promise not support");
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
                            OvenPlayerConsole.log("IMA : ad start!");
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
                            OvenPlayerConsole.log("IMA : autoplayAllowed : false");
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

            let $ads = LA$(playerConfig.getContainer()).find(".op-ads");
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


export default Ad;

