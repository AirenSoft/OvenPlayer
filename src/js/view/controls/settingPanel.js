/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager,{extractPanelData} from "view/global/PanelManager";
import LA$ from 'utils/likeA$';

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
    };
    const onDestroyed = function(){
        //Do nothing.
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
                    }else if(panelType === "qualitylevel"){
                        api.setCurrentQuality(parseInt(value));
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
