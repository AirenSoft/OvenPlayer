export default (data) => {
    return`<div class="op-navigators op-time-display">`+
            (data.duration === Infinity
                ?
                (
                    `<span class="op-live-badge" disabled="disabled">` +
                        (data.type ==="webrtc"
                        ?
                            (data.isP2P ?
                                    `<span class="op-live-badge-lowlatency">low latency <strong>P2P</strong></span>` : `<span class="op-live-badge-lowlatency">low latency live</span>`
                            )
                        :
                        `<span>live</span>`) +
                    `</span>`
                )
                :(`<span class="op-time-current">00:00</span><span class="op-time-separator"> / </span><span class="op-time-duration">00:00</span>`)
            ) +
        `</div>`;
};
