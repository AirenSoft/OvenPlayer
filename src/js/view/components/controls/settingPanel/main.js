/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager from "view/global/PanelManager";
import LA$ from 'utils/likeA$';
import _ from "utils/underscore";
import sizeHumanizer from "utils/sizeHumanizer";
import SpeedPanel from "view/components/controls/settingPanel/speedPanel";
import ZoomPanel from "view/components/controls/settingPanel/zoomPanel";
import SourcePanel from "view/components/controls/settingPanel/sourcePanel";
import QualityPanel from "view/components/controls/settingPanel/qualityPanel";
import AudioTrackPanel from "view/components/controls/settingPanel/audioTrackPanel";
import CaptionPanel from "view/components/controls/settingPanel/captionPanel";
import TimeDisplayPanel from "view/components/controls/settingPanel/timeDisplayPanel";
import {
    CONTENT_LEVEL_CHANGED, PLAYER_ZOOM_CAHNGED
} from "api/constants";
import { AUDIO_TRACK_CHANGED } from "../../../../api/constants";

let PANEL_TITLE = {
    "speed": "Speed",
    "zoom": "Zoom",
    "speedUnit": "x",
    "source": "Source",
    "quality": "Quality",
    "audioTrack": "Audio",
    "caption": "Caption",
    "display": "Display"
};

