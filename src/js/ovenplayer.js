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

/*
*
* 1. 배속 - 배속 뒤에 x 붙임, normal 대신 1x 사용, 저속->고속 순서를 고속 -> 저속 순서로 변경
 2. timecode -> Play time, framecode -> Framecode
 3. 시간 자리수 오류 개선

 OvenCloud Pro에서 수정할 사항
 1. 플레이어 크기 문제 - 아주 큰 사이즈의 모니터에서 하단 잘림
 2. 프레임 UI 제거
 3. 페이지 전체 글로벌 이벤트로 플레이어 제어
 4. 자막 - 소문자 -> 무조건 대문자로 표기
*
* */