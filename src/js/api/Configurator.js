import _ from "utils/underscore";
import {
    CONTENT_TIME_MODE_CHANGED
} from "api/constants";

/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */
const Configurator = function(options, provider){

    const composeSourceOptions = function(options){
        const Defaults = {
            defaultPlaybackRate: 1,
            playbackRateControls: false,
            playbackRates: [0.25, 0.5, 1, 1.5, 2],
            mute: false,
            volume: 90
        };
        const serialize = function (val) {
            if (val === undefined) {
                return null;
            }
            if (typeof val === 'string' && val.length < 6) {
                const lowercaseVal = val.toLowerCase();
                if (lowercaseVal === 'true') {
                    return true;
                }
                if (lowercaseVal === 'false') {
                    return false;
                }
                if (!isNaN(Number(val)) && !isNaN(parseFloat(val))) {
                    return Number(val);
                }
            }
            return val;
        }
        const deserialize = function (options) {
            Object.keys(options).forEach((key) => {
                if (key === 'id') {
                    return;
                }
                options[key] = serialize(options[key]);
            });
        }
        const normalizeSize = function (val) {
            if (val.slice && val.slice(-2) === 'px') {
                val = val.slice(0, -2);
            }
            return val;
        }
        const evaluateAspectRatio = function (ar, width) {
            if (width.toString().indexOf('%') === -1) {
                return 0;
            }
            if (typeof ar !== 'string' || !ar) {
                return 0;
            }
            if (/^\d*\.?\d+%$/.test(ar)) {
                return ar;
            }
            const index = ar.indexOf(':');
            if (index === -1) {
                return 0;
            }
            const w = parseFloat(ar.substr(0, index));
            const h = parseFloat(ar.substr(index + 1));
            if (w <= 0 || h <= 0) {
                return 0;
            }
            return (h / w * 100) + '%';
        }
        deserialize(options);
        let config = Object.assign({}, Defaults, options);

        let rateControls = config.playbackRateControls;
        if (rateControls) {
            let rates = config.playbackRates;

            if (Array.isArray(rateControls)) {
                rates = rateControls;
            }
            rates = rates.filter(rate => _.isNumber(rate) && rate >= 0.25 && rate <= 4)
                .map(rate => Math.round(rate * 4) / 4);

            if (rates.indexOf(1) < 0) {
                rates.push(1);
            }
            rates.sort();

            config.playbackRateControls = true;
            config.playbackRates = rates;
        }


        if (!config.playbackRateControls || config.playbackRates.indexOf(config.defaultPlaybackRate) < 0) {
            config.defaultPlaybackRate = 1;
        }

        config.playbackRate = config.defaultPlaybackRate;

        const configPlaylist = config.playlist;
        if (!configPlaylist) {
            const obj = _.pick(config, [
                'title',
                'description',
                'type',
                'mediaid',
                'image',
                'file',
                'sources',
                'tracks',
                'preload',
                'duration',
                'host',
                'application',
                'stream'
            ]);

            config.playlist = [ obj ];
        } else if (_.isArray(configPlaylist.playlist)) {
            config.feedData = configPlaylist;
            config.playlist = configPlaylist.playlist;
        }

        delete config.duration;
        return config;
    };
    OvenPlayerConsole.log("Configurator loaded.", options);
    let config = composeSourceOptions(options);

    let debug = config.debug;
    let defaultPlaybackRate = config.defaultPlaybackRate || 1;
    let image = config.image;
    let playbackRateControls = config.playbackRateControls || true;
    let playbackRates = config.playbackRates || [0.5, 1, 1.25, 1.5, 2];
    let playlist = config.playlist || [];
    let qualityLabel = config.qualityLabel || "";
    let sourceLabel = config.sourceLabel || "";
    let repeat = config.repeat || false;
    let stretching = config.stretching || 'uniform';
    let isTimecodeMode = config.isTimecodeMode || true;



    const that = {};
    that.getConfig = () => {return config;};

    that.isDebug =()=>{return debug;};

    that.getDefaultPlaybackRate =()=>{return defaultPlaybackRate;};
    that.setDefaultPlaybackRate =(playbackRate)=>{defaultPlaybackRate = playbackRate; return playbackRate;};

    that.getQualityLabel = () => {return qualityLabel;};
    that.setQualityLabel = (newLabel) => {qualityLabel = newLabel;};

    that.getSourceLabel = () => {return sourceLabel;};
    that.setSourceLabel = (newLabel) => {sourceLabel = newLabel;};

    that.setTimecodeMode = (isShow) => {
        if(isTimecodeMode !== isShow){
            isTimecodeMode = isShow;
            console.log("CONTENT_TIME_MODE_CHANGEDCONTENT_TIME_MODE_CHANGEDCONTENT_TIME_MODE_CHANGEDCONTENT_TIME_MODE_CHANGED : ", isTimecodeMode);
            provider.trigger(CONTENT_TIME_MODE_CHANGED, isTimecodeMode);
        }
    };
    that.isTimecodeMode = () => {
        return isTimecodeMode;
    };


    that.getPlaybackRates =()=>{return playbackRates;};
    that.isPlaybackRateControls =()=>{return playbackRateControls;};

    that.getPlaylist =()=>{return playlist;};
    that.setPlaylist =(playlist_ )=>{
        if(_.isArray(playlist_)){
            playlist = playlist_;
        }else{
            playlist = [playlist_];
        }
        return playlist;
    };

    that.isRepeat =()=>{return repeat;};

    that.getStretching =()=>{return stretching;};

    return that;
};

export default Configurator;