const Panels = function ($container, api, data) {

    const $root = LA$(api.getContainerElement());
    let panelManager = PanelManager();

    let playerConfig = api.getConfig();

    if (playerConfig && playerConfig.systemText) {
        Object.keys(PANEL_TITLE).forEach(title => {
            PANEL_TITLE[title] = playerConfig.systemText.ui.setting[title];
        });
    }

    function extractSubPanelData(api, panelType) {
        let panel = {
            id: "panel-" + new Date().getTime(),
            title: "",
            body: [],
            useCheck: true,
            panelType: panelType,
            height: $root.height() - $root.find(".op-bottom-panel").height()
        };
        panel.title = PANEL_TITLE[panelType];
        if (panelType === "speed") {
            let playBackRates = api.getConfig().playbackRates;
            let currentPlaybackRate = api.getPlaybackRate();
            for (let i = 0; i < playBackRates.length; i++) {
                let body = {
                    title: playBackRates[i] + PANEL_TITLE.speedUnit, //(playBackRates[i] === 1? "Normal" : playBackRates[i]),
                    isCheck: currentPlaybackRate === playBackRates[i],
                    value: playBackRates[i],
                    description: playBackRates[i],
                    panelType: panelType
                };
                panel.body.push(body);
            }

        } else if (panelType === "zoom") {
            let bodyIn = {
                title: "+5%",
                isCheck: false,
                value: 0.05,
                description: 0.05,
                panelType: panelType
            };
            let body = {
                title: "100%",
                isCheck: false,
                value: 0,
                description: 1.0,
                panelType: panelType
            };
            let bodyOut = {
                title: "-5%",
                isCheck: false,
                value: -0.05,
                description: -0.05,
                panelType: panelType
            };
            panel.body.push(bodyIn);
            panel.body.push(body);
            panel.body.push(bodyOut);

        } else if (panelType === "source") {
            let sources = api.getSources();
            for (let i = 0; i < sources.length; i++) {
                let body = {
                    title: sources[i].label,
                    isCheck: api.getCurrentSource() === i,
                    value: i,
                    panelType: panelType
                };
                panel.body.push(body);
            }

        } else if (panelType === "quality") {
            let qualityLevels = api.getQualityLevels();
            panel.body.push({
                title: "AUTO",
                isCheck: api.isAutoQuality(),
                value: "AUTO",
                panelType: panelType
            });
            for (let i = 0; i < qualityLevels.length; i++) {
                let body = {
                    title: qualityLevels[i].label,
                    isCheck: api.getCurrentQuality() === i,
                    value: i,
                    panelType: panelType
                };
                panel.body.push(body);
            }

        } else if (panelType === "audioTrack") {
            let audioTracks = api.getAudioTracks();

            for (let i = 0; i < audioTracks.length; i++) {
                let body = {
                    title: audioTracks[i].label,
                    isCheck: audioTracks[i].index === api.getCurrentAudioTrack(),
                    value: audioTracks[i].index,
                    panelType: panelType
                };
                panel.body.push(body);
            }

        } else if (panelType === "caption") {
            let captions = api.getCaptionList();
            panel.body.push({
                title: "OFF",
                isCheck: api.getCurrentCaption() === -1,
                value: -1,
                panelType: panelType
            });
            for (let i = 0; i < captions.length; i++) {
                let body = {
                    title: captions[i].label,
                    isCheck: api.getCurrentCaption() === i,
                    value: i,
                    panelType: panelType
                };
                panel.body.push(body);
            }

        } else if (panelType === "display") {
            let displayModes = [
                "Play time",
                "Framecode"
            ];
            for (let i = 0; i < displayModes.length; i++) {
                let body = {
                    title: displayModes[i],
                    isCheck: api.isTimecodeMode() ? (displayModes[i] === "Play time") : (displayModes[i] === "Framecode"),
                    value: displayModes[i],
                    panelType: panelType
                };
                panel.body.push(body);
            }

        }
        return panel;
    };

    data.setFront = function (isFront) {
        if (isFront) {
            $root.find("#" + data.id).removeClass("background");
        } else {
            $root.find("#" + data.id).addClass("background");
        }
    };

    function setPanelMaxHeight() {
        if ($root.find(".op-setting-panel")) {
            $root.find(".op-setting-panel").css("max-height", $root.height() - $root.find(".op-bottom-panel").height() + "px");
        }
    };
    const onRendered = function ($current, template) {
        setPanelMaxHeight();

        api.on(CONTENT_LEVEL_CHANGED, function (data) {
            let newQuality = data.currentQuality;
            if (data.type === "render" && $root.find("#" + template.data.id).find(".op-setting-item")) {
                _.forEach($root.find("#" + template.data.id).find(".op-setting-item").get() || [], function (panel) {
                    let $panel = LA$(panel);

                    if ($panel.attr("op-panel-type") === "quality") {
                        let qualityList = api.getQualityLevels();
                        let newQualityObject = qualityList[newQuality];
                        $panel.find(".op-setting-item-value").text(newQualityObject.width + "x" + newQualityObject.height + ", " + sizeHumanizer(newQualityObject.bitrate, true, "bps"));
                    }

                });
            }

        }, template);

        api.on(AUDIO_TRACK_CHANGED, function (data) {
            _.forEach($root.find("#" + template.data.id).find(".op-setting-item").get() || [], function (panel) {

                let $panel = LA$(panel);

                if ($panel.attr("op-panel-type") === "audioTrack") {
                    $panel.find(".op-setting-item-value").text(api.getAudioTracks()[data.currentAudioTrack].label);
                }
            });
        }, template);


        api.on(PLAYER_ZOOM_CAHNGED, function (data) {
            _.forEach($root.find("#" + template.data.id).find(".op-setting-item").get() || [], function (panel) {

                let $panel = LA$(panel);

                if ($panel.attr("op-panel-type") === "zoom") {
                    $panel.find(".op-setting-item-value").text(Math.round(data.zoomFactor * 100) + "%");
                }
            });
        }, template);
    };
    const onDestroyed = function (template) {
        api.off(CONTENT_LEVEL_CHANGED, null, template);
        api.off(AUDIO_TRACK_CHANGED, null, template);
    };
    const events = {
        "click .op-setting-item": function (event, $current, template) {
            event.preventDefault();
            //if this panel is background it disabled click.
            if ($root.find("#" + data.id).hasClass("background")) {
                return false;
            }
            let panelType = LA$(event.currentTarget).attr("op-panel-type");
            let panel = null;
            if (panelType === "speed") {
                panel = SpeedPanel($container, api, extractSubPanelData(api, panelType));
            } else if (panelType === "zoom") {
                panel = ZoomPanel($container, api, extractSubPanelData(api, panelType));
            } else if (panelType === "source") {
                panel = SourcePanel($container, api, extractSubPanelData(api, panelType));
            } else if (panelType === "quality") {
                panel = QualityPanel($container, api, extractSubPanelData(api, panelType));
            } else if (panelType === "audioTrack") {
                panel = AudioTrackPanel($container, api, extractSubPanelData(api, panelType));
            } else if (panelType === "caption") {
                panel = CaptionPanel($container, api, extractSubPanelData(api, panelType));
            } else if (panelType === "display") {
                panel = TimeDisplayPanel($container, api, extractSubPanelData(api, panelType));
            }

            panelManager.add(panel);
        },
        "click .op-setting-title": function (event, $current, template) {
            event.preventDefault();
            if ($root.find("#" + data.id).hasClass("background")) {
                return false;
            }
            panelManager.removeLastItem();
        }
    };
    return OvenTemplate($container, "Panels", api.getConfig(), data, events, onRendered, onDestroyed);

};

export default Panels;

