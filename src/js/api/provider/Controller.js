import SupportChecker from "api/SupportChecker";
import HTML5 from "api/provider/html5/providers/Html5";
import WebRTC from "api/provider/html5/providers/WebRTC";
import Dash from "api/provider/html5/providers/Dash";
import Hls from "api/provider/html5/providers/Hls";

import {
    PROVIDER_HTML5, PROVIDER_WEBRTC, PROVIDER_DASH, PROVIDER_HLS, PROVIDER_RTMP, ERRORS, INIT_UNSUPPORT_ERROR
} from "api/constants";

/**
 * @brief   This manages provider.
 * @param
 * */
const Controller = function () {
    let supportChacker = SupportChecker();
    const Providers = {};

    const that = {};
    OvenPlayerConsole.log("ProviderController loaded.");

    const registeProvider = (name, provider) => {
        if (Providers[name]) {
            return;
        }
        OvenPlayerConsole.log("ProviderController _registerProvider() ", name);
        Providers[name] = provider;
    };

    const ProviderLoader = {
        html5: function () {

            const provider = HTML5;
            registeProvider(PROVIDER_HTML5, provider);
            return {name: PROVIDER_HTML5, provider: provider};
        },
        webrtc: function () {

            const provider = WebRTC;
            registeProvider(PROVIDER_WEBRTC, provider);
            return {name: PROVIDER_WEBRTC, provider: provider};
        },
        dash: function () {

            const provider = Dash;
            registeProvider(PROVIDER_DASH, provider);
            return {name: PROVIDER_DASH, provider: provider};
        },
        hls: function () {

            const provider = Hls;
            registeProvider(PROVIDER_HLS, provider);
            return {name: PROVIDER_HLS, provider: provider};
        }
    };


    that.loadProviders = (playlistItem) => {
        const supportedProviderNames = supportChacker.findProviderNamesByPlaylist(playlistItem);
        OvenPlayerConsole.log("ProviderController loadProviders() ", supportedProviderNames);
        if (!supportedProviderNames) {
            return Promise.reject(ERRORS.codes[INIT_UNSUPPORT_ERROR]);
        } else {
            return Promise.all(
                supportedProviderNames.filter(function (providerName) {
                    return !!ProviderLoader[providerName];
                }).map(function (providerName) {
                    return ProviderLoader[providerName]();
                })
            );
        }

    };

    that.findByName = (name) => {
        OvenPlayerConsole.log("ProviderController findByName() ", name);
        return Providers[name];
    };

    that.getProviderBySource = (source) => {
        const supportedProviderName = supportChacker.findProviderNameBySource(source);
        OvenPlayerConsole.log("ProviderController getProviderBySource() ", supportedProviderName);
        return that.findByName(supportedProviderName);
    };

    that.isSameProvider = (currentSource, newSource) => {
        OvenPlayerConsole.log("ProviderController isSameProvider() ", supportChacker.findProviderNameBySource(currentSource), supportChacker.findProviderNameBySource(newSource));
        return supportChacker.findProviderNameBySource(currentSource) === supportChacker.findProviderNameBySource(newSource);
    };

    return that;
};

export default Controller;
