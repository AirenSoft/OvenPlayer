/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import PanelManager from "view/global/PanelManager";
import { naturalHms } from "utils/strings"
import LA$ from "utils/likeA$";
import {
    CONTENT_TIME,
    CONTENT_BUFFER,
    AD_TIME,
    PROVIDER_HLS,
    PROVIDER_HTML5
} from "api/constants";

const ProgressBar = function ($container, api, isAd, metadata) {
    const $root = LA$(api.getContainerElement());

    if (api.getConfig().disableSeekUI) {
        $container.addClass('op-progressbar-container-disabled');
    }

    let currentPlayingPosition = 0;
    let currentPlayingPercentage = 0;
    let currentLoadedPercentage = 0;

    let mouseInside = false, mouseDown = false;
    let panelManager = PanelManager();
    let adDuration = 0;
    let lastGridThumbnail = "";
    let durationForCalc = 0;

    let $progressBar = "",
        $progressLoad = "",
        $progressPlay = "",
        $progressHover = "",
        $knobContainer = "",
        $knob = "",
        knobWidth = 0,
        $time = "",
        $preview = "";

    let isMobile = api.getBrowser().mobile;

    const mediaElement = api.getMediaElement();

    let hlsLive = false;
    let nativeHlsLive = false;

    if (metadata && metadata.type === PROVIDER_HLS && metadata.duration === Infinity) {
        hlsLive = true;

        if (api.getProviderName() === PROVIDER_HTML5) {
            nativeHlsLive = true;
        }
    }

    function positionElements(percentage) {

        let progressBarWidth = $progressBar.width();
        let position = progressBarWidth * percentage;

        $progressPlay.css("width", position + "px");
        $progressHover.css("left", position + "px");

        let knobPostion = (progressBarWidth - knobWidth) * percentage;
        $knobContainer.css("left", knobPostion + "px");

        currentPlayingPosition = position;
        currentPlayingPercentage = percentage;
    }

    function drawHoverProgress(percentage) {

        let progressBarWidth = $progressBar.width();
        let hoverPosition = progressBarWidth * percentage;
        $progressHover.css("width", (percentage === 0 ? percentage : (hoverPosition - currentPlayingPosition)) + "px");

    }

    function drawLoadProgress(percentage) {

        let progressBarWidth = $progressBar.width();
        let loadPosition = progressBarWidth * percentage;

        $progressLoad.css("width", loadPosition + "px");
        currentLoadedPercentage = percentage;
    }

    function calculatePercentage(event) {

        let progressBarWidth = $progressBar.width();
        let progressBarOffsetX = $progressBar.offset().left;

        let pointerOffsetX = event.pageX;

        if (event.touches) {

            pointerOffsetX = (event.pageX || event.touches[0].clientX);
        }

        let percentage = (pointerOffsetX - progressBarOffsetX) / progressBarWidth;

        if (percentage < 0) {
            return 0;
        }

        if (percentage > 1) {
            return 1;
        }

        return percentage;
    }

    function getNativeHlsDvrWindow() {
        return mediaElement.seekable.end(mediaElement.seekable.length - 1) - mediaElement.seekable.start(0);
    }

    function drawTimeIndicator(percentage, event) {
        if (panelManager.size() > 0 || percentage === -1) {
            $time.hide();
            $preview.hide();
            return;
        } else {
            $time.show();
            $preview.show();
        }

        let duration = 0;
        let second = 0;

        if (hlsLive && !nativeHlsLive) {

            duration = api.getDvrWindow();
            second = duration * (1 - percentage);
            if (api.isTimecodeMode()) {
                $time.text('- ' + naturalHms(second));
            } else {
                $time.text('- ' + Math.round(second * api.getFramerate()));
            }
        } else if (hlsLive && nativeHlsLive) {

            duration = getNativeHlsDvrWindow();
            second = duration * (1 - percentage);
            if (api.isTimecodeMode()) {
                $time.text('- ' + naturalHms(second));
            } else {
                $time.text('- ' + Math.round(second * api.getFramerate()));
            }
        } else {

            duration = api.getDuration();
            second = duration * percentage;

            if (api.isTimecodeMode()) {
                $time.text(naturalHms(second));
            } else {
                $time.text(Math.round(second * api.getFramerate()));
            }
        }

        let timeElemWidth = $time.width();
        let progressBarWidth = $progressBar.width();
        let position = progressBarWidth * percentage;

        let positionOfPixel = event.pageX - $progressBar.offset().left;

        if (event.touches) {
            positionOfPixel = (event.pageX || event.touches[0].clientX) - $progressBar.offset().left;
        }


        const calculateMagnetic = function (elementWidth) {
            if (positionOfPixel < elementWidth / 2) {
                return 0;
            } else if (progressBarWidth - positionOfPixel < elementWidth / 2) {
                return progressBarWidth - elementWidth;
            } else {
                return position - elementWidth / 2;
            }
        };

        let magneticPosition = calculateMagnetic(timeElemWidth);
        $time.css("left", magneticPosition + "px");

        if (api.getSources()[api.getCurrentSource()].gridThumbnail) {

            let interval = api.getConfig().gridThumbnail.thumbnailInterval;
            let width = api.getConfig().gridThumbnail.originalThumbnailWidth;
            let height = api.getConfig().gridThumbnail.originalThumbnailHeight;
            let columnCount = api.getConfig().gridThumbnail.columnCount;
            let rowCount = api.getConfig().gridThumbnail.rowCount;
            let scale = api.getConfig().gridThumbnail.resizeScale;

            $preview.css('width', width * scale + 'px');
            $preview.css('height', height * scale + 'px');
            $preview.css('background-size', width * scale * columnCount + 'px ' + height * scale * rowCount + 'px');

            let thumbnailNumber = Math.floor(second / interval);

            let imageNumber = Math.floor(thumbnailNumber / (columnCount * rowCount));

            let rowNumber = Math.floor((thumbnailNumber % (columnCount * rowCount)) / columnCount);
            let columnNumber = (thumbnailNumber % (columnCount * rowCount)) % columnCount;

            let left = -1 * columnNumber * width * scale;
            let top = -1 * rowNumber * height * scale;

            OvenPlayerConsole.log('Grid Thumbnail:', thumbnailNumber + ': ' + imageNumber + '(' + rowNumber + ', ' + columnNumber + ')');

            let thumbnails = api.getSources()[api.getCurrentSource()].gridThumbnail;
            let thumbnail = thumbnails[imageNumber];

            if (lastGridThumbnail !== thumbnail) {

                $preview.css('background-image', 'url(' + thumbnail + ')');
                lastGridThumbnail = thumbnail;
            }

            $preview.css('background-position', 'left ' + left + 'px top ' + top + 'px');

            let previewMagneticPosition = calculateMagnetic(width * scale);
            $preview.css("left", previewMagneticPosition + "px");
        } else {

            $preview.hide();
        }
    }

    function seek(percentage) {

        let time = (durationForCalc || 0) * percentage;

        if (hlsLive && !nativeHlsLive) {

            // if latency control is on. temporarily disable latency control
            const config = api.getConfig();
            if (config.hlsConfig) {

                if (typeof config.hlsConfig.liveSyncDuration === 'number') {
                    api.getMseInstance().config.liveSyncDuration = undefined;
                }

                if (typeof config.hlsConfig.liveMaxLatencyDuration === 'number') {
                    api.getMseInstance().config.liveMaxLatencyDuration = undefined;
                }

                if (typeof config.hlsConfig.maxLiveSyncPlaybackRate === 'number') {
                    api.getMseInstance().config.maxLiveSyncPlaybackRate = 1;
                }
            }

            time = (durationForCalc - api.getDvrWindow()) + api.getDvrWindow() * percentage;
        }

        if (hlsLive && nativeHlsLive) {
            const dvrWindow = getNativeHlsDvrWindow();
            time = (durationForCalc - dvrWindow) + dvrWindow * percentage;
        }

        let sectionStart = api.getSources()[api.getCurrentSource()].sectionStart;

        if (sectionStart && sectionStart > 0) {
            time = time + sectionStart;
        }

        api.seek(time);
    }


    const onRendered = function ($current, template) {

        $progressBar = $current;
        $progressLoad = $current.find(".op-load-progress");
        $progressPlay = $current.find(".op-play-progress");
        $progressHover = $current.find(".op-hover-progress");
        $knobContainer = $current.find(".op-progressbar-knob-container");
        $knob = $current.find(".op-progressbar-knob");
        knobWidth = $knob.width();
        $time = $current.find(".op-progressbar-time");
        $preview = $current.find(".op-progressbar-preview");

        if (isAd) {
            api.on(AD_TIME, function (data) {
                if (data && data.duration && typeof data.position === "number") {
                    positionElements(data.position / data.duration);
                    adDuration = data.duration;
                }
            }, template);
        } else {

            api.on(CONTENT_TIME, function (data) {
                if (data && data.duration && typeof data.position === "number") {

                    durationForCalc = data.duration;
                    let percentage = data.position / data.duration;

                    if (hlsLive && !nativeHlsLive) {
                        percentage = (api.getDvrWindow() - (data.duration - data.position)) / api.getDvrWindow();
                    }

                    if (hlsLive && nativeHlsLive) {
                        const dvrWindow = getNativeHlsDvrWindow();
                        durationForCalc = dvrWindow;
                        const position = Math.min(dvrWindow, data.position);
                        percentage = (dvrWindow - (dvrWindow - position)) / dvrWindow;
                    }

                    positionElements(percentage);
                }
            }, template);

            api.on(CONTENT_BUFFER, function (data) {
                if (data && data.bufferPercent) {
                    drawLoadProgress(data.bufferPercent / 100);
                }
            }, template);
        }


    };
    const onDestroyed = function (template) {
        if (isAd) {
            api.off(AD_TIME, null, template);
        } else {
            api.off(CONTENT_TIME, null, template);
            api.off(CONTENT_BUFFER, null, template);
        }
    };
    let events = {
        "touchstart .op-progressbar": function (event) {

            if (isAd) {
                return false;
            }
            mouseDown = true;
            const percentage = calculatePercentage(event);

            if (percentage === -1) {
                return false;
            }

            positionElements(percentage);
            drawHoverProgress(0);
            seek(percentage);
        },
        "touchmove .op-progressbar": function (event) {

            if (mouseDown) {
                const percentage = calculatePercentage(event);

                if (percentage === -1) {
                    return false;
                }

                positionElements(percentage);
                drawHoverProgress(0);
                seek(percentage);
                drawTimeIndicator(percentage, event);
            }
        },
        "touchend .op-progressbar": function (event) {

            if (mouseDown) {
                mouseDown = false;
            }

            $root.removeClass("op-progressbar-hover");
            $time.hide();
            $preview.hide();

        },
        "mouseenter .op-progressbar": function (event, $current, template) {

            event.preventDefault();

            if (!isMobile) {
                if (!isAd) {
                    mouseInside = true;
                    $time.show();
                }
                $root.addClass("op-progressbar-hover");
            }
        },
        "mouseleave .op-progressbar": function (event, $current, template) {

            event.preventDefault();

            mouseInside = false;
            mouseDown = false;

            if (!mouseInside) {
                $root.removeClass("op-progressbar-hover");
                $time.hide();
                $preview.hide();
            }
            drawHoverProgress(0);
        },
        "mousedown .op-progressbar": function (event, $current, template) {

            event.preventDefault();

            if (isAd || isMobile) {
                return false;
            }

            mouseDown = true;
            const percentage = calculatePercentage(event);

            if (percentage === -1) {
                return false;
            }

            positionElements(percentage);
            drawHoverProgress(0);
            seek(percentage);
        },
        "mousemove .op-progressbar": function (event, $current, template) {

            event.preventDefault();

            if (!mouseDown && !isAd && !isMobile) {
                const percentage = calculatePercentage(event);
                drawHoverProgress(percentage);
                drawTimeIndicator(percentage, event);
            }

            if (mouseDown && !isMobile) {
                const percentage = calculatePercentage(event);

                if (percentage === -1) {
                    return false;
                }
                positionElements(percentage);
                drawHoverProgress(0);
                seek(percentage);
                drawTimeIndicator(percentage, event);
            }
        },
        "mouseup .op-progressbar": function (event, $current, template) {

            event.preventDefault();

            if (mouseDown && !isMobile) {
                mouseDown = false;
                $root.removeClass("op-progressbar-hover");
            }

        }
    };

    if (api.getConfig().disableSeekUI) {
        events = {}
    }

    return OvenTemplate($container, "ProgressBar", api.getConfig(), null, events, onRendered, onDestroyed);
};

export default ProgressBar;
