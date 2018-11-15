/**
 * Created by hoho on 2018. 7. 26..
 */
import _ from "utils/underscore";

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