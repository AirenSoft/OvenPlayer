/**
 * Created by hoho on 2018. 11. 12..
 */
import {ERROR, STATE_ERROR} from "api/constants";
import _ from "utils/underscore";

export const extractVideoElement = function(elementOrMse) {
    if(_.isElement(elementOrMse)){
        return elementOrMse;
    }
    if(elementOrMse.getVideoElement){
        return elementOrMse.getVideoElement();
    }else if(elementOrMse.media){
        return elementOrMse.media;
    }
    return null;
};

export const separateLive = function(mse) {
    //ToDo : You consider hlsjs. But not now because we don't support hlsjs.

    if(mse && mse.isDynamic){
        return mse.isDynamic();
    }else{
        return false;
    }
};

export const errorTrigger = function(error, provider){
    if(provider){
        provider.setState(STATE_ERROR);
        provider.pause();
        provider.trigger(ERROR, error );
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

export const sortQualityLevels = (qualityLevels, playerConfig) => {

    let orderConfig = playerConfig?.sourcesOrder;
    let newOrder = [];

    if (orderConfig) {
        if (_.isArray(orderConfig)) {
            let foundCount = 0;

            for (var i = 0; i < orderConfig.length; i++) {
                let value = _.find(qualityLevels, function(quality){
                    return quality.label === orderConfig[i];
                });

                if (value) {
                    newOrder.push({
                        ...value,
                        sortedIndex: foundCount
                    });
                    foundCount++;
                }
            }
        } else if (_.isObject(orderConfig) || _.isString(orderConfig)) {
            let permittedKeys = ['bitrate', 'width', 'height'];
            let orderBy = orderConfig?.orderBy || (orderConfig == false ? orderConfig : 'bitrate');
            let order = (orderConfig?.order || 'desc').toLowerCase();

            if (permittedKeys.includes(orderBy)) {
                newOrder = _.sortBy(qualityLevels, orderBy);

                if (order === 'desc') {
                    newOrder.reverse();
                }

                for (var i = 0; i < newOrder.length; i++) {
                    newOrder[i] = {
                        ...newOrder[i],
                        sortedIndex: i,
                    }
                }
            }
        }
    }

    if (newOrder.length > 0) {
        qualityLevels = newOrder;
    }

    return qualityLevels;
}
