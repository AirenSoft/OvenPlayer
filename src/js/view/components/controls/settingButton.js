/**
 * Created by hoho on 2019. 5. 17..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import Panels from "view/components/controls/settingPanel/main";
import PanelManager from "view/global/PanelManager";
import {
    PROVIDER_RTMP
} from "api/constants";

let PANEL_TITLE = {
    "speed" : "Speed",
    "source" : "Source",
    "quality" : "Quality",
    "caption" : "Caption",
    "display" : "Display"
};
const SettingButton = function ($container, api) {
    let panelManager = PanelManager();

     function generateMainData(api){
        let panel = {
            id : "panel-"+new Date().getTime(),
            title : "Settings",
            body : [],
            isRoot : true,
            panelType : ""
        };

        let playerConfig = api.getConfig();

        if(playerConfig && playerConfig.systemText){
            Object.keys(PANEL_TITLE).forEach(title => {
                PANEL_TITLE[title] = playerConfig.systemText.ui.setting[title];
            });
            panel.title = playerConfig.systemText.ui.setting.title;
        }
        let sources = api.getSources();
        let currentSource = sources && sources.length > 0 ? sources[api.getCurrentSource()] : null;

        let qualityLevels = api.getQualityLevels();
        let currentQuality = qualityLevels && qualityLevels.length > 0 ? qualityLevels[api.getCurrentQuality()] : null;

        let captions = api.getCaptionList();
        let currentCaption = api.getCurrentCaption();

        let framerate = api.getFramerate();

        if(api.getDuration() !== Infinity && currentSource && currentSource.type !== PROVIDER_RTMP){
            let body = {
                title : PANEL_TITLE.speed,
                value :  api.getPlaybackRate() + "x",
                description :  api.getPlaybackRate() + "x",
                panelType : "speed",
                hasNext : true
            };
            panel.body.push(body);
        }
        if (sources.length > 0) {

            let body = {
                title : PANEL_TITLE.source,
                value : currentSource ? currentSource.label : "Default",
                description : currentSource ? currentSource.label : "Default",
                panelType : "source",
                hasNext : true
            };

            panel.body.push(body);
        }
        if (qualityLevels.length > 0) {

            let body = {
                title : PANEL_TITLE.quality,
                value : currentQuality ? currentQuality.label : "Default",
                description : currentQuality ? currentQuality.label : "Default",
                panelType : "quality",
                hasNext : true
            };

            panel.body.push(body);
        }
        if (captions.length > 0) {

            let body = {
                title : PANEL_TITLE.caption,
                value : captions[currentCaption] ? captions[currentCaption].label : "OFF",
                description : captions[currentCaption] ? captions[currentCaption].label : "OFF",
                panelType : "caption",
                hasNext : true
            };

            panel.body.push(body);
        }
        if(framerate > 0){
            let body = {
                title : PANEL_TITLE.display,
                value : api.isTimecodeMode() ? "Play time" : "Framecode",
                description : api.isTimecodeMode() ? "Play time" : "Framecode",
                panelType : "display",
                hasNext : true
            };

            panel.body.push(body);
        }

        return panel;
    };

    const onRendered = function($current, template){
    };
    const onDestroyed = function(template){
    };
    const events = {
        "click .op-setting-button" : function(event, $current, template){
            event.preventDefault();
            let $parent = $current.closest(".op-controls-container");
            if(panelManager.size() > 0){
                panelManager.clear();
            }else{
                let panelData = generateMainData(api);
                panelManager.add(Panels($parent, api, panelData));
            }
        },
    };

    return OvenTemplate($container, "SettingButton", api.getConfig(), null, events, onRendered, onDestroyed );
};



export default SettingButton;
