import _ from './underscore';

export function trim(string) {
    return string.replace(/^\s+|\s+$/g, '');
}

/**
 * extractExtension
 *
 * @param      {string} path for url
 * @return     {string}  Extension
 */
export const extractExtension = function(path) {
    if(!path || path.substr(0,4)=='rtmp') {
        return "";
    }
    function getAzureFileFormat(path) {
        let extension = "";
        if ((/[(,]format=mpd-/i).test(path)) {
            extension = 'mpd';
        }else if ((/[(,]format=m3u8-/i).test(path)) {
            extension = 'm3u8';
        }
        return extension;
    }

    let azuredFormat = getAzureFileFormat(path);
    if(azuredFormat) {
        return azuredFormat;
    }
    path = path.split('?')[0].split('#')[0];
    if(path.lastIndexOf('.') > -1) {
        return path.substr(path.lastIndexOf('.') + 1, path.length).toLowerCase();
    }else{
        return "";
    }
};


/**
 * Time Formatter
 *
 * @param      {number | string}  second  The second
 * @return     {string}  formatted String
 */
export function naturalHms(second) {
    let secNum = parseInt(second, 10);
    let hours   = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds = secNum - (hours * 3600) - (minutes * 60);

    if (hours > 0) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    if (hours > 0) {
        return hours+':'+minutes+':'+seconds;
    } else {
        return minutes+':'+seconds;
    }
}
export function hms(secondsNumber) {
    function pad(str, length, padd) {
        str = '' + str;
        padd = padd || '0';
        while (str.length < length) {
            str = padd + str;
        }
        return str;
    }
    let h = parseInt(secondsNumber / 3600);
    let m = parseInt(secondsNumber / 60) % 60;
    let s = secondsNumber % 60;
    return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s.toFixed(3), 6);
}
export function seconds(str, frameRate) {
    if(!str) {
        return 0;
    }
    if(_.isNumber(str) && !_.isNaN(str)){
        return str;
    }
    str = str.replace(',', '.');
    let arr = str.split(':');
    let arrLength = arr.length;
    let sec = 0;
    if (str.slice(-1) === 's'){
        sec = parseFloat(str);
    }else if (str.slice(-1) === 'm'){
        sec = parseFloat(str) * 60;
    }else if (str.slice(-1) === 'h'){
        sec = parseFloat(str) * 3600;
    }else if (arrLength > 1) {
        var secIndex = arrLength - 1;
        if (arrLength === 4) {
            if (frameRate) {
                sec = parseFloat(arr[secIndex]) / frameRate;
            }
            secIndex -= 1;
        }
        sec += parseFloat(arr[secIndex]);
        sec += parseFloat(arr[secIndex - 1]) * 60;
        if (arrLength >= 3) {
            sec += parseFloat(arr[secIndex - 2]) * 3600;
        }
    } else {
        sec = parseFloat(str);
    }
    if (_.isNaN(sec)) {
        return 0;
    }
    return sec;
}

export function offsetToSeconds(offset, duration, frameRate) {
    if (_.isString(offset) && offset.slice(-1) === '%') {
        const percent = parseFloat(offset);
        if (!duration || isNaN(duration) || isNaN(percent)) {
            return null;
        }
        return duration * percent / 100;
    }
    return seconds(offset, frameRate);
}