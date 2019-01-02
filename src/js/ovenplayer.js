import OvenPlayerSDK, {checkAndGetContainerElement} from './ovenplayer.sdk'
import View from './view/view';
import dom from './utils/polyfills/dom.js';
import 'babel-polyfill';
import {getScriptPath} from 'utils/webpack';


__webpack_public_path__ = getScriptPath('ovenplayer.js');

const OvenPlayer = {};
window.OvenPlayer = OvenPlayer;


/**
 * Copy properties from OvenPlayerSDK object to OvenPlayer object
 */
Object.assign(OvenPlayer, OvenPlayerSDK);

OvenPlayer.create = function (container, options) {
    let containerElement = checkAndGetContainerElement(container);

    var player = View(containerElement);

    if (!window.console || Object.keys(window.console).length === 0) {
        window.console = {
            log: function() {},
            info: function() {},
            error: function() {},
            warn: function() {}
        };
    }
    if (!window.OvenPlayerConsole || Object.keys(window.OvenPlayerConsole).length === 0) {
        window.OvenPlayerConsole = {};
        OvenPlayerConsole['log'] = function(){};
    }


    const playerInstance = OvenPlayerSDK.create(player.getMediaElementContainer(), options);
    if(options.debug){
        playerInstance.log = window['console']['log'];
    }

    Object.assign(playerInstance, {
        getContainerId : function(){
           return containerElement.id;
       }
    });

    player.setApi(playerInstance);

    return playerInstance;
}