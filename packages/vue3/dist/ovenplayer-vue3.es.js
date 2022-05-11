import { ref, onMounted, onUnmounted, onUpdated, openBlock, createElementBlock } from "vue";
import OvenPlayer from "ovenplayer";
const OvenPlayerEvents = [
  "ready",
  "metaChanged",
  "stateChanged",
  "resized",
  "playbackRateChanged",
  "seek",
  "seeked",
  "time",
  "bufferChanged",
  "mute",
  "volumeChanged",
  "playlistChanged",
  "sourceChanged",
  "qualityLevelChanged",
  "cueChanged",
  "timeDisplayModeChanged",
  "adChanged",
  "adTime",
  "adComplete",
  "fullscreenChanged",
  "clicked",
  "allPlaylistEnded",
  "hlsPrepared",
  "hlsDestroyed",
  "dashPrepared",
  "dashDestroyed",
  "destroy"
];
const _sfc_main = {
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  emits: OvenPlayerEvents,
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    let playerInstance = ref(null);
    let playerContainer = ref();
    let mediaContainer = null;
    expose({
      playerInstance
    });
    onMounted(function() {
      createPlayer();
    });
    onUnmounted(function() {
      removePlayer();
    });
    onUpdated(function() {
      removePlayer();
      createPlayer();
    });
    function createPlayer() {
      let container = mediaContainer ? mediaContainer : playerContainer.value;
      playerInstance.value = OvenPlayer.create(container, props.config);
      mediaContainer = playerInstance.value.getContainerElement();
      OvenPlayerEvents.forEach(function(eventName) {
        playerInstance.value.on(eventName, function(eventData) {
          emits(eventName, eventData);
        });
      });
    }
    function removePlayer() {
      if (playerInstance) {
        playerInstance.value.remove();
        playerInstance.value = null;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "playerContainer",
        ref: playerContainer
      }, null, 512);
    };
  }
};
export { _sfc_main as default };
