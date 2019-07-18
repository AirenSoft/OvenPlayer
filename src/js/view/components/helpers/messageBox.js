/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_COMPLETE,
    STATE_PAUSED
} from "api/constants";

const MessageBox = function($container, api, message, description, withTimer, iconClass, clickCallback){

    let autoDestroyTimer = "";
    let data = {
        message : message,
        description : description,
        iconClass : iconClass
    };


    const onRendered = function($current, template){
        if(withTimer){
            autoDestroyTimer = setTimeout(function(){
                template.destroy();
            }, withTimer||5000);
        }
    };
    const onDestroyed = function(){
    };
    const events = {
        "click .op-message-text" : function(event, $current, template){
            //event.preventDefault();
            event.stopPropagation();
            if(autoDestroyTimer){
                clearTimeout(autoDestroyTimer);
            }
            if(clickCallback){
                clickCallback();
            }
            template.destroy();
        },
        "click .op-con" : function(event, $current, template){
            event.preventDefault();
            if(autoDestroyTimer){
                clearTimeout(autoDestroyTimer);
            }

            if(clickCallback){
                clickCallback();
            }
            template.destroy();
        }
    };

    return OvenTemplate($container, "MessageBox", api.getConfig(), data, events, onRendered, onDestroyed );
};


export default MessageBox;