# API and Configuration


## Options
```javascript
player = OvenPlayer.create("player", {
    loop : false,
    autoStart : false,
    playbackRate : 1,
    playbackRates : [2, 1.5, 1, 0.5, 0.25],
    mute : false,
    volume : 100,
    controls : true,
    rtmpBufferTime : 1, 
    rtmpBufferTimeMax : 3,
    currentProtocolOnly : true, 
    title : "Hi. This is ovenplayer.",
    image : "https://path.to/your_video_thumbnail.jpeg",    
    adClient : "googleima",    
    playlist : [
        {
                title : "01. I drive slow.",
                image : "https://path.to/your_video_thumbnail.jpeg",
                duration : 7343,
                hidePlaylistIcon : true,
                sources: [{
                        type : "mpd", 
                        file :  "https://path.to/your_video.mpd", 
                        framerate : 30,
                        label: "360P DASH"
                    }],
                tracks: [{
                        kind : "captions", 
                        file :  "https://path.to/your_caption.vtt", 
                        label : "KO vtt"
                    }],
                adTagUrl : "https://pubads.g.doubleclick.net/..."    
        }
    ]
... or simple 
 player = OvenPlayer.create("player", {
      sources: [{
                              type : "mpd", 
                              file :  "https://path.to/your_video.mpd", 
                              framerate : 30,
                              label: "360P DASH"
                          }],
      adTagUrl : "https://pubads.g.doubleclick.net/..." 
});
```

#### loop 
type|default
------|------
boolean|false

When the video ends, it plays again.

#### autoStart 
type|default
------|------
boolean|false

When the source is loaded, it plays automatically.
 
#### playbackRate 
type|default
------|------
number|1

Sets the default playback rate when playing.

#### playbackRates 
type|default
------|------
Array|[2, 1.5, 1, 0.5, 0.25]

Sets the list of playback rate items in the control menu.

#### mute 
type|default
------|------
boolean|false

Mutes the player.

#### volume 
type|default
------|------
number|100

Sets the default volume when playing.

#### image 
type|default
------|------
String| ""

Sets the default thumbnail image.

#### title 
type|default
------|------
String| ""

Sets the contents title.


#### controls 
type|default
------|------
boolean|true

Sets whether to show or hide the player control bar.

#### sources 
type|default
------|------
Array| none

Enter the URLs of the diverse protocols to play.
```javascript
[
    {
        type : "mp4", 
        file :  "https://path.to/your_video", 
        framerate : 30,
        label : "360P"
    },
    {
        type : "mpd", 
        file :  "https://path.to/your_video.mpd", 
        framerate : 30,
        label: "360P DASH"
    },
    {
        type : "hls", 
        file :  "https://path.to/your_video.m3u8", 
        framerate : 30,
        label: "360P HLS"
    },
    {
        type : "rtmp", 
        file :  "rtmp://path.to/your_video", 
        framerate : 30,
        label: "360P RTMP"
    }
] 
```

#### playlist 
type|default
------|------
Array| none

