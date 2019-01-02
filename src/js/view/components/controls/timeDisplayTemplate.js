export default (data) => {
    return'<div class="ovp-time-display">'+
            (data.duration === Infinity
                ?
                (
                    '<span class="ovp-live-badge" disabled="disabled">' +
                        (data.type ==='webrtc'
                        ?
                        '<span class="ovp-live-badge-lowlatency">low latency live</span>'
                        :
                        '<span>live</span>') +
                    '</span>'
                )
                :
                (
                    '<span class="ovp-time-current">0:00</span>' +
                    '<span class="ovp-time-separator"> / </span>' +
                    '<span class="ovp-time-duration">0:00</span>'
                )
            ) +
        '</div>';
};
