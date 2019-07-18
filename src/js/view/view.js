/**
 * Created by hoho on 2018. 7. 20..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import Helpers from 'view/components/helpers/main';
import Controls from 'view/components/controls/main';
import PanelManager from "view/global/PanelManager";
import ContextPanel from 'view/components/helpers/contextPanel';
import LA$ from 'utils/likeA$';
import {
    READY,
    DESTROY,
    PLAYER_RESIZED,
    PLAYER_PLAY,
    STATE_IDLE,
    STATE_AD_PLAYING,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_PAUSED,
    STATE_ERROR,
    CONTENT_META,
    PLAYER_STATE,
    PLAYER_CLICKED,
    ERROR
} from "api/constants";
import ResizeSensor from "resize-sensor";

require('../../stylesheet/ovenplayer.less');

const View = function($container){
    let viewTemplate = "", controls = "", helper = "", $playerRoot, contextPanel = "", api = "", autoHideTimer = "", playerState = STATE_IDLE;
    let isShiftPressed = false;
    let panelManager = PanelManager();
    let screenSize = "";
    let currentPlayerSize = "";

    let that = {};

    //Member Functions
    function setHide(hide, autoHide) {
        if (autoHideTimer) {
            clearTimeout(autoHideTimer);
            autoHideTimer = null;
        }

        if (hide) {
            if(panelManager.size() > 0){
                return false;
            }
            $playerRoot.addClass("op-autohide");
        } else {
            $playerRoot.removeClass("op-autohide");

            if (autoHide) {
                autoHideTimer = setTimeout(function() {
                    if(panelManager.size()> 0){
                        return false;
                    }
                    $playerRoot.addClass("op-autohide");
                }, 3000);
            }
        }
    };
    function togglePlayPause() {
        const currentState = playerState;

        if (currentState === STATE_IDLE || currentState === STATE_PAUSED || currentState === STATE_COMPLETE) {
            api.play();
        }else if(currentState === STATE_PLAYING){
            api.pause();
        }
    };
    function seek(seconds, isRewind) {

        const duration = api.getDuration();
        const currentPosition = api.getPosition();
        let position = 0;

        if(isRewind){
            position = Math.max(currentPosition - seconds, 0);
        }else{
            position = Math.min(currentPosition + seconds, duration);
        }

        api.seek(position);
    };
    function volume(isUp){
        const currentVolumn = api.getVolume();
        let newVolume = 0;
        if(isUp){
            newVolume =  Math.min(currentVolumn + 5, 100);
        }else{
            newVolume = Math.max(currentVolumn - 5, 0);
        }
        api.setVolume(newVolume);
    };
    function createContextPanel(pageX, pageY){
        if(contextPanel){
            contextPanel.destroy();
            contextPanel = null;
        }
        contextPanel = ContextPanel($playerRoot, api, {pageX : pageX, pageY : pageY});
    };

    function calcPlayerWidth(){
        let playerWidth = $playerRoot.width();
        if(playerWidth < 576){
            screenSize = "xsmall";
            $playerRoot.addClass("xsmall");
        }else if(playerWidth < 768){
            screenSize = "small";
            $playerRoot.addClass("small");
        }else if(playerWidth < 992){
            screenSize = "medium";
            $playerRoot.addClass("medium");
        }else{
            screenSize = "large";
            $playerRoot.addClass("large");
        }
    };

    const onRendered = function($current, template){
        $playerRoot = $current;
        viewTemplate = template;
        calcPlayerWidth();
        new ResizeSensor($playerRoot.get(), function() {

            $playerRoot.removeClass("large");
            $playerRoot.removeClass("medium");
            $playerRoot.removeClass("small");
            $playerRoot.removeClass("xsmall");
            calcPlayerWidth();
            if(screenSize !== currentPlayerSize){
                currentPlayerSize = screenSize;
                if(api){
                    api.trigger(PLAYER_RESIZED, currentPlayerSize);
                }

            }
        });

    };
    const onDestroyed = function(){
        if(helper){
            helper.destroy();
            helper = null;
        }
        if(controls){
            controls.destroy();
            controls = null;
        }
    };
    const events = {
        "click .ovenplayer" : function(event, $current, template){

            if(api){
                api.trigger(PLAYER_CLICKED, event);
            }
            if(contextPanel){
                event.preventDefault();
                contextPanel.destroy();
                contextPanel = null;
                //return false;
            }

            if(!(LA$(event.target).closest(".op-controls-container") || LA$(event.target).closest(".op-setting-panel") )){
                if(panelManager.size() > 0){
                    event.preventDefault();
                    panelManager.clear();
                    //return false;
                }
                //togglePlayPause();
            }
        },
        //For iOS safari
        "touchstart .ovenplayer" : function(event, $current, template){
            if (playerState === STATE_PLAYING || (playerState === STATE_AD_PLAYING && screenSize === "xsmall")) {
                setHide(false, true);
            } else {
                setHide(false);
            }
        },
        "mouseenter .ovenplayer" : function(event, $current, template){
            event.preventDefault();

            //small screen with STATE_AD_PLAYING setHide too. becuase mobile hide ad ui.
            if (playerState === STATE_PLAYING || (playerState === STATE_AD_PLAYING && screenSize === "xsmall")) {
                setHide(false, true);
            } else {
                setHide(false);
            }
        },
        "mousemove .ovenplayer" : function(event, $current, template){
            event.preventDefault();

            if (playerState === STATE_PLAYING || (playerState === STATE_AD_PLAYING && screenSize === "xsmall")) {
                setHide(false, true);
            } else {
                setHide(false);
            }
        },
        "mouseleave .ovenplayer" : function(event, $current, template){
            event.preventDefault();

            if(playerState === STATE_PLAYING  || (playerState === STATE_AD_PLAYING && screenSize === "xsmall")){
                setHide(true);
            }
        },
        "keydown .ovenplayer" : function(event, $current, template){
            let frameMode = api.getFramerate();
            switch(event.keyCode){
                case 16 :   //shift
                    event.preventDefault();
                    isShiftPressed = true;
                    break;
                case 32 :   //sapce
                    event.preventDefault();
                    togglePlayPause();
                    break;
                case 37 : //arrow left
                    event.preventDefault();
                    if(isShiftPressed && frameMode){
                        api.seekFrame(-1);
                    }else{
                        seek(5, true);
                    }
                    break;
                case 39 : //arrow right
                    event.preventDefault();
                    if(isShiftPressed && frameMode){
                        api.seekFrame(1);
                    }else{
                        seek(5, false);
                    }
                    break;
                case 38 : //arrow up
                    event.preventDefault();
                    volume(true);
                    break;
                case 40 : //arrow up
                    event.preventDefault();
                    volume(false);
                    break;
            }

        },
        "keyup .ovenplayer" : function(event, $current, template){
            switch(event.keyCode) {
                case 16 :   //shift
                    event.preventDefault();
                    isShiftPressed = false;
                    break;
            }

        },
        "contextmenu .ovenplayer" : function(event, $current, template){
            event.stopPropagation();
            if(!LA$(event.currentTarget).find("object")){
                event.preventDefault();
                createContextPanel(event.pageX, event.pageY);
                return false;
            }
        }
    };

    that = OvenTemplate($container, "View", null, $container.id, events, onRendered, onDestroyed, true);

    that.getMediaElementContainer = () => {
        return $playerRoot.find(".op-media-element-container").get();
    };

    that.setApi = (playerInstance) => {
        api = playerInstance;
        let showControlBar = api.getConfig() && api.getConfig().controls;

        helper = Helpers($playerRoot.find(".op-ui"), playerInstance);
        if(showControlBar){
            controls = Controls($playerRoot.find(".op-ui"), playerInstance);
        }

        api.on(READY, function(data) {
            if(!controls && showControlBar){
                controls = Controls($playerRoot.find(".op-ui"), playerInstance);
            }
        });

        api.on(ERROR, function(error) {
            if(api){
                let sources = api.getSources()||[];
                if(controls && (sources.length <= 1)){
                    controls.destroy();
                    controls = null;
                }
            }

        });

        api.on(DESTROY, function(data) {
            viewTemplate.destroy();
        });

        api.on(PLAYER_STATE, function(data){
            if(data && data.newstate){
                playerState = data.newstate;
                if(data.newstate === STATE_PLAYING || (data.newstate === STATE_AD_PLAYING && screenSize === "xsmall")){
                    setHide(false, true);
                }else{
                    setHide(false);
                }
            }
        });
    };


    return that;
};



export default View;