Enter the URLs of the diverse sources to play.
```javascript

 [
        {
                title : "01",
                image : "https://path.to/your_video_thumbnail.jpeg",
                duration : 7343,
                sources: [    {
                                  type : "mp4", 
                                  file :  "https://path.to/your_video", 
                                  framerate : 30,
                                  label : "360P"
                              },
                              {
                                  type : "mpd", 
                                  file :  "https://path.to/your_video.mpd", 
                                  framerate : 30,
                                  label: "360P DASH"
                              },
                              {
                                  type : "hls", 
                                  file :  "https://path.to/your_video.m3u8", 
                                  framerate : 30,
                                  label: "360P HLS"
                              },
                              {
                                  type : "rtmp", 
                                  file :  "rtmp://path.to/your_video", 
                                  framerate : 30,
                                  label: "360P RTMP"
                              }],
                tracks: [{
                        kind : "captions", 
                        file :  "https://path.to/your_caption.vtt", 
                        label : "KO vtt"
                    }],
                adTagUrl : "https://pubads.g.doubleclick.net/..." 
        },
        {
                        title : "02",
                        image : "https://path.to/your_video_thumbnail2.jpeg",
                        duration : 8333,
                        sources: [    {
                                          type : "mp4", 
                                          file :  "https://path.to/your_video2", 
                                          framerate : 30,
                                          label : "360P"
                                      },
                                      {
                                          type : "mpd", 
                                          file :  "https://path.to/your_video.mpd2", 
                                          framerate : 30,
                                          label: "360P DASH"
                                      },
                                      {
                                          type : "hls", 
                                          file :  "https://path.to/your_video.m3u82", 
                                          framerate : 30,
                                          label: "360P HLS"
                                      },
                                      {
                                          type : "rtmp", 
                                          file :  "rtmp://path.to/your_video2", 
                                          framerate : 30,
                                          label: "360P RTMP"
                                      }],
                        tracks: [{
                                kind : "captions", 
                                file :  "https://path.to/your_caption2.vtt", 
                                label : "KO vtt"
                            }],
                        adTagUrl : "https://pubads.g.doubleclick.net/..." 
                }
 ]
```

#### hidePlaylistIcon 
type|default
------|------
boolean|false

Sets whether to show or hide the playlist button when playlist initialized.

#### tracks 
type|default
------|------
Array| none

Enter the URLs of the various caption types to display.
```javascript
[
    {
        kind : "captions", 
        file :  "https://path.to/your_caption.vtt", 
        label : "KO vtt"
    },
    {
        kind : "captions", 
        file :  "https://path.to/your_caption.srt", 
        label : "KO srt"
    },
    {
        kind : "captions", 
        file :  "https://path.to/your_caption.smi", 
        label : "KO smi"
    }
] 
```

#### rtmpBufferTime 
type|default
------|------
Number| 1

Specifies how long to buffer messages before starting to display the stream.
(*optional when using rtmp protocol.)

#### rtmpBufferTimeMax 
type|default
------|------
Number| 3

Specifies a maximum buffer length for live streaming content, in seconds.
(*optional when using rtmp protocol.)


#### currentProtocolOnly 
type|default
------|------
Boolean| false

Shows only current protocols.
(*If you want to show only quality information when there are various protocols and various quality information together, please use it.)


#### adClient 
type|default
------|------
String|"googleima"

Sets whether to Google IMA or Simple VAST the Ads client when player initialize. "googleima" or "vast"

#### lang 
type|default
------|------
String|"en"

Sets the language to be displayed. The player is built in English and Korean. 

#### systemText 

Sets the custom language to be displayed. 
```
player = OvenPlayer.create("player",
                {
                    sources : newUrls,
                    systemText : {
                        "lang" : "cn",
                        "ui" : {
                            "context" : "关于OvenPlayer",
                            "controls" : {
                                "live" : "直播",
                                "low_latency_live" : "低延迟直播",
                                "low_latency_p2p" : "低延迟实时p2p",
                            },
                            "playlist" : "播放列表",
                            "setting" : {
                                "title" : "设置",
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
                    }

                });
```


## Static Methods

#### `player` = OvenPlayer.create(`container`, `options`)

Create a player instance.

||Type|Memo
|-|-|-|
|`container`|String| DOMElement |
|`options`|Object||
|`player`|OvenPlayerInstance||

#### `players` = OvenPlayer.getPlayerList()

Returns all created player instances. 

||Type|Memo|
|-|-|-|
|`players`|Array.\<OvenPlayerInstance\>||

#### `player` =  OvenPlayer.getPlayerByContainerId(containerId)

Returns the player instance that matches the containerId.

||Type|Memo|
|-|-|-|
|`containerId`|String|
|`player`|OvenPlayerInstance||

#### `player` = OvenPlayer.getPlayerByIndex(`index`)

Returns the index-th created player instance.

