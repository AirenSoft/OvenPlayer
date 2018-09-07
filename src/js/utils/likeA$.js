/**
 * Created by hoho on 2018. 7. 23..
 */
import _ from "utils/underscore";

/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */


const La$ = function(selectorOrElement){
    const that = {};
    const returnNode = function($element , selector){
        let nodeList =  $element.querySelectorAll(selector);
        if(nodeList.length > 1){
            return nodeList;
        }else{
            return nodeList[0];
        }

    };

    let $element = "";

    if( _.every(selectorOrElement, function(item){return _.isElement(item)})){
        $element = selectorOrElement;
    }else if(selectorOrElement === "document"){
        $element = document;
    }else if(selectorOrElement === "window"){
        $element = window;
    }else{
        $element = returnNode(document, selectorOrElement);
    }


    if(!$element){
        return null;
    }

    that.find = (selector) =>{
        return La$(returnNode($element, selector));
    };

    that.css = (name, value) => {
        if($element.length > 0){
            $element.forEach(function(element){
                element.style[name] = value;
            })
        }else{
            $element.style[name] = value;
        }
    };

    that.addClass = (name) =>{
        if($element.classList){
            $element.classList.add(name);
        }else{
            let classNames = $element.className.split(" ");
            if(classNames.indexOf(name) === -1){
                $element.className += " " + name;
            }
        }

    };

    that.removeClass = (name) =>{
        if ($element.classList){
            $element.classList.remove(name);
        }else{
            $element.className = $element.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

        }
    };

    that.removeAttribute = (attrName) => {
        $element.removeAttribute(attrName);
    };

    that.show = () =>{
        $element.style.display = 'block';
    };

    that.hide = () =>{
        $element.style.display = 'none';
    };

    that.append = (htmlCode) =>{
        $element.innerHTML += htmlCode;
    };

    that.text = (text) => { //IE8+
        if(text){
            $element.textContent = text;
        }else{
            return $element.textContent;
        }
    };

    that.hasClass = (name) => { //IE8+
        if($element.classList){
            return $element.classList.contains(name);
        }else{
            return new RegExp('(^| )' + name + '( |$)', 'gi').test($element.name);
        }
    };

    that.is = ($targetElement) => {
        return $element === $targetElement;
    };

    that.offset = () =>{    //IE8+
        var rect = $element.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        }
    };

    that.width = () => {    //IE8+
        return $element.clientWidth;
    };

    that.height = () => {   //IE8+
        return $element.clientHeight;
    };

    that.attr = (attr) => {
        return $element.getAttribute(attr);
    };

    that.replace = (html) => {
        $element.replaceWith(html);
    };

    that.append = (html) => {
        $element.appendChild(html);
    };

    that.remove = () => {
        $element.remove();
    };

    that.removeChild = () => {
        while ($element.hasChildNodes()) {
            $element.removeChild($element.firstChild);
        }
    };

    that.get = () => {
        return $element;
    };

    that.closest = (selectorString) => {
        return $element.closest(selectorString);
    };

    return that;
};

export default La$;
