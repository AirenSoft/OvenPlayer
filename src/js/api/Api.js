//import CaptionManager from "api/caption/Manager";
import Configurator from "api/Configurator";
import EventEmitter from "api/EventEmitter";
import LazyCommandExecutor from "api/LazyCommandExecutor";
import LogManager from "utils/logger";
import PlaylistManager from "api/playlist/Manager";
import ProviderController from "api/provider/Controller";
import {READY, ERROR, INIT_ERROR, DESTROY, NETWORK_UNSTABLED, PLAYER_FILE_ERROR, PROVIDER_DASH, PROVIDER_HLS, PROVIDER_WEBRTC, PROVIDER_HTML5, PROVIDER_RTMP} from "api/constants";
import {version} from 'version';
import {ApiRtmpExpansion} from 'api/ApiExpansions';

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

const Api = function(container){
    let logManager = LogManager();
    const that = {};
    EventEmitter(that);

    OvenPlayerConsole.log("[[OvenPlayer]] v."+ version);
    OvenPlayerConsole.log("API loaded.");
    //let captionManager = CaptionManager(that);
    let playlistManager = PlaylistManager();
    let providerController = ProviderController();
    let currentProvider = "";
    let playerConfig = "";
    let lazyQueue = "";

    const initProvider = function(lastPlayPosition){
        const pickQualityFromSource = (sources) =>{
            var quality = 0;
            if (sources) {
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i].default) {
                        quality = i;
                    }
                    if (playerConfig.getQualityLabel() && sources[i].label === playerConfig.getQualityLabel() ) {
                        return i;
                    }
                }
            }
            return quality;
        };

        return providerController.loadProviders(playlistManager.getPlaylist()).then(Providers => {
            if(currentProvider){
                currentProvider.destroy();
                currentProvider = null;
            }

            let currentSourceIndex = pickQualityFromSource(playlistManager.getCurrentSources());
            OvenPlayerConsole.log( "current source index : "+ currentSourceIndex);

            //Call Provider.
            currentProvider = Providers[currentSourceIndex](container, playerConfig);

            if(currentProvider.getName() === PROVIDER_RTMP){
                //If provider type is RTMP, we accepts RtmpExpansion.
                Object.assign(that, ApiRtmpExpansion(currentProvider));
            }

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function(name, data){

                that.trigger(name, data);

                //Auto next source when player load was fail by amiss source.
                //data.code === PLAYER_FILE_ERROR
                if( (name === ERROR && (parseInt(data.code/100) === 3 || parseInt(data.code/100) === 5))|| name === NETWORK_UNSTABLED ){
                    let currentQuality = that.getCurrentQuality();
                    if(currentQuality.index+1 < that.getQualityLevels().length){
                        //this sequential has available source.
                        that.pause();

                        that.setCurrentQuality(currentQuality.index+1);
                    }
                }
            });

        }).then(()=>{

            //provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition ).then(function(){
                lazyQueue.flush();
                //This is no reason to exist anymore.
                lazyQueue.destroy();

                that.trigger(READY);
            }).catch((error) => {
                const errorObject = {code : INIT_ERROR, reason : "init error.", message : "Player init error.", error : error};
                that.trigger(ERROR, errorObject);
            });
        }).catch((error) => {
            const errorObject = {code : INIT_ERROR, reason : "init error.", message : "Player init error.", error : error};
            that.trigger(ERROR, errorObject);

            //xxx : If you init empty sources. (I think this is strange case.)
            //This works for this case.
            //player = OvenPlayer.create("elId", {});
            //player.load(soruces);
            lazyQueue.removeAndExcuteOnce("load");
        });
    };


    /**
     * API 초기화 함수
     * init
     * @param      {object} options player initial option value.
     * @returns
     **/
    that.init = (options) =>{
        //It collects the commands and executes them at the time when they are executable.
        lazyQueue = LazyCommandExecutor(that, ['load','play','pause','seek','stop', 'getDuration', 'getPosition', 'getVolume', 'getMute', 'getBuffer', 'getState']);
        playerConfig = Configurator(options);
        if(!playerConfig.isDebug()){
            logManager.disable();
        }
        OvenPlayerConsole.log("API : init()");
        OvenPlayerConsole.log("API : init() config : ", playerConfig);

        playlistManager.setPlaylist(playerConfig.getPlaylist());
        OvenPlayerConsole.log("API : init() sources : " , playlistManager.getCurrentSources());
        initProvider();
    };

    /*that.getContainerId = () =>{
        return container.id;
    };*/

    that.getConfig = () => {
        OvenPlayerConsole.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };

    that.getDuration = () => {
        if(!currentProvider){return;}
        OvenPlayerConsole.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = () => {
        if(!currentProvider){return;}
        OvenPlayerConsole.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = () => {
        if(!currentProvider){return;}
        OvenPlayerConsole.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = (volume) => {
        if(!currentProvider){return;}
        OvenPlayerConsole.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = (state) => {
        if(!currentProvider){return;}
        OvenPlayerConsole.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = () => {
        if(!currentProvider){return;}
        OvenPlayerConsole.log("API : getMute() " + currentProvider.getMute());
        return currentProvider.getMute();
    };
    that.load = (playlist) => {
        OvenPlayerConsole.log("API : load() ", playlist);
        lazyQueue = LazyCommandExecutor(that, ['play','seek','stop']);

        if(playlist){
            if(currentProvider){
                currentProvider.setCurrentQuality(0);
            }
            playlistManager.setPlaylist(playlist);
        }
        return initProvider();

    };
    that.play = () => {
        OvenPlayerConsole.log("API : play() ");
        currentProvider.play();
    }
    that.pause = () => {
        OvenPlayerConsole.log("API : pause() ");
        currentProvider.pause();
    };
    that.seek = (position) => {
        OvenPlayerConsole.log("API : seek() "+ position);
        currentProvider.seek(position);
    };
    that.setPlaybackRate = (playbackRate) =>{
        OvenPlayerConsole.log("API : setPlaybackRate() ", playbackRate);
        return currentProvider.setPlaybackRate(playerConfig.setDefaultPlaybackRate(playbackRate));
    };
    that.getPlaybackRate = () =>{
        OvenPlayerConsole.log("API : getPlaybackRate() ", currentProvider.getPlaybackRate());
        return currentProvider.getPlaybackRate();
    };
    that.getQualityLevels = () =>{
        OvenPlayerConsole.log("API : getQualityLevels() ", currentProvider.getQualityLevels());
        return currentProvider.getQualityLevels();
    };
    that.getCurrentQuality = () =>{
        OvenPlayerConsole.log("API : getCurrentQuality() ", currentProvider.getCurrentQuality());
        return currentProvider.getCurrentQuality();
    };
    that.setCurrentQuality = (qualityIndex) =>{
        OvenPlayerConsole.log("API : setCurrentQuality() ", qualityIndex);

        let sources = playlistManager.getCurrentSources();
        let currentSource = sources[that.getCurrentQuality().index];
        let newSource = sources[qualityIndex];
        let lastPlayPosition = that.getPosition();
        let isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // provider.serCurrentQuality -> playerConfig setting -> load
        let resQualityIndex = currentProvider.setCurrentQuality(qualityIndex, isSameProvider);

        if(!newSource){
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);

        //captionManager.flushCaptionList(captionManager.getCurrentCaption());

        if(!isSameProvider){
            lazyQueue = LazyCommandExecutor(that, ['play']);
            initProvider(lastPlayPosition);
        }

        return resQualityIndex;
    };

    /* Captions : This is not supported in the current version.*/
    /*that.setCurrentCaption = (index) =>{
     return captionManager.setCurrentCaption(index);
     }
     that.getCurrentCaption = () =>{
     return captionManager.getCurrentCaption();
     }
     that.getCaptionList = () => {
     return captionManager.getCaptionList();
     }
     that.addCaption = (track) => {
     return captionManager.addCaption();
     }
     that.getCaptionList = () => {
     return captionManager.getCaptionList();
     }*/

    that.getBuffer = () => {
        OvenPlayerConsole.log("API : getBuffer() ", currentProvider.getBuffer());
        currentProvider.getBuffer();
    };
    that.getState = () => {
        if(!currentProvider){return;}
        OvenPlayerConsole.log("API : getState() ", currentProvider.getState());
        return currentProvider.getState();
    };
    that.stop = () => {
        OvenPlayerConsole.log("API : stop() ");
        currentProvider.stop();
    };
    that.remove = () => {
        OvenPlayerConsole.log("API : remove() ");
        lazyQueue.destroy();
        if(currentProvider){
            currentProvider.destroy();
            currentProvider = null;
        }
        providerController = null;
        playlistManager = null;
        playerConfig = null;
        lazyQueue = null;

        that.trigger(DESTROY);
        that.off();

        OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        logManager.destroy();
        logManager = null;
        OvenPlayerSDK.removePlayer(that.getContainerId());
    };



    return that;
};



export default Api;


