import { defineComponent as C, ref as u, onMounted as c, onUnmounted as g, onUpdated as y, openBlock as p, createElementBlock as s } from "vue";
import f from "ovenplayer";
const m = /* @__PURE__ */ C({
  __name: "OvenPlayer",
  props: {
    config: {}
  },
  emits: ["ready", "metaChanged", "stateChanged", "resized", "playbackRateChanged", "seek", "time", "bufferChanged", "mute", "volumeChanged", "playlistChanged", "sourceChanged", "qualityLevelChanged", "cueChanged", "timeDisplayModeChanged", "adChanged", "adTime", "adComplete", "fullscreenChanged", "clicked", "allPlaylistEnded", "hlsPrepared", "hlsDestroyed", "dashPrepared", "dashDestroyed", "destroy", "error"],
  setup(t, { expose: h, emit: n }) {
    const v = t, a = u(), l = u(), r = "ovenplayer-" + Math.random().toString().replace(".", ""), d = () => {
      l.value && (a.value = f.create(r, v.config), l.value = a.value.getContainerElement(), a.value.on("ready", () => n("ready")), a.value.on("metaChanged", (e) => n("metaChanged", e)), a.value.on("stateChanged", (e) => n("stateChanged", e)), a.value.on("resized", (e) => n("resized", e)), a.value.on("playbackRateChanged", (e) => n("playbackRateChanged", e)), a.value.on("seek", (e) => n("seek", e)), a.value.on("time", (e) => n("time", e)), a.value.on("bufferChanged", (e) => n("bufferChanged", e)), a.value.on("mute", (e) => n("mute", e)), a.value.on("volumeChanged", (e) => n("volumeChanged", e)), a.value.on("playlistChanged", (e) => n("playlistChanged", e)), a.value.on("sourceChanged", (e) => n("sourceChanged", e)), a.value.on("qualityLevelChanged", (e) => n("qualityLevelChanged", e)), a.value.on("cueChanged", (e) => n("cueChanged", e)), a.value.on("timeDisplayModeChanged", (e) => n("timeDisplayModeChanged", e)), a.value.on("adChanged", (e) => n("adChanged", e)), a.value.on("adTime", (e) => n("adTime", e)), a.value.on("adComplete", () => n("adComplete")), a.value.on("fullscreenChanged", (e) => n("fullscreenChanged", e)), a.value.on("clicked", (e) => n("clicked", e)), a.value.on("allPlaylistEnded", () => n("allPlaylistEnded")), a.value.on("hlsPrepared", (e) => n("hlsPrepared", e)), a.value.on("hlsDestroyed", () => n("hlsDestroyed")), a.value.on("dashPrepared", (e) => n("dashPrepared", e)), a.value.on("dashDestroyed", () => n("dashDestroyed")), a.value.on("destroy", () => n("destroy")), a.value.on("error", (e) => n("error", e)));
    }, o = () => {
      if (a.value) {
        try {
          a.value.remove();
        } catch {
        }
        a.value = void 0;
      }
    };
    return h({
      createPlayer: d,
      removePlayer: o,
      playerInstance: a
    }), c(d), g(o), y(() => {
      o(), d();
    }), (e, i) => (p(), s("div", {
      id: r,
      ref_key: "playerContainer",
      ref: l
    }, null, 512));
  }
});
export {
  m as default
};
