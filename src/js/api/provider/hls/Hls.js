/**
 * Created by hoho on 2018. 6. 7..
 */
import CoreProvider from "api/provider/Core";
import {PROVIDER_HLS} from "api/constants";

/**
 * @brief   hlsjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */


const HlsProvider = function(element, playerConfig){
    let hls = "";
    let that = {};
    let super_play = "";
    let super_destroy = "";

    try {
        hls = new Hls({debug: false});
        hls.attachMedia(element);

        const sourceLoaded = (source, lastPlayPosition) => {
            OvenPlayerConsole.log("HLS : source loaded : ", source, "lastPlayPosition : "+ lastPlayPosition);
            hls.loadSource(source.file);
            if(lastPlayPosition > 0){
                element.seek(lastPlayPosition);
                super_play();
            }

        };

        that = CoreProvider(PROVIDER_HLS, hls, playerConfig, onLoad);
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");
        super_play = that.super('play');
        super_destroy = that.super('destroy');


        that.destroy = () =>{
            hls.destroy();
            hls = null;

            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");

            super_destroy();
        };
    }catch(error){
        throw new Error(error);
    }

    return that;
};


export default HlsProvider;
