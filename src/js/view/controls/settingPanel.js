/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager,{extractPanelData} from "view/global/PanelManager";
import LA$ from 'utils/likeA$';
import sizeHumanizer from "utils/sizeHumanizer";
import {
    CONTENT_LEVEL_CHANGED
} from "api/constants";

const PLAYER_MIN_HEIGHT = 220;
const SettingPanel = function($container, api, data){
    const $root = LA$("#"+api.getContainerId());
    let panelManager = PanelManager();

    data.setFront = function(isFront){
        if(isFront){
            $root.find("#"+data.id).addClass("front");
        }else{
            $root.find("#"+data.id).removeClass("front");
        }
    };
    const onRendered = function($current, template){
        if(PLAYER_MIN_HEIGHT > $root.height()){
            $root.find(".ovp-setting-panel").css("maxHeight", "114px");
        }

        //This assistants UI when quality level changes. When you open setting panels.
        api.on(CONTENT_LEVEL_CHANGED, function(data){
            let newQuality = data.currentQuality;
            if(data.type === "render"){
                if(template.data.isRoot){
                    _.forEach( $root.find("#"+template.data.id).find(".ovp-setting-item").get(), function(panel){
                        let $panel = LA$(panel);

                        if($panel.attr("ovp-panel-type") === "quality"){
                            let qualityList = api.getQualityLevels();
                            let newQualityObject = qualityList[newQuality];
                            $panel.find(".ovp-setting-item-value").text(newQualityObject.width+"x"+newQualityObject.height+", "+ sizeHumanizer(newQualityObject.bitrate, true, "bps"));
                        }

                    });
                }else if(template.data.panelType === "quality"){
                    _.forEach( $root.find("#"+template.data.id).find(".ovp-setting-item").get(), function(panel){
                        let $panel = LA$(panel);
                        if( $panel.find(".ovp-setting-item-checked").hasClass("ovp-show")){
                            $panel.find(".ovp-setting-item-checked").removeClass("ovp-show");
                        }
                        if(newQuality === parseInt($panel.attr("ovp-data-value"))){
                            $panel.find(".ovp-setting-item-checked").addClass("ovp-show");
                        }

                        if(data.isAuto && $panel.attr("ovp-data-value") === "auto"){
                            $panel.find(".ovp-setting-item-checked").addClass("ovp-show");
                        }

                    });
                }
            }

        }, template);
    };
    const onDestroyed = function(template){
        api.off(CONTENT_LEVEL_CHANGED, null, template);
    };
    const events = {
        "click .ovp-setting-item": function (event, $current, template) {
            event.preventDefault();
            if(template.data.useCheck){
                let panelType = LA$(event.currentTarget).attr("ovp-panel-type");
                let value = LA$(event.currentTarget).attr("ovp-data-value");

                if(panelType && value){
                    if(panelType === "playbackrate"){
                        api.setPlaybackRate(parseFloat(value));
                    }else if(panelType === "source"){
                        api.setCurrentSource(parseInt(value));
                    }else if(panelType === "quality"){
                        if(value === "auto"){
                            api.setAutoQuality(true);
                        }else{
                            api.setCurrentQuality(parseInt(value));
                        }

                    }
                }
                panelManager.clear();
            }else{
                let panelType = LA$(event.currentTarget).attr("ovp-panel-type");
                let panel = SettingPanel($container, api, extractPanelData(api, panelType));
                panelManager.add(panel);
            }
        },
        "click .ovp-setting-title" : function(event, $current, template){
            event.preventDefault();
            panelManager.removeLastItem();
        }
    };

    return OvenTemplate($container, "SettingPanel", data, events, onRendered, onDestroyed );

};

export default SettingPanel;
