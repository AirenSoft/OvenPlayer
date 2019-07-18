export default (uiText) => {
    return (
        '<div class="op-frame-buttons">'+
            '<button class="op-button op-frame-button" op-data-value="-5"><div class="frame-icon"><span class="btn-text">-5f</span></div></button>'+
            '<button class="op-button op-frame-button" op-data-value="-1"><div class="frame-icon"><span class="btn-text">-1f</span></div></button>'+
            '<button class="op-button op-frame-button" op-data-value="+1"><div class="frame-icon reverse"><span class="btn-text">+1f</span></div></button>'+
            '<button class="op-button op-frame-button" op-data-value="+5"><div class="frame-icon reverse"><span class="btn-text">+5f</span></div></button>'+
        '</div>'
    );
};