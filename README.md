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
<script src="your_path_to/ovenplayer/ovenplayer.js"></script>

```
You can import ovenplayer.js as follows:

OvenPlayer will be added to this field.

OvenPlayer will be added this area.

```html
<div id="player_id"></div>

```
### Initialize for default

```html
let player = OvenPlayer.create("player_id", {
    sources: [
    {
      "type": "mp4",
      "file": "../dist/OCP_480.mp4",
      "label": "480p"
    },
    {
      "type": "mp4",
      "file": "../dist/OCP_720.mp4",
      "label": "720p"
    },
    {
      "type": "mp4",
      "file": "../dist/OCP_1080.mp4",
      "label": "1080p"
    }
  ]
});

```

### Initialize for OME


```html
let webrtcSources = OvenPlayer.generateWebrtcUrls([
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
or 
let webrtcSources = [{type : "webrtc", file : "ws://host:port/app/stream_1080", label : "1080"}, {type : "webrtc", file : "ws://host:port/app/stream_480", label : "480P"}]

```

```html
let player = OvenPlayer.create("player_id", {
    sources: webrtcSources
});

```
### Initialize for DASH

```html 
<script src="https://cdnjs.cloudflare.com/ajax/libs/dashjs/2.9.3/dash.all.min.js"></script>
<script src="your_path_to/ovenplayer/ovenplayer.js"></script>
```

```html
let player = OvenPlayer.create("player_id", {
    sources: [
    {
      "type": "dash",
      "file": "../dist/OCP_480.mpd",
      "label": "480p"
    }
  ]
});

```

### Initialize for Ads

```html 
<script type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
<script src="your_path_to/ovenplayer/ovenplayer.js"></script>
```

```html

let player = OvenPlayer.create("player_id", {
    sources: [
    {
      "type": "mp4",
      "file": "../dist/OCP_1080.mp4",
      "label": "1080p"
    },
    adTagUrl : "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="
  ]
});

```

## API and Configuration

Start the [Demo](https://airensoft.github.io/OvenPlayer/docs/demo.html).

Visit [API and Configuration](docs/api.md) for more details.


## How to Contribute
 
Please read [Guidelines](CONTRIBUTING.md) and our [Rules](CODE_OF_CONDUCT.md).

## License

OvenPlayer is licensed under the [MIT license](LICENSE).
