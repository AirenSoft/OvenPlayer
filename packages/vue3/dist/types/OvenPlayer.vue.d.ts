import type { OvenPlayerConfig, OvenPlayerInstance } from 'ovenplayer';
declare const _default: import("vue").DefineComponent<{
    config: {
        type: import("vue").PropType<OvenPlayerConfig>;
        required: true;
    };
}, {
    createPlayer: () => void;
    removePlayer: () => void;
    playerInstance: import("vue").Ref<OvenPlayerInstance | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    ready: () => void;
    metaChanged: (data: {
        duration: number;
        isP2P: boolean;
        type: string;
    }) => void;
    stateChanged: (data: {
        prevstate: import("ovenplayer").OvenPlayerState;
        newstate: import("ovenplayer").OvenPlayerState;
    }) => void;
    resized: (data: "large" | "medium" | "small" | "xsmall") => void;
    playbackRateChanged: (data: number) => void;
    seek: (data: {
        position: string;
        newstate: string;
    }) => void;
    time: (data: {
        duration: number;
        position: number;
    }) => void;
    bufferChanged: (data: {
        duration: number;
        position: number;
        buffer: number;
    }) => void;
    mute: (data: number) => void;
    volumeChanged: (data: number) => void;
    playlistChanged: (data: number) => void;
    sourceChanged: (data: number) => void;
    qualityLevelChanged: (data: {
        currentQuality: number;
        type: "request" | "render";
        isAuto: boolean;
    }) => void;
    cueChanged: (data: VTTCue) => void;
    timeDisplayModeChanged: (data: boolean) => void;
    adChanged: (data: {
        isLinear: boolean;
        duration: number;
        skipTimeOffset: number;
    }) => void;
    adTime: (data: {
        isLinear: boolean;
        duration: number;
        skipTimeOffset: number;
        remaining: number;
        position: number;
    }) => void;
    adComplete: () => void;
    fullscreenChanged: (data: boolean) => void;
    clicked: (data: Event) => void;
    allPlaylistEnded: () => void;
    hlsPrepared: (data: object) => void;
    hlsDestroyed: () => void;
    dashPrepared: (data: object) => void;
    dashDestroyed: () => void;
    destroy: () => void;
    error: (data: {
        code: number;
        error?: string | Error | undefined;
        message: string;
        reason: string;
    }) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    config: {
        type: import("vue").PropType<OvenPlayerConfig>;
        required: true;
    };
}>> & {
    onReady?: (() => any) | undefined;
    onMetaChanged?: ((data: {
        duration: number;
        isP2P: boolean;
        type: string;
    }) => any) | undefined;
    onStateChanged?: ((data: {
        prevstate: import("ovenplayer").OvenPlayerState;
        newstate: import("ovenplayer").OvenPlayerState;
    }) => any) | undefined;
    onResized?: ((data: "large" | "medium" | "small" | "xsmall") => any) | undefined;
    onPlaybackRateChanged?: ((data: number) => any) | undefined;
    onSeek?: ((data: {
        position: string;
        newstate: string;
    }) => any) | undefined;
    onTime?: ((data: {
        duration: number;
        position: number;
    }) => any) | undefined;
    onBufferChanged?: ((data: {
        duration: number;
        position: number;
        buffer: number;
    }) => any) | undefined;
    onMute?: ((data: number) => any) | undefined;
    onVolumeChanged?: ((data: number) => any) | undefined;
    onPlaylistChanged?: ((data: number) => any) | undefined;
    onSourceChanged?: ((data: number) => any) | undefined;
    onQualityLevelChanged?: ((data: {
        currentQuality: number;
        type: "request" | "render";
        isAuto: boolean;
    }) => any) | undefined;
    onCueChanged?: ((data: VTTCue) => any) | undefined;
    onTimeDisplayModeChanged?: ((data: boolean) => any) | undefined;
    onAdChanged?: ((data: {
        isLinear: boolean;
        duration: number;
        skipTimeOffset: number;
    }) => any) | undefined;
    onAdTime?: ((data: {
        isLinear: boolean;
        duration: number;
        skipTimeOffset: number;
        remaining: number;
        position: number;
    }) => any) | undefined;
    onAdComplete?: (() => any) | undefined;
    onFullscreenChanged?: ((data: boolean) => any) | undefined;
    onClicked?: ((data: Event) => any) | undefined;
    onAllPlaylistEnded?: (() => any) | undefined;
    onHlsPrepared?: ((data: object) => any) | undefined;
    onHlsDestroyed?: (() => any) | undefined;
    onDashPrepared?: ((data: object) => any) | undefined;
    onDashDestroyed?: (() => any) | undefined;
    onDestroy?: (() => any) | undefined;
    onError?: ((data: {
        code: number;
        error?: string | Error | undefined;
        message: string;
        reason: string;
    }) => any) | undefined;
}, {}, {}>;
export default _default;
