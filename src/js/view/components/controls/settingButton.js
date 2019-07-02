/**
 * Created by hoho on 2019. 5. 17..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import Panels, {generateMainData} from "view/components/controls/settingPanel/main";
import PanelManager from "view/global/PanelManager";

const SettingButton = function ($container, api) {
    let panelManager = PanelManager();

    const onRendered = function($current, template){
    };
    const onDestroyed = function(template){
    };
    const events = {
        "click .op-setting-button" : function(event, $current, template){
            event.preventDefault();
            let $parent = $current.closest(".op-controls-container");
            if(panelManager.size() > 0){
                panelManager.clear();
            }else{
                let panelData = generateMainData(api);
                panelManager.add(Panels($parent, api, panelData));
            }
        },
    };

    return OvenTemplate($container, "SettingButton", null, events, onRendered, onDestroyed );
};

export default SettingButton;
