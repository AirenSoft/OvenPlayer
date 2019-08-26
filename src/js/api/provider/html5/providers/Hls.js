/**
 * Created by hoho on 2018. 6. 7..
 */
import Provider from "api/provider/html5/Provider";
import {errorTrigger} from "api/provider/utils";
import {PROVIDER_HLS, STATE_IDLE,
    INIT_DASH_UNSUPPORT, ERRORS,
    INIT_HLSJS_NOTFOUND} from "api/constants";
import _ from "utils/underscore";

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */


const HlsProvider = function(element, playerConfig, adTagUrl){
    let that = {};
    let hls = null;
    let superDestroy_func = null;

    try {
        hls = new Hls({
            debug: false,
            maxBufferLength: 20,
            maxMaxBufferLength: 30
        });
        hls.attachMedia(element);

        let spec = {
            name : PROVIDER_HLS,
            element : element,
            mse : hls,
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
            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : "+ lastPlayPosition);
            hls.loadSource(source.file);

            hls.once(Hls.Events.LEVEL_LOADED, function (event, data) {
                if(data.details.live){
                    spec.isLive = true;
                }else{
                    if(lastPlayPosition > 0 ){
                        //element.seek(lastPlayPosition);
                        that.seek(lastPlayPosition);
                    }
                }
                if(playerConfig.isAutoStart()){
                    that.play();
                }
            });


        });

        superDestroy_func = that.super('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

        that.destroy = () =>{
            hls.destroy();
            hls = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");
            superDestroy_func();
        };
    }catch(error){
        let tempError =  ERRORS.codes[INIT_HLSJS_NOTFOUND];
        tempError.error = error;
        throw tempError;
    }

    return that;
};


export default HlsProvider;