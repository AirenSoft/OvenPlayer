---
title: Ads
description: "Monetize OvenPlayer with ads: VAST 4/3/2, VPAID 2, and VMAP 1.0.1 are supported through the adTagUrl option."
sidebar_position: 10
---

OvenPlayer supports VAST 4, VAST 3, VAST 2, VPAID 2 (HTML 5), and VMAP 1.0.1, so you can easily use various ads. If you need more information, please see [Support and Compatibility](https://developers.google.com/interactive-media-ads/docs/sdks/html5/compatibility).


```
let player = OvenPlayer.create("player", {
    adTagUrl : "https://pubads.g.doubleclick.net/gampad/ads?...",
    sources : [
        type : "mp4", 
        file :  "https://path.to/your_video", 
        label : "360P"
    ]
});
```

