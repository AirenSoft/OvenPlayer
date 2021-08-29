/**
 * Created by hoho on 2018. 7. 4..
 */
import SrtParser from "api/caption/parser/SrtParser";
import WebVTT from 'api/caption/parser/VttParser'
import VTTCue from 'utils/captions/vttCue'
import SmiParser from 'api/caption/parser/SmiParser'

const Loader = function () {
    const that = {};

    const convertToVTTCues = function (cues) {
        return cues.map(cue => new VTTCue(cue.start, cue.end, cue.text));
    };

    that.load = (track, language, successCallback, errorCallback) => {

        fetch(track.file).then(function (response) {
            if (response.ok) {

                response.text().then(function (body) {
                    let cues = [];
                    let vttCues = [];

                    if (body.indexOf('WEBVTT') >= 0) {
                        OvenPlayerConsole.log("WEBVTT LOADED");
                        let parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
                        vttCues = [];
                        parser.oncue = function (cue) {
                            vttCues.push(cue);
                        };
                        parser.onflush = function () {
                            //delete track.xhr;
                            successCallback(vttCues);
                        };
                        // Parse calls onflush internally
                        parser.parse(body);
                    } else if (body.indexOf('SAMI') >= 0) {
                        OvenPlayerConsole.log("SAMI LOADED");
                        let parsedData = SmiParser(body, {fixedLang: language});
                        vttCues = convertToVTTCues(parsedData.result);
                        successCallback(vttCues);

                    } else {
                        OvenPlayerConsole.log("SRT LOADED");
                        cues = SrtParser(body);
                        vttCues = convertToVTTCues(cues);
                        successCallback(vttCues);
                    }
                }).catch(function (e) {
                    errorCallback(e);
                });

            } else {
                errorCallback(response.status);
            }
        }).catch(function (e) {
            errorCallback(e);
        });

    };

    return that;
};

export default Loader;
