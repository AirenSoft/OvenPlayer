// STATE
export const STATE_BUFFERING = "buffering";
export const STATE_IDLE = "idle";
export const STATE_COMPLETE = "complete";
export const STATE_PAUSED = "paused";
export const STATE_PLAYING = "playing";
export const STATE_ERROR = "error";
export const STATE_LOADING = "loading";
export const STATE_STALLED = "stalled";

export const STATE_AD_LOADING = "adLoading";
export const STATE_AD_LOADED = "adLoaded";
export const STATE_AD_PLAYING = "adPlaying";
export const STATE_AD_PAUSED = "adPaused";
export const STATE_AD_COMPLETE = "adComplete";
export const STATE_AD_ERROR = "adError";
export const PLAYER_AD_CLICK = "adclick";

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

export const PLAYER_CLICKED = "clicked";
export const PLAYER_RESIZED = "resized";
export const PLAYER_LOADING = "loading";
export const PLAYER_FULLSCREEN_REQUEST = "fullscreenRequested";
export const PLAYER_FULLSCREEN_CHANGED = "fullscreenChanged";
export const PLAYER_WARNING = "warning";

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


export const AD_CLIENT_GOOGLEIMA = "googleima";
export const AD_CLIENT_VAST = "vast";


export const INIT_UNKNWON_ERROR = 100;
export const INIT_UNSUPPORT_ERROR = 101;
export const INIT_RTMP_SETUP_ERROR = 102;
export const INIT_DASH_UNSUPPORT = 103;
export const INIT_ADS_ERROR = 104;
export const INIT_DASH_NOTFOUND = 105;
export const INIT_HLSJS_NOTFOUND = 106;
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

export const WARN_MSG_MUTEDPLAY = "Please touch here to turn on the sound.";


export const UI_ICONS = {
    volume_mute : "volume-mute",
    op_warning : "op-warning"
};


export const ERRORS = {codes : ""};


