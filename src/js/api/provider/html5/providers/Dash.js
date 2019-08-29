/**
 * Created by hoho on 2018. 6. 14..
 */
import Provider from "api/provider/html5/Provider";
import {errorTrigger} from "api/provider/utils";
import sizeHumanizer from "utils/sizeHumanizer";
import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_AD_PLAYING,
    STATE_AD_PAUSED,
    INIT_DASH_UNSUPPORT,
    INIT_DASH_NOTFOUND,
    ERRORS,
    PLAYER_UNKNWON_NEWWORK_ERROR,
    CONTENT_LEVEL_CHANGED,
    PROVIDER_DASH
} from "api/constants";
import _ from "utils/underscore";

/**
 * @brief   dashjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */
const DASHERROR = {
    DOWNLOAD : "download",
    MANIFESTERROR : "manifestError"
};
const Dash = function(element, playerConfig, adTagUrl){
    let that = {};
    let dash = null;
    let superPlay_func = null;
    let superDestroy_func = null;
    let seekPosition_sec = 0;
    let isFirstError = false;
    let isDashMetaLoaded = false;
    let runedAutoStart = false;

    let sourceOfFile = "";
    try {
        const coveredSetAutoSwitchQualityFor = function(isAuto){
            if(dashjs.Version > "2.9.0"){
                dash.setAutoSwitchQualityFor("video", isAuto);
            }else{
                dash.setAutoSwitchQualityFor(isAuto);
            }
        };
        const coveredGetAutoSwitchQualityFor = function(){
            let result = "";
            if(dashjs.Version > "2.9.0"){
                result = dash.getAutoSwitchQualityFor("video");
            }else{
                result = dash.getAutoSwitchQualityFor();
            }
            return result;
        };
        dash = dashjs.MediaPlayer().create();
        if(dashjs.Version < "2.6.5"){
            throw ERRORS.codes[INIT_DASH_UNSUPPORT];
        }
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(element, null, false);

        if (playerConfig.getConfig().liveDelay && typeof(playerConfig.getConfig().liveDelay) === 'number') {
            dash.setLowLatencyEnabled(true);
            dash.setLiveDelay(playerConfig.getConfig().liveDelay);
        }

        let spec = {
            name : PROVIDER_DASH,
            element : element,
            mse : dash,
            listener : null,
            isLoaded : false,
            canSeek : false,
            isLive : false,
            seeking : false,
            state : STATE_IDLE,
            buffer : 0,
            framerate : 0,
            currentQuality : -1,
            currentSource : -1,
            qualityLevels : [],
            sources : [],
            adTagUrl : adTagUrl
        };

        that = Provider(spec, playerConfig, function(source, lastPlayPosition){
            OvenPlayerConsole.log("DASH : Attach File : ", source, "lastPlayPosition : "+ lastPlayPosition);
            coveredSetAutoSwitchQualityFor(true);

            console.log(source)

            sourceOfFile = source.file;
            dash.attachSource(sourceOfFile);
            seekPosition_sec = lastPlayPosition;

        });
        superPlay_func = that.super('play');
        superDestroy_func = that.super('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function(error){
            if(error && !isFirstError && ( error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR )){
                isFirstError = true;
                let tempError = ERRORS.codes[PLAYER_UNKNWON_NEWWORK_ERROR];
                tempError.error = error;
                errorTrigger(tempError, that);
            }
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function(event){
            if(event && event.mediaType && event.mediaType === "video"){
                that.trigger(CONTENT_LEVEL_CHANGED, {
                    isAuto: coveredGetAutoSwitchQualityFor(),
                    currentQuality: spec.currentQuality,
                    type : "request"
                });
            }
        });
        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function(event){
            if(event && event.mediaType && event.mediaType === "video"){
                spec.currentQuality = event.newQuality;
                that.trigger(CONTENT_LEVEL_CHANGED, {
                    isAuto: coveredGetAutoSwitchQualityFor(),
                    currentQuality: event.newQuality,
                    type : "render"
                });
            }
        });

        dash.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, function(event){

            OvenPlayerConsole.log("DASH : PLAYBACK_METADATA_LOADED  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);

            isDashMetaLoaded = true;
            let subQualityList = dash.getBitrateInfoListFor('video');
            spec.currentQuality = dash.getQualityFor("video");
            for(let i = 0; i < subQualityList.length; i ++){
                if(!_.findWhere(spec.qualityLevels,{bitrate : subQualityList[i].bitrate, height: subQualityList[i].height,width: subQualityList[i].width})){
                    spec.qualityLevels.push({
                        bitrate: subQualityList[i].bitrate,
                        height: subQualityList[i].height,
                        width: subQualityList[i].width,
                        index: subQualityList[i].qualityIndex,
                        label : subQualityList[i].width+"x"+subQualityList[i].height+", "+ sizeHumanizer(subQualityList[i].bitrate, true, "bps")
                    });
                }
            }

            if(seekPosition_sec){
                dash.seek(seekPosition_sec);
                if(!playerConfig.isAutoStart()){
                    that.play();
                }
            }

            if(dash.isDynamic()){
                spec.isLive = true;
            }

            if(playerConfig.isAutoStart() && !runedAutoStart){
                OvenPlayerConsole.log("DASH : AUTOPLAY()!");
                that.play();

                runedAutoStart = true;
            }


        });


        that.play = (mutedPlay) =>{
            let retryCount = 0;
            if(that.getState() === STATE_AD_PLAYING || that.getState() === STATE_AD_PAUSED){

            }else{
                isDashMetaLoaded = false;
                dash.attachView(element);
            }
            //Dash can infinite loading when player is in a paused state for a long time.
            //Then dash always have to reload(attachView) and wait for MetaLoaded event when resume.
            (function checkDashMetaLoaded(){
                retryCount ++;
                if(isDashMetaLoaded){
                    superPlay_func(mutedPlay);
                }else{

                    if(retryCount < 300){
                        setTimeout(checkDashMetaLoaded, 100);
                    }else{
                        that.play();
                    }
                }
            })();

        };

        that.setCurrentQuality = (qualityIndex) => {
            if(that.getState() !== STATE_PLAYING){
                that.play();
            }
            spec.currentQuality = qualityIndex;
            if(coveredGetAutoSwitchQualityFor()){
                coveredSetAutoSwitchQualityFor(false);
            }
            dash.setQualityFor("video", qualityIndex);
            return spec.currentQuality;
        };
        that.isAutoQuality = () => {
            return coveredGetAutoSwitchQualityFor();
        };
        that.setAutoQuality = (isAuto) => {
            coveredSetAutoSwitchQualityFor(isAuto);
        };
        that.destroy = () =>{
            dash.reset();
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");
            superDestroy_func();
        };
    }catch(error){
        if(error && error.code && error.code === INIT_DASH_UNSUPPORT){
            throw error;
        }else{
            let tempError =  ERRORS.codes[INIT_DASH_NOTFOUND];
            tempError.error = error;
            throw tempError;
        }
    }

    return that;
};


export default Dash;
