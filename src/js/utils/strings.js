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
 * naturalHms
 *
 * @param      {number | string}  second  The second
 * @return     {string}  formatted String
 */
export function naturalHms(second) {
    let secNum = parseInt(second, 10);
    if(!second){
        return "--:--";
    }
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