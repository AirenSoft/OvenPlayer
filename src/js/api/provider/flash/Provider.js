/**
 * Created by hoho on 2018. 8. 23..
 */
import EventEmitter from "api/EventEmitter";
import EventsListener from "api/provider/flash/Listener";
import {extractVideoElement, separateLive, pickCurrentQualityIndex} from "api/provider/utils";
import {
    STATE_IDLE, STATE_PLAYING, STATE_PAUSED, STATE_COMPLETE,
    PLAYER_STATE, PLAYER_COMPLETE, PLAYER_PAUSE, PLAYER_PLAY,
    CONTENT_LEVELS, CONTENT_LEVEL_CHANGED, CONTENT_TIME, CONTENT_CAPTION_CUE_CHANGED,
    PLAYBACK_RATE_CHANGED, CONTENT_MUTE, PROVIDER_HTML5, PROVIDER_WEBRTC, PROVIDER_DASH, PROVIDER_HLS
} from "api/constants";

/**
 * @brief   Core For Flash Video.
 * @param   element flash object element
 * @param   playerConfig  player config
 * */


const Provider = function(spec, playerConfig){
    OvenPlayerConsole.log("CORE loaded. ");

    let that = {};
    EventEmitter(that);

    let listener = EventsListener(spec.extendedElement, that);
    let elFlash = extractVideoElement(spec.extendedElement);

    const _load = (lastPlayPosition) =>{
        const source =  spec.sources[spec.currentQuality];
        OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : "+ lastPlayPosition);
        const previousSource = elFlash.getCurrentSource();
        const sourceChanged = (source.file !== previousSource);

        if (sourceChanged) {
            elFlash.load(source.file);
        }else if(lastPlayPosition === 0 && that.getPosition() > 0){
            that.seek(lastPlayPosition);
        }
        if(lastPlayPosition > 0){
            that.seek(lastPlayPosition);
            that.play();
        }
        that.trigger(CONTENT_LEVELS, {
            currentQuality: spec.currentQuality
        });
    };

    //This is why. Flash does not self trig to ads,lmalm,
    that.triggerEventFromExternal = (funcName, funcData) => {
        if(listener[funcName]){
            return listener[funcName](funcData);
        }else{
            return null;
        }
    };
    that.getName = () => {
        return spec.name;
    };

    that.canSeek = () => {
        return spec.canSeek;
    };
    that.setCanSeek = (canSeek) => {
        spec.canSeek = canSeek;
    };
    that.isSeeking = ()=>{
        return spec.seeking;
    };
    that.setSeeking = (seeking)=>{
        spec.seeking = seeking;
    };

    that.setState = (newState) => {
        spec.state = newState;
    };
    that.getState = () =>{
        return spec.state;
    };
    that.setBuffer = (newBuffer) => {

    };
    that.getBuffer = () => {
        return elFlash.getBuffer ? elFlash.getBuffer() : null;
    };
    that.getDuration = () => {
        return elFlash.getDuration ? elFlash.getDuration() : 0;
    };
    that.getPosition = () => {
        return elFlash.getPosition ? elFlash.getPosition() : 0;
    };
    that.setVolume = (volume) => {
        return elFlash.setVolume ? elFlash.setVolume(volume) : 0;
    };
    that.getVolume = () => {
        return elFlash.setVolume ? elFlash.getVolume() : 0;
    };
    that.setMute = () =>{
        elFlash.setMute();
    };
    that.getMute = () =>{
        return elFlash.getMute ? elFlash.getMute() : false;
    };

    that.preload = (sources, lastPlayPosition) =>{
        OvenPlayerConsole.log("CORE : preload() ", sources, lastPlayPosition);
        let retryCount = 0;

        spec.sources = sources;
        spec.currentQuality = pickCurrentQualityIndex(sources, spec.currentQuality, playerConfig);

        return new Promise(function (resolve, reject) {
            (function checkSwfIsReady(){
                retryCount ++;

                if(elFlash.isFlashReady && elFlash.isFlashReady()){
                    _load(lastPlayPosition || 0);
                    return resolve();
                }else{
                    if(retryCount < 100){
                        setTimeout(checkSwfIsReady, 100);
                    }else{
                        return reject();
                    }
                }

            })();
        });
    };
    that.load = (sources) =>{
        spec.sources = sources;
        spec.currentQuality = pickCurrentQualityIndex(sources, spec.currentQuality, playerConfig);
        _load(spec.sources_.starttime || 0);
    };

    that.play = () =>{
        if(elFlash.play){
            elFlash.play();
        }
    }
    that.pause = () =>{
        if(elFlash.pause){
            elFlash.pause();
        }
    };
    that.seek = (position) =>{
        elFlash.seek(position);
    };
    that.setPlaybackRate = (playbackRate) =>{
        return 0;
    };
    that.getPlaybackRate = () =>{
        return 0;
    };
    that.getQualityLevels = () => {
        let qualityLevels = spec.sources.map(function(source, index) {
            return {
                file: source.file,
                type: source.type,
                label: source.label,
                index : index
            };
        });
        return qualityLevels;
    };
    that.getCurrentQuality = () => {
        var source = spec.sources[spec.currentQuality];
        return {
            file: source.file,
            type: source.type,
            label: source.label,
            index : spec.currentQuality
        };
    };
    that.setCurrentQuality = (qualityIndex, needProviderChange) => {
        if(spec.currentQuality === qualityIndex){
            return false;
        }

        if(qualityIndex > -1){
            if(spec.sources && spec.sources.length > qualityIndex){
                //that.pause();
                that.setState(STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + qualityIndex);
                spec.currentQuality = qualityIndex;

                that.trigger(CONTENT_LEVEL_CHANGED, {
                    currentQuality: qualityIndex
                });

                playerConfig.setQualityLabel(spec.sources[qualityIndex].label);
                if(needProviderChange){

                    _load(elFlash.getCurrentTime() || 0);
                }
                return spec.currentQuality;
            }
        }
    };

    that.stop = () =>{
        OvenPlayerConsole.log("CORE : stop() ");
        elFlash.stop();
    };

    that.destroy = () =>{
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");

        elFlash.remove();
    };

    //XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
    // use : let super_destroy  = that.super('destroy'); ... super_destroy();
    that.super = (name) => {
        const method = that[name];
        return function(){
            return method.apply(that, arguments);
        };
    };
    return that;
};


export default Provider;
