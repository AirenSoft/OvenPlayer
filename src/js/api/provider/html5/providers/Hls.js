/**
 * Created by hoho on 2018. 6. 7..
 */
import Provider from "api/provider/html5/Provider";
import {errorTrigger} from "api/provider/utils";
import {PROVIDER_HLS, STATE_IDLE} from "api/constants";

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */


const Hls = function(element, playerConfig, adTagUrl){
    let that = {};
    let hls = null;
    let superDestroy_func = null;

    try {
        hls = new Hls({debug: false});
        hls.attachMedia(element);

        let spec = {
            name : PROVIDER_HLS,
            element : element,
            mse : hls,
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
            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : "+ lastPlayPosition);
            hls.loadSource(source.file);

            if(lastPlayPosition > 0){
                element.seek(lastPlayPosition);
                that.play();
            }
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
        throw new Error(error);
    }

    return that;
};


export default Hls;