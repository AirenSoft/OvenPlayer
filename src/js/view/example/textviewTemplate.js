/**
 * Created by hoho on 2018. 7. 19..
 */

const TextViewTemplate = function(text){
    return '<div class="textView" style="padding : 5px; background: red">' +
                '<h3>'+text+'</h3>' +
                '<button type="button" class="btn">닫기</button>' +
            '</div>';
};

export default TextViewTemplate;