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
    let panel = {title : "Settings", isRoot : true, body : [], id : "panel-"+new Date().getTime()};
    let currentSource = api.getCurrentQuality();
    if(api.getDuration() !== Infinity && currentSource.type !== PROVIDER_RTMP){
        let body = {
            title : "Speed",
            value :  api.getPlaybackRate() === 1 ? "Normal" : api.getPlaybackRate(),
            panelType : "playbackrate",
            hasNext : true
        };
        panel.body.push(body);
    }

    if (api.getQualityLevels().length > 0) {
        let currentQuality = api.getCurrentQuality();

        let body = {
            title : "Source",
            value : currentQuality ? currentQuality.label : "Default",
            panelType : "qualitylevel",
            hasNext : true
        };

        panel.body.push(body);
    }
    return panel;
};

export const extractPanelData = function(api, panelType){
    let panel = {title : "", body : [], useCheck : true, id : "panel-"+new Date().getTime()};
    if(panelType === "playbackrate"){
        panel.title = "Speed";
        let playBackRates = api.getConfig().playbackRates;
        let currentPlaybackRate = api.getPlaybackRate();
        for (let i = 0; i < playBackRates.length; i ++) {
            let body = {
                title : (playBackRates[i] === 1? "Normal" : playBackRates[i]),
                isCheck : currentPlaybackRate === playBackRates[i],
                value : playBackRates[i],
                panelType : panelType
            };
            panel.body.push(body);
        }

    }else if(panelType === "qualitylevel"){
        panel.title = "Source";
        let qualityLevels = api.getQualityLevels();
        let currentQuality = api.getCurrentQuality();
        for (let i = 0; i < qualityLevels.length; i ++) {
            let body = {
                title : qualityLevels[i].label,
                isCheck : currentQuality.index === i,
                value : i,
                metaQuality :  qualityLevels[i].metaQuality,
                panelType : panelType
            };
            panel.body.push(body);
        }

    }
    return panel;
};