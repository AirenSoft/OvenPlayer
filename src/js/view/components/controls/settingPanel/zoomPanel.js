import OvenTemplate from 'view/engine/OvenTemplate';
import PanelManager from "view/global/PanelManager";
import LA$ from 'utils/likeA$';


const ZoomPanel = function($container, api, data){
    const $root = LA$(api.getContainerElement());
    const media = $root.find(".op-media-element-container");

    let panelManager = PanelManager();
    let zoomProperty = "--mediaZoom";

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
            let offset = LA$(event.currentTarget).attr("op-data-value");
            let zoomFactor = api.getZoomFactor();

            if (offset == 0) {
                zoomFactor = 1.0;
            } else {
                zoomFactor = parseFloat(zoomFactor) + parseFloat(offset);
            } 

            if (zoomFactor <= 0 ) {
                zoomFactor = 0
            }

            media.get().style.setProperty(zoomProperty, api.setZoomFactor(parseFloat(zoomFactor).toFixed(2)));
        },
        "click .op-setting-title" : function(event, $current, template){
            event.preventDefault();
            panelManager.removeLastItem();
        }
    };

    return OvenTemplate($container, "ZoomPanel", api.getConfig(), data, events, onRendered, onDestroyed );

};

export default ZoomPanel;