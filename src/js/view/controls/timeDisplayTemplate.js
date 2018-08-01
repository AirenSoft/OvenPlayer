export default (data) => {
    return (
        '<div class="ovp-time-display">'+
            (data.duration === Infinity
                ?
                ('<button class="ovp-live-badge ovp-button" disabled="disabled">' +
                    (data.type =='webrtc'
                        ?
                        '<span class="ovp-live-badge-lowlatency">low latency live</span>'
                        :
                        '<span>live</span>') +
                '</button>')
                :
                ('<span class="ovp-time-current">0:00</span>' +
                    '<span class="ovp-time-separator"> / </span>' +
                    '<span class="ovp-time-duration">0:00</span>')
            ) +
        '</div>'
    );
};
