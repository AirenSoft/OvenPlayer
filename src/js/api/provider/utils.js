/**
 * Created by hoho on 2018. 11. 12..
 */
import { ERROR, STATE_ERROR } from "api/constants";
import _ from "underscore";

export const extractVideoElement = function (elementOrMse) {
    if (_.isElement(elementOrMse)) {
        return elementOrMse;
    }
    if (elementOrMse.getVideoElement) {
        return elementOrMse.getVideoElement();
    } else if (elementOrMse.media) {
        return elementOrMse.media;
    }
    return null;
};

export const separateLive = function (mse) {
    //ToDo : You consider hlsjs. But not now because we don't support hlsjs.

    if (mse && mse.isDynamic) {
        return mse.isDynamic();
    } else {
        return false;
    }
};

export const errorTrigger = function (error, provider) {
    if (provider) {
        provider.setState(STATE_ERROR);
        provider.pause();
        provider.trigger(ERROR, error);
    }

};

export const pickCurrentSource = (sources, playerConfig) => {

    let sourceIndex = 0;

    if (sources) {

        if (playerConfig.getSourceIndex() === -1) {

            for (var i = 0; i < sources.length; i++) {
                if (sources[i].default) {
                    sourceIndex = i;
                    break;
                }
            }
        } else {

            sourceIndex = playerConfig.getSourceIndex();
        }

    }

    return sourceIndex;
}

export function getSeekableStartEnd(mediaElement) {
    let start = mediaElement.seekable.start(0);
    let end = mediaElement.seekable.end(mediaElement.seekable.length - 1);
    return {
        start: start,
        end: end
    };
}
