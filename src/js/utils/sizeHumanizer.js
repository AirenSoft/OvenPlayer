/**
 * Created by hoho on 2018. 11. 14..
 */

const sizeHumanizer = function (bytes, si, postpix) {
    let thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    let unit = postpix||"B";
    let units = ['k'+unit,'M'+unit,'G'+unit,'T'+unit,'P'+unit,'E'+unit,'Z'+unit,'Y'+unit];
       // ? ['kB','MB','GB','TB','PB','EB','ZB','YB']: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+units[u];
}

export default sizeHumanizer;