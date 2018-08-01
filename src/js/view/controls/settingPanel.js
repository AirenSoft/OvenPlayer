/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import SettingPanelList from 'view/global/SettingPanelList';
import LA$ from 'utils/likeA$';
import _ from 'utils/underscore';
const PLAYER_MIN_HEIGHT = 220;
const SettingPanel = function($container, api, data){
    const $root = LA$("#"+api.getId());

    let extractPanelData = function(panelType){
        let panel = {title : "", body : [], type : panelType};

        if(panelType === "playbackrate"){
            panel.title = "Speed";
            let playBackRates = api.getConfig().playbackRates;
            let currentPlaybackRate = api.getPlaybackRate();
            for (let i = 0; i < playBackRates.length; i ++) {
                let body = {
                    title : (playBackRates[i] === 1? "Normal" : playBackRates[i]),
                    isCheck : currentPlaybackRate === playBackRates[i],
                    value : playBackRates[i]
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
                    isCheck : currentQuality === i,
                    value : i
                };
                panel.body.push(body);
            }

        }
        return panel;
    };

    const onRendered = function($current, template){
        if(PLAYER_MIN_HEIGHT > $root.height()){
            $root.find(".ovp-setting-panel").css("maxHeight", "114px");
        }
    };
    const onDestroyed = function(){
        //Do nothing.
    };
    const events = {
        "click .ovp-setting-main-item": function (event, $current, template) {
            event.preventDefault();
            let panelType = LA$(event.currentTarget).attr("ovp-panel-type");

            //parent must be not $current!
            SettingPanelList.push(SettingPanel($container, api, extractPanelData(panelType)));
        },
        "click .ovp-setting-title" : function(event, $current, template){
            event.preventDefault();

            //Remove Current Panel
            let last = SettingPanelList.pop();
            last.destroy();
        },
        "click .ovp-setting-item-value" : function(event, $current, template){
            event.preventDefault();

            let panelType = LA$(event.currentTarget).attr("ovp-panel-type");
            let value = LA$(event.currentTarget).attr("ovp-data-value");

            if(panelType && value){
                if(panelType === "playbackrate"){
                    api.setPlaybackRate(parseFloat(value));
                }else if(panelType === "qualitylevel"){
                    api.setCurrentQuality(parseInt(value));
                }

                //clear all SettingPanelTemplate
                _.each(SettingPanelList, function(settingPanel){
                    settingPanel.destroy();
                });
                SettingPanelList.splice(0, SettingPanelList.length);
            }

        }
    };

    return OvenTemplate($container, "SettingPanel", data, events, onRendered, onDestroyed );

};

export default SettingPanel;