---
description: >-
  This section describes the various events that occur in the OvenPlayer
  instance.
---

# Event

## Prerequisites

### Register an event

```
// Attach event listener.
player.on('EventName', function(data){
    console.log(data);
});

// Attach event listener works only once.
player.once('EventName', function(data){
    console.log(data);
});
```

### Cancel a registered event

```
// Remove all listeners for event type
player.off('EventName');

// Remove specific listener for event type
player.off('EventName', listener)
```

### **on('ready')**

Player initialization complete. And you can use API methods.

### **on('metaChanged')**&#x20;

**Returns `Object`:**&#x20;

| Params   | Type    | memo                                  |
| -------- | ------- | ------------------------------------- |
| duration | Number  | Current media's duration (In seconds) |
| isP2P    | Boolean | Does OME operate in P2P mode?         |
| type     | String  | current source type                   |

It occurs when new metadata is received.

### **on('stateChanged')**&#x20;

**Returns `Object`:**&#x20;

| Params    | Type   | memo |
| --------- | ------ | ---- |
| prevstate | String |      |
| newstate  | String |      |

It occurs when the state of a player changes.

{% hint style="info" %}
```
idle, complete, paused, playing, error, loading, stalled, 
adLoaded, adPlaying, adPaused, adComplete
```
{% endhint %}

### **on('resized')**&#x20;

**Returns String:** Fired when the player's size has been changed. ("large", "medium", "small", "xsmall")

{% hint style="info" %}
large(>992), medium(<992), small(<768), xsmall(<576)
{% endhint %}

### **on('playbackRateChanged')**&#x20;

**Returns `Object`:**&#x20;

| Params       | Type    | memo                  |
| ------------ | ------- | --------------------- |
| playbackRate | Number  | The new playback rate |

Fired when the playback rate has been changed.

### **on('seek')**&#x20;

**Returns `Object`:**&#x20;

| Attribute | Type    | memo                                                             |
| --------- | ------- | ---------------------------------------------------------------- |
| position  | String  | The position of the player before the player seeks (in seconds). |
| newstate  | String  | Current media's duration (In seconds)                            |

Fired after a seek has been requested either by scrubbing the control bar or through the API.

### **on('seeked')**

Triggered when video position changes after seeking, as opposed to `on('seek')` which triggers as a seek occurs.

### **on('time')**&#x20;

**Returns `Object`:**&#x20;

| Attribute  | Type   | Memo                                              |
| ---------- | ------ | ------------------------------------------------- |
| `duration` | Number | Duration of the current playlist item in seconds. |
| `position` | Number | Playback position in seconds.                     |

While the player is playing, this event is fired as the playback position gets updated. This may occur as frequently as 10 times per second.

### **on('bufferChanged')**&#x20;

**Returns `Object`:**&#x20;

| Attribute  | Type   | Memo                                                                |
| ---------- | ------ | ------------------------------------------------------------------- |
| `duration` | Number | Current media's duration (In seconds)                               |
| `position` | Number | Current position of the media file (In seconds)                     |
| `buffer`   | Number | Percentage between 0 and 100 of the current media that is buffered. |

Fired when the currently playing item loads additional data into its buffer.

### **on('mute')**&#x20;

**Returns** Number**:**  New volume percentage (0-100)

Triggered when the player has gone in or out of a mute state.

### **on('volumeChanged')**&#x20;

**Returns** Number**:**  New volume percentage (0-100)

Triggered when the player's volume is changed.

### **on('playlistChanged')**&#x20;

**Returns** Number**:**  index of the new playlist index

Fired when the active playlist is changed. It happens in response to, e.g., a user clicking an option in the playlist menu or a script calling `setCurrentPlaylist` or prev playlist has been completed.

### **on('sourceChanged')**

**Returns** Number**:**  index of the new quality level in the getSources() array

Fired when the active source(protocol) is changed. It happens in response to, e.g., a user clicking an option in the source menu or a script calling `setCurrentSource`.

### **on('**qualityLevelChanged**')**

**Returns `Object`:**&#x20;

| Attribute        | Type    | Memo                                                                                  |
| ---------------- | ------- | ------------------------------------------------------------------------------------- |
| `currentQuality` | Number  | index of the new quality level in the getQualityLevels() array                        |
| `type`           | String  | "request" : Triggered when a user sets quality level., "render" : Streaming rendered. |
| `isAuto`         | Boolean | The player's auto-switching quality state.                                            |

Fired when the active quality level is changed. It happens in response to, e.g., a user clicking an option in the quality menu or a script calling `setCurrentQuality`.

### **on('cueChanged')**

**Returns `Object`:**&#x20;

| Type          | Memo |
| ------------- | ---- |
| VTTCue Object |      |

Fired when VTTCue is changed.

### **on('timeDisplayModeChanged')**

**Returns** Boolean **:**  changed displaying mode

Fired when timecode mode is changed.

### **on('adChanged')**

**Returns `Object`:**&#x20;

| Attribute        | Type    | Memo                                                                           |
| ---------------- | ------- | ------------------------------------------------------------------------------ |
| `isLinear`       | Boolean | True if the ad is linear, false otherwise.                                     |
| `duration`       | Number  | Returns the duration of the selected creative, or -1 for non-linear creatives. |
| `skipTimeOffset` | Number  | The number of seconds of playback before the ad becomes skippable.             |

Fired when Ad is changed.

### **on('adTime')**

**Returns `Object`:**&#x20;

| Attribute        | Type    | Memo                                                                           |
| ---------------- | ------- | ------------------------------------------------------------------------------ |
| `isLinear`       | Boolean | True if the ad is linear, false otherwise.                                     |
| `duration`       | Number  | Returns the duration of the selected creative, or -1 for non-linear creatives. |
| `skipTimeOffset` | Number  | The number of seconds of playback before the ad becomes skippable.             |
| `remaining`      | Number  | Get the remaining time of the current ad that is playing.                      |
| `position`       | Number  | Playback position in seconds.                                                  |

Fired when Ad is playing.

### **on('adComplete')**

Fired when Ad is complete.

### on('fullscreenChanged')

**Returns** Boolean : True if the screen is full, false otherwise.

Fired when screen mode is changed.

### on('clicked')

**Returns `Object`:**&#x20;

| Attribute     | Memo             |
| ------------- | ---------------- |
| `EventObject` | object of event  |

Triggered when the player is clicked. If ad clicked, this returns {type : "adclick"}.

### on('allPlaylistEnded')

Fired when the all playlist is complete.

### on('hlsPrepared')

**Returns `Object`:**&#x20;

| HLS object | Object returned by `new Hls()` which used internally in OvenPlayer. |
| ---------- | ------------------------------------------------------------------- |

Triggered when HLS object is initialized and ready to use.

### on('hlsDestroyed')

Triggered after HLS object is destroyed.

### on('dashPrepared')

**Returns `Object`:**&#x20;

| DASH object | Object returned by `dashjs.MediaPlayer().create()` which used internally in OvenPlayer. |
| ----------- | --------------------------------------------------------------------------------------- |

Triggered when DASH object is initialized and ready to use.

### on('dashDestroyed')

Triggered after DASH object is destroyed

### **on('destroy')**

Player is destroyed.
