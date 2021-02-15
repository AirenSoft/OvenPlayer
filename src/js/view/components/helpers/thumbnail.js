/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_COMPLETE,
    STATE_PAUSED
} from "api/constants";

const Thumbnail = function ($container, api, playerState) {

    const onRendered = function ($current, template) {

        let aspectRatio = api.getConfig().aspectRatio;

        if (aspectRatio) {

            if (aspectRatio.split(':').length === 2) {

                let width = aspectRatio.split(':')[0] * 1;
                let height = aspectRatio.split(':')[1] * 1;

                let ratio = height / width * 100;

                $current.css('padding-bottom', ratio + '%');
            }
        }
    };
    const onDestroyed = function () {
        //Do nothing!
    };
    const events = {};

    return OvenTemplate($container, "Thumbnail", api.getConfig(), playerState, events, onRendered, onDestroyed);
};

export default Thumbnail;