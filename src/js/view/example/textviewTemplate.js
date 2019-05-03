/**
 * Created by hoho on 2018. 7. 19..
 */

const TextViewTemplate = function(text){
    return `<div class="textView" style="padding : 5px; background: red; position : absolute; top: 0;">` +
                `<h3>${text}</h3>` +
                `<button type="button" class="btn">button</button>` +
            `</div>`;
};

export default TextViewTemplate;