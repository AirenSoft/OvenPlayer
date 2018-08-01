/**
 * Created by hoho on 2018. 7. 25..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import {naturalHms} from 'utils/strings';

const TimeDisplay = function($container, api, data){

    let $position = "", $duration = "";
    let convertHumanizeTime = function(time){
        return naturalHms(time);
    };

    const onRendered = function($current, template){
        $position = $current.find('.ovp-time-current');
        $duration = $current.find('.ovp-time-duration');

        if(data.duration !== Infinity){

            $duration.text(convertHumanizeTime(data.duration));
            api.on('time', function(data) {
                $position.text(convertHumanizeTime(data.position));
            });
        }

    };
    const onDestroyed = function(){
        //Do nothing.
    };
    const events = {

    };

    return OvenTemplate($container, "TimeDisplay", data, events, onRendered, onDestroyed );
};


export default TimeDisplay;