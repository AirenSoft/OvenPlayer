/**
 * Created by hoho on 2018. 8. 1..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import LA$ from 'utils/likeA$';

const ContextPanel = function($container, api, position){
    const $root = LA$("#"+api.getContainerId());

    const onRendered = function($current, template){
        const panelWidth = $current.width();
        const panelHeight = $current.height();

        const x = Math.min(position.pageX - $root.offset().left, $root.width() - panelWidth);
        const y = Math.min(position.pageY - $root.offset().top, $root.height() - panelHeight);

        $current.css("left" , x + "px");
        $current.css("top" , y + "px");
    };
    const onDestroyed = function(){
        //Do nothing.
    };
    const events = {
        "click .op-context-item" : function(event, $current, template){
            event.preventDefault();

            window.open(
                'https://github.com/AirenSoft/OvenPlayer',
                '_blank'
            );
        }
    };

    return OvenTemplate($container, "ContextPanel", api.getConfig(), position, events, onRendered, onDestroyed );

};

export default ContextPanel;
