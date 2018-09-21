/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager from "view/global/PanelManager";
import LA$ from 'utils/likeA$';

const PLAYER_MIN_HEIGHT = 220;
const SettingPanel = function($container, api, data){
    const $root = LA$("#"+api.getContainerId());
    let panelManager = PanelManager();

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
                    isCheck : currentQuality.index === i,
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
            let panel = SettingPanel($container, api, extractPanelData(panelType));
            panelManager.add(panel);
        },
        "click .ovp-setting-title" : function(event, $current, template){
            event.preventDefault();
            panelManager.removeLastItem();
        },
        "click .ovp-setting-sub-item" : function(event, $current, template){
            event.preventDefault();

            let panelType = LA$(event.currentTarget).attr("ovp-panel-type");
            let value = LA$(event.currentTarget).attr("ovp-data-value");

            if(panelType && value){
                if(panelType === "playbackrate"){
                    api.setPlaybackRate(parseFloat(value));
                }else if(panelType === "qualitylevel"){
                    api.setCurrentQuality(parseInt(value));
                }
            }
            panelManager.clear();
        }
    };

    return OvenTemplate($container, "SettingPanel", data, events, onRendered, onDestroyed );

};

export default SettingPanel;
