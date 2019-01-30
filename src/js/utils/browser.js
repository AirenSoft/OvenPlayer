/**
 * Created by hoho on 2018. 8. 24..
 */

export const getBrowserLanguage = function(){
    let nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};

export const getBrowser = function(){
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ){
        return 'opera';
    }else if(navigator.userAgent.indexOf("Chrome") != -1 ){
        return 'chrome';
    }else if(navigator.userAgent.indexOf("Safari") != -1){
        return 'safari';
    }else if(navigator.userAgent.indexOf("Firefox") != -1 ){
        return 'firefox';
    }else if((navigator.userAgent.indexOf("MSIE") != -1 )){
        let msie = navigator.userAgent.indexOf("MSIE");
        /*if(!!document.documentMode == true ){
            return 'ie';
        }else if(!!navigator.userAgent.match(/Trident.*rv\:11\./)){
            if (!isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
                return 'ie';
            }else{
                return 'unknown';
            }
        }else{
            return 'unknown';
        }*/
        var ie = (function(){

            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');

            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );

            return v > 4 ? v : undef;

        }());
        if(ie < 9){
            return 'oldIE';
        }else{
            return 'modernIE';
        }

    }else{
        return 'unknown';
    }

};

