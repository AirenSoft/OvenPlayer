<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import OvenPlayer from 'ovenplayer';

import type { OvenPlayerConfig, OvenPlayerInstance, OvenPlayerEvents } from 'ovenplayer';

const playerInstance = ref<OvenPlayerInstance>();
const id = 'ovenplayer-' + Math.random().toString().replace('.', '');

const props = defineProps<{ config: OvenPlayerConfig }>();

const emits = defineEmits<{
  /**
   * Player initialization complete. And you can use API methods.
   */
  (e: 'ready'): void;
  /**
   * It occurs when new metadata is received.
   */
  (e: 'metaChanged', data: OvenPlayerEvents['metaChanged']): void;
  /**
   * It occurs when the state of a player changes.
   */
  (e: 'stateChanged', data: OvenPlayerEvents['stateChanged']): void;
  /**
   * Fired when the player's size has been changed.
   */
  (e: 'resized', data: OvenPlayerEvents['resized']): void;
  /**
   * Fired when the playback rate has been changed
   */
  (e: 'playbackRateChanged', data: OvenPlayerEvents['playbackRateChanged']): void;
  /**
   * Fired after a seek has been requested either by scrubbing the control bar or through the API.
   */
  (e: 'seek', data: OvenPlayerEvents['seek']): void;
  /**
   * While the player is playing, this event is fired as the playback position gets updated. This may occur as frequently as 10 times per second.
   */
  (e: 'time', data: OvenPlayerEvents['time']): void;
  /**
   * Fired when the currently playing item loads additional data into its buffer.
   */
  (e: 'bufferChanged', data: OvenPlayerEvents['bufferChanged']): void;
  /**
   * Triggered when the player has gone in or out of a mute state.
   */
  (e: 'mute', data: OvenPlayerEvents['mute']): void;
  /**
   * Triggered when the player's volume is changed.
   */
  (e: 'volumeChanged', data: OvenPlayerEvents['volumeChanged']): void;
  /**
   * Fired when the active playlist is changed. It happens in response to, e.g., a user clicking an option in the playlist menu or a script calling `setCurrentPlaylist` or prev playlist has been completed.
   */
  (e: 'playlistChanged', data: OvenPlayerEvents['playlistChanged']): void;
  /**
   * Fired when the active source(protocol) is changed. It happens in response to, e.g., a user clicking an option in the source menu or a script calling `setCurrentSource`.
   */
  (e: 'sourceChanged', data: OvenPlayerEvents['sourceChanged']): void;
  /**
   * Fired when the active quality level is changed. It happens in response to, e.g., a user clicking an option in the quality menu or a script calling `setCurrentQuality`.
   */
  (e: 'qualityLevelChanged', data: OvenPlayerEvents['qualityLevelChanged']): void;
  /**
   * Fired when VTTCue is changed.
   */
  (e: 'cueChanged', data: OvenPlayerEvents['cueChanged']): void;
  /**
   * Fired when timecode mode is changed.
   */
  (e: 'timeDisplayModeChanged', data: OvenPlayerEvents['timeDisplayModeChanged']): void;
  /**
   * Fired when Ad is changed.
   */
  (e: 'adChanged', data: OvenPlayerEvents['adChanged']): void;
  /**
   * Fired when Ad is playing.
   */
  (e: 'adTime', data: OvenPlayerEvents['adTime']): void;
  /**
   * Fired when Ad is complete.
   */
  (e: 'adComplete'): void;
  /**
   * Fired when screen mode is changed.
   */
  (e: 'fullscreenChanged', data: OvenPlayerEvents['fullscreenChanged']): void;
  /**
   * Triggered when the player is clicked.
   * If ad clicked, this returns {type : "adclick"}.
   */
  (e: 'clicked', data: OvenPlayerEvents['clicked']): void;
  /**
   * Fired when the all playlist is complete.
   */
  (e: 'allPlaylistEnded'): void;
  /**
   * Triggered when HLS object is initialized and ready to use.
   */
  (e: 'hlsPrepared', data: OvenPlayerEvents['hlsPrepared']): void;
  /**
   * Triggered after HLS object is destroyed.
   */
  (e: 'hlsDestroyed'): void;
  /**
   * Triggered when DASH object is initialized and ready to use.
   */
  (e: 'dashPrepared', data: OvenPlayerEvents['dashPrepared']): void;
  /**
   * Triggered after DASH object is destroyed.
   */
  (e: 'dashDestroyed'): void;
  /**
   * Player is destroyed.
   */
  (e: 'destroy'): void;
  /**
   * Error occurred.
   * @internal
   */
  (e: 'error', data: OvenPlayerEvents['error']): void;
}>();

