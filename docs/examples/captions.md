---
description: This example shows how to register and use subtitles without conversion.
---

# Captions

OvenPlayer supports webVTT, SRT, and SMI subtitles, so you can register and use subtitles without conversion. If you want to know more details, please refer to the [Captions API](../api-reference/api.md#getcaptionlist) chapter.

{% code title="" %}
```
let player = OvenPlayer.create("player", {sources : {
        type : "mp4", 
        file :  "https://path.to/your_video", 
        label : "360P"
    ],
    tracks : [
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
});
```
{% endcode %}
