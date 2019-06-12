import {isRtmp, isWebRTC, isDash, isHls} from "utils/validator";
import {analUserAgent} from "utils/browser";
/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */

const SupportChecker = function(){
    const that = {};
    OvenPlayerConsole.log("SupportChecker loaded.");
    let userAgentObject = analUserAgent();

    const supportList = [
        {
            name: 'html5',
            checkSupport: function (source) {
                const MimeTypes = {
                    aac: 'audio/mp4',
                    mp4: 'video/mp4',
                    f4v: 'video/mp4',
                    m4v: 'video/mp4',
                    mov: 'video/mp4',
                    mp3: 'audio/mpeg',
                    mpeg: 'audio/mpeg',
                    ogv: 'video/ogg',
                    ogg: 'video/ogg',
                    oga: 'video/ogg',
                    vorbis: 'video/ogg',
                    webm: 'video/webm',
                    f4a: 'video/aac',
                    m3u8: 'application/vnd.apple.mpegurl',
                    m3u: 'application/vnd.apple.mpegurl',
                    hls: 'application/vnd.apple.mpegurl'
                };

                const video = function(){
                    return document.createElement('video')
                }();
                if (!video.canPlayType) {
                    return false;
                }


                const file = source.file;
                const type = source.type;

                if(!type){return false;}
                const mimeType = source.mimeType || MimeTypes[type];

                if(isHls(file, type) && userAgentObject.browser === "Microsoft Edge" ){
                    //Edge supports hls native but that's sucks.
                    return false;
                }

                if (isRtmp(file, type)) {
                    return false;
                }

                if(isWebRTC(file, type)){
                    return false;
                }

                if (!mimeType) {
                    return false;
                }

                return !!video.canPlayType(mimeType);
            }
        },
        {
            name: 'webrtc',
            checkSupport: function (source) {
                const video = function(){
                    return document.createElement('video')
                }();
                if (!video.canPlayType) {
                    return false;
                }
                if (isRtmp(file, type)) {
                    return false;
                }

                const file = source.file;
                const type = source.type;

                if(isWebRTC(file, type)){
                    return true;
                }else{
                    return false;
                }
            }
        },
        {
            name: 'dash',
            checkSupport: function (source) {
                const file = source.file;

                const type = source.type;
                if (isRtmp(file, type)) {
                    return false;
                }

                if (typeof ( window.MediaSource || window.WebKitMediaSource ) === "function" && isDash(file, type)) {
                    return true;
                }else{
                    return false;
                }
            }
        },
        {
            name: 'hls',
            checkSupport: function (source) {
                const video = function(){
                    return document.createElement('video')
                }();
                const file = source.file;
                const type = source.type;
                if (isRtmp(file, type)) {
                    return false;
                }

                //this method from hls.js
                const isHlsSupport = () =>{
                     function getMediaSource() {
                        if (typeof window !== 'undefined') {
                            return window.MediaSource || window.WebKitMediaSource;
                        }
                    }
                    var mediaSource = getMediaSource();
                    var sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
                    var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

                    // if SourceBuffer is exposed ensure its API is valid
                    // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
                    var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
                    return !!isTypeSupported && !!sourceBufferValidAPI;
                };
                //Remove this '!!video.canPlayType('application/vnd.apple.mpegurl')' if you want to use hlsjs.
                //Yes I need hlsjs. 2019-06-12 && !!video.canPlayType('application/vnd.apple.mpegurl');
                return isHlsSupport();
            }
        },
        {
            name: 'rtmp',
            checkSupport: function (source) {
                const file = source.file;
                const type = source.type;
                function testFlash() {

                    var support = false;

                    //IE only
                    if("ActiveXObject" in window) {

                        try{
                            support = !!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"));
                        }catch(e){
                            support = false;
                        }

                        //W3C, better support in legacy browser
                    } else {

                        support = !!navigator.mimeTypes['application/x-shockwave-flash'];

                    }

                    return support;

                }
                function checkSupport(){
                    if(userAgentObject.browser === "Microsoft Edge" || userAgentObject.os === "Android" || userAgentObject.os === "iOS"  || userAgentObject.browser === "Safari"){
                        return false;
                    }else{
                        return true;
                    }
                }
                if (isRtmp(file, type) && testFlash() && checkSupport()) {
                    return true;
                }else{
                    return false;
                }
            }
        }
    ];

    that.findProviderNameBySource = (soruce_) => {
        OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()", soruce_);
        const source = (soruce_ === Object(soruce_)) ? soruce_ : {};
        for(var i = 0; i < supportList.length; i ++){
            if(supportList[i].checkSupport(source)){
                return supportList[i].name;
            }
        }
    };
    that.findProviderNamesByPlaylist = (playlistItem) => {
        OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()", playlistItem);
        let supportNames = [];
        /*for (let i = playlist_.length; i--;) {


        }*/
        const item = playlistItem;

        if(item && item.sources){
            for(let j = 0; j < item.sources.length; j ++){
                let source = item.sources[j];
                if (source) {
                    const supported = that.findProviderNameBySource(source);
                    if (supported) {
                        supportNames.push(supported);
                    }
                }
            }

            return supportNames;
        }
        return null;

    };
    return that;
};

export default SupportChecker;
