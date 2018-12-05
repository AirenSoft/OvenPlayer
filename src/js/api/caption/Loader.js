/**
 * Created by hoho on 2018. 7. 4..
 */
import SrtParser from "api/caption/parser/SrtParser";
import SamiParser from "api/caption/parser/SmiParser";
import VTTCue from "utils/captions/vttCue";
import Request from "request";
const Buffer = require('buffer').Buffer;
const iconv = require('iconv-lite');

const Loader = function(){
    const that = {};

    //for test. dst_type : webvtt, srt, sami
    let convertVTTUrl = function(trackUrl){
        return "https://subtitles.ovencloud.com:8453/v1/subtitles?url="+escape(trackUrl)+"&src_type=srt&dst_type=webvtt&file_name=ovenplayer2018";
    };
    let convertToVTTCues = function (cues) {
        return cues.map(cue => new VTTCue(cue.start, cue.end, cue.text));
    }

    that.load = (track, successCallback, errorCallback) => {

        var requestOptions  = { method: "GET",
            uri : track.file
            ,headers: { "User-Agent": "Mozilla/5.0" }
            ,encoding: null
        };
        Request(requestOptions, function(error, response, body) {
            if(error){
                errorCallback(error);
            }else{
                let cues = [];
                let vttCues = [];
                var responseText = body;
                if (responseText.indexOf('WEBVTT') >= 0) {
                    OvenPlayerConsole.log("WEBVTT LOADED");
                    loadVttParser().then(WebVTT => {
                        let parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
                        vttCues = [];
                        parser.oncue = function(cue) {
                            vttCues.push(cue);
                        };
                        parser.onflush = function() {
                            //delete track.xhr;
                            successCallback(vttCues);
                        };
                        // Parse calls onflush internally
                        parser.parse(responseText);
                    }).catch(error => {
                        //delete track.xhr;
                        errorCallback(error);
                    });
                }else if(responseText.indexOf('SAMI') >= 0){
                    OvenPlayerConsole.log("SAMI LOADED");
                    let buffered = new Buffer(responseText);
                    let parsedData = SamiParser(iconv.decode(buffered, 'EUC-KR').toString(), {});
                    vttCues = convertToVTTCues(parsedData.result);
                    successCallback(vttCues);
                }else{
                    OvenPlayerConsole.log("SRT LOADED");
                    cues = SrtParser(responseText);
                    vttCues = convertToVTTCues(cues);
                    successCallback(vttCues);
                }

            }
        });
    };

    return that;
};
function loadVttParser() {
    return require.ensure(['api/caption/parser/VttParser'], function (require) {
        return require('api/caption/parser/VttParser').default;
    }, function(err){console.log(err);}, 'vttparser');
}

export default Loader;
