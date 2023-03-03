/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager from "view/global/PanelManager";
import LA$ from 'utils/likeA$';
import {
    AUDIO_TRACK_CHANGED
} from "api/constants";
import _ from "utils/underscore";

const AudioTrackPanel = function ($container, api, data) {
    const $root = LA$(api.getContainerElement());
    let panelManager = PanelManager();

    data.setFront = function (isFront) {
        if (isFront) {
            $root.find("#" + data.id).removeClass("background");
        } else {
            $root.find("#" + data.id).addClass("background");
        }
    };
    const onRendered = function ($current, template) {
        api.on(AUDIO_TRACK_CHANGED, function (data) {
            _.forEach($root.find("#" + template.data.id).find(".op-setting-item").get(), function (panel) {
                let $panel = LA$(panel);

                if ($panel.find(".op-setting-item-checked").hasClass("op-show")) {
                    $panel.find(".op-setting-item-checked").removeClass("op-show");
                }
                if (data.currentAudioTrack === parseInt($panel.attr("op-data-value"))) {
                    $panel.find(".op-setting-item-checked").addClass("op-show");
                }
            });
        }, template);
    };
    const onDestroyed = function (template) {
        api.off(AUDIO_TRACK_CHANGED, null, template);
    };
    const events = {
        "click .op-setting-item": function (event, $current, template) {
            event.preventDefault();
            let value = LA$(event.currentTarget).attr("op-data-value");
            api.setCurrentAudioTrack(parseInt(value));
            panelManager.clear();
        },
        "click .op-setting-title": function (event, $current, template) {
            event.preventDefault();
            panelManager.removeLastItem();
        }
    };

    return OvenTemplate($container, "AudioTrackPanel", api.getConfig(), data, events, onRendered, onDestroyed);

};

export default AudioTrackPanel;