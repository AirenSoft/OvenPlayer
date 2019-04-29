/**
 * Created by hoho on 2018. 7. 19..
 */
import OvenTemplate from 'view/engine/OvenTemplate';

const TextView = function($container, api){
    let data = {};

    const onRendered = function($current, template){

    };
    const onDestroyed = function(){
        //Do nothing.
    };
    const events = {

    };

    return OvenTemplate($container, "TextView", data, events, onRendered, onDestroyed );

};

export default TextView;