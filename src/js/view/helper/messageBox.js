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

const MessageBox = function($container, api, message, withTimer){

    let autoDestroyTimer = "";

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
        "click .ovp-message-button" : function(event, $current, template){
            event.preventDefault();

            if(autoDestroyTimer){
                clearTimeout(autoDestroyTimer);
            }
            template.destroy();
        }
    };

    return OvenTemplate($container, "MessageBox", message, events, onRendered, onDestroyed );
};


export default MessageBox;