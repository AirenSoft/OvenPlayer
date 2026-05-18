---
title: Captions
description: "Add subtitles to OvenPlayer: register WebVTT, SRT, and SMI caption tracks directly without conversion."
sidebar_position: 9
---

OvenPlayer supports webVTT, SRT, and SMI subtitles, so you can register and use subtitles without conversion. If you want to know more details, please refer to the [Captions API](../api-reference/api.md#getcaptionlist) chapter.


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

