import {version} from 'version'
import OvenPlayerSDK from './ovenplayer.sdk'
import {checkAndGetContainerElement} from 'utils/validator'
import View from './view/view';

function ovenPlayerFactory() {

    const OvenPlayer = {};

    Object.assign(OvenPlayer, OvenPlayerSDK);

    OvenPlayer.create = function (container, options) {

        console.log("[OvenPlayer] v."+ version);

        let containerElement = checkAndGetContainerElement(container);

        let player = View(containerElement);

        const playerInstance = OvenPlayerSDK.create(player.getMediaElementContainer(), options);


        Object.assign(playerInstance, {
            getContainerId: function () {
                return containerElement.id;
            }
        });

        player.setApi(playerInstance);

        return playerInstance;
    };

    return OvenPlayer;
}

export default ovenPlayerFactory()