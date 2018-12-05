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

    const playerInstance = OvenPlayerSDK.create(player.getMediaElementContainer(), options);

    Object.assign(playerInstance, {
        getContainerId : function(){
           return containerElement.id;
       }
    });

    player.setApi(playerInstance);

    return playerInstance;
}

