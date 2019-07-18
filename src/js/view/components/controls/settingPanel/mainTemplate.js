import _ from "utils/underscore";

export default (uiText, data) => {
    let elements = '<div id="'+data.id+'" class="op-setting-panel '+(data.isRoot ? 'animated fadeIn': '')+'" style="max-height: '+data.height+'px">' +
                        '<div class="op-setting-title-container">' +
                            '<div class="op-setting-title" tabindex="0">' +
                                (data.isRoot ? '' : '<span class="op-setting-title-previcon">&lt;</span>') +
                                '<span class="op-setting-title-title">'+data.title+'</span>' +
                            '</div>'+
                        '</div>' +
                        '<div class="op-setting-item-container">';
                            _.forEach(data.body, function(body){
                                elements += settingItemTemplate(body, data.useCheck);
                            });
    elements+=          '</div>' +
                    '</div>';
    return elements;
};


export const settingItemTemplate = (data, useCheck) => {
    return (
        '<div class="op-setting-item" op-panel-type="'+data.panelType+'" op-data-value="'+data.value+'">' +
        (useCheck?'<span class="op-setting-item-checked '+(data.isCheck?'op-show':'')+'">&#x2713;</span>':'' )+
        '<span class="op-setting-item-title">'+data.title+'</span>' +
        (data.hasNext?'<span class="op-setting-item-nexticon">&gt;</span><span class="op-setting-item-value">'+data.description+'</span>' : '' )+
        '</div>'
    );
};