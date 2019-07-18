/**
 * Created by hoho on 2018. 7. 25..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import {naturalHms} from "utils/strings";
import {
    CONTENT_TIME,
    CONTENT_TIME_MODE_CHANGED
} from "api/constants";

const TimeDisplay = function($container, api, data){

    let $position = "", $duration = "";

    function convertHumanizeTime(time){
        return naturalHms(time);
    };

    const onRendered = function($current, template){
        let isTimecode = api.isTimecodeMode();
        $position = $current.find(".op-time-current");
        $duration = $current.find(".op-time-duration");

        if(data.duration !== Infinity){

            if(isTimecode){
                $duration.text(convertHumanizeTime(data.duration));
            }else{
                $duration.text( Math.round (data.duration * api.getFramerate()) + " ("+api.getFramerate()+"fps)");
            }

            api.on(CONTENT_TIME_MODE_CHANGED, function(isTimecodeMode){
                isTimecode = isTimecodeMode;
                if(isTimecode){
                    $duration.text(convertHumanizeTime(data.duration));
                }else{
                    $duration.text( Math.round (data.duration * api.getFramerate()) + " ("+api.getFramerate()+"fps)");
                }
            },template);

            api.on(CONTENT_TIME, function(data) {
                if(isTimecode){
                    $position.text(convertHumanizeTime(data.position));
                }else{
                    $position.text( Math.round (data.position * api.getFramerate()));
                }
            },template);
        }

    };
    const onDestroyed = function(template){
        api.off(CONTENT_TIME_MODE_CHANGED, null, template);
        api.off(CONTENT_TIME, null, template);
    };
    const events = {

    };

    return OvenTemplate($container, "TimeDisplay", api.getConfig(), data, events, onRendered, onDestroyed );
};


export default TimeDisplay;
