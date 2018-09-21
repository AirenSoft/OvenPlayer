/**
 * Created by hoho on 2018. 7. 25..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import {naturalHms} from "utils/strings";
import {
    CONTENT_TIME
} from "api/constants";

const TimeDisplay = function($container, api, data){

    let $position = "", $duration = "";
    let convertHumanizeTime = function(time){
        return naturalHms(time);
    };

    const onRendered = function($current, template){
        $position = $current.find(".ovp-time-current");
        $duration = $current.find(".ovp-time-duration");

        if(data.duration !== Infinity){

            $duration.text(convertHumanizeTime(data.duration));
            api.on(CONTENT_TIME, function(data) {
                $position.text(convertHumanizeTime(data.position));
            },template);
        }

    };
    const onDestroyed = function(template){
        api.off(CONTENT_TIME, null, template);
    };
    const events = {

    };

    return OvenTemplate($container, "TimeDisplay", data, events, onRendered, onDestroyed );
};


export default TimeDisplay;
