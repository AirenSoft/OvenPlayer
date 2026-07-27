---
title: DRM
description: "Play DRM-protected HLS with OvenPlayer: configure FairPlay, Widevine, and PlayReady license servers and per-key-system license headers."
sidebar_position: 12
---

OvenPlayer plays DRM-protected HLS streams through the three key systems supported by the browser platforms: **FairPlay Streaming** (Apple), **Widevine** (Google), and **PlayReady** (Microsoft). All three are configured under [`hlsConfig`](../initialization.md#hlsconfig).

:::info
DRM applies to **HLS playback only**. WebRTC and DASH sources ignore `drmSystems`.
:::

## Quick start

Enable EME and declare one entry per key system you want to support. The player uses whichever key system the current browser can actually initialize.

```javascript title="All three key systems"
const player = OvenPlayer.create('player', {
  sources: [
    {
      type: 'hls',
      file: 'https://path.to/your_stream/master.m3u8',
    },
  ],
  hlsConfig: {
    emeEnabled: true,
    drmSystems: {
      'com.apple.fps': {
        licenseUrl: 'https://path.to/your_license_server/fairplay',
        serverCertificateUrl: 'https://path.to/your_certificate/fairplay.cer',
      },
      'com.widevine.alpha': {
        licenseUrl: 'https://path.to/your_license_server/widevine',
      },
      'com.microsoft.playready': {
        licenseUrl: 'https://path.to/your_license_server/playready',
      },
    },
  },
});
```

:::warning
EME requires a **secure context**. Serve the page over HTTPS (or `localhost`) — DRM playback fails on plain `http://`.
:::

## Key systems

| Key system                | `drmSystems` key            | Browsers                                       |
| ------------------------- | --------------------------- | ---------------------------------------------- |
| FairPlay Streaming        | `com.apple.fps`             | Safari (macOS), Safari (iOS / iPadOS)          |
| Widevine                  | `com.widevine.alpha`        | Chrome, Edge, Firefox, Android                 |
| PlayReady                 | `com.microsoft.playready`   | Edge (Windows)                                 |

You only need to declare the key systems your license server actually issues licenses for. Declaring several is normal — a single page usually serves Safari, Chrome, and Edge visitors at once.

### emeEnabled

| Type    | Default | Required |
| ------- | ------- | -------- |
| boolean | false   | true     |

Master switch for Encrypted Media Extensions. **`drmSystems` is ignored unless `emeEnabled` is `true`.**

### drmSystems

| Type   | Default | Required |
| ------ | ------- | -------- |
| Object | null    | false    |

An object keyed by key system identifier. Each entry accepts the following fields:

| Field                  | Type   | Required                | Description                                                                                        |
| ---------------------- | ------ | ----------------------- | -------------------------------------------------------------------------------------------------- |
| `licenseUrl`           | String | true                    | License server endpoint the player sends the license request to.                                   |
| `serverCertificateUrl` | String | true for FairPlay       | URL of the DRM server certificate. FairPlay cannot initialize without it.                          |
| `licenseHeaders`       | Object | false                   | A custom HTTP header attached to this key system's license request. See [License headers](#license-headers). |

`licenseUrl` and `serverCertificateUrl` are passed through to [hls.js](https://github.com/video-dev/hls.js/blob/master/docs/API.md#drmsystems), so any other field hls.js accepts on a `drmSystems` entry also works. `licenseHeaders` is an OvenPlayer addition and is removed from the config before it reaches hls.js.

## License headers

Most commercial license servers authenticate the license request with a token in a custom HTTP header. Set it per key system with `licenseHeaders`:

```javascript title="Per-key-system authentication token"
const player = OvenPlayer.create('player', {
  sources: [
    {
      type: 'hls',
      file: 'https://path.to/your_stream/master.m3u8',
    },
  ],
  hlsConfig: {
    emeEnabled: true,
    drmSystems: {
      'com.apple.fps': {
        licenseUrl: 'https://path.to/your_license_server/fairplay',
        serverCertificateUrl: 'https://path.to/your_certificate/fairplay.cer',
        licenseHeaders: {
          key: 'X-AxDRM-Message',
          value: 'your_fairplay_token',
        },
      },
      'com.widevine.alpha': {
        licenseUrl: 'https://path.to/your_license_server/widevine',
        licenseHeaders: {
          key: 'X-AxDRM-Message',
          value: 'your_widevine_token',
        },
      },
    },
  },
});
```

The header is scoped to the key system it is declared under. A Widevine token is never sent to the FairPlay license server, and vice versa — even though both requests go through the same underlying hls.js hook.

:::note
`licenseHeaders` carries **one** header, as a `key` / `value` pair. It is not a map of several headers.
:::

:::warning[Replaces `licenseCustomHeader` (0.10.53)]
The old top-level `licenseCustomHeader` option was removed in **0.10.53**. It sent the same header to every key system, which breaks as soon as a page serves more than one DRM. Move it into the `drmSystems` entry it belongs to:

```javascript
// Before (removed)
licenseCustomHeader: { key: 'X-AxDRM-Message', value: 'token' }

// After
hlsConfig: {
  drmSystems: {
    'com.widevine.alpha': {
      licenseUrl: 'https://path.to/your_license_server/widevine',
      licenseHeaders: { key: 'X-AxDRM-Message', value: 'token' },
    },
  },
}
```

A leftover `licenseCustomHeader` is silently ignored, so the license request goes out unauthenticated and the license server rejects it.
:::

## FairPlay on iOS

When the browser identifies itself as an iPhone, iPad, or iPod, OvenPlayer plays HLS with the device's **native** engine instead of hls.js, and runs its own FairPlay key exchange:

- Both `licenseUrl` and `serverCertificateUrl` are **required**.
- The server certificate is fetched as base64 text and decoded by the player.
- The license request is a `POST` with `Content-Type: application/x-www-form-urlencoded` and a body of `spc=<base64-encoded SPC>`.
- The license server must answer with the **base64-encoded CKC** as the response body.
- `licenseHeaders` is applied to that request just as it is on the hls.js path.

Every other platform — including Safari on macOS, and an iPad requesting the desktop site — goes through hls.js, where the SPC/CKC exchange follows the hls.js defaults. If your license server only implements the form-encoded `spc=` contract above, verify macOS Safari separately.

## Error handling

When the certificate or the license cannot be loaded, the player throws error **107 — `Error initializing DRM.`** Subscribe to it like any other player error:

```javascript
player.on('error', function (error) {
  if (error.code === 107) {
    console.error('DRM initialization failed:', error.message);
  }
});
```

Common causes:

- The page is not served over HTTPS.
- `serverCertificateUrl` is missing or unreachable on iOS FairPlay.
- The license server rejected the request — usually a missing or expired `licenseHeaders` token.
- The license server's CORS policy does not allow the player's origin, or does not expose the custom header in `Access-Control-Allow-Headers`.

See [Error Handling](../error-handling.md) for the full recovery flow.
