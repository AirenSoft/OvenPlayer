import CaptionManager from "api/caption/Manager";
import Configurator from "api/Configurator";
import EventEmitter from "api/EventEmitter";
import LazyCommandExecutor from "api/LazyCommandExecutor";
import MediaManager from "api/media/Manager";
import PlaylistManager from "api/playlist/Manager";
import ProviderController from "api/provider/Controller";
import {READY, ERRORS, ERROR, CONTENT_TIME_MODE_CHANGED, INIT_UNKNWON_ERROR, INIT_UNSUPPORT_ERROR, DESTROY, NETWORK_UNSTABLED,
    PLAYER_FILE_ERROR, PROVIDER_DASH, PROVIDER_HLS, PROVIDER_WEBRTC, PROVIDER_HTML5, PROVIDER_RTMP, ALL_PLAYLIST_ENDED} from "api/constants";
import {version} from 'version';
import {ApiRtmpExpansion} from 'api/ApiExpansions';
import {analUserAgent} from "utils/browser";
import LA$ from 'utils/likeA$';

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

const Api = function(container){
    const that = {};
    EventEmitter(that);


    console.log("[[OvenPlayer]] v."+ version);
    OvenPlayerConsole.log("API loaded.");

    let playlistManager = PlaylistManager(that);
    let providerController = ProviderController();
    let userAgentObject = analUserAgent();
    let mediaManager = MediaManager(container, userAgentObject);
    let currentProvider = "";
    let playerConfig = "";
    let lazyQueue = "";
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
            //that.pause();
            lazyQueue = LazyCommandExecutor(that, ['play','seek','stop']);
            playlistManager.setCurrentPlaylist(nextPlaylistIndex);
            initProvider();


            if(!playerConfig.isAutoStart()){
                //Anyway nextplaylist runs autoStart!.
                that.play();
            }
        }else{
            //All Playlist Ended.
            that.trigger(ALL_PLAYLIST_ENDED, null);
        }
    };
    const initProvider = function(lastPlayPosition){
        const pickQualityFromSource = (sources) =>{
            var quality = 0;
            if (sources) {
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i].default) {
                        quality = i;
                    }
                    if (playerConfig.getSourceIndex() === i ) {
                        return i;
                    }
                    /*if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel() ) {
                        return i;
                    }*/
                }
            }
            return quality;
        };

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

            let currentSourceIndex = pickQualityFromSource(playlistManager.getCurrentSources());
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

                that.trigger(name, data);

                if(name === "complete"){
                    runNextPlaylist(playlistManager.getCurrentPlaylistIndex() + 1);
                }

                //Auto switching next source when player load failed by amiss source.
                //data.code === PLAYER_FILE_ERROR
                if( name === ERROR || name === NETWORK_UNSTABLED ){
                    //let currentSourceIndex = that.getCurrentSource();
                    if(playerConfig.getSourceIndex()+1 < that.getSources().length){
                        //this sequential has available source.
                        that.pause();
                        that.setCurrentSource(playerConfig.getSourceIndex()+1);
                    }
                }
            });

        }).then(()=>{

            //provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition).then(function(){
                that.trigger(READY);

                lazyQueue.flush();
                //This is no reason to exist anymore.
                lazyQueue.destroy();

            }).catch((error) => {
                lazyQueue.off();
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

            //xxx : If you init empty sources. (I think this is strange case.)
            //This works for this case.
            //player = OvenPlayer.create("elId", {});
            //player.load(soruces);
            lazyQueue.off();
            //lazyQueue.removeAndExcuteOnce("load");
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
        lazyQueue = LazyCommandExecutor(that, [
            'load','play','pause','seek','stop', 'getDuration', 'getPosition', 'getVolume'
            , 'getMute', 'getBuffer', 'getState' , 'getQualityLevels'
        ]);
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
    };
    that.getProviderName = () => {
        if(currentProvider){
            return currentProvider.getName();
        }else{
            return null;
        }

    }
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
        return currentProvider.getFramerate();
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
        lazyQueue = LazyCommandExecutor(that, ['play','seek','stop']);

        if(playlist){
            if(currentProvider){
                currentProvider.setCurrentQuality(0);
            }
            playlistManager.initPlaylist(playlist, playerConfig);
        }
        return initProvider();

    };
    that.play = () => {
        if(!currentProvider){return null;}
        OvenPlayerConsole.log("API : play() ");
        currentProvider.play();
    }
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

        let sources = currentProvider.getSources();
        let currentSource = sources[currentProvider.getCurrentSource()];
        let newSource = sources[index];
        let lastPlayPosition = currentProvider.getPosition();
        let isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // provider.serCurrentQuality -> playerConfig setting -> load
        let resultSourceIndex = currentProvider.setCurrentSource(index, isSameProvider);

        if(!newSource){
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);


        //switching between streams on HLS. wth? https://video-dev.github.io/hls.js/latest/docs/API.html#final-step-destroying-switching-between-streams
        if(!isSameProvider || currentProvider.getName() === PROVIDER_HLS){
            lazyQueue = LazyCommandExecutor(that, ['play','seek']);
            initProvider(lastPlayPosition);
        }

        return resultSourceIndex;
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
    }

    that.getCaptionList = () => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : getCaptionList() ", captionManager.getCaptionList());
        return captionManager.getCaptionList();
    }
    that.getCurrentCaption = () => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : getCurrentCaption() ", captionManager.getCurrentCaption());
        return captionManager.getCurrentCaption();
    }
    that.setCurrentCaption = (index) => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : setCurrentCaption() ", index);
        captionManager.setCurrentCaption(index);
    }
    that.addCaption = (track) => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : addCaption() ")
        return captionManager.addCaption(track);
    }
    that.removeCaption = (index) => {
        if(!captionManager){return null;}
        OvenPlayerConsole.log("API : removeCaption() ", index)
        return captionManager.removeCaption(index);
    }

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
        if(!currentProvider){return null;}

        OvenPlayerConsole.log("API : remove() ");
        lazyQueue.destroy();
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
        providerController = null;
        playlistManager = null;
        playerConfig = null;
        lazyQueue = null;

        that.trigger(DESTROY);
        that.off();

        OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        OvenPlayerSDK.removePlayer(that.getContainerId());
        if(OvenPlayerSDK.getPlayerList().length  === 0){
            OvenPlayerConsole.log("OvenPlayerSDK.playerList",  OvenPlayerSDK.getPlayerList());
        }
    };

    that.getVersion = () => {
        return "v."+version;
    };

    return that;
};



export default Api;


