/**
 * Created by hoho on 2018. 6. 11..
 */
import Provider from "api/provider/html5/Provider";
import WebRTCLoader from "api/provider/html5/providers/WebRTCLoader";
import {isWebRTC} from "utils/validator";
import {errorTrigger} from "api/provider/utils";
import {PROVIDER_WEBRTC, ERROR, PLAYER_STATE, STATE_IDLE, STATE_LOADING} from "api/constants";
import {ERRORS, PLAYER_WEBRTC_TIMEOUT} from "../../../constants";

/**
 * @brief   webrtc provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

const WebRTC = function (element, playerConfig, adTagUrl) {
    let that = {};
    let webrtcLoader = null;
    let superDestroy_func = null;
    let superPlay_func = null;

    let sourceFile = null;

    let audioCtx = null;

    let spec = {
        name: PROVIDER_WEBRTC,
        element: element,
        mse: null,
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

    let connectionTimeout = 10000;
    let timeoutMaxRetry = 0;
    let connectionCheckTimer = null;
    let connected = false;
    let connectionStartTime = null;
    let connectedTime = null;

    const device = () => {
        return {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
            iOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
        }
    };

    const unlockAudio = (audioCtx) => {
        let currentDevice = device();
        let called = false;
        if (currentDevice.isMobile && audioCtx.state === 'suspended') {

            document.addEventListener('touchend', () => {
                if (!called && audioCtx.state !== 'running') {
                    audioCtx.resume();
                    called = true
                }
            })
        }
    };

    function loadWebRTCLoader() {

        if (isWebRTC(sourceFile.file, sourceFile.type)) {

            clearTimeout(connectionCheckTimer);

            OvenPlayerConsole.log("WEBRTC : onBeforeLoad : ", sourceFile);

            if (webrtcLoader) {
                webrtcLoader.destroy();
                webrtcLoader = null;
            }

            const loadCallback = function (stream) {

                if (element.srcObject) {
                    element.srcObject = null;
                }

                if (audioCtx) {
                    audioCtx.close();
                    audioCtx = null;
                }

                element.srcObject = stream;

                if (stream.getAudioTracks().length > 0) {

                    // Add some weird code to avoid the audio delay bug in Safari.
                    // We don't even know why this code solves the audio delay.
                    const AudioContext = window.AudioContext || window.webkitAudioContext;

                    // This code resolves audio delay in MacOS not IOS.
                    audioCtx = new AudioContext();
                    unlockAudio(audioCtx);


                    // This code resolves audio delay in IOS.
                    audioCtx.createMediaStreamSource(stream);
                }

            };

            let internalErrorCallback = null;
            let connectedCallback = null;

            // add callback to check time out
            if (timeoutMaxRetry > 0) {

                internalErrorCallback = function () {

                    clearTimeout(connectionCheckTimer);
                };

                connectedCallback = function () {

                    clearTimeout(connectionCheckTimer);
                    connectedTime = performance.now();
                    connected = true;
                };
            }

            webrtcLoader = WebRTCLoader(
                that,
                sourceFile.file,
                loadCallback,
                connectedCallback,
                internalErrorCallback,
                errorTrigger,
                playerConfig,
                spec
            );

            connectionStartTime = performance.now();
            webrtcLoader.connect();

            // add connection time out checker
            if (timeoutMaxRetry > 0) {

                that.once(PLAYER_STATE, function (e) {

                    if (!connected) {
                        if (e.newstate === STATE_IDLE) {

                            clearTimeout(connectionCheckTimer);
                            destroyWebRtcLoader();
                        }
                    }
                });

                that.once(ERROR, function () {

                    connected = false;
                });

                connectionCheckTimer = setTimeout(function () {

                    if (timeoutMaxRetry > 0) {
                        if (!connected) {

                            destroyWebRtcLoader();
                            loadWebRTCLoader();
                        }
                    } else {
                        destroyWebRtcLoader();
                        let error = ERRORS.codes[PLAYER_WEBRTC_TIMEOUT];
                        errorTrigger(error, that);
                    }

                    timeoutMaxRetry--;

                }, connectionTimeout);
            }
        }
    }

    function destroyWebRtcLoader() {

        if (webrtcLoader) {
            webrtcLoader.destroy();
            webrtcLoader = null;
            element.srcObject = null;
        }
    }

    that = Provider(spec, playerConfig, function (source) {

        const config = playerConfig.getConfig();

        if (config.webrtcConfig) {

            if (typeof config.webrtcConfig.connectionTimeout === 'number'
                    && config.webrtcConfig.connectionTimeout > 0) {

                connectionTimeout = config.webrtcConfig.connectionTimeout;
            }

            if (typeof config.webrtcConfig.timeoutMaxRetry === 'number'
                    && config.webrtcConfig.timeoutMaxRetry > 0) {

                timeoutMaxRetry = config.webrtcConfig.timeoutMaxRetry;
            }
        }

        sourceFile = source;
        loadWebRTCLoader();
    });

    superDestroy_func = that.super('destroy');
    superPlay_func = that.super('play');

    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");

    that.removeStream = () => {
        element.srcObject = null;
    };


    that.destroy = () => {

        clearTimeout(connectionCheckTimer);

        destroyWebRtcLoader();

        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");

        superDestroy_func();

    };

    that.play = () => {

        if (timeoutMaxRetry > 0 && !connected) {

            loadWebRTCLoader();
        }

        superPlay_func();
    };

    return that;
};


export default WebRTC;
