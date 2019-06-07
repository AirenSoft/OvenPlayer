/**
 * Created by hoho on 2018. 8. 27..
 */
import {
    ERROR,
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_PAUSED,
    STATE_ERROR,
    CONTENT_COMPLETE,
    CONTENT_SEEK,
    CONTENT_BUFFER_FULL,
    CONTENT_SEEKED,
    CONTENT_BUFFER,
    CONTENT_TIME,
    CONTENT_VOLUME,
    CONTENT_META,
    PLAYER_UNKNWON_ERROR,
    PLAYER_UNKNWON_OPERATION_ERROR,
    PLAYER_UNKNWON_NEWWORK_ERROR,
    PLAYER_UNKNWON_DECODE_ERROR,
    PLAYER_FILE_ERROR,
    PLAYER_STATE,
    PROVIDER_HTML5,
    PROVIDER_WEBRTC,
    PROVIDER_DASH,
    PROVIDER_HLS
} from "api/constants";

const Listener = function(elFlash, provider, videoEndedCallback){
    let that = {};

    that.isJSReady = () =>{
        return true;
    };
    that.timeupdate = (data) =>{

        elFlash.currentTime = data.position;
        provider.trigger(CONTENT_TIME, data);
        //provider.trigger(CONTENT_BUFFER, data);
        //data.duration-1 : this is trick. because sometimes rtmp's position < duration when video ended.
        //2019-06-07 : Do not use duration-1 trick anymore. I improved SWF player.
        /*if(data.position >= (data.duration-1)){
            if(provider.getState() !== STATE_IDLE && provider.getState() !== STATE_COMPLETE){
                if(videoEndedCallback){
                    videoEndedCallback(function(){
                        provider.setState(STATE_COMPLETE);
                    });
                }else{
                    provider.setState(STATE_COMPLETE);
                }

            }
        }*/
    };
    that.volumeChanged = (data) =>{
        provider.trigger(CONTENT_VOLUME, data);
    };
    that.stateChanged = (data) =>{
        provider.setState(data.newstate);
    };
    that.metaChanged = (data) =>{
        provider.trigger(CONTENT_META, data);
    };
    that.error = (error) =>{
        provider.setState(STATE_ERROR);
        provider.pause();

        //PRIVATE_STATE_ERROR
        provider.trigger(ERROR, error);

    };
    return that;

};

export default Listener;