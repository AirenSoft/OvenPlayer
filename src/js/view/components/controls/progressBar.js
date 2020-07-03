/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import PanelManager from "view/global/PanelManager";
import {naturalHms} from "utils/strings"
import LA$ from "utils/likeA$";
import {
    CONTENT_TIME,
    CONTENT_BUFFER,
    AD_TIME
} from "api/constants";
import {STATE_COMPLETE} from "../../../api/constants";
//import ResizeSensor from "resize-sensor";

const ProgressBar = function($container, api, isAd){
    const $root = LA$("#"+api.getContainerId());

    let currentPlayingPosition = 0;
    let currentPlayingPercentage = 0;
    let currentLoadedPercentage = 0;

    let mouseInside = false, mouseDown = false;
    let panelManager = PanelManager();
    let adDuration = 0;
    let lastGridThumbnail = "";

    let $progressBar = "",
        $progressLoad = "",
        $progressPlay = "",
        $progressHover = "",
        $knobContainer = "",
        $knob = "",
        knobWidth = 0,
        $time = "",
        $sectionStart = "",
        $sectionEnd = "",
        $preview = "";

    let isMobile = api.getBrowser().os === "iOS" || api.getBrowser().os === "Android";

    function positionElements(percentage) {

        let progressBarWidth = $progressBar.width();
        let position = progressBarWidth * percentage;

        let drawStartPosition = 0;

        let sectionStart = api.getSources()[api.getCurrentSource()].sectionStart;

        if (sectionStart && sectionStart > 0) {

            let duration = api.getDuration();
            let startPercentage = sectionStart / duration;
            drawStartPosition = progressBarWidth * startPercentage;

            $sectionStart.show();
            $sectionStart.css("left", drawStartPosition - 3 + "px");
        } else {
            $sectionStart.hide();
            $sectionStart.css("left", "-10px");
        }

        let sectionEnd = api.getSources()[api.getCurrentSource()].sectionEnd;

        let drawEndPosition = 0;

        if (sectionEnd && sectionEnd > 0) {

            let duration = api.getDuration();
            let endPercentage = sectionEnd / duration;
            drawEndPosition = progressBarWidth * endPercentage;
            $sectionEnd.show();
            $sectionEnd.css("left", drawEndPosition + "px");
        } else {
            $sectionEnd.hide();
            $sectionEnd.css("left", "-10px");
        }

        $progressPlay.css("width", (position - drawStartPosition) + "px");
        $progressPlay.css("left", drawStartPosition + "px");

        $progressHover.css("left", position+ "px");

        let knobPostion = (progressBarWidth - knobWidth) * percentage;
        $knobContainer.css("left", knobPostion+ "px");

        currentPlayingPosition = position;
        currentPlayingPercentage = percentage;
    }

    function drawHoverProgress(percentage) {
        let progressBarWidth = $progressBar.width();
        let hoverPosition = progressBarWidth * percentage;

        let drawEndPosition = 0;

        let sectionEnd = api.getSources()[api.getCurrentSource()].sectionEnd;

        if (sectionEnd && sectionEnd > 0) {

            let duration = api.getDuration();
            let endPercentage = sectionEnd / duration;
            drawEndPosition = progressBarWidth * endPercentage;
        }

        let progressHoverWidth = (percentage === 0 ? percentage : (hoverPosition - currentPlayingPosition));

        if (drawEndPosition > 0) {

            if (progressHoverWidth + currentPlayingPosition > drawEndPosition) {

                progressHoverWidth = drawEndPosition - currentPlayingPosition;
            }
        }

        $progressHover.css("width", progressHoverWidth + "px");

    }

    function drawLoadProgress(percentage) {
        let progressBarWidth = $progressBar.width();
        let loadPosition = progressBarWidth * percentage;

        let drawStartPosition = 0;

        let sectionStart = api.getSources()[api.getCurrentSource()].sectionStart;

        if (sectionStart && sectionStart > 0) {

            let duration = api.getDuration();
            let startPercentage = sectionStart / duration;
            drawStartPosition = progressBarWidth * startPercentage;
        }

        let drawEndPosition = 0;

        let sectionEnd = api.getSources()[api.getCurrentSource()].sectionEnd;

        if (sectionEnd && sectionEnd > 0) {

            let duration = api.getDuration();
            let endPercentage = sectionEnd / duration;
            drawEndPosition = progressBarWidth * endPercentage;
        }

        let progressLoadWidth = loadPosition - drawStartPosition;

        if (drawEndPosition > 0) {

            if (progressLoadWidth + drawStartPosition > drawEndPosition) {

                progressLoadWidth = drawEndPosition - drawStartPosition;
            }
        }

        $progressLoad.css("width", progressLoadWidth + "px");
        $progressLoad.css("left", drawStartPosition + "px");



        currentLoadedPercentage = percentage;
    }

    function calculatePercentage(event) {
        let progressBarWidth = $progressBar.width();
        let progressBarOffsetX = $progressBar.offset().left;
        let pointerOffsetX =  (event.pageX || event.touches[0].clientX) ;

        let percentage = (pointerOffsetX - progressBarOffsetX) / progressBarWidth;

        let sectionStart = api.getSources()[api.getCurrentSource()].sectionStart;

        if (sectionStart && sectionStart > 0) {

            let duration = api.getDuration();
            let startPercentage = sectionStart / duration;

            if (percentage < startPercentage) {

                return -1;
            }
        }


        let sectionEnd = api.getSources()[api.getCurrentSource()].sectionEnd;

        if (sectionEnd && sectionEnd > 0) {

            let duration = api.getDuration();
            let endPercentage = sectionEnd / duration;

            if (percentage > endPercentage) {

                return -1;
            }
        }

        if (percentage < 0) {
            return 0;
        }

        if (percentage > 1) {
            return 1;
        }

        return percentage;
    }

    function drawTimeIndicator(percentage, event) {
       if(panelManager.size() > 0 || percentage === -1){
           $time.hide();
           $preview.hide();
           return ;
       } else {
           $time.show();
           $preview.show();
       }

        //const duration = isAd ? adDuration : api.getDuration();
        let duration = api.getDuration();
        let second = duration * percentage;

        if(api.isTimecodeMode()){
            $time.text(naturalHms(second));
        }else{
            $time.text(Math.round (second * api.getFramerate()));
        }



        let timeElemWidth = $time.width();
        let progressBarWidth = $progressBar.width();
        let position = progressBarWidth * percentage;
        let positionOfPixel =  (event.pageX || event.touches[0].clientX)  - $progressBar.offset().left;


        const calculateMagnetic = function(elementWidth){
            if(positionOfPixel < elementWidth / 2){
                return 0;
            }else if(progressBarWidth-positionOfPixel  < elementWidth / 2){
                return progressBarWidth - elementWidth;
            }else{
                return position - elementWidth / 2;
            }
        };

        let magneticPosition = calculateMagnetic(timeElemWidth);
        $time.css("left", magneticPosition+ "px");


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
            let top =  -1 * rowNumber * height * scale;

            // console.log(thumbnailNumber + ': ' + imageNumber +'('+ rowNumber +', ' + columnNumber + ')');

            let thumbnails = api.getSources()[api.getCurrentSource()].gridThumbnail;
            let thumbnail = thumbnails[imageNumber];

            if (lastGridThumbnail !== thumbnail) {

                $preview.css('background-image', 'url(' + thumbnail +')');
                lastGridThumbnail = thumbnail;
            }

            $preview.css('background-position', 'left ' + left + 'px top ' + top + 'px');

            let previewMagneticPosition = calculateMagnetic(width * scale);
            $preview.css("left", previewMagneticPosition+ "px");
        } else {

            $preview.hide();
        }
    }

    function seek(percentage) {

        let time = (api.getDuration()||0) * percentage;

        api.seek(time);
    }


    const onRendered = function($current, template){

        $progressBar = $current;
        $progressLoad = $current.find(".op-load-progress");
        $progressPlay = $current.find(".op-play-progress");
        $progressHover = $current.find(".op-hover-progress");
        $knobContainer = $current.find(".op-progressbar-knob-container");
        $knob = $current.find(".op-progressbar-knob");
        knobWidth = $knob.width();
        $time = $current.find(".op-progressbar-time");
        $sectionStart = $current.find(".op-progressbar-section-start");
        $sectionEnd = $current.find(".op-progressbar-section-end");
        $preview = $current.find(".op-progressbar-preview");

        /*new ResizeSensor($progressBar.get(), function() {
            console.log('Changed  $progressBar' );
            positionElements(currentPlayingPercentage);
            drawLoadProgress(currentLoadedPercentage);
        });*/

        if(isAd){
            api.on(AD_TIME, function(data) {
                if(data && data.duration && data.position){
                    positionElements(data.position / data.duration);
                    adDuration = data.duration;
                }
            },template);
        }else{
            api.on(CONTENT_TIME, function(data) {
                if(data && data.duration && data.position){
                    positionElements(data.position / data.duration);
                }
            },template);

            api.on(CONTENT_BUFFER, function(data) {
                if(data && data.bufferPercent){
                    drawLoadProgress(data.bufferPercent / 100);
                }
            },template);
        }



    };
    const onDestroyed = function(template){
        if(isAd){
            api.off(AD_TIME, null, template);
        }else{
            api.off(CONTENT_TIME, null, template);
            api.off(CONTENT_BUFFER, null, template);
        }
    };
    const events = {
        "touchstart .op-progressbar" : function(event){
            if(isAd){
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
        "touchmove .op-progressbar" : function(event){
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
        "touchend .op-progressbar" : function(event){
            if(mouseDown){
                mouseDown = false;
                $root.removeClass("op-progressbar-hover");
            }

        },
        "mouseenter .op-progressbar" : function(event, $current, template){

            event.preventDefault();

            if(!isMobile){
                if(!isAd){
                    mouseInside = true;
                    $time.show();
                }
                $root.addClass("op-progressbar-hover");
            }
        },
        "mouseleave .op-progressbar" : function(event, $current, template){

            event.preventDefault();

            mouseInside = false;

            if (!mouseInside) {
                $root.removeClass("op-progressbar-hover");
                $time.hide();
                $preview.hide();
            }
            drawHoverProgress(0);
        },
        "mousedown .op-progressbar" : function(event, $current, template){
            event.preventDefault();
            if(isAd){
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
        "mousemove .op-progressbar" : function(event, $current, template){
            event.preventDefault();

            if (!mouseDown && !isAd) {
                const percentage = calculatePercentage(event);
                drawHoverProgress(percentage);
                drawTimeIndicator(percentage, event);
            }
        },
        "mousemove document" : function(event, $current, template){
            event.preventDefault();

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
        "mouseup document" : function(event, $current, template){
            event.preventDefault();

            if(mouseDown){
                mouseDown = false;
                $root.removeClass("op-progressbar-hover");
            }

        }
    };

    return OvenTemplate($container, "ProgressBar", api.getConfig(), null, events, onRendered, onDestroyed );
};

export default ProgressBar;
