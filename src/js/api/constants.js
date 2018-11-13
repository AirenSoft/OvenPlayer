// STATE
export const STATE_BUFFERING = "buffering";
export const STATE_IDLE = "idle";
export const STATE_COMPLETE = "complete";
export const STATE_PAUSED = "paused";
export const STATE_PLAYING = "playing";
export const STATE_ERROR = "error";
export const STATE_LOADING = "loading";
export const STATE_STALLED = "stalled";


// PROVIDER
export const PROVIDER_HTML5 = "html5";
export const PROVIDER_WEBRTC = "webrtc";
export const PROVIDER_DASH = "dash";
export const PROVIDER_HLS = "hls";
export const PROVIDER_RTMP = "rtmp";

// EVENTS
export const CONTENT_COMPLETE = STATE_COMPLETE;
export const READY = "ready";
export const DESTROY = "destroy";
export const CONTENT_SEEK = "seek";
export const CONTENT_BUFFER_FULL = "bufferFull";
export const DISPLAY_CLICK = "displayClick";
export const CONTENT_LOADED = "loaded";
export const CONTENT_SEEKED = "seeked";
export const NETWORK_UNSTABLED = "unstableNetwork";

export const ERROR = "error";

// STATE OF PLAYER
export const PLAYER_STATE = "stateChanged";
export const PLAYER_COMPLETE = STATE_COMPLETE;
export const PLAYER_PAUSE = "pause";
export const PLAYER_PLAY = "play";

export const CONTENT_BUFFER = "bufferChanged";
export const CONTENT_TIME = "time";
export const CONTENT_RATE_CHANGE = "ratechange";
export const CONTENT_VOLUME = "volumeChanged";
export const CONTENT_MUTE = "mute";
export const CONTENT_META = "metaChanged";
//export const CONTENT_LEVELS = "qualityLevelChanged";
export const CONTENT_SOURCE_CHANGED = "sourceChanged";
export const CONTENT_LEVEL_CHANGED = "currentQualityLevelChanged";
export const PLAYBACK_RATE_CHANGED = "playbackRateChanged";
export const CONTENT_CAPTION_CUE_CHANGED = "cueChanged";
export const CONTENT_CAPTION_CHANGED = "captionChanged";


export const INIT_ERROR = 100;
export const PLAYER_UNKNWON_ERROR = 300;
export const PLAYER_UNKNWON_OPERATION_ERROR = 301;
export const PLAYER_UNKNWON_NEWWORK_ERROR = 302;
export const PLAYER_UNKNWON_DECODE_ERROR = 303;
export const PLAYER_FILE_ERROR = 304;
export const PLAYER_CAPTION_ERROR = 305;
export const PLAYER_WEBRTC_WS_ERROR = 501;
export const PLAYER_WEBRTC_WS_CLOSED = 502;
export const PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = 503;
export const PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = 504;
export const PLAYER_WEBRTC_CREATE_ANSWER_ERROR = 505;
export const PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = 506;
export const PLAYER_WEBRTC_NETWORK_SLOW = 510;
