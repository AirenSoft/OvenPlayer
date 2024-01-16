/**
 * Created by hoho on 2018. 8. 24..
 */
import Provider from "api/provider/html5/Provider";
import { errorTrigger } from "api/provider/utils";
import { PROVIDER_HTML5, STATE_IDLE } from "api/constants";
import {
  arrayToString,
  base64DecodeUint8Array,
  base64EncodeUint8Array,
  stringToUint16Array,
  concatInitDataIdAndCertificate
} from "utils/eme";
import { ERRORS, INIT_DRM_FAIL } from "api/constants";

/**
 * @brief   html5 provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

const Html5 = function (element, playerConfig, adTagUrl) {

  let spec = {
    name: PROVIDER_HTML5,
    element: element,
    mse: null,
    listener: null,
    isLoaded: false,
    canSeek: false,
    isLive: false,
    seeking: false,
    state: STATE_IDLE,
    buffer: 0,
    framerate: 0,
    currentQuality: -1,
    qualityLevels: [],
    currentAudioTrack: -1,
    audioTracks: [],
    currentSource: -1,
    sources: [],
    adTagUrl: adTagUrl
  };

  let that = Provider(spec, playerConfig, null);
  let superDestroy_func = that.super('destroy');

  OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");


  let cert = null;

  function loadCertificate(serverCertificatePath) {

    return new Promise(function (resolve, reject) {

      fetch(serverCertificatePath).then(function (response) {

        response.text().then(function (text) {

          resolve(base64DecodeUint8Array(text));
        }).catch(function (err) {
          reject(err);
        });

      }).catch(function (err) {
        reject(err);
      });
    });
  }

  function getLicense(keyMessage) {

    return new Promise(function (resolve, reject) {

      const licenseServerUrl = playerConfig.getConfig().hlsConfig.drmSystems['com.apple.fps'].licenseUrl;
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

      if (playerConfig.getConfig().licenseCustomHeader) {
        headers.append(playerConfig.getConfig().licenseCustomHeader.key, playerConfig.getConfig().licenseCustomHeader.value);
      }

      fetch(licenseServerUrl, {
        method: 'POST',
        headers: headers,
        body: "spc=" + base64EncodeUint8Array(keyMessage),
      }).then(function (response) {

        response.text().then(function (text) {
          resolve(base64DecodeUint8Array(text));
        }).catch(function (err) {
          reject(err);
        });
      }).catch(function (err) {
        reject(err);
      });
    });
  }

  function addKey(initData, contentId) {

    return new Promise(function (resolve, reject) {

      if (!element.webkitKeys) {
        try {
          element.webkitSetMediaKeys(new window.WebKitMediaKeys('com.apple.fps.1_0'));
        } catch (err) {
          reject(err);
          return;
        }
      }

      let keySession;

      try {
        keySession = element.webkitKeys.createSession('video/mp4', concatInitDataIdAndCertificate({
          id: contentId,
          initData: initData,
          cert: cert
        }));
      } catch (err) {
        reject(err);
        return;
      }

      keySession.contentId = contentId;

      keySession.addEventListener('webkitkeymessage', function (event) {

        getLicense(event.message).then(function (license) {

          keySession.update(new Uint8Array(license));
          resolve();
        }).catch(function (err) {
          reject(err);
          return;
        });
      });

      keySession.addEventListener('webkitkeyadded', function () {

      });

      keySession.addEventListener('webkitkeyerror', function () {

        var err = keySession.error;
        reject(err);
      });
    });
  }

  function encrypted(event) {
    const initDataType = event.initDataType;
    const initData = event.initData;
    const initDataString = arrayToString(initData);
    const contentId = initDataString.substring(initDataString.indexOf('skd://') + 6);
    addKey(initData, contentId).catch(function (err) {
      let tempError = ERRORS.codes[INIT_DRM_FAIL];
      tempError.message = 'Could not add add key.';
      errorTrigger(ERRORS.codes[INIT_DRM_FAIL], that);
    });
  }

  function enableDrm() {

    return new Promise(function (resolve, reject) {
      const serverCertificatePath = playerConfig.getConfig().hlsConfig.drmSystems['com.apple.fps'].serverCertificateUrl;
      loadCertificate(serverCertificatePath).then(function (certificate) {
        cert = certificate;
        element.addEventListener('webkitneedkey', encrypted, { once: true });
      }).catch(function (err) {
        reject(err);
      });
    });
  }

  if (playerConfig.getConfig().hlsConfig && playerConfig.getConfig().hlsConfig.emeEnabled) {

    enableDrm().catch(function (err) {
      let tempError = ERRORS.codes[INIT_DRM_FAIL];
      tempError.message = 'Could not load drm certificate.';
      errorTrigger(ERRORS.codes[INIT_DRM_FAIL], that);
    });
  }

  that.destroy = () => {
    OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");

    superDestroy_func();
  };

  return that;

};

export default Html5;
