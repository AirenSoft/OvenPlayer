---
description: >-
  OvenPlayer is an Open-Source and JavaScript-based WebRTC Player for
  OvenMediaEngine.
---

# Introduction

## Features

* Supports WebRTC Signaling from OvenMediaEngine for Sub-Second Latency Streaming
* Various protocols: WebRTC, HLS, Low Latency MPEG-DASH (LLDASH), MPEG-DASH
* Customizable UI
* Supports streaming regardless of browser and media type
* Receives the Signaling Protocol from OME (Signaling Protocol conforms to the OME specification)
* Automatically Fallback using HLS, MPEG-DASH
* Easily create profit by adding Ads in various formats
* Supports various subtitle formats: SMI, VTT, SRT
* Responsive player regardless of screen size

## Installation

There are several ways to install OvenPlayer. Use the one you are comfortable with.

### Download from GitHub

You can download it from [OvenPlayer GitHub](https://github.com/AirenSoft/OvenPlayer).

If you have access to [OvenPlayer GitHub](https://github.com/AirenSoft/OvenPlayer), you can download the latest version in development by pressing the Clone or Download button and clicking Download ZIP in the menu that appears.

> You can also download specific version of OvenPlayer by from [OvenPlayer GitHub Release](https://github.com/AirenSoft/OvenPlayer/releases).

When you download and decompress it, you will see:

```
OvenPlayer
└── dist/
     ├── ovenplayer.js
     └── ovenplayer.js.map
...
```

`ovenplayer.js` uses UMD (Universal Module Definition) pattern that various module loaders can import (e.g., Plain HTML, AMD, CommonJS).

`ovenplayer.js.map` is the source map for debugging to see what's going on in OvenPlayer.

Just put `ovenplayer.js` in your static directory of a web server and load `ovenplayer.js` in your HTML, you're ready to use OvenPlayer.

```markup
<script src="your_path_to/ovenplayer.js"></script>
```

### Use CDN

You can also download the `ovenplayer.js` and source map via [CDN](https://www.jsdelivr.com/package/npm/ovenplayer).

#### Latest version

```markup
<script src="https://cdn.jsdelivr.net/npm/ovenplayer/dist/ovenplayer.js"></script>
```

#### Version specified

```markup
<script src="https://cdn.jsdelivr.net/npm/ovenplayer@0.10.0/dist/ovenplayer.js"></script>
```

### Install via npm

For more advanced workflows, installing via [npm](https://www.npmjs.com/package/ovenplayer) is recommended.

#### Latest version

```
$ npm install ovenplayer
```

#### Version specified

```
$ npm install ovenplayer@0.10.0
```

#### Vuejs component

```
$ npm install ovenplayer-vue3
```

## Quick Start

Below is a list of simple OvenPlayer initialization methods for each situation. For detailed options when initializing the OvenPlayer, please refer to the [Initialization](https://airensoft.gitbook.io/ovenplayer/initialization) chapter.

### Basic Concept

#### HTML

You need an HTML element where the OvenPlayer will be initialized.

```markup
<div id="player_id"></div>
```

Specifying the size or position of the player is possible by changing the style of the wrapper element.

```markup
<!-- Wrapper element for sizing or positioning the player -->
<div class="player-wrapper">
    <!-- OvenPlayer will be initialized inside this element. -->
    <div id="player_id"></div>
</div>
```

The width of the OvenPlayer is set equal to the width of the container. So with style below, the OvenPlayer will have a width of 1280px.

```css
.player-wrapper {
    margin: 0 auto;
    width: 1280px;
}
```

#### JavaScript

You can import `ovenplayer.js` and initialize OvenPlayer by calling `OvenPlayer.create()` as shown below:

```markup
<script src="https://cdn.jsdelivr.net/npm/ovenplayer/dist/ovenplayer.js"></script>

<script>
    // Initialize OvenPlayer
    const player = OvenPlayer.create('player_id', options)
</script>
```

Alternatively, you can use OvenPlayer as an ES6 module as follows:

```javascript
import OvenPlayer from 'ovenplayer';

// Initialize OvenPlayer
const player = OvenPlayer.create('player_id', options)
```

### OvenPlayer for Vue.js

You can use OvenPlayer as a reusable [Vue.js](https://vuejs.org/) component.

```vue
<script setup>
import OvenPlayerVue3 from "ovenplayer-vue3";
</script>

<template>
    <OvenPlayerVue3
    ref="ovenplayer"
    :config="playerConfig"
    @ready="readyHandler"
    @error="errorHandler"
    >
    </OvenPlayerVue3>
</template>

<script>
export default {
  data() {
    return {
      playerConfig: {
        sources: [
          {
            type: '...',
            file: '...',
          },
        ],
      },
    };
  },
  methods: {
    readyHandler(event) {
      //
    },
    errorHandler(event) {
      //
    },
    getQualityLevels() {
      return this.$refs.ovenplayer.playerInstance.getQualityLevels()
    }
  }
};
</script>
```

this component provides three exposed member:

- playerInstance: `ovenplayer.js` instance.
- createPlayer(): create player.
  - Note: please call `removePlayer` first, ensure there's no active instance.
- removePlayer(): remove player.

### Initialize for OME

To play Sub-Second Latency Stream of OvenMediaEngine, set the source `type` to `webrtc` and set the `file` to the WebRTC Signaling URL with OvenMediaEngine. An explanation of the WebRTC Signaling URL can be found [here](https://airensoft.gitbook.io/ovenmediaengine/getting-started#playback).

```markup
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OvenPlayer</title>
</head>

<body>
    <!-- OvenPlayer will be initialized inside this element. -->
    <div id="player_id"></div>

    <!-- Load OvenPlayer via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/ovenplayer/dist/ovenplayer.js"></script>

    <script>

        // Initialize OvenPlayer
        const player = OvenPlayer.create('player_id', {
            sources: [
                {
                    label: 'label_for_webrtc',
                    // Set the type to 'webrtc'
                    type: 'webrtc',
                    // Set the file to WebRTC Signaling URL with OvenMediaEngine 
                    file: 'ws://ome_host:signaling_port/app/stream'
                }
            ]
        });
    </script>
</body>

</html>
```

### Initialize for Video File

This is a way to play video files in progressive download mode.

```markup
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OvenPlayer</title>
</head>

<body>
    <!-- OvenPlayer will be initialized inside this element. -->
    <div id="player_id"></div>

    <!-- Load OvenPlayer via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/ovenplayer/dist/ovenplayer.js"></script>

    <script>

        // Initialize OvenPlayer
        const player = OvenPlayer.create('player_id', {
            sources: [
                {
                    label: 'label_for_video',
                    // Set the type to 'mp4', 'webm' or etc
                    type: 'mp4', 
                    file: 'https://github.com/AirenSoft/OvenPlayer/raw/master/docs/assets/OCP_480.mp4'
                }
            ]
        });
    </script>
</body>

</html>
```

### Initialize for DASH

If you want to play MPEG-DASH, you need the [dash.js](https://github.com/Dash-Industry-Forum/dash.js).

You need to place the `dash.js` first, and then `ovenplayer.js` as shown below:

```markup
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OvenPlayer</title>
</head>

<body>
    <!-- OvenPlayer will be initialized inside this element. -->
    <div id="player_id"></div>

    <!-- You need dash.js to play MPEG-DASH. -->
    <script src="https://cdn.jsdelivr.net/npm/dashjs@latest/dist/dash.all.debug.min.js"></script>

    <!-- Load OvenPlayer via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/ovenplayer/dist/ovenplayer.js"></script>

    <script>

        // Initialize OvenPlayer
        const player = OvenPlayer.create('player_id', {
            sources: [
                {
                    label: 'label_for_dash',
                    // Set the type to 'dash'
                    type: 'dash',
                    file: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'

                }
            ]
        });
    </script>
</body>

</html>
```

### Initialize for HLS

If you want to play HLS, you need the [hls.js](https://github.com/video-dev/hls.js).

You need to place the `hls.js` first, and then `ovenplayer.js` as shown below:

```markup
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OvenPlayer</title>
</head>

<body>
    <!-- OvenPlayer will be initialized inside this element -->
    <div id="player_id"></div>

    <!-- You need hls.js to play HLS. -->
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js"></script>

    <!-- Load OvenPlayer via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/ovenplayer/dist/ovenplayer.js"></script>

    <script>

        // Initialize OvenPlayer
        const player = OvenPlayer.create('player_id', {
            sources: [
                {
                    label: 'label_for_hls',
                    // Set the type to 'hls'
                    type: 'hls',
                    file: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

                }
            ]
        });
    </script>
</body>

</html>
```

### Initialize for Ads

If you want to use Ads in OvenPlayer, you need the [Google IMA](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side).

You need to set the `IMA` first, and then `ovenplayer.js`, as shown below:

```markup
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OvenPlayer</title>
</head>

<body>
    <!-- Wrapper element for resizing and positioning the player -->
    <div class="player-wrapper">
        <!-- OvenPlayer will be initialized inside this element. -->
        <div id="player_id"></div>
    </div>

    <script type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>

    <!-- Load OvenPlayer via CDN -->
    <script src="https://cdn.jsdelivr.net/npm/ovenplayer/dist/ovenplayer.js"></script>

    <script>

        // Initialize OvenPlayer
        const player = OvenPlayer.create('player_id', {
            sources: [
                {
                    label: 'label_for_video',
                    // Set the type to 'mp4', 'webm' or etc
                    type: 'mp4',
                    file: 'https://github.com/AirenSoft/OvenPlayer/raw/master/docs/assets/OCP_480.mp4'
                }
            ],
            // Set the AD tag URL
            adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="
        });
    </script>
</body>

</html>
```

## How to Contribute

Please read our [Guidelines](https://github.com/AirenSoft/OvenPlayer/blob/0.9/CONTRIBUTING.md) and [Rules](https://github.com/AirenSoft/OvenPlayer/blob/0.9/CODE\_OF\_CONDUCT.md).

## License

OvenPlayer is under the [MIT license](https://github.com/AirenSoft/OvenPlayer/blob/0.9/LICENSE).
