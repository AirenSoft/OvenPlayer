import _ from "utils/underscore";

export default (data) => {
    let elements = '<div class="ovp-setting-panel '+(data.isMain ? 'animated fadeIn': '')+'">' +
                        '<div class="ovp-setting-title-container">' +
                            '<div class="ovp-setting-title" tabindex="0">' +
                                (data.isMain ? '' : '<span class="ovp-setting-title-previcon">&lt;</span>') +
                                '<span class="ovp-setting-title-title">'+data.title+'</span>' +
                            '</div>'+
                        '</div>' +
                        '<div class="ovp-setting-item-container">';
                            _.forEach(data.body, function(body){
                                if(data.isMain){
                                    elements += settingItemTemplate(body.title, body.value, body.type);
                                }else{
                                    elements += settingValueTemplate(body.title, body.value, data.type, body.isCheck, body.metaQuality);
                                }
                            });
    elements+=          '</div>' +
                    '</div>';
    return elements;
};

export const settingItemTemplate = (title, value, type) => {
    return (
        '<div class="ovp-setting-item ovp-setting-main-item" ovp-panel-type="'+type+'">' +
            '<span class="ovp-setting-item-title">'+title+'</span>' +
            '<span class="ovp-setting-item-nexticon">&gt;</span>' +
            '<span class="ovp-setting-item-value">'+value+'</span>' +
        '</div>'
    );
};

export const settingValueTemplate = (title, value, type, isCheck, metaList) => {
    return (
        '<div class="ovp-setting-item ovp-setting-sub-item" ovp-panel-type="'+type+'" ovp-data-value="'+value+'">' +
            '<span class="ovp-setting-item-checked '+(isCheck?'ovp-show':'')+'">&#x2713;</span>' +
            '<span class="ovp-setting-item-title">'+title+'</span>' +
        '</div>'
    );
};