export const SYSTEM_TEXT = [
    {
        "lang" : "en",
        "ui" : {
            "context" : "About OvenPlayer",
            "controls" : {
                "live" : "live",
                "low_latency_live" : "low latency live",
                "low_latency_p2p" : "low latency p2p",
            },
            "playlist" : "Playlist",
            "setting" : {
                "title" : "Settings",
                "speed" : "Speed",
                "source" : "Source",
                "quality" : "Quality",
                "caption" : "Caption",
                "display" : "Display"
            }
        },
        "api" : {
            "message" : {
                "muted_play" : "Please touch here to turn on the sound."
            },
            "error": {
                100: {
                    "code": 100,
                    "message": "Can not load due to unknown reasons.",
                    "reason": "Can not load due to unknown reasons."
                },
                101: {
                    "code": 101,
                    "message": "Can not load due to unsupported media.",
                    "reason": "Can not load due to unsupported media."
                },
                102: {
                    "code": 102,
                    "message": "Flash fetching process aborted. </br><a href='http://www.adobe.com/go/getflashplayer' target='_self'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a>",
                    "reason": "It looks like not found swf or your environment is localhost."
                },
                103: {
                    "code": 103,
                    "message": "Can not load due to dashjs. Please check the lastest version.",
                    "reason": "dash.js version is old. Please check the lastest."
                },
                104: {
                    "code": 104,
                    "message": "Can not load due to google ima for Ads. ",
                    "reason": "Please check the google ima library."
                },
                105: {
                    "code": 105,
                    "message": "Can not find the dashjs. Please check the dashjs.",
                    "reason": "Not found dashjs."
                },
                106: {
                    "code": 106,
                    "message": "Can not find the hlsjs. Please check the hlsjs.",
                    "reason": "Not found hlsjs."
                },
                300: {
                    "code": 300,
                    "message": "Can not play due to unknown reasons.",
                    "reason": "Can not play due to unknown reasons."
                },
                301: {
                    "code": 301,
                    "message": "Fetching process aborted by user.",
                    "reason": "Fetching process aborted by user."
                },
                302: {
                    "code": 302,
                    "message": "Some of the media could not be downloaded due to a network error.",
                    "reason": "Error occurred when downloading."
                },
                303: {
                    "code": 303,
                    "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                    "reason": "Error occurred when decoding."
                },
                304: {
                    "code": 304,
                    "message": "Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.",
                    "reason": "Media playback not supported."
                },
                305: {
                    "code": 305,
                    "message": "Can not load captions due to unknown reasons.",
                    "reason": "Can not load captions due to unknown reasons."
                },
                501: {
                    "code": 501,
                    "message": "Connection with low-latency(OME) server failed.",
                    "reason": "WebSocket connection failed."
                },
                502: {
                    "code": 502,
                    "message": "Connection with low-latency(OME) server failed.",
                    "reason": "WebRTC addIceCandidate failed."
                },
                503: {
                    "code": 503,
                    "message": "Connection with low-latency(OME) server failed.",
                    "reason": "WebRTC setRemoteDescription failed."
                },
                504: {
                    "code": 504,
                    "message": "Connection with low-latency(OME) server failed.",
                    "reason": "WebRTC peer createOffer failed."
                },
                505: {
                    "code": 505,
                    "message": "Connection with low-latency(OME) server failed.",
                    "reason": "WebRTC setLocalDescription failed."
                },
                510: {
                    "code": 510,
                    "message": "Network connection is unstable. Check the network connection.",
                    "reason": "Network is slow."
                }
            }
        }
    },
    {
        "lang" : "ko",
        "ui" : {
            "context" : "오븐플레이어에 관하여",
            "controls" : {
                "live" : "라이브",
                "low_latency_live" : "초저지연 라이브",
                "low_latency_p2p" : "초저지연 P2P",
            },
            "playlist" : "플레이리스트",
            "setting" : {
                "title" : "설정",
                "speed" : "재생 속도",
                "source" : "소스",
                "quality" : "품질",
                "caption" : "자막",
                "display" : "표시"
            }
        },
        "api" : {
            "message" : {
                "muted_play" : "눌러서 소리 켜기"
            },
            "error": {
                100: {
                    "code": 100,
                    "message": "알 수 없는 이유로 로드 할 수 없습니다.",
                    "reason": "알 수 없는 이유로 로드 할 수 없습니다."
                },
                101: {
                    "code": 101,
                    "message": "지원되지 않는 미디어로 인해 로드 할 수 없습니다.",
                    "reason": "Can not load due to unsupported media."
                },
                102: {
                    "code": 102,
                    "message": "플레시 로드가 중단 되었습니다. </br><a href='http://www.adobe.com/go/getflashplayer' target='_self'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a>",
                    "reason": "It looks like not found swf or your environment is localhost."
                },
                103: {
                    "code": 103,
                    "message": "DashJS로 인해 로드 할 수 없습니다. dashjs 버전을 확인해주세요.",
                    "reason": "dash.js version is old. Please check the lastest."
                },
                104: {
                    "code": 104,
                    "message": "Google IMA 라이브러리가 없어 로드 할 수 없습니다.",
                    "reason": "Please check the google ima library."
                },
                105: {
                    "code": 105,
                    "message": "DashJS 라이브러리가 없어 로드 할 수 없습니다.",
                    "reason": "Not found dashjs."
                },
                106: {
                    "code": 106,
                    "message": "HLSJS 라이브러리가 없어 로드 할 수 없습니다.",
                    "reason": "Not found hlsjs."
                },
                300: {
                    "code": 300,
                    "message": "알 수 없는 이유로 재생할 수 없습니다.",
                    "reason": "Can not play due to unknown reasons."
                },
                301: {
                    "code": 301,
                    "message": "사용자에 의한 프로세스 중단.",
                    "reason": "Fetching process aborted by user."
                },
                302: {
                    "code": 302,
                    "message": "네트워크 오류로 인해 일부 미디어를 다운로드 할 수 없습니다.",
                    "reason": "Error occurred when downloading."
                },
                303: {
                    "code": 303,
                    "message": "미디어를로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                    "reason": "Error occurred when decoding."
                },
                304: {
                    "code": 304,
                    "message": "미디어 재생이 취소되었습니다. 미디어가 손상되었거나 브라우저가 미디어에서 사용하는 기능을 지원하지 않는 것 같습니다.",
                    "reason": "Media playback not supported."
                },
                305: {
                    "code": 305,
                    "message": "알 수 없는 이유로 자막을 로드 할 수 없습니다.",
                    "reason": "Can not load captions due to unknown reasons."
                },
                501: {
                    "code": 501,
                    "message": "웹소켓 연결 실패",
                    "reason": "WebSocket connection failed."
                },
                502: {
                    "code": 502,
                    "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                    "reason": "WebRTC addIceCandidate failed."
                },
                503: {
                    "code": 503,
                    "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                    "reason": "WebRTC setRemoteDescription failed."
                },
                504: {
                    "code": 504,
                    "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                    "reason": "WebRTC peer createOffer failed."
                },
                505: {
                    "code": 505,
                    "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                    "reason": "WebRTC setLocalDescription failed."
                },
                510: {
                    "code": 510,
                    "message": "네트워크 연결이 불안정합니다. 네트워크 연결을 확인하십시오.",
                    "reason": "Network is slow."
                }
            }
        }
    }
];