||Type|Memo|
|-|-|-|
|`index`|Number||
|`player`|OvenPlayerInstance||

#### `sources` = OvenPlayer.generateWebrtcUrls(`OmeObjects`)

Returns a URL that the player can use with the OME low latency stream information.

||Type|Memo|
|-|-|-|
|`OmeObjects`|Object or Array||
|`sources`|Array||

##### Examples of source object.
```javascript
{
    host : "wss://devz.airensoft.com:1123", // Websocket url for signaling
    stream : "stream", // OME stream name
    application : "app" // OME application name
}
or 
[
    {
        host : "wss://devz.airensoft.com:1123", 
        stream : "stream720",
        application : "app",
        label : "WEBRTC-720"
    },
    {
        host : "wss://devz.airensoft.com:1123",
        stream : "stream1080",
        application : "app",
        label : "WEBRTC-1080"
    }
]
```

#### `player` = OvenPlayer.debug(`true or false`)

Whether run a player with debug mode or not.

||Type|Memo
|-|-|-|
|`true or false`|Boolean| Whether run the debug mode or not||


## Instance Methods
        
####  `config` = player.getConfig()

Returns the player settings.

||Type|Memo|
|-|-|-|
|`config`|Object|autoStart,controls,loop,mute,playbackRate,playbackRates,sources,timecode,tracks,volume|

#### player.load(`sources`)

Loads source.

||Type|Memo|
|-|-|-|
|`sources`|Array.\<Object\> \| Object|See the examples of source object.|

##### Examples of source object.

```javascript
// Array.<Object> type
[
    {
        type : "mp4", 
        file :  "https://path.to/your_video", 
        framerate : 30,
        label : "360P"
    },
    {
        type : "mp4", 
        file :  "https://path.to/your_video", 
        framerate : 30,
        label: "480P"
    },
    
    {
        type : "mp4", 
        file : "https://path.to/your_video", 
        framerate : 30,
        label : "720p",
        default : "true"
    }
] 

// Object type
{
    file : "https://path.to/your_video"
}
```


#### `buffer` = player.getBuffer()

Returns percentage (0-100) of the video's current loaded amount

||Type|Memo|
|-|-|-|
|`buffer`|Number|percentage (0-100)|

#### player.play()

Sets player to playing status.

#### player.pause()

Sets player to paused status.

#### `state` = player.getState()

Returns current state of player.

||Type|Memo|
|-|-|-|
|`state`|String|idle, loading, playing, paused, complete|

#### `playbackRate` = player.getPlaybackRate()

||Type|Memo|
|-|-|-|
|`playbackRate`|Number|The current playback rate.

#### player.setPlaybackRate(`playbackRate`)

Set playback rate.

||Type|Memo|
|-|-|-|
|`playbackRate`|Number|Accepts any numeric value between 0.25 and 4.|

#### `position` = player.getPosition()

Returns viewer's current position in a media file. This value depends on the media type.

||Type|Memo|
|-|-|-|
|`position`|Number|In case of VOD file returns current playback position, in seconds. Live streams return how long has been playing, in seconds. 

#### `duration` = player.getDuration()

Returns total length of the media file.  This value depends on the media type.
 
||Type|Memo|
|-|-|-|
|`duration`|Number|The length of a loaded VOD file, in seconds. Live streams will always return Infinity.


#### player.seek(`position`)

Jump to the specified position within the currently playing item.

||Type|Memo|
|-|-|-|
|`position`|Number|The position (in seconds) to seek to.


#### `muted` = player.getMute()

||Type|Memo|
|-|-|-|
|`muted`|Boolean|The player is muted or not.

#### `volumn` = player.getVolume()

||Type|Memo|
|-|-|-|
|`volumn`|Number|The current playback volume, as a percentage from 0 to 100.

#### player.setMute(`mute`)

Mutes the player.

||Type|Memo|
|-|-|-|
|`mute`|Boolean|True or not. If nothing passed toggle the mute state.

#### player.setVolume(`volume`)

||Type|Memo|
|-|-|-|
|`volume`|Number|Set the volume of the player between 1-100

####  `playlist` = player.getPlaylist()

Returns an array of objects based on each playlist 

||Type|Memo|
|-|-|-|
|`playlist`|Array.\<Object\>|See the example of playlist.

##### Example playlist
```javascript
[
        {
                title : "01",
                image : "https://path.to/your_video_thumbnail.jpeg",
                duration : 7343,
                sources: [    {
                                  type : "mp4", 
                                  file :  "https://path.to/your_video", 
                                  framerate : 30,
                                  label : "360P"
                              },
                              {
                                  type : "mpd", 
                                  file :  "https://path.to/your_video.mpd", 
                                  framerate : 30,
                                  label: "360P DASH"
                              },
                              {
                                  type : "hls", 
                                  file :  "https://path.to/your_video.m3u8", 
                                  framerate : 30,
                                  label: "360P HLS"
                              },
                              {
                                  type : "rtmp", 
                                  file :  "rtmp://path.to/your_video", 
                                  framerate : 30,
                                  label: "360P RTMP"
                              }],
                tracks: [{
                        kind : "captions", 
                        file :  "https://path.to/your_caption.vtt", 
                        label : "KO vtt"
                    }]
        }
]
```

#### `currentPlaylistIndex` =  player.getCurrentPlaylist()

||Type|Memo|
|-|-|-|
|`currentPlaylistIndex`|Number|Number of the playlist index

####  player.setCurrentPlaylist(`index`)

Change the playlist to the playlist index.

||Type|Memo|
|-|-|-|
|`index`|Number|Sets playlist to a specified index|


####  `sourceList` = player.getSources()

Returns an array of objects based on each sources of a media item

||Type|Memo|
|-|-|-|
|`sourceList`|Array.\<Object\>|See the example of sourceList.

##### Example sourceList
```javascript
[
    {
        label : '720p',
        file : '',
        type : 'rtmp',
        index : 0
    },
    ... // And more objects
]
```

#### `currentSourceIndex` =  player.getCurrentSource()

||Type|Memo|
|-|-|-|
|`currentSourceIndex`|Number|Number of the sources index


####  player.setCurrentSource(`sourceIndex`)

Change the quality level to the provided index.

||Type|Memo|
|-|-|-|
|`sourceIndex`|Number|Sets stream source to a specified index|


####  `qualityLevels` = player.getQualityLevels()

Returns an array of objects based on each quality level of a stream meta

||Type|Memo|
|-|-|-|
|`qualityLevels`|Array.\<Object\>|See the example of qualityLevels.

##### Example qualityLevels
```javascript
[
    {
        bitrate : 250000,
        height : 720,
        width : 1080,
        index : 0,
        label : "1080x720, 25000"
    },
    ... // And more objects
]
```

#### `currentQualityIndex` =  player.getCurrentQuality()

||Type|Memo|
|-|-|-|
|`currentQualityIndex`|Number|Number of the current quality


####  player.setCurrentQuality(`qualityLevelIndex`)

Change the quality level to the stream quality index.

||Type|Memo|
|-|-|-|
|`qualityLevelIndex`|Number|Sets stream quality to a specified index|


#### `isAutoQuality` =  player.isAutoQuality()

||Type|Memo|
|-|-|-|
|`isAutoQuality`|Boolean|Boolean of adaptive is on

####  player.setAutoQuality(`isAuto`)

Change the quality level auto changing.

||Type|Memo|
|-|-|-|
|`isAuto`|Boolean|Sets stream quality level auto changing|


####  `captionList` = player.getCaptionList()

Returns an array of objects based on inputed captions

||Type|Memo|
|-|-|-|
|`captionList`|Array.\<Object\>|See the example of captionList.

##### Example captionList
```javascript
[
    {
        data : (3) [VTTCue, VTTCue, VTTCue],
        file : "/caption_ko.vtt",
        id : "captions0"
        label : "KOR VTT",
        name : "KOR VTT"        
    },
    ... // And more objects
]
```

#### `currentCaptionIndex` =  player.getCurrentCaption()

||Type|Memo|
|-|-|-|
|`currentCaptionIndex`|Number|Number of the current caption 


####  player.setCurrentCaption(`captionIndex`)

Change the caption to the caption index.

||Type|Memo|
|-|-|-|
|`captionIndex`|Number|Sets captions to a specified index|


####  player.addCaption(`track`)

Add the caption track to the captionList when video is playing.

||Type|Memo|
|-|-|-|
|`track`|Object|file : "url of caption", kind : "captions" , label : title of caption, default : true or false |


####  player.removeCaption(`captionIndex`)

Remove the captionList to the caption index.

||Type|Memo|
|-|-|-|
|`captionIndex`|Number|a specified index |


#### `isTimecodeMode` =  player.isTimecodeMode()

||Type|Memo|
|-|-|-|
|`isTimecodeMode`|Boolean|Boolean of timecode mode is on 

####  player.setTimecodeMode(`isTimecodeMode`)

Change the timecode mode or framecode mode when you input framerate.

||Type|Memo|
|-|-|-|
|`isTimecodeMode`|Number|Change the timecode mode or framecode mode.|

#### `currentFramerate` =  player.getFramerate()

||Type|Memo|
|-|-|-|
|`currentFramerate`|Number|Number of the sources framerate


#### player.seekFrame(`framePosition`)

Jump to the specified position within the currently playing item.

||Type|Memo|
|-|-|-|
|`framePosition`|Number|The position (in frame) to seek to.


####  `userInfo` = player.getBrowser()

Returns object analyzed from the User Agent. 
It is simply information extracted from the User Agent. (can not be sure it is right.)

||Type|Memo|
|-|-|-|
|`userInfo`|Object|browser, browserVersion, os, osVersion... 

####  `version` = player.getVersion()

Returns currently OvenPlayer version. 

||Type|Memo|
|-|-|-|
|`version`|String| String of player version 


## Events

```javascript
// Attach event listener.
player.on('EventName', function(data){
    console.log(data);
});

// Attach event listener works only once.
player.once('EventName', function(data){
    console.log(data);
});

// Detach event listener.
player.off('EventName');
```

#### player.on('ready')

Player initialization complete. API methods can be used.

#### player.on('metaChanged')

Occurs when new metadata is received .

Attribute|Type|Memo
-|-|-
`metadata`|Object| duration, isLive, type(current source type)


#### player.on('error')

Occurs when something is going wrong.

Value|Type|Memo
-|-|-
`message`|String|The error message that has been detected.
`reason`|String|Reason of error.
`code`|String|OvenPlayer Error code.
`error`|Object|Javascript error object.


#### player.on('bufferChanged')

Fired when the currently playing item loads additional data into its buffer.

Attribute|Type|Memo
------|------|-------
`duration`|Number|Current media's duration (In seconds)
`position`|Number|Current position of the media file (In seconds)
`buffer`|Number|Percentage between 0 and 100 of the current media that is buffered.


#### player.on('stateChanged')

Occurs when the state of a player changes.

Attribute|Type|Memo
------|------|-------
`newstate`|String| idle, complete, paused, playing, error, loading, adPlaying, adPaused, adComplete


#### player.on('resized')

Fired when the player's size has been changed.

Attribute|Type|Memo
------|------|-------
`size`|String|The new player size. large(>992), medium(<992), small(<768), xsmall(<576).



#### player.on('play')

Fired when the player enters the playing state.

Attribute|Type|Memo
------|------|-------
`prevState`|String|The state the player moved from.

#### player.on('pause')

Fired when the player enters the paused state.

Attribute|Type|Memo
------|------|-------
`prevState`|String|The state the player moved from.

#### player.on('complete')

Fired when an item completes playback.

#### player.on('playbackRateChanged')

Fired when the playback rate has been changed.

Attribute|Type|Memo
------|------|-------
`playbackRate`|Number|The new playback rate

#### player.on('seek')

Fired after a seek has been requested either by scrubbing the control bar or through the API.

Attribute|Type|Memo
------|------|-------
`position`|Number|The position of the player before the player seeks (in seconds).
`offset`|Number|The position that has been requested to seek to (in seconds).

#### player.on('seeked')

Triggered when video position changes after seeking, as opposed to `on('seek')` which triggers as a seek occurs.

#### player.on('time')

While the player is playing, this event is fired as the playback position gets updated. This may occur as frequently as 10 times per second.

Attribute|Type|Memo
------|------|-------
`duration`|Number|Duration of the current playlist item in seconds.
`position`|Number|Playback position in seconds.

#### player.on('mute')

Triggered when the player has gone in or out of a mute state.

Attribute|Type|Memo
------|------|-------
`mute`|Boolean|The player's new mute state

#### player.on('volumeChanged')

Triggered when the player's volume is changed.

Attribute|Type|Memo
------|------|-------
`volume`|Number|New volume percentage (0-100)


#### player.on('playlistChanged')

Fired when the active playlist is changed. Happens in response to e.g. a user clicking an option in the playlist menu or a script calling `setCurrentPlaylist` or prev playlist has been completed.

Attribute|Type|Memo
------|------|-------
``|Number|index of the new playlist index



#### player.on('sourceChanged')

Fired when the active source(protocol) is changed. Happens in response to e.g. a user clicking an option in the source menu or a script calling `setCurrentSource`.

Attribute|Type|Memo
------|------|-------
`currentSource`|Number|index of the new quality level in the getSources() array

#### player.on('qualityChanged')

Fired when the active quality level is changed. Happens in response to e.g. a user clicking an option in the quality menu or a script calling `setCurrentQuality`.

Attribute|Type|Memo
------|------|-------
`currentQuality`|Number|index of the new quality level in the getQualityLevels() array
`type`|String|"request" : Triggered when user sets quality level., "render" : Streaming rendered. 
`isAuto`|Boolean|The player's auto switching quality state.

#### player.on('cueChanged')

Fired when VTTCue is changed.

Attribute|Type|Memo
------|------|-------
`VTTVcue`|Object|VTTCue Object 


#### player.on('timeDisplayModeChanged')

Fired when timecode mode is changed.

Attribute|Type|Memo
------|------|-------
`isTimecodeDisplaying`|boolean| changed displaying mode


#### player.on('adChanged')

Fired when Ad is changed.

Attribute|Type|Memo
------|------|-------
`isLinear`|Boolean| True if the ad is linear, false otherwise.
`duration`|Number| Returns the duration of the selected creative, or -1 for non-linear creatives.
`skipTimeOffset`|Number| The number of seconds of playback before the ad becomes skippable.

#### player.on('adTime')

Fired when Ad is playing.

Attribute|Type|Memo
------|------|-------
`isLinear`|Boolean| True if the ad is linear, false otherwise.
`duration`|Number| Returns the duration of the selected creative, or -1 for non-linear creatives.
`skipTimeOffset`|Number| The number of seconds of playback before the ad becomes skippable.
`remaining`|Number| Get the remaining time of the current ad that is playing. 
`position`|Number| Playback position in seconds.


#### player.on('adComplete')

Fired when Ad is complete.

Attribute|Type|Memo
------|------|-------


#### player.on('fullscreenChanged')

Fired when screen mode is changed.

Type|Memo
------|-------
Boolean| True if the screen is full, false otherwise.


#### player.on('clicked')

Triggered when the player is clicked.
If ad clicked, this returns {type : "adclick"}. 

Attribute|Type|Memo
------|------|-------
`event`|Object| object of event


#### player.on('allPlaylistEnded')

Fired when the all playlist is complete. 


#### player.on('destroy')

Player is destroyed.

Attribute|Type|Memo
------|------|-------



