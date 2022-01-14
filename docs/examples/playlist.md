---
description: This example shows how to set a playlist in OvenPlayer.
---

# Playlist

### Source

It is the smallest unit for playing video from OvenPlayer. It is generally a single content.

{% code title="example" %}
```
let player = OvenPlayer.create("player", {
        type : "mp4", 
        file :  "https://path.to/your_video", 
        framerate : 30,
        label : "360P"
    });
```
{% endcode %}

### Sources

If you have multiple protocols or multiple resolutions for a single content, you can register them at once using `sources`.&#x20;

OvenPlayer will play a video in the order of the protocol or resolution you entered in `sources`, and will automatically play the next source if playback fails.

{% code title="" %}
```
let player = OvenPlayer.create("player", {sources : [
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
] });
```
{% endcode %}

### Playlist&#x20;

`playlist` has multiple `sources` mentioned above. You can explore between playlists, and it automatically plays the next content. Also, you can assign ads and captions for each `playlist`.

For more information, please refer to the [Playlist API](../api-reference/api.md#getplaylist) chapter.

{% code title="" %}
```
let player = OvenPlayer.create("player", {
        playlist : [
        {
                title : "01",
                adTagUrl : "https://pubads.g.doubleclick.net/gampad/ads?...",
                image : "https://path.to/your_video_thumbnail.jpeg",
                duration : 7343,
                sources: [    {
                                  type : "mp4", 
                                  file :  "https://path.to/your_video", 
                                  label : "360P"
                              }],
                tracks: [{
                        kind : "captions", 
                        file :  "https://path.to/your_caption.vtt", 
                        label : "KO vtt"
                    }]
        },
        {
                        title : "02",
                        adTagUrl : "https://pubads.g.doubleclick.net/gampad/ads?...",
                        image : "https://path.to/your_video_thumbnail2.jpeg",
                        duration : 8333,
                        sources: [    {
                                          type : "mp4", 
                                          file :  "https://path.to/your_video2", 
                                          label : "360P"
                                      },
                                      {
                                          type : "mpd", 
                                          file :  "https://path.to/your_video.mpd", 
                                          label: "360P DASH"
                                      }
                        tracks: [{
                                kind : "captions", 
                                file :  "https://path.to/your_caption2.vtt", 
                                label : "KO vtt"
                            }]
                }
 ]
});
```
{% endcode %}
