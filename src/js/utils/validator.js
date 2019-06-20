import {extractExtension} from "utils/strings";

export const isRtmp = function (file, type) {
    if(file){
        return (file.indexOf('rtmp:') == 0 || type == 'rtmp');
    }
};
export const isWebRTC = function (file, type) {
    if(file){
        return (file.indexOf('ws:') === 0 || file.indexOf('wss:') === 0 || type === 'webrtc');
    }
    return false;
};
export const isHls = function (file, type) {
    if(file){
        return ( type === 'hls' ||  type === 'm3u8' || type === 'application/vnd.apple.mpegurl' || extractExtension(file) == 'm3u8');

    }
};
export const isDash = function (file, type) {
    if(file){
        return ( type === 'mpd' ||  type === 'dash' || type === 'application/dash+xml' || extractExtension(file) == 'mpd');

    }
};
