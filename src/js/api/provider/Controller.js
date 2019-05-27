import SupportChecker from "api/SupportChecker";
import {ApiRtmpExpansion} from 'api/ApiExpansions';
import {
    ERRORS, INIT_UNSUPPORT_ERROR
} from "api/constants";

/**
 * @brief   This manages provider.
 * @param
 * */
const Controller = function(){
    let supportChacker = SupportChecker();
    const Providers = {};

    const that = {};
    OvenPlayerConsole.log("ProviderController loaded.");

    const registeProvider = (name, provider) =>{
        if(Providers[name]){
            return ;
        }
        OvenPlayerConsole.log("ProviderController _registerProvider() ", name);
        Providers[name] = provider;
    };

    const ProviderLoader ={
        html5: function() {
            return require.ensure(['api/provider/html5/providers/Html5'], function(require) {
                    const provider = require('api/provider/html5/providers/Html5').default;
                    registeProvider("html5", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.Html5'
            );
        },
        webrtc : function(){
            return require.ensure(['api/provider/html5/providers/WebRTC'], function(require) {
                    const provider = require('api/provider/html5/providers/WebRTC').default;
                    registeProvider("webrtc", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.WebRTCProvider'
            );
        },
        dash : function(){
            return require.ensure(['api/provider/html5/providers/Dash'], function(require) {
                    const provider = require('api/provider/html5/providers/Dash').default;
                    registeProvider("dash", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.DashProvider'
            );
        },
        hls : function(){
            return require.ensure(['api/provider/html5/providers/Hls'], function(require) {
                    const provider = require('api/provider/html5/providers/Hls').default;
                    registeProvider("hls", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.HlsProvider'
            );
        },
        rtmp : function(){
            return require.ensure(['api/provider/flash/providers/Rtmp'], function(require) {
                    const provider = require('api/provider/flash/providers/Rtmp').default;
                    registeProvider("rtmp", provider);
                    return provider;
                }, function(err){
                    throw new Error('Network error');
                },'ovenplayer.provider.RtmpProvider'
            );
        }
    };


    that.loadProviders = (playlistItem) =>{
        const supportedProviderNames = supportChacker.findProviderNamesByPlaylist(playlistItem);
        OvenPlayerConsole.log("ProviderController loadProviders() ", supportedProviderNames);
        if(!supportedProviderNames){
            return Promise.reject(ERRORS[INIT_UNSUPPORT_ERROR]);
        }else{
            return Promise.all(
                supportedProviderNames.filter(function(providerName){
                    return !!ProviderLoader[providerName];
                }).map(function(providerName){
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
        OvenPlayerConsole.log("ProviderController isSameProvider() ", supportChacker.findProviderNameBySource(currentSource) , supportChacker.findProviderNameBySource(newSource) );
        return supportChacker.findProviderNameBySource(currentSource) === supportChacker.findProviderNameBySource(newSource);
    };

    return that;
};

export default Controller;
