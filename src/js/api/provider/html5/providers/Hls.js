/**
 * Created by hoho on 2018. 6. 7..
 */
import Provider from "api/provider/html5/Provider";
import {errorTrigger} from "api/provider/utils";
import {
    PROVIDER_HLS,
    PLAYER_STATE, STATE_IDLE, STATE_LOADING,
    INIT_DASH_UNSUPPORT, ERRORS,
    INIT_HLSJS_NOTFOUND,
    HLS_PREPARED,
    HLS_DESTROYED
} from "api/constants";
import _ from "utils/underscore";
import {
    PLAYER_UNKNWON_ERROR,
    PLAYER_UNKNWON_NETWORK_ERROR,
    PLAYER_UNKNWON_DECODE_ERROR,
    PLAYER_BAD_REQUEST_ERROR,
    PLAYER_AUTH_FAILED_ERROR,
    PLAYER_NOT_ACCEPTABLE_ERROR, DASH_PREPARED, DASH_DESTROYED
} from "../../../constants";

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */


const HlsProvider = function (element, playerConfig, adTagUrl) {
    let that = {};
    let hls = null;
    let superStop_func = null;
    let superDestroy_func = null;
    let loadRetryer = null;
    let isManifestLoaded = false;
    let firstLoaded = false;


    try {

        let hlsConfig = {
            debug: false,
            maxBufferLength: 20,
            maxMaxBufferLength: 30
        };

        let hlsConfigFromPlayerConfig = playerConfig.getConfig().hlsConfig;

        if (hlsConfigFromPlayerConfig) {

            for (let key in hlsConfigFromPlayerConfig) {
                hlsConfig[key] = hlsConfigFromPlayerConfig[key];
            }
        }

        hls = new Hls(hlsConfig);

        window.op_hls = hls;

        hls.attachMedia(element);

        let spec = {
            name: PROVIDER_HLS,
            element: element,
            mse: hls,
            listener: null,
            isLoaded: false,
            canSeek: false,
            isLive: false,
            seeking: false,
            state: STATE_IDLE,
            buffer: 0,
            framerate: 0,
            currentQuality: -1,
            currentSource: -1,
            qualityLevels: [],
            sources: [],
            adTagUrl: adTagUrl
        };

        that = Provider(spec, playerConfig, function (source, lastPlayPosition) {

            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);

            that.trigger(HLS_PREPARED, hls);

            hls.loadSource(source.file);

            hls.once(Hls.Events.MANIFEST_LOADED, function (event, data) {

                isManifestLoaded = true;
            });

            hls.once(Hls.Events.LEVEL_LOADED, function (event, data) {

                firstLoaded = true;

                if (loadRetryer) {
                    clearTimeout(loadRetryer);
                    loadRetryer = null;
                }

                if (data.details.live) {
                    spec.isLive = true;
                } else {

                    if (lastPlayPosition && lastPlayPosition >= 0) {
                        that.seek(lastPlayPosition);
                    }
                }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                if (data && data.networkDetails && data.networkDetails.status === 202) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    that.setState(STATE_LOADING);

                    loadRetryer = setTimeout(function () {

                        if (hls) {

                            that.stop();
                            hls.stopLoad();
                            hls.loadSource(source.file);
                        }

                    }, 1000);

                    return;
                }

                if (!data.fatal) {
                    // do nothing when non fatal error. hlsjs will recover it automatically.
                    return;
                }

                let errorType = PLAYER_UNKNWON_NETWORK_ERROR;

                if (data && data.networkDetails && data.networkDetails.status === 400) {
                    errorType = PLAYER_BAD_REQUEST_ERROR;
                } else if (data && data.networkDetails && data.networkDetails.status === 403) {
                    errorType = PLAYER_AUTH_FAILED_ERROR;
                } else if (data && data.networkDetails && data.networkDetails.status === 406) {
                    errorType = PLAYER_NOT_ACCEPTABLE_ERROR;
                }

                let tempError = ERRORS.codes[errorType];
                tempError.error = data.details;
                errorTrigger(tempError, that);
            });

            that.on(PLAYER_STATE, function (data) {

                if (!firstLoaded && data.prevstate === STATE_LOADING && data.newstate === STATE_IDLE) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    if (hls) {

                        hls.stopLoad();
                    }
                }
            });
        });

        superDestroy_func = that.super('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

        superStop_func = that.super('stop');

        that.stop = () => {

            if (loadRetryer) {

                clearTimeout(loadRetryer);
                loadRetryer = null;
            }

            if (hls) {
                hls.stopLoad();
            }

            superStop_func();
        };

        that.destroy = () => {

            if (loadRetryer) {

                clearTimeout(loadRetryer);
                loadRetryer = null;
            }

            if (hls) {

                hls.destroy();

                that.trigger(HLS_DESTROYED);
            }

            hls = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");
            superDestroy_func();
        };
    } catch (error) {
        let tempError = ERRORS.codes[INIT_HLSJS_NOTFOUND];
        tempError.error = error;
        throw tempError;
    }

    return that;
};


export default HlsProvider;