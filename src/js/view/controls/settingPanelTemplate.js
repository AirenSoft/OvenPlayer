import _ from "utils/underscore";

export default (data) => {
    let elements = '<div id="'+data.id+'" class="ovp-setting-panel '+(data.isRoot ? 'animated fadeIn': '')+'">' +
                        '<div class="ovp-setting-title-container">' +
                            '<div class="ovp-setting-title" tabindex="0">' +
                                (data.isRoot ? '' : '<span class="ovp-setting-title-previcon">&lt;</span>') +
                                '<span class="ovp-setting-title-title">'+data.title+'</span>' +
                            '</div>'+
                        '</div>' +
                        '<div class="ovp-setting-item-container">';
                            _.forEach(data.body, function(body){
                                elements += settingItemTemplate(body, data.useCheck);
                            });
    elements+=          '</div>' +
                    '</div>';
    return elements;
};


export const settingItemTemplate = (data, useCheck) => {
    return (
        '<div class="ovp-setting-item" ovp-panel-type="'+data.panelType+'" ovp-data-value="'+data.value+'">' +
        (useCheck?'<span class="ovp-setting-item-checked '+(data.isCheck?'ovp-show':'')+'">&#x2713;</span>':'' )+
        '<span class="ovp-setting-item-title">'+data.title+'</span>' +
        (data.hasNext?'<span class="ovp-setting-item-nexticon">&gt;</span><span class="ovp-setting-item-value">'+data.value+'</span>' : '' )+
        '</div>'
    );
};