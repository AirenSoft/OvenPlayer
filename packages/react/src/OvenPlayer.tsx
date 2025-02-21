import React, { useEffect, useRef, useCallback } from "react";
import OvenPlayerLib, {
  OvenPlayerConfig,
  OvenPlayerInstance,
  OvenPlayerEvents,
} from "ovenplayer";

/**
 * Props for the OvenPlayerReact component.
 */
export interface OvenPlayerProps {
  /**
   * The configuration object for OvenPlayer.
   */
  config: OvenPlayerConfig;

  /**
   * Triggered when the player is fully initialized and ready to use its API methods.
   */
  onReady?: () => void;

  /**
   * Triggered when new metadata is received.
   * @param data - `OvenPlayerEvents['metaChanged']`
   */
  onMetaChanged?: (data: OvenPlayerEvents["metaChanged"]) => void;

  /**
   * Triggered when the player's state changes.
   * @param data - `OvenPlayerEvents['stateChanged']`
   */
  onStateChanged?: (data: OvenPlayerEvents["stateChanged"]) => void;

  /**
   * Triggered when the player's size changes.
   * @param data - `OvenPlayerEvents['resized']`
   */
  onResized?: (data: OvenPlayerEvents["resized"]) => void;

  /**
   * Triggered when the playback rate changes.
   * @param data - `OvenPlayerEvents['playbackRateChanged']`
   */
  onPlaybackRateChanged?: (
    data: OvenPlayerEvents["playbackRateChanged"]
  ) => void;

  /**
   * Triggered after a seek action is requested (e.g., via scrubbing or API).
   * @param data - `OvenPlayerEvents['seek']`
   */
  onSeek?: (data: OvenPlayerEvents["seek"]) => void;

  /**
   * Triggered periodically (up to ~10 times per second) while the player is playing,
   * providing the current playback position.
   * @param data - `OvenPlayerEvents['time']`
   */
  onTime?: (data: OvenPlayerEvents["time"]) => void;

  /**
   * Triggered when the currently playing item loads additional data into its buffer.
   * @param data - `OvenPlayerEvents['bufferChanged']`
   */
  onBufferChanged?: (data: OvenPlayerEvents["bufferChanged"]) => void;

  /**
   * Triggered when the player's mute state changes (mute/unmute).
   * @param data - `OvenPlayerEvents['mute']`
   */
  onMute?: (data: OvenPlayerEvents["mute"]) => void;

  /**
   * Triggered when the player's volume changes.
   * @param data - `OvenPlayerEvents['volumeChanged']`
   */
  onVolumeChanged?: (data: OvenPlayerEvents["volumeChanged"]) => void;

  /**
   * Triggered when the active playlist changes. This could be due to user interaction
   * or a script calling `setCurrentPlaylist`, or because the previous playlist completed.
   * @param data - `OvenPlayerEvents['playlistChanged']`
   */
  onPlaylistChanged?: (data: OvenPlayerEvents["playlistChanged"]) => void;

  /**
   * Triggered when the active source (protocol) changes. This could be due to user interaction
   * (e.g., source menu) or a script calling `setCurrentSource`.
   * @param data - `OvenPlayerEvents['sourceChanged']`
   */
  onSourceChanged?: (data: OvenPlayerEvents["sourceChanged"]) => void;

  /**
   * Triggered when the active quality level changes. This could be due to user interaction
   * or a script calling `setCurrentQuality`.
   * @param data - `OvenPlayerEvents['qualityLevelChanged']`
   */
  onQualityLevelChanged?: (
    data: OvenPlayerEvents["qualityLevelChanged"]
  ) => void;

  /**
   * Triggered when the VTTCue changes (e.g., subtitles or captions).
   * @param data - `OvenPlayerEvents['cueChanged']`
   */
  onCueChanged?: (data: OvenPlayerEvents["cueChanged"]) => void;

  /**
   * Triggered when the time display mode changes (e.g., live vs. VOD).
   * @param data - `OvenPlayerEvents['timeDisplayModeChanged']`
   */
  onTimeDisplayModeChanged?: (
    data: OvenPlayerEvents["timeDisplayModeChanged"]
  ) => void;

  /**
   * Triggered when an advertisement changes.
   * @param data - `OvenPlayerEvents['adChanged']`
   */
  onAdChanged?: (data: OvenPlayerEvents["adChanged"]) => void;

  /**
   * Triggered periodically during ad playback, providing ad time information.
   * @param data - `OvenPlayerEvents['adTime']`
   */
  onAdTime?: (data: OvenPlayerEvents["adTime"]) => void;

  /**
   * Triggered when an advertisement has completed.
   */
  onAdComplete?: () => void;

