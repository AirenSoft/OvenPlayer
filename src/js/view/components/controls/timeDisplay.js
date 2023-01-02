/**
 * Created by hoho on 2018. 7. 25..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import { naturalHms } from "utils/strings";
import {
    CONTENT_TIME,
    CONTENT_TIME_MODE_CHANGED,
    PROVIDER_HLS
} from "api/constants";

const TimeDisplay = function ($container, api, data) {

    let $position = "", $duration = "", $liveBadge = "", $liveText = "";
    let hlsLive = false;

    function convertHumanizeTime(time) {
        return naturalHms(time);
    };

    const onRendered = function ($current, template) {
        let isTimecode = api.isTimecodeMode();
        $position = $current.find(".op-time-current");
        $duration = $current.find(".op-time-duration");
        $liveBadge = $current.find(".op-live-badge");
        $liveText = $current.find(".op-live-text");

        if (api.getProviderName() === PROVIDER_HLS && api.getProvider().isLive()) {
            hlsLive = true;
        }

        if (data.duration !== Infinity) {

            if (isTimecode) {
                $duration.text(convertHumanizeTime(data.duration));
            } else {
                $duration.text(Math.round(data.duration * api.getFramerate()) + " (" + api.getFramerate() + "fps)");
            }

            api.on(CONTENT_TIME_MODE_CHANGED, function (isTimecodeMode) {
                isTimecode = isTimecodeMode;
                if (isTimecode) {
                    $duration.text(convertHumanizeTime(data.duration));
                } else {
                    $duration.text(Math.round(data.duration * api.getFramerate()) + " (" + api.getFramerate() + "fps)");
                }
            }, template);

            api.on(CONTENT_TIME, function (data) {
                if (isTimecode) {
                    $position.text(convertHumanizeTime(data.position));
                } else {
                    $position.text(Math.round(data.position * api.getFramerate()));
                }
            }, template);
        } else {
            if (hlsLive) {
                api.on(CONTENT_TIME, function (data) {
                    if (data.duration - data.position > 3) {
                        $liveBadge.addClass('op-live-badge-delayed');
                    } else {
                        $liveBadge.removeClass('op-live-badge-delayed');
                    }

                }, template);
            }
        }

    };
    const onDestroyed = function (template) {
        api.off(CONTENT_TIME_MODE_CHANGED, null, template);
        api.off(CONTENT_TIME, null, template);
    };
    const events = {
        "click .op-live-text": function (event, $current, template) {

            event.preventDefault();
            api.seek(Number.MAX_SAFE_INTEGER);
        },
    };

    return OvenTemplate($container, "TimeDisplay", api.getConfig(), data, events, onRendered, onDestroyed);
};


export default TimeDisplay;
