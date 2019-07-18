/**
 * Created by hoho on 2018. 7. 25..
 */
import OvenTemplate from 'view/engine/OvenTemplate';

const Spinner = function($container, api){
    let $spinner = "";

    const onRendered = function($current, template){
        $spinner = $current;
    };
    const onDestroyed = function(){
        //Do nothing.
    };
    const events = {};

    return Object.assign(OvenTemplate($container, "Spinner", api.getConfig(), null, events, onRendered, onDestroyed ), {
        show: function (isShow) {
            if(isShow){
                $spinner.show();
            }else{
                $spinner.hide();
            }
        }
    });
};


export default Spinner;