const createPlayer = () => {
  playerInstance.value = OvenPlayer.create(id, props.config);

  // bind all events
  {
    playerInstance.value.on('ready', () => emits('ready'));
    playerInstance.value.on('metaChanged', (eventData) => emits('metaChanged', eventData));
    playerInstance.value.on('stateChanged', (eventData) => emits('stateChanged', eventData));
    playerInstance.value.on('resized', (eventData) => emits('resized', eventData));
    playerInstance.value.on('playbackRateChanged', (eventData) => emits('playbackRateChanged', eventData));
    playerInstance.value.on('seek', (eventData) => emits('seek', eventData));
    playerInstance.value.on('time', (eventData) => emits('time', eventData));
    playerInstance.value.on('bufferChanged', (eventData) => emits('bufferChanged', eventData));
    playerInstance.value.on('mute', (eventData) => emits('mute', eventData));
    playerInstance.value.on('volumeChanged', (eventData) => emits('volumeChanged', eventData));
    playerInstance.value.on('playlistChanged', (eventData) => emits('playlistChanged', eventData));
    playerInstance.value.on('sourceChanged', (eventData) => emits('sourceChanged', eventData));
    playerInstance.value.on('qualityLevelChanged', (eventData) => emits('qualityLevelChanged', eventData));
    playerInstance.value.on('cueChanged', (eventData) => emits('cueChanged', eventData));
    playerInstance.value.on('timeDisplayModeChanged', (eventData) => emits('timeDisplayModeChanged', eventData));
    playerInstance.value.on('adChanged', (eventData) => emits('adChanged', eventData));
    playerInstance.value.on('adTime', (eventData) => emits('adTime', eventData));
    playerInstance.value.on('adComplete', () => emits('adComplete'));
    playerInstance.value.on('fullscreenChanged', (eventData) => emits('fullscreenChanged', eventData));
    playerInstance.value.on('clicked', (eventData) => emits('clicked', eventData));
    playerInstance.value.on('allPlaylistEnded', () => emits('allPlaylistEnded'));
    playerInstance.value.on('hlsPrepared', (eventData) => emits('hlsPrepared', eventData));
    playerInstance.value.on('hlsDestroyed', () => emits('hlsDestroyed'));
    playerInstance.value.on('dashPrepared', (eventData) => emits('dashPrepared', eventData));
    playerInstance.value.on('dashDestroyed', () => emits('dashDestroyed'));
    playerInstance.value.on('destroy', () => emits('destroy'));
    playerInstance.value.on('error', (eventData) => emits('error', eventData));
  }
};

const removePlayer = () => {
  if (!playerInstance.value) return;

  // sometimes, playerInstance.value.remove() is not working.
  try {
    playerInstance.value.remove();
  } catch (error) {
    // ignore
  }
  playerInstance.value = undefined;
};

defineExpose({
  createPlayer,
  removePlayer,
  playerInstance
});

onMounted(createPlayer);

onUnmounted(removePlayer);

watch(
  () => props.config,
  () => {
    removePlayer();
    createPlayer();
  },
  { deep: true }
);
</script>

<template>
  <div :id="id" />
</template>
