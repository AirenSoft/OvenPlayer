import React from "react";
import { OvenPlayerConfig, OvenPlayerEvents } from "ovenplayer";
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
    onPlaybackRateChanged?: (data: OvenPlayerEvents["playbackRateChanged"]) => void;
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
    onQualityLevelChanged?: (data: OvenPlayerEvents["qualityLevelChanged"]) => void;
    /**
     * Triggered when the VTTCue changes (e.g., subtitles or captions).
     * @param data - `OvenPlayerEvents['cueChanged']`
     */
    onCueChanged?: (data: OvenPlayerEvents["cueChanged"]) => void;
    /**
     * Triggered when the time display mode changes (e.g., live vs. VOD).
     * @param data - `OvenPlayerEvents['timeDisplayModeChanged']`
     */
    onTimeDisplayModeChanged?: (data: OvenPlayerEvents["timeDisplayModeChanged"]) => void;
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
declare const OvenPlayer: React.FC<OvenPlayerProps>;
export default OvenPlayer;
