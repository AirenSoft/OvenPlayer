import OvenPlayerSDK, {checkAndGetContainerElement} from './ovenplayer.sdk'
import View from './view/view';
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

    const view = new View();

    view.appendPlayerMarkup(containerElement);

    const playerInstance = OvenPlayerSDK.create(view.getMediaElementContainer(), options);

    view.addComponentsAndFunctions(playerInstance, options);

    return playerInstance;
}

