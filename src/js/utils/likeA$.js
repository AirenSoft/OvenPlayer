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

    if( _.isElement(selectorOrElement) || _.every(selectorOrElement, function(item){return _.isElement(item)})){
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

    /*EFFECTS*/

    that.show = () =>{
        $element.style.display = 'block';
    };

    that.hide = () =>{
        $element.style.display = 'none';
    };

    /*ELEMENTS*/

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

    that.after = (htmlString) => {
        $element.insertAdjacentHTML('afterend', htmlString);
    };

    that.append = (htmlString) => {
        $element.appendChild(htmlString);
    };

    that.before = (htmlString) => {
        $element.insertAdjacentHTML('beforebegin', htmlString);
    };

    that.children = () => {
        return $element.children || [];
    };

    //The contains() method returns a Boolean value indicating whether a node is a descendant of a specified node.
    //A descendant can be a child, grandchild, great-grandchild, and so on.
    that.contains = (elChild) => {
        return $element !== elChild && $element.contains(elChild);
    };

    that.empty = () => {
        $element.innerHTML = "";
    };


    that.find = (selector) =>{
        return La$(returnNode($element, selector));
    };

    that.css = (name, value) => {
        if(value){
            if($element.length > 0){
                $element.forEach(function(element){
                    element.style[name] = value;
                })
            }else{
                $element.style[name] = value;
            }
        }else{
            return $element.style[name];
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



    /*that.append = (htmlCode) =>{
        $element.innerHTML += htmlCode;
    };*/

    that.text = (text) => { //IE8+
        if(text === undefined){
            return $element.textContent;
        }else{
            $element.textContent = text;
        }
    };
    that.html = (htmlString) => {
        $element.innerHTML = htmlString;
    };
    that.hasClass = (name) => { //IE8+
        if($element.classList){
            return $element.classList.contains(name);
        }else{
            return new RegExp('(^| )' + name + '( |$)', 'gi').test($element.name);
        }
    };

    that.is = ($targetElement) => {
        /*var matches = function(el, selector) {
            return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
        };

        matches(el, '.my-class');*/
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


    that.remove = () => {
        if($element.length > 1){
            $element.parentElement.removeChild($element);
        }else{
            $element.remove();
        }

    };

    that.removeChild = (element) => {
        if(element){
            $element.removeChild(element);
        }else{
            while ($element.hasChildNodes()) {
                $element.removeChild($element.firstChild);
            }
        }

    };

    that.get = () => {
        return $element;
    };

    that.closest = (selectorString) => {
        let closestElement = $element.closest(selectorString);
        if(closestElement){
            return La$(closestElement);
        }else{
            return null;
        }
    };

    return that;
};

export default La$;
