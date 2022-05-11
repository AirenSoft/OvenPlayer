<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted,
  onUpdated,
} from "vue";

import OvenPlayer from "ovenplayer";
import { OvenPlayerEvents } from "./ovenplayer-events";

let playerInstance = ref(null);
let playerContainer = ref();
let mediaContainer = null;

defineExpose({
  playerInstance,
});

const props = defineProps({
  config: {
    type: Object,
    default: {},
  },
});

const emits = defineEmits(OvenPlayerEvents);

onMounted(function () {
  createPlayer();
});

onUnmounted(function () {
  removePlayer();
});

onUpdated(function () {
  removePlayer();
  createPlayer();
});

function createPlayer() {
  let container = mediaContainer ? mediaContainer : playerContainer.value;

  playerInstance.value = OvenPlayer.create(container, props.config);

  // the element playerContainer is replace to new element by OvenTemplate
  mediaContainer = playerInstance.value.getContainerElement();

  // bind all events
  OvenPlayerEvents.forEach(function (eventName) {
    playerInstance.value.on(eventName, function (eventData) {
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
</script>

<template>
  <div ref="playerContainer"></div>
</template>

