import $ from 'utils/jquery';
import {naturalHms} from 'utils/strings'
import TimeDisplayTemplate from './timeDisplayTemplate'

function TimeDisplay(container, player, ui) {

    const LIVE_CLASSNAME = 'ovp-live';
    const LIVE_LOW_LATENCY_CLASSNAME = 'ovp-live-lowlatency';

    const timeDisplayElem = $(TimeDisplayTemplate());
    container.append(timeDisplayElem);

    const currentElement = timeDisplayElem.find('.ovp-time-current');
    const durationElement = timeDisplayElem.find('.ovp-time-duration');

    function setCurrentTime(second) {
        
        currentElement.text(naturalHms(second));
    }

    function setDurationTime(second) {

        durationElement.text(naturalHms(second));
    }

    function setLiveUI() {

        ui.data('ovpElement').addClass(LIVE_CLASSNAME);
    }

    function setLowLatencyUI() {

        ui.data('ovpElement').addClass(LIVE_CLASSNAME);
        ui.data('ovpElement').addClass(LIVE_LOW_LATENCY_CLASSNAME);
    }

    function setVodUI() {

        resetUI();
    }

    function resetUI() {
        ui.data('ovpElement').removeClass(LIVE_LOW_LATENCY_CLASSNAME);
        ui.data('ovpElement').removeClass(LIVE_CLASSNAME);
    }

    player.on('metaChanged', function(e) {

        resetUI();

        if (e.duration === Infinity) {

            if (e.type === 'webrtc') {

                setLowLatencyUI();
            } else {

                setLiveUI();
            }
        } else {

            setVodUI();
            setDurationTime(e.duration);
        }
        
    });

    player.on('time', function(e) {

        setCurrentTime(e.position);
    });

    setCurrentTime(0);
    setDurationTime(0);

}

export default TimeDisplay;