# OvenPlayer - Media player for web

The OvenPlayer is a HTML5 player designed to make it easier to play Ultra-low latency streams from the [OvenMediaEngine](https://github.com/AirenSoft/OvenMediaEngine).

![Alt text](dist/player.jpg)

## What is OvenMediaEngine?
OvenMediaEngine(OME) is a streaming engine for real-time live broadcasting with Ultra-low latency. It receives the RTMP stream from general broadcasting studios such as OBS, XSplit and transmit it on WebRTC. Video streams with Ultra-low latency can be played in a browser without plug-ins. 

## Features

- Ultra-low latency stream playback
- Full custom support with separate UI and SDK
- Support for playback regardless of browser and media type
- Supports all common player functions
- Supported Protocols : WebRTC (Signalling protocol conforms to the OME specification.), HLS, MPEG-Dash

## Quick Start

```html

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

Visit [demo site](https://airensoft.github.io/OvenPlayer/docs/index.html).

Visit [API and Configuration](docs/api.md) for more details.


## How to Contribute
 
Please read [Guidelines](CONTRIBUTING.md) and our [Rules](CODE_OF_CONDUCT.md).

## License

OvenPlayer is licensed under the [MIT license](LICENSE).
