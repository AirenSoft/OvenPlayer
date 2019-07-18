export default (uiText, data) => {
    return`<div class="op-navigators op-time-display">`+
            (data.duration === Infinity
                ?
                (
                    `<span class="op-live-badge" disabled="disabled">` +
                        (data.type ==="webrtc"
                        ?
                            (data.isP2P ?
                                    `<span class="op-live-badge-lowlatency">${uiText.controls.low_latency_p2p}</span>` : `<span class="op-live-badge-lowlatency">${uiText.controls.low_latency_live}</span>`
                            )
                        :
                        `<span>${uiText.controls.live}</span>`) +
                    `</span>`
                )
                :(`<span class="op-time-current">00:00</span><span class="op-time-separator"> / </span><span class="op-time-duration">00:00</span>`)
            ) +
        `</div>`;
};
