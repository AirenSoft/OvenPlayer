/**
 * Created by hoho on 2018. 6. 14..
 */
import Provider from "api/provider/html5/Provider";
import {errorTrigger} from "api/provider/utils";
import sizeHumanizer from "utils/sizeHumanizer";
import {STATE_IDLE, ERRORS, PLAYER_UNKNWON_NEWWORK_ERROR, CONTENT_LEVEL_CHANGED,  STATE_PLAYING, PROVIDER_DASH, CONTENT_META} from "api/constants";

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
    let superDestroy_func = null;
    let seekPosition_sec = 0;
    let isFirstError = false;

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
            throw ERRORS[103];
        }
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(element, null, false);

        let spec = {
            name : PROVIDER_DASH,
            element : element,
            mse : dash,
            listener : null,
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
            OvenPlayerConsole.log("DASH : onExtendedLoad : ", source, "lastPlayPosition : "+ lastPlayPosition);
            coveredSetAutoSwitchQualityFor(true);
            dash.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;

        });
        superDestroy_func = that.super('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function(error){
            if(error && !isFirstError && ( error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR )){
                isFirstError = true;
                let tempError = ERRORS[PLAYER_UNKNWON_NEWWORK_ERROR];
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

        that.on(CONTENT_META, function(meta){
            OvenPlayerConsole.log("GetStreamInfo  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);

            let subQualityList = dash.getBitrateInfoListFor('video');
            spec.currentQuality = dash.getQualityFor("video");
            for(let i = 0; i < subQualityList.length; i ++){
                spec.qualityLevels.push({
                    bitrate: subQualityList[i].bitrate,
                    height: subQualityList[i].height,
                    width: subQualityList[i].width,
                    index: subQualityList[i].qualityIndex,
                    label : subQualityList[i].width+"x"+subQualityList[i].height+", "+ sizeHumanizer(subQualityList[i].bitrate, true, "bps")
                });
            }

            if(dash.isDynamic()){
                that.play();
            }else{
                if(seekPosition_sec){
                    dash.seek(seekPosition_sec);
                    that.play();
                }
            }
        }, that);
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
        if(error.code && error.message){
            throw error;
        }else{
            throw new Error(error);
        }

    }

    return that;
};


export default Dash;
