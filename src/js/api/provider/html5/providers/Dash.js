/**
 * Created by hoho on 2018. 6. 14..
 */
import MediaManager from "api/media/Manager";
import Provider from "api/provider/html5/Provider";
import {errorTrigger} from "api/provider/utils";
import {STATE_IDLE, PLAYER_UNKNWON_NEWWORK_ERROR, PROVIDER_DASH, CONTENT_META} from "api/constants";

/**
 * @brief   dashjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */
const DASHERROR = {
    DOWNLOAD : "download",
    MANIFESTERROR : "manifestError"
};
const Dash = function(container, playerConfig){
    let that = {};
    let dash = null;
    let superDestroy_func = null;
    let seekPosition_sec = 0;
    let isFirstError = false;

    let mediaManager = MediaManager(container, PROVIDER_DASH);
    let element =  mediaManager.create();

    try {
        dash = dashjs.MediaPlayer().create();
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(element, null, false);

        let spec = {
            name : PROVIDER_DASH,
            extendedElement : dash,
            listener : null,
            canSeek : false,
            isLive : false,
            seeking : false,
            state : STATE_IDLE,
            buffer : 0,
            currentQuality : -1,
            sources : []
        };

        that = Provider(spec, playerConfig, function(source, lastPlayPosition){
            OvenPlayerConsole.log("DASH : onExtendedLoad : ", source, "lastPlayPosition : "+ lastPlayPosition);
            dash.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        });
        superDestroy_func = that.super('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function(error){
            if(error && !isFirstError && ( error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR )){
                isFirstError = true;
                errorTrigger({code : PLAYER_UNKNWON_NEWWORK_ERROR, reason : "Unknown network error", message : "Unknown network error"}, that);
            }
        });
        that.on(CONTENT_META, function(meta){
            OvenPlayerConsole.log("GetStreamInfo  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);
            let currentSource = spec.sources[spec.currentQuality];
            let subQualityList = dash.getBitrateInfoListFor('video');
            currentSource.metaQuality = [];
            for(let i = 0; i < subQualityList.length; i ++){
                currentSource.metaQuality.push({
                    bitrate: subQualityList[i].bitrate,
                    height: subQualityList[i].height,
                    width: subQualityList[i].width,
                    qualityIndex: subQualityList[i].qualityIndex,
                    title : subQualityList[i].height+" p"
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

        that.destroy = () =>{
            dash.reset();
            mediaManager.destroy();
            mediaManager = null;
            element = null;
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");

            superDestroy_func();
        };
    }catch(error){
        throw new Error(error);
    }

    return that;
};


export default Dash;