  /**
   * Triggered when the screen mode changes (e.g., fullscreen on/off).
   * @param data - `OvenPlayerEvents['fullscreenChanged']`
   */
  onFullscreenChanged?: (data: OvenPlayerEvents["fullscreenChanged"]) => void;

  /**
   * Triggered when the player is clicked.
   * If the ad is clicked, `{ type: "adclick" }` is returned.
   * @param data - `OvenPlayerEvents['clicked']`
   */
  onClicked?: (data: OvenPlayerEvents["clicked"]) => void;

  /**
   * Triggered when the entire playlist finishes (all items ended).
   */
  onAllPlaylistEnded?: () => void;

  /**
   * Triggered when the HLS object has been initialized and is ready for use.
   * @param data - `OvenPlayerEvents['hlsPrepared']`
   */
  onHlsPrepared?: (data: OvenPlayerEvents["hlsPrepared"]) => void;

  /**
   * Triggered after the HLS object has been destroyed.
   */
  onHlsDestroyed?: () => void;

  /**
   * Triggered when the DASH object has been initialized and is ready for use.
   * @param data - `OvenPlayerEvents['dashPrepared']`
   */
  onDashPrepared?: (data: OvenPlayerEvents["dashPrepared"]) => void;

  /**
   * Triggered after the DASH object has been destroyed.
   */
  onDashDestroyed?: () => void;

  /**
   * Triggered when the player is destroyed.
   */
  onDestroy?: () => void;

  /**
   * Triggered when an error occurs.
   * @param data - `OvenPlayerEvents['error']`
   */
  onError?: (data: OvenPlayerEvents["error"]) => void;
}

const OvenPlayer: React.FC<OvenPlayerProps> = (props) => {
  const containerIdRef = useRef(
    `ovenplayer-${Math.random().toString(36).substring(2)}`
  );
  const playerInstanceRef = useRef<OvenPlayerInstance | null>(null);

  const removePlayer = useCallback(() => {
    if (playerInstanceRef.current) {
      try {
        playerInstanceRef.current.remove();
      } catch (err) {
        // ignore
      }
      playerInstanceRef.current = null;
    }
  }, []);

  const createPlayer = useCallback(() => {
    removePlayer();

    const instance = OvenPlayerLib.create(containerIdRef.current, props.config);

    instance.on("ready", () => props.onReady?.());
    instance.on("metaChanged", (data) => props.onMetaChanged?.(data));
    instance.on("stateChanged", (data) => props.onStateChanged?.(data));
    instance.on("resized", (data) => props.onResized?.(data));
    instance.on("playbackRateChanged", (data) =>
      props.onPlaybackRateChanged?.(data)
    );
    instance.on("seek", (data) => props.onSeek?.(data));
    instance.on("time", (data) => props.onTime?.(data));
    instance.on("bufferChanged", (data) => props.onBufferChanged?.(data));
    instance.on("mute", (data) => props.onMute?.(data));
    instance.on("volumeChanged", (data) => props.onVolumeChanged?.(data));
    instance.on("playlistChanged", (data) => props.onPlaylistChanged?.(data));
    instance.on("sourceChanged", (data) => props.onSourceChanged?.(data));
    instance.on("qualityLevelChanged", (data) =>
      props.onQualityLevelChanged?.(data)
    );
    instance.on("cueChanged", (data) => props.onCueChanged?.(data));
    instance.on("timeDisplayModeChanged", (data) =>
      props.onTimeDisplayModeChanged?.(data)
    );
    instance.on("adChanged", (data) => props.onAdChanged?.(data));
    instance.on("adTime", (data) => props.onAdTime?.(data));
    instance.on("adComplete", () => props.onAdComplete?.());
    instance.on("fullscreenChanged", (data) =>
      props.onFullscreenChanged?.(data)
    );
    instance.on("clicked", (data) => props.onClicked?.(data));
    instance.on("allPlaylistEnded", () => props.onAllPlaylistEnded?.());
    instance.on("hlsPrepared", (data) => props.onHlsPrepared?.(data));
    instance.on("hlsDestroyed", () => props.onHlsDestroyed?.());
    instance.on("dashPrepared", (data) => props.onDashPrepared?.(data));
    instance.on("dashDestroyed", () => props.onDashDestroyed?.());
    instance.on("destroy", () => props.onDestroy?.());
    instance.on("error", (data) => props.onError?.(data));

    playerInstanceRef.current = instance;
  }, [props, removePlayer]);

  useEffect(() => {
    createPlayer();
    return () => {
      removePlayer();
    };
  }, [createPlayer, removePlayer]);

  useEffect(() => {
    createPlayer();
  }, [props.config, createPlayer]);

  return <div id={containerIdRef.current} />;
};

export default OvenPlayer;
