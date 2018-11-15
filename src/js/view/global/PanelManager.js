/**
 * Created by hoho on 2018. 7. 26..
 */
import _ from "utils/underscore";
import {PROVIDER_RTMP} from "api/constants";

let settingPanelList = [];

const PanelManager = function(){
    const that = {};

    let refreshFront = function(){
        for(let i = 0 ; i < settingPanelList.length; i ++){
            settingPanelList[i].data.setFront(false);
        }
        if(settingPanelList.length ){
            settingPanelList[settingPanelList.length - 1].data.setFront(true);
        }
    };
    that.clear = () => {
        //clear all SettingPanelTemplate
        _.each(settingPanelList, function(settingPanel){
            settingPanel.destroy();
        });
        settingPanelList = [];
        refreshFront();
    };

    that.removeLastItem = () =>{
        let last = settingPanelList.pop();
        last.destroy();
        refreshFront();
    };

    that.add = (settingPanelObject) => {
        settingPanelList.push(settingPanelObject);
        refreshFront();
    };

    that.size = () => {
        return settingPanelList.length;
    };

    return that;
};

export default PanelManager;



export const extractMainPanelData = function(api){
    let panel = {title : "Settings", isRoot : true, body : [], id : "panel-"+new Date().getTime(), panelType : ""};
    let sources = api.getSources();
    let currentSource = sources && sources.length > 0 ? sources[api.getCurrentSource()] : null;

    let qualityLevels = api.getQualityLevels();
    let currentQuality = qualityLevels && qualityLevels.length > 0 ? qualityLevels[api.getCurrentQuality()] : null;


    if(api.getDuration() !== Infinity && currentSource && currentSource.type !== PROVIDER_RTMP){
        let body = {
            title : "Speed",
            value :  api.getPlaybackRate() === 1 ? "Normal" : api.getPlaybackRate(),
            description :  api.getPlaybackRate() === 1 ? "Normal" : api.getPlaybackRate(),
            panelType : "playbackrate",
            hasNext : true
        };
        panel.body.push(body);
    }
    if (sources.length > 0) {

        let body = {
            title : "Source",
            value : currentSource ? currentSource.label : "Default",
            description : currentSource ? currentSource.label : "Default",
            panelType : "source",
            hasNext : true
        };

        panel.body.push(body);
    }
    if (qualityLevels.length > 0) {

        let body = {
            title : "Quality",
            value : currentQuality ? currentQuality.label : "Default",
            description : currentQuality ? currentQuality.label : "Default",
            panelType : "quality",
            hasNext : true
        };

        panel.body.push(body);
    }

    return panel;
};

export const extractPanelData = function(api, panelType){
    let panel = {title : "", body : [], useCheck : true, id : "panel-"+new Date().getTime() , panelType : panelType};
    if(panelType === "playbackrate"){
        panel.title = "Speed";
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
        panel.title = "Source";
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
        panel.title = "Quality";
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

    }
    return panel;
};