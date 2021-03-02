/**
 * Created by Sangwon Oh on 2020. 11. 10..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import _ from 'utils/underscore';
import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_COMPLETE,
    STATE_PAUSED
} from "api/constants";

const WaterMark = function($container, api, playerState){

    let waterMark = null;
    let textElem = null;
    const defaultPosition = 'top-right';
    const defaultX = '2.8125%';
    const defaultY = '5%';
    const defaultWidth = 'auto';
    const defaultHeight = 'auto';
    const defaultOpacity = 0.7;

    const onRendered = function($current, template){

        waterMark = $current.find('.op-watermark');
        textElem = $current.find('.op-watermark-text');

        let waterMarkOption = api.getConfig().waterMark;

        let position = waterMarkOption.position || defaultPosition;

        let y = waterMarkOption.y || defaultY;
        let x = waterMarkOption.x || defaultX;

        waterMark.css(position.split('-')[0], y);
        waterMark.css(position.split('-')[1], x);

        let width = waterMarkOption.width || defaultWidth;
        let height = waterMarkOption.height || defaultHeight;

        waterMark.css('width', width);
        waterMark.css('height', height);

        let opacity = waterMarkOption.opacity || defaultOpacity;
        waterMark.css('opacity', opacity);

        if (waterMarkOption.text) {

            if (waterMarkOption.font) {

                _.each(waterMarkOption.font, function (value, key) {
                    textElem.css(key, value);
                })
            }
        }

    };
    const onDestroyed = function(){
        //Do nothing!
    };
    const events = {

    };

    return OvenTemplate($container, "WaterMark", api.getConfig(), playerState, events, onRendered, onDestroyed );
};

export default WaterMark;