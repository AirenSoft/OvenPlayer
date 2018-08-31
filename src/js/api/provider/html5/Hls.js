/**
 * Created by hoho on 2018. 6. 7..
 */
import MediaManager from "api/media/Manager";
import Provider from "api/provider/html5/Provider";
import {PROVIDER_HLS} from "api/constants";

/**
 * @brief   hlsjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */


const Hls = function(container, playerConfig){

    let mediaManager = MediaManager(container, PROVIDER_HLS);
    let element = mediaManager.create();

    let hls = "";
    let that = {};
    let super_play = "", super_destroy = "";

    try {
        hls = new Hls({debug: false});
        hls.attachMedia(element);

        const onBeforeLoad = (source, lastPlayPosition) => {
            OvenPlayerConsole.log("HLS : onBeforeLoad : ", source, "lastPlayPosition : "+ lastPlayPosition);
            hls.loadSource(source.file);
            if(lastPlayPosition > 0){
                element.seek(lastPlayPosition);
                super_play();
            }

        };

        that = Provider(PROVIDER_HLS, hls, playerConfig, onBeforeLoad);
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");
        super_play = that.super('play');
        super_destroy = that.super('destroy');


        that.destroy = () =>{
            hls.destroy();
            hls = null;
            mediaManager.destroy();
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");

            super_destroy();
        };
    }catch(error){
        throw new Error(error);
    }

    return that;
};


export default Hls;