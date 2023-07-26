import {version} from 'version'
import OvenPlayerSDK from './ovenplayer.sdk'
import {checkAndGetContainerElement} from 'utils/validator'
import View from './view/view';

function ovenPlayerFactory() {

    const OvenPlayer = {};

    Object.assign(OvenPlayer, OvenPlayerSDK);

    OvenPlayer.create = function (container, options) {

        let containerElement = checkAndGetContainerElement(container);

        let player = View(containerElement);

        const playerInstance = OvenPlayerSDK.create(player.getMediaElementContainer(), options);

        player.setApi(playerInstance);

        OvenPlayerConsole.log("[OvenPlayer] v."+ version);

        return playerInstance;
    };

    return OvenPlayer;
}

export default ovenPlayerFactory()
