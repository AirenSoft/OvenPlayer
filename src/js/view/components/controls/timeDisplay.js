/**
 * Created by hoho on 2018. 7. 25..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import { naturalHms } from "utils/strings";
import {
  CONTENT_TIME,
  CONTENT_TIME_MODE_CHANGED,
  PROVIDER_HLS,
  PROVIDER_HTML5
} from "api/constants";

const TimeDisplay = function ($container, api, data) {

  let $position = "", $duration = "", $liveBadge = "", $liveText = "";

  const mediaElement = api.getMediaElement();

  let hlsLive = false;
  let nativeHlsLive = false;

  let currVodPosition = 0;

  function convertHumanizeTime(time) {
    return naturalHms(time);
  }


  function getNativeHlsDvrWindow() {
    return mediaElement.seekable.end(mediaElement.seekable.length - 1) - mediaElement.seekable.start(0);
  }

  const onRendered = function ($current, template) {
    currVodPosition = 0;
    let isTimecode = api.isTimecodeMode();
    $position = $current.find(".op-time-current");
    $duration = $current.find(".op-time-duration");
    $liveBadge = $current.find(".op-live-badge");
    $liveText = $current.find(".op-live-text");

    if (data && data.type === PROVIDER_HLS && data.duration === Infinity) {
      hlsLive = true;

      if (api.getProviderName() === PROVIDER_HTML5) {
        nativeHlsLive = true;
      }
    }

    if (data.duration !== Infinity) {

      if (isTimecode) {
        $duration.text(convertHumanizeTime(data.duration));
      } else {
        $position.text(0);
        $duration.text(Math.round(data.duration * api.getFramerate()) + " (" + api.getFramerate() + "fps)");
      }

      api.on(CONTENT_TIME_MODE_CHANGED, function (isTimecodeMode) {
        isTimecode = isTimecodeMode;
        if (isTimecode) {
          $position.text(convertHumanizeTime(currVodPosition));
          $duration.text(convertHumanizeTime(data.duration));
        } else {
          $position.text(Math.round(currVodPosition * api.getFramerate()));
          $duration.text(Math.round(data.duration * api.getFramerate()) + " (" + api.getFramerate() + "fps)");
        }
      }, template);

      api.on(CONTENT_TIME, function (data) {

        currVodPosition = data.position;

        if (isTimecode) {
          $position.text(convertHumanizeTime(data.position));
        } else {
          $position.text(Math.round(data.position * api.getFramerate()));
        }
      }, template);
    } else {
      if (hlsLive && !nativeHlsLive) {
        api.on(CONTENT_TIME, function (data) {
          if (!api.getConfig().legacyUI) {
            if (api.getMseInstance().liveSyncPosition - data.position > api.getMseInstance().targetLatency) {
              $liveBadge.addClass('op-live-badge-delayed');
            } else {
              $liveBadge.removeClass('op-live-badge-delayed');
            }
          }
        }, template);
      } else if (hlsLive && nativeHlsLive) {

        api.on(CONTENT_TIME, function (data) {

          if (!api.getConfig().legacyUI) {
            const dvrWindow = getNativeHlsDvrWindow();
            if (dvrWindow - data.position > 3) {
              $liveBadge.addClass('op-live-badge-delayed');
            } else {
              $liveBadge.removeClass('op-live-badge-delayed');
            }
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

      if (hlsLive && !nativeHlsLive) {
        const syncPosition = api.getMseInstance().liveSyncPosition;
        api.seek(syncPosition);
      }
    }
  };

  return OvenTemplate($container, "TimeDisplay", api.getConfig(), data, events, onRendered, onDestroyed);
};


export default TimeDisplay;
