/**
 * Created by hoho on 2018. 7. 19..
 */
import OvenTemplate from 'view/engine/OvenTemplate';

const TextView = function($container, api, text){
    const onRendered = function($current, template){

    };
    const onDestroyed = function(){
        //Do nothing.
    };
    const events = {
        "click .btn" : function(event, $current, template){
            event.preventDefault();
            alert("Hi!");
        }
    };

    return OvenTemplate($container, "TextView", text, events, onRendered, onDestroyed );

};

export default TextView;