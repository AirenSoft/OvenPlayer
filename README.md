# OvenPlayer - Media player for web

The OvenPlayer is an HTML5 player designed to make it easier to play ultra-low latency streams from the [OvenMediaEngine](https://github.com/AirenSoft/OvenMediaEngine).

![Alt text](dist/player.jpg)

## What is OvenMediaEngine?
OvenMediaEngine(OME) is a streaming engine for real-time live broadcasting with ultra low latency. It receives the RTMP stream from general broadcasting studio such as OBS, XSplit and transmits it on Webrtc. The streams can be played in the browser with ultra low latency without plug-ins. To make it easier to play webrtc streams in browsers, we are working on HTML5 player project OvenPlayer

## Features

- Ultra-low latency stream playback
- Full custom support with separate UI and SDK
- Support for playback regardless of browser and media type
- Supports all common player functions
- Support Protocols : WebRTC (Signalling protocol conforms to the OME specification.), HLS, MPEG-Dash

## Quick Start

```html
<!-- import OvenPlayer css -->
<link rel="stylesheet" href="your_path_to/ovenplayer/css/player.css">

<!-- import OvenPlayer javascript -->
<script src="your_path_to/ovenplayer/ovenplayer.js"></script>

<!-- OvenPlayer will be added this area. -->
<div id="player_id"></div>
    
<script>
    var webrtcSources = OvenPlayer.generateWebrtcUrls([
                {
                     host : 'ws://host:port',
                     application : 'app',
                     stream : "stream_1080",
                     label : "WebRTC 1080P"
                },
                {
                     host : 'ws://host:port',
                     application : 'app',
                     stream : "stream_480",
                     label : "WebRTC 480P"
                 }
            ];);
    //or follow this style. [{type : "webrtc", file : "ws://host:port/app/stream_1080", label : "1080"}]
    
    // Initialize OvenPlayer.
    var player = OvenPlayer.create("player_id", {
        sources: webrtcSources
    });
</script>
```

## API and Configuration

Visit [API and Configuration](docs/api.md) for more details.

## How to Contribute
 
Please read [Guidelines](CONTRIBUTING.md) and our [Rules](CODE_OF_CONDUCT.md).

## License

OvenPlayer is licensed under the [MIT license](LICENSE.txt).
