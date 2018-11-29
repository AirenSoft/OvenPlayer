/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager from "view/global/PanelManager";
import LA$ from 'utils/likeA$';
import sizeHumanizer from "utils/sizeHumanizer";
import SpeedPanel from "view/controls/settingPanel/speedPanel";
import SourcePanel from "view/controls/settingPanel/sourcePanel";
import QualityPanel from "view/controls/settingPanel/qualityPanel";
import CaptionPanel from "view/controls/settingPanel/captionPanel";
import TimeDisplayPanel from "view/controls/settingPanel/timeDisplayPanel";
import {
    CONTENT_LEVEL_CHANGED, PROVIDER_RTMP
} from "api/constants";

const PANEL_TITLE = {
    "speed" : "Speed",
    "source" : "Source",
    "quality" : "Quality",
    "caption" : "Caption",
    "display" : "Display"
};

const RootPanel = function($container, api, data){
    const $root = LA$("#"+api.getContainerId());
    let panelManager = PanelManager();

    const extractPanelData = function(api, panelType){
        let panel = {title : "", body : [], useCheck : true, id : "panel-"+new Date().getTime() , panelType : panelType};
        panel.title = PANEL_TITLE[panelType];
        if(panelType === "speed"){
            let playBackRates = api.getConfig().playbackRates;
            let currentPlaybackRate = api.getPlaybackRate();
            for (let i = 0; i < playBackRates.length; i ++) {
                let body = {
                    title : (playBackRates[i] === 1? "Normal" : playBackRates[i]),
                    isCheck : currentPlaybackRate === playBackRates[i],
                    value : playBackRates[i],
                    description : playBackRates[i],
                    panelType : panelType
                };
                panel.body.push(body);
            }

        }else if(panelType === "source"){
            let sources = api.getSources();
            for (let i = 0; i < sources.length; i ++) {
                let body = {
                    title : sources[i].label,
                    isCheck : api.getCurrentSource() === i,
                    value : i,
                    panelType : panelType
                };
                panel.body.push(body);
            }

        }else if(panelType === "quality"){
            let qualityLevels = api.getQualityLevels();
            panel.body.push({
                title : "auto",
                isCheck : api.isAutoQuality(),
                value : "auto",
                panelType : panelType
            });
            for (let i = 0; i < qualityLevels.length; i ++) {
                let body = {
                    title : qualityLevels[i].label,
                    isCheck : api.getCurrentQuality() === i,
                    value : i,
                    panelType : panelType
                };
                panel.body.push(body);
            }

        }else if(panelType === "caption"){
            let captions = api.getCaptionList();
            panel.body.push({
                title : "off",
                isCheck : api.getCurrentCaption() === -1,
                value : -1,
                panelType : panelType
            });
            for (let i = 0; i < captions.length; i ++) {
                let body = {
                    title : captions[i].label,
                    isCheck : api.getCurrentCaption() === i,
                    value : i,
                    panelType : panelType
                };
                panel.body.push(body);
            }

        }else if(panelType === "display"){
            let displayModes = [
                "timecode",
                "framecode"
            ];
            for (let i = 0; i < displayModes.length; i ++) {
                let body = {
                    title : displayModes[i],
                    isCheck : api.isTimecodeMode() ? (displayModes[i] === "timecode") : (displayModes[i] === "framecode"),
                    value : displayModes[i],
                    panelType : panelType
                };
                panel.body.push(body);
            }

        }
        return panel;
    };

    data.setFront = function(isFront){
        if(isFront){
            $root.find("#"+data.id).removeClass("background");
        }else{
            $root.find("#"+data.id).addClass("background");
        }
    };
    const onRendered = function($current, template){
        api.on(CONTENT_LEVEL_CHANGED, function(data){
            let newQuality = data.currentQuality;
            if(data.type === "render"){
                _.forEach( $root.find("#"+template.data.id).find(".ovp-setting-item").get(), function(panel){
                    let $panel = LA$(panel);

                    if($panel.attr("ovp-panel-type") === "quality"){
                        let qualityList = api.getQualityLevels();
                        let newQualityObject = qualityList[newQuality];
                        $panel.find(".ovp-setting-item-value").text(newQualityObject.width+"x"+newQualityObject.height+", "+ sizeHumanizer(newQualityObject.bitrate, true, "bps"));
                    }

                });
            }

        }, template);
    };
    const onDestroyed = function(template){
        api.off(CONTENT_LEVEL_CHANGED, null, template);
    };
    const events = {
        "click .ovp-setting-item": function (event, $current, template) {
            event.preventDefault();
            //if this panel is background it disabled click.
            if($root.find("#"+data.id).hasClass("background")){
                return false;
            }
            let panelType = LA$(event.currentTarget).attr("ovp-panel-type");
            let panel = null;
            if(panelType === "speed"){
                panel = SpeedPanel($container, api, extractPanelData(api, panelType));
            }else if(panelType === "source"){
                panel = SourcePanel($container, api, extractPanelData(api, panelType));
            }else if(panelType === "quality"){
                panel = QualityPanel($container, api, extractPanelData(api, panelType));
            }else if(panelType === "caption"){
                panel = CaptionPanel($container, api, extractPanelData(api, panelType));
            }else if(panelType === "display"){
                panel = TimeDisplayPanel($container, api, extractPanelData(api, panelType));
            }

            panelManager.add(panel);
        },
        "click .ovp-setting-title" : function(event, $current, template){
            event.preventDefault();
            if($root.find("#"+data.id).hasClass("background")){
                return false;
            }
            panelManager.removeLastItem();
        }
    };

    return OvenTemplate($container, "RootPanel", data, events, onRendered, onDestroyed );

};

export default RootPanel;


export const extractRootPanelData = function(api){
    let panel = {title : "Settings", isRoot : true, body : [], id : "panel-"+new Date().getTime(), panelType : ""};

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
            value :  api.getPlaybackRate() === 1 ? "Normal" : api.getPlaybackRate(),
            description :  api.getPlaybackRate() === 1 ? "Normal" : api.getPlaybackRate(),
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
            value : captions[currentCaption] ? captions[currentCaption].label : "off",
            description : captions[currentCaption] ? captions[currentCaption].label : "off",
            panelType : "caption",
            hasNext : true
        };

        panel.body.push(body);
    }
    if(framerate > 0){
        let body = {
            title : PANEL_TITLE.display,
            value : api.isTimecodeMode() ? "timecode" : "framecode",
            description : api.isTimecodeMode() ? "timecode" : "framecode",
            panelType : "display",
            hasNext : true
        };

        panel.body.push(body);
    }

    return panel;
};