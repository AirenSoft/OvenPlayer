import SupportChecker from "api/SupportChecker";
import Promise, {resolved} from "api/shims/promise";

/**
 * @brief   This manages provider.
 * @param
 * */
const Controller = function(){
    let sc = SupportChecker();
    const Providers = {};

    const that = {};
    OvenPlayerConsole.log("ProviderController loaded.");

    const registerProvider = (name, provider) =>{
        if(Providers[name]){
            return ;
        }
        OvenPlayerConsole.log("ProviderController _registerProvider() ", name);
        Providers[name] = provider;
    };

    const ProviderLoader ={
        html5: function() {
            return require.ensure(['api/provider/html5/Html5'], function(require) {
                    const provider = require('api/provider/html5/Html5').default;
                    registerProvider("html5", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.html5'
            );
        },
        webrtc : function(){
            return require.ensure(['api/provider/webrtc/WebRTC'], function(require) {
                    const provider = require('api/provider/webrtc/WebRTC').default;
                    registerProvider("webrtc", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.HlsProvider'
            );
        },
        dash : function(){
            return require.ensure(['api/provider/dash/Dash'], function(require) {
                    const provider = require('api/provider/dash/Dash').default;
                    Providers["dash"] = provider;
                    registerProvider("dash", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.DashProvider'
            );
        },
        hls : function(){
            return require.ensure(['api/provider/hls/Hls'], function(require) {
                    const provider = require('api/provider/hls/Hls').default;
                    registerProvider("hls", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.HlsProvider'
            );
        }
    };
    that.loadProviders = (playlist) =>{
        const supportedProviderNames = sc.findProviderNamesByPlaylist(playlist);
        OvenPlayerConsole.log("ProviderController loadProviders() ", supportedProviderNames);
        return Promise.all(
            supportedProviderNames.filter(function(providerName){
                return !!ProviderLoader[providerName];
            }).map(function(providerName){
                const provider = ProviderLoader[providerName]();
                return provider;
            })
        );
    };

    that.findByName = (name) => {
        OvenPlayerConsole.log("ProviderController findByName() ", name);
        return Providers[name];
    };

    that.getProviderBySource = (source) => {
        const supportedProviderName = sc.findProviderNameBySource(source);
        OvenPlayerConsole.log("ProviderController getProviderBySource() ", supportedProviderName);
        return that.findByName(supportedProviderName);
    };

    that.isSameProvider = (currentSource, newSource) => {
        OvenPlayerConsole.log("ProviderController isSameProvider() ", sc.findProviderNameBySource(currentSource) , sc.findProviderNameBySource(newSource) );
        return sc.findProviderNameBySource(currentSource) == sc.findProviderNameBySource(newSource);

    };

    return that;
};

export default Controller;