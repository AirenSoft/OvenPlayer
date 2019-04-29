/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager from "view/global/PanelManager";
import LA$ from 'utils/likeA$';
import {
    CONTENT_LEVEL_CHANGED
} from "api/constants";

const QualityPanel = function($container, api, data){
    const $root = LA$("#"+api.getContainerId());
    let panelManager = PanelManager();

    data.setFront = function(isFront){
        if(isFront){
            $root.find("#"+data.id).removeClass("background");
        }else{
            $root.find("#"+data.id).addClass("background");
        }
    };
    const onRendered = function($current, template){

        //This assistants UI when quality level changes. When you open setting panels.
        api.on(CONTENT_LEVEL_CHANGED, function(data){
            let newQuality = data.currentQuality;
            if(data.type === "render"){
                _.forEach( $root.find("#"+template.data.id).find(".ovp-setting-item").get(), function(panel){
                    let $panel = LA$(panel);
                    if( $panel.find(".ovp-setting-item-checked").hasClass("ovp-show")){
                        $panel.find(".ovp-setting-item-checked").removeClass("ovp-show");
                    }
                    if(newQuality === parseInt($panel.attr("ovp-data-value"))){
                        $panel.find(".ovp-setting-item-checked").addClass("ovp-show");
                    }
                    if(data.isAuto && $panel.attr("ovp-data-value") === "AUTO"){
                        $panel.find(".ovp-setting-item-checked").addClass("ovp-show");
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
            let value = LA$(event.currentTarget).attr("ovp-data-value");
            if(value === "AUTO"){
                api.setAutoQuality(true);
            }else{
                api.setCurrentQuality(parseInt(value));
            }
            panelManager.clear();
        },
        "click .ovp-setting-title" : function(event, $current, template){
            event.preventDefault();
            panelManager.removeLastItem();
        }
    };

    return OvenTemplate($container, "QualityPanel", data, events, onRendered, onDestroyed );

};

export default QualityPanel;