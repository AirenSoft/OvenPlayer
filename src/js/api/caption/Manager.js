/**
 * Created by hoho on 2018. 5. 17..
 */
import CaptionLoader from 'api/caption/Loader';
import {READY, ERROR, CONTENT_META, CONTENT_TIME, CONTENT_CAPTION_CUE_CHANGED, CONTENT_CAPTION_CHANGED, PLAYER_CAPTION_ERROR} from "api/constants";
import _ from "utils/underscore";

const isSupport = function(kind){
    return kind === 'subtitles' || kind === 'captions';
};

const Manager = function(api){

    const that = {};
    let captionList = [];
    let currentCaptionIndex = -1;

    let captionLoader = CaptionLoader();
    let isFisrtLoad = true;
    let isShowing = false;


    OvenPlayerConsole.log("Caption Manager >> ");


    let bindTrack = function(track, vttCues){
        track.data = vttCues || [];
        track.name = track.label || track.name || track.language;
        track.id = (function(track, tracksCount) {
            var trackId;
            var prefix = track.kind || 'cc';
            if (track.default || track.defaulttrack) {
                trackId = 'default';

            } else {
                trackId = track.id || (prefix + tracksCount);
            }
            if(isFisrtLoad){
                //This execute only on. and then use flushCaptionList(lastCaptionIndex);
                changeCurrentCaption(captionList.length||0);
                isFisrtLoad = false;

            }
            return trackId;
        })(track, captionList.length);

        captionList.push(track);
        return track.id;
    };
    let changeCurrentCaption = function(index){
        currentCaptionIndex = index;
        api.trigger(CONTENT_CAPTION_CHANGED, currentCaptionIndex);
    };
    if(api.getConfig().playlist && api.getConfig().playlist.length > 0){
        let playlist = api.getConfig().playlist[0];
        if(playlist && playlist.tracks && playlist.tracks.length > 0){
            for(let i = 0; i < playlist.tracks.length; i ++){
                const track = playlist.tracks[i];
                if(isSupport(track.kind) && ! _.findWhere(track, {file : track.file})){
                    //that.flushCaptionList(currentCaptionIndex);

                    captionLoader.load(track, function(vttCues){
                        if(vttCues && vttCues.length > 0){
                            let captionId = bindTrack(track, vttCues);
                        }
                    }, function(error){
                        api.trigger(ERROR, {code : PLAYER_CAPTION_ERROR, reason : "caption load error.", message : "caption load error.", error : error});
                    });
                }
            }

        }
    }

    api.on(CONTENT_TIME, function(meta){
        let position = meta.position;
        if(currentCaptionIndex > -1 && captionList[currentCaptionIndex]){
            let currentCues = _.filter(captionList[currentCaptionIndex].data, function (cue) {
                return position >= (cue.startTime) && ( (!cue.endTime || position) <= cue.endTime);
            });
            if(currentCues && currentCues.length > 0){
                api.trigger(CONTENT_CAPTION_CUE_CHANGED, currentCues[0]);
            }
        }

    });
    that.flushCaptionList = (lastCaptionIndex) =>{
        captionList = [];
        changeCurrentCaption(lastCaptionIndex);
        //currentCaptionIndex = lastCaptionIndex;
    };
    that.getCaptionList = () =>{
        return captionList||[];
    };
    that.getCurrentCaption = () =>{
        return currentCaptionIndex;
    };
    that.setCurrentCaption = (_index) =>{
        if(_index > -2 && _index < captionList.length){
            changeCurrentCaption(_index);
        }else{
            return null;
        }
    };
    that.addCaption = (track) =>{
        if(isSupport(track.kind) && ! _.findWhere(captionLoader, {file : track.file})){
            captionLoader.load(track, function(vttCues){
                if(vttCues && vttCues.length > 0){
                    bindTrack(track, vttCues);
                }
            }, function(error){
                api.trigger(ERROR, {code : PLAYER_CAPTION_ERROR, reason : "caption load error.", message : "caption load error.", error : error});
            });
        }
    };
    that.removeCaption = (index) => {
        if(index > -1 && index < captionList.length){
            captionList.splice(index, 1);
            return captionList;
        }else{
            return null;
        }
    };
    that.destroy = () => {
        captionList = [];
        api.off(CONTENT_TIME, null, that);
    };

    return that;
};




export default Manager;
