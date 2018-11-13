/**
 * Created by hoho on 2018. 11. 12..
 */
import {ERROR, STATE_ERROR} from "api/constants";
import _ from "utils/underscore";

export const extractVideoElement = function(extendedElement) {
    if(_.isElement(extendedElement)){
        return extendedElement;
    }
    if(extendedElement.getVideoElement){
        return extendedElement.getVideoElement();
    }else if(extendedElement.media){
        return extendedElement.media;
    }
    return null;
};

export const separateLive = function(extendedElement) {
    //ToDo : You consider hlsjs. But not now because we don't support hlsjs.

    if(extendedElement.isDynamic){
        return extendedElement.isDynamic();
    }else{
        return false;
    }
};

export const errorTrigger = function(error, provider){
    provider.setState(STATE_ERROR);
    provider.pause();
    provider.trigger(ERROR, error );
};

export const pickCurrentSource = (sources, currentSource, playerConfig) => {
    let sourceIndex = Math.max(0, currentSource);
    const label ="";
    if (sources) {
        for (var i = 0; i < sources.length; i++) {
            if (sources[i].default) {
                sourceIndex = i;
            }
            if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel() ) {
                return i;
            }
        }
    }
    return sourceIndex;
};