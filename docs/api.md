# API and Configuration

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

## Instance Methods
        
####  `config` = player.getConfig()

Returns the player settings.

||Type|Memo|
|-|-|-|
|`config`|Object|defaultPlaybackRate, width, height, playbackRates, aspectRatio, etc|

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
        label : "360P"
    },
    {
        type : "mp4", 
        file :  "https://path.to/your_video", 
        label: "480P"
    },
    
    {
        type : "mp4", 
        file : "https://path.to/your_video", 
        label : "720p",
        isDefault : "true"
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
`newstate`|String| idle, complete, paused, playing, error, loading

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


#### player.on('destroy')

Player is destroyed.

Attribute|Type|Memo
------|------|-------


