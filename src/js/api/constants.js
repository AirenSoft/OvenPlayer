// STATE
export const STATE_BUFFERING = "buffering";
export const STATE_IDLE = "idle";
export const STATE_COMPLETE = "complete";
export const STATE_PAUSED = "paused";
export const STATE_PLAYING = "playing";
export const STATE_ERROR = "error";
export const STATE_LOADING = "loading";
export const STATE_STALLED = "stalled";

export const STATE_AD_LOADED = "adLoaded";
export const STATE_AD_PLAYING = "adPlaying";
export const STATE_AD_PAUSED = "adPaused";
export const STATE_AD_COMPLETE = "adComplete";

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
export const PLAYLIST_CHANGED = "playlistChanged";
export const CONTENT_SEEKED = "seeked";
export const ALL_PLAYLIST_ENDED = "allPlaylistEnded";
export const NETWORK_UNSTABLED = "unstableNetwork";


export const ERROR = "error";

// STATE OF PLAYER
export const PLAYER_STATE = "stateChanged";
export const PLAYER_COMPLETE = STATE_COMPLETE;
export const PLAYER_PAUSE = "pause";
export const PLAYER_PLAY = "play";
export const PLAYER_RESIZED = "resized";
export const PLAYER_FULLSCREEN_CHANGED = "fullscreenChanged";

export const AD_CHANGED = "adChanged";
export const AD_TIME = "adTime";
export const CONTENT_BUFFER = "bufferChanged";
export const CONTENT_TIME = "time";
export const CONTENT_RATE_CHANGE = "ratechange";
export const CONTENT_VOLUME = "volumeChanged";
export const CONTENT_MUTE = "mute";
export const CONTENT_META = "metaChanged";
export const CONTENT_SOURCE_CHANGED = "sourceChanged";
export const CONTENT_LEVEL_CHANGED = "qualityLevelChanged";
export const PLAYBACK_RATE_CHANGED = "playbackRateChanged";
export const CONTENT_CAPTION_CUE_CHANGED = "cueChanged";
export const CONTENT_CAPTION_CHANGED = "captionChanged";
export const CONTENT_TIME_MODE_CHANGED = "timeDisplayModeChanged";
export const OME_P2P_MODE = "p2pMode";


export const INIT_UNKNWON_ERROR = 100;
export const INIT_UNSUPPORT_ERROR = 101;
export const INIT_RTMP_SETUP_ERROR = 102;
export const PLAYER_UNKNWON_ERROR = 300;
export const PLAYER_UNKNWON_OPERATION_ERROR = 301;
export const PLAYER_UNKNWON_NEWWORK_ERROR = 302;
export const PLAYER_UNKNWON_DECODE_ERROR = 303;
export const PLAYER_FILE_ERROR = 304;
export const PLAYER_CAPTION_ERROR = 305;
export const PLAYER_WEBRTC_WS_ERROR = 501;
export const PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = 502;
export const PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = 503;
export const PLAYER_WEBRTC_CREATE_ANSWER_ERROR = 504;
export const PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = 505;
export const PLAYER_WEBRTC_NETWORK_SLOW = 510;


export const ERRORS = {
    100 : {code : 100 , message : "Can not load due to unknown reasons.", reason :"Can not load due to unknown reasons."},
    101 : {code : 101 , message : "Can not load due to unsupported media.", reason :"Can not load due to unsupported media."},
    102 : {code : 102 , message : "Flash fetching process aborted. <a href='http://www.adobe.com/go/getflashplayer' target='_self'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a>", reason :"It looks like not found swf or your environment is localhost."},
    103 : {code : 103 , message : "Can not load due to dashjs. Please check the lastest version.", reason :"dash.js version is old. Please check the lastest."},
    300 : {code : 300 , message : "Can not play due to unknown reasons.", reason :"Can not play due to unknown reasons."},
    301 : {code : 301 , message : "Fetching process aborted by user.", reason :"Fetching process aborted by user."},
    302 : {code : 302 , message : "Some of the media could not be downloaded due to a network error.", reason :"Error occurred when downloading."},
    303 : {code : 303 , message : "Unable to load media. This may be due to a server or network error, or due to an unsupported format.", reason :"Error occurred when decoding."},
    304 : {code : 304 , message : "Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.", reason :"Media playback not supported."},
    305 : {code : 305 , message : "Can not load captions due to unknown reasons.", reason :"Can not load captions due to unknown reasons."},
    501 : {code : 501 , message : "Connection with low-latency(OME) server failed.", reason :"WebSocket connection failed."},
    502 : {code : 502 , message : "Connection with low-latency(OME) server failed.", reason :"WebRTC addIceCandidate failed."},
    503 : {code : 503 , message : "Connection with low-latency(OME) server failed.", reason :"WebRTC setRemoteDescription failed."},
    504 : {code : 504 , message : "Connection with low-latency(OME) server failed.", reason :"WebRTC peer createOffer failed."},
    505 : {code : 505 , message : "Connection with low-latency(OME) server failed.", reason :"WebRTC setLocalDescription failed."},
    510 : {code : 510 , message : "Network connection is unstable. Check the network connection.", reason :"Network is slow."}
};
