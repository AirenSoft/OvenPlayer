/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager from "view/global/PanelManager";
import LA$ from 'utils/likeA$';


const SourcePanel = function($container, api, data){
    const $root = LA$(api.getContainerElement());
    let panelManager = PanelManager();

    data.setFront = function(isFront){
        if(isFront){
            $root.find("#"+data.id).removeClass("background");
        }else{
            $root.find("#"+data.id).addClass("background");
        }
    };
    const onRendered = function($current, template){
        //Do nothing
    };
    const onDestroyed = function(template){
        //Do nothing
    };
    const events = {
        "click .op-setting-item": function (event, $current, template) {
            event.preventDefault();
            let value = LA$(event.currentTarget).attr("op-data-value");
            api.setCurrentSource(parseInt(value));
            panelManager.clear();
        },
        "click .op-setting-title" : function(event, $current, template){
            event.preventDefault();
            panelManager.removeLastItem();
        }
    };

    return OvenTemplate($container, "SourcePanel", api.getConfig(), data, events, onRendered, onDestroyed );

};

export default SourcePanel;