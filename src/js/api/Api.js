import OvenPlayerSDK from "ovenplayer.sdk"
import CaptionManager from "api/caption/Manager";
import Configurator from "api/Configurator";
import EventEmitter from "api/EventEmitter";
import MediaManager from "api/media/Manager";
import PlaylistManager from "api/playlist/Manager";
import ProviderController from "api/provider/Controller";
import {READY, ERRORS, ERROR, CONTENT_COMPLETE, CONTENT_META, INIT_UNKNWON_ERROR, INIT_UNSUPPORT_ERROR, DESTROY, PLAYER_PLAY, NETWORK_UNSTABLED, PLAYER_WEBRTC_NETWORK_SLOW, PLAYER_WEBRTC_UNEXPECTED_DISCONNECT, PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR,
    PLAYER_FILE_ERROR, PROVIDER_DASH, PROVIDER_HLS, PROVIDER_WEBRTC, PROVIDER_HTML5, PROVIDER_RTMP, ALL_PLAYLIST_ENDED} from "api/constants";

import {ApiRtmpExpansion} from 'api/ApiExpansions';
import {analUserAgent} from "utils/browser";
import {pickCurrentSource} from "api/provider/utils";
import {version} from "../version";

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

const Api = function(container){
    const that = {};
    EventEmitter(that);

    OvenPlayerConsole.log("API loaded.");

    let playlistManager = PlaylistManager(that);
    let providerController = ProviderController();
    let userAgentObject = analUserAgent();
    let mediaManager = MediaManager(container, userAgentObject);
    let currentProvider = "";
    let playerConfig = "";
    let captionManager = "";

    const runNextPlaylist = function(index){
        OvenPlayerConsole.log("runNextPlaylist");
        let nextPlaylistIndex = index; // || playlistManager.getCurrentPlaylistIndex() + 1;
        let playlist = playlistManager.getPlaylist();
        let hasNextPlaylist = playlist[nextPlaylistIndex]? true : false;
        //init source index
        playerConfig.setSourceIndex(0);

        //set Golbal Volume info
        playerConfig.setVolume(currentProvider.getVolume());

        if(hasNextPlaylist){

            playlistManager.setCurrentPlaylist(nextPlaylistIndex);
            initProvider();

        }else{
            //All Playlist Ended.
            that.trigger(ALL_PLAYLIST_ENDED, null);
        }
    };
    const initProvider = function(lastPlayPosition){

        return providerController.loadProviders(playlistManager.getCurrentPlayList()).then(Providers => {

            if(Providers.length < 1){
                throw ERRORS.codes[INIT_UNSUPPORT_ERROR];
            }

            if(currentProvider){
                currentProvider.destroy();
                currentProvider = null;
            }

            if(captionManager){
                captionManager.destroy();
                captionManager = null;
            }

            captionManager = CaptionManager(that, playlistManager.getCurrentPlaylistIndex());

            OvenPlayerConsole.log("API : init() captions");

            let currentSourceIndex = pickCurrentSource(playlistManager.getCurrentSources(), playerConfig);
            let providerName = Providers[currentSourceIndex]["name"];
            OvenPlayerConsole.log("API : init() provider", providerName);
            //Init Provider.
            currentProvider =  Providers[currentSourceIndex].provider(
                mediaManager.createMedia(providerName, playerConfig),
                playerConfig,
                playlistManager.getCurrentAdTag()
            );

            if(providerName === PROVIDER_RTMP){
                //If provider type is RTMP, we accepts RtmpExpansion.
                Object.assign(that, ApiRtmpExpansion(currentProvider));
            }

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function(name, data){

                if( name === ERROR) {

                    // Chrome >=80 on Android misses h246 in SDP when first time after web page loaded.
                    // So wait until browser get h264 capabilities and create answer SDP.
                    // if (userAgentObject.os === 'Android' && userAgentObject.browser === 'Chrome') {
                    //
                    //     if (data && data.code && data.code === PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR) {
                    //
                    //         setTimeout(function () {
                    //
                    //             that.setCurrentSource(that.getCurrentSource());
                    //         }, webrtcRetryInterval);
                    //
                    //         return;
                    //     }
                    // }

                    if (playerConfig.getConfig().autoFallback && that.getCurrentSource() + 1 < that.getSources().length) {

                        that.pause();
                        that.setCurrentSource(that.getCurrentSource() + 1);

                        return;
                    }
                }

                if(name === CONTENT_COMPLETE){
                    runNextPlaylist(playlistManager.getCurrentPlaylistIndex() + 1);
                }

                if (name === CONTENT_META) {
                    if (playerConfig.isAutoStart()) {
                        that.play();
                    }
                }

                that.trigger(name, data);
            });

        }).then(()=>{

            //provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition).then(function(){


            }).catch((error) => {

                if(error && error.code && ERRORS.codes[error.code]){
                    that.trigger(ERROR, ERRORS.codes[error.code]);
                }else {
                    let tempError = ERRORS.codes[INIT_UNKNWON_ERROR];
                    tempError.error = error;
                    that.trigger(ERROR, tempError);
                }
            });
        }).catch((error) => {
            //INIT ERROR
            if(error && error.code && ERRORS.codes[error.code]){
                that.trigger(ERROR, ERRORS.codes[error.code]);
            }else {
                let tempError = ERRORS.codes[INIT_UNKNWON_ERROR];
                tempError.error = error;
                that.trigger(ERROR, tempError);
            }
        });
    };


    /**
     * init
     * @param      {object} options player initial option value.
     * @returns
     **/
    that.init = (options) =>{

        if (!options) {
            options = {};
        }

        options.mediaContainer = container;
        options.browser = userAgentObject;
        playerConfig = Configurator(options, that);
        OvenPlayerConsole.log("API : init()");
        OvenPlayerConsole.log("API : init() config : ", playerConfig);

        //Not working : SyntaxError: "ERRORS.codes" is read-only
        ERRORS.codes = playerConfig.getSystemText().api.error;
        //Cool
        //ERRORS.codes.push(playerConfig.getSystemText());

        playlistManager.initPlaylist(playerConfig.getPlaylist(), playerConfig);
        OvenPlayerConsole.log("API : init() sources : " , playlistManager.getCurrentSources());

        initProvider();

        setTimeout(function () {
            that.trigger(READY);
        });
    };
    that.getProviderName = () => {
        if(currentProvider){
            return currentProvider.getName();
        }else{
            return null;
        }

    };
    that.getMseInstance = () => {
        if(currentProvider){
            return currentProvider.getMse();
        }else{
            return null;
        }

    };
    that.getConfig = () => {
        OvenPlayerConsole.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };
    that.getBrowser = () => {

        return playerConfig.getBrowser();
    };
    that.setTimecodeMode = (isShow) =>{
        OvenPlayerConsole.log("API : setTimecodeMode()", isShow);
        playerConfig.setTimecodeMode(isShow);
    };
    that.isTimecodeMode = () => {
        OvenPlayerConsole.log("API : isTimecodeMode()");
        return playerConfig.isTimecodeMode();
    };
    that.getFramerate = () => {
        OvenPlayerConsole.log("API : getFramerate()");

        if (currentProvider) {
            return currentProvider.getFramerate();
        }

    };
    that.seekFrame = (frameCount) => {
        if(!currentProvider){return null;}
        OvenPlayerConsole.log("API : seekFrame()", frameCount);
        return currentProvider.seekFrame(frameCount);
    };

    that.getDuration = () => {
        if(!currentProvider){return null;}
        OvenPlayerConsole.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = () => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = () => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = (volume) => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = (state) => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = () => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : getMute() " + currentProvider.getMute());
        return currentProvider.getMute();
    };
    that.load = (playlist) => {
        OvenPlayerConsole.log("API : load() ", playlist);

        if(playlist){

            playerConfig.setSourceIndex(0);

            if(currentProvider){
                currentProvider.setCurrentQuality(0);
            }

            if ('sources' in playlist) {
                playerConfig.setPlaylist(playlist);
            } else {
                playerConfig.setPlaylist({
                    sources: playlist
                });
            }

            playlistManager.initPlaylist(playerConfig.getPlaylist(), playerConfig);
        }
        return initProvider();

    };
    that.play = () => {
        if(!currentProvider){return null;}
        OvenPlayerConsole.log("API : play() ");

        if (!currentProvider.metaLoaded() && !playerConfig.isAutoStart()) {
            that.once(CONTENT_META, function () {
                currentProvider.play();
            });
        } else {
            currentProvider.play();
        }
    };
    that.pause = () => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : pause() ");
        currentProvider.pause();
    };
    that.seek = (position) => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : seek() "+ position);
        currentProvider.seek(position);
    };
    that.setPlaybackRate = (playbackRate) =>{
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : setPlaybackRate() ", playbackRate);
        return currentProvider.setPlaybackRate(playerConfig.setPlaybackRate(playbackRate));
    };
    that.getPlaybackRate = () =>{
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : getPlaybackRate() ", currentProvider.getPlaybackRate());
        return currentProvider.getPlaybackRate();
    };

    that.getPlaylist = () => {
        OvenPlayerConsole.log("API : getPlaylist() ", playlistManager.getPlaylist());
        return playlistManager.getPlaylist();
    };
    that.getCurrentPlaylist = () => {
        OvenPlayerConsole.log("API : getCurrentPlaylist() ", playlistManager.getCurrentPlaylistIndex());
        return playlistManager.getCurrentPlaylistIndex();
    };
    that.setCurrentPlaylist = (index) => {
        OvenPlayerConsole.log("API : setCurrentPlaylist() ", index);
        runNextPlaylist(index);
    };

    that.getSources = () => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : getSources() ", currentProvider.getSources());
        return currentProvider.getSources();
    };
    that.getCurrentSource = () =>{
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : getCurrentSource() ", currentProvider.getCurrentSource());
        return currentProvider.getCurrentSource();
    };
    that.setCurrentSource = (index) =>{

        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : setCurrentSource() ", index);

        let lastPlayPosition = currentProvider.getPosition();
        playerConfig.setSourceIndex(index);

        initProvider(lastPlayPosition);

        return index;
    };



    that.getQualityLevels = () =>{
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : getQualityLevels() ", currentProvider.getQualityLevels());
        return currentProvider.getQualityLevels();
    };
    that.getCurrentQuality = () =>{
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : getCurrentQuality() ", currentProvider.getCurrentQuality());
        return currentProvider.getCurrentQuality();
    };
    that.setCurrentQuality = (qualityIndex) =>{
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : setCurrentQuality() ", qualityIndex);

        return currentProvider.setCurrentQuality(qualityIndex);
    };
    that.isAutoQuality = () => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : isAutoQuality()");
        return currentProvider.isAutoQuality();
    };
    that.setAutoQuality = (isAuto) => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : setAutoQuality() ", isAuto);
        return currentProvider.setAutoQuality(isAuto);
    };

    that.getCaptionList = () => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : getCaptionList() ", captionManager.getCaptionList());
        return captionManager.getCaptionList();
    };
    that.getCurrentCaption = () => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : getCurrentCaption() ", captionManager.getCurrentCaption());
        return captionManager.getCurrentCaption();
    };
    that.setCurrentCaption = (index) => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : setCurrentCaption() ", index);
        captionManager.setCurrentCaption(index);
    };
    that.addCaption = (track) => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : addCaption() ")
        return captionManager.addCaption(track);
    };
    that.removeCaption = (index) => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : removeCaption() ", index)
        return captionManager.removeCaption(index);
    };

    that.getBuffer = () => {
        if(!currentProvider){return null;}
        OvenPlayerConsole.log("API : getBuffer() ", currentProvider.getBuffer());
        currentProvider.getBuffer();
    };
    that.getState = () => {
        if(!currentProvider){return null;}
        OvenPlayerConsole.log("API : getState() ", currentProvider.getState());
        return currentProvider.getState();
    };
    that.stop = () => {
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : stop() ");
        currentProvider.stop();
    };
    that.remove = () => {

        OvenPlayerConsole.log("API : remove() ");

        if(captionManager){
            captionManager.destroy();
            captionManager = null;
        }

        if(currentProvider){
            currentProvider.destroy();
            currentProvider = null;
        }

        if(mediaManager){
            mediaManager.destroy();
            mediaManager = null;
        }

        that.trigger(DESTROY);
        that.off();

        providerController = null;
        playlistManager = null;
        playerConfig = null;

        OvenPlayerConsole.log("API : remove() - currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        OvenPlayerSDK.removePlayer(that.getContainerId());
        if(OvenPlayerSDK.getPlayerList().length  === 0){
            OvenPlayerConsole.log("OvenPlayerSDK.playerList",  OvenPlayerSDK.getPlayerList());
        }
    };

    that.getVersion = () => {
        return version;
    };

    return that;
};



export default Api;


