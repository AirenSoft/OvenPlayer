export default () => {
    return (
        `<div class="ovp-time-display">`+
            `<span class="ovp-time-current">0:00</span>` +
            `<span class="ovp-time-separator"> / </span>` +
            `<span class="ovp-time-duration">7:21</span>` +
            '<button class="ovp-live-badge ovp-button" disabled="disabled"><span class="ovp-live-badge-lowlatency">low latency</span><span>live</span></button>' + 
        `</div>`
    );
};
