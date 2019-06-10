export default (data) => {
    return`<div class="ovp-navigators ovp-time-display">`+
            (data.duration === Infinity
                ?
                (
                    `<span class="ovp-live-badge" disabled="disabled">` +
                        (data.type ==="webrtc"
                        ?
                            (data.isP2P ?
                                    `<span class="ovp-live-badge-lowlatency">low latency <strong>P2P</strong></span>` : `<span class="ovp-live-badge-lowlatency">low latency live</span>`
                            )
                        :
                        `<span>live</span>`) +
                    `</span>`
                )
                :(`<span class="ovp-time-current">0:00</span><span class="ovp-time-separator"> / </span><span class="ovp-time-duration">0:00</span>`)
            ) +
        `</div>`;
};
