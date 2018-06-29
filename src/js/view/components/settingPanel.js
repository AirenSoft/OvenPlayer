import $ from 'utils/jquery';
import SettingPanelTemplate, {settingTitleTemplate, settingItemTemplate, settingValueTemplate} from './settingPanelTemplate';

function SettingPanel(container, player, ui) {

    let shown = false;

    const settingPanelElement = $(SettingPanelTemplate());
    container.append(settingPanelElement);

    const setttingTitleContainerElem = settingPanelElement.find('.ovp-setting-title-container');
    const setttingItemContainerElem = settingPanelElement.find('.ovp-setting-item-container');

    function open() {
        
        showInitialSettingItems();

        shown = true;
        ui.settingsShown = true;
        ui.data('ovpElement').addClass('ovp-settings-shown');

        $(document).one('click.settingPanel', function(e) {

            if ($(e.target).closest(settingPanelElement).length > 0) {

                return;
            }

            close();

            if ($(e.target).closest('.ovenplayer').length == 0 && player.getState() == 'playing') {

                ui.setAutoHide(true);
            }
        });
    }

    function close() {

        setttingTitleContainerElem.empty();
        setttingItemContainerElem.empty();

        settingPanelElement.hide();
        shown = false;
        ui.settingsShown = false;
        ui.data('ovpElement').removeClass('ovp-settings-shown');
        $(document).off('click.settingPanel');

        ui.ovpElement.focus();
    }

    ui.toggleSettingPanel = function() {

        if (shown) {

            close();
        } else {

            open();
        }
    };

    function showInitialSettingItems() {

        settingPanelElement.show();

        setttingTitleContainerElem.empty();
        setttingItemContainerElem.empty();

        const settingTitleElem = $(settingTitleTemplate('Settings'));
        settingTitleElem.find('.ovp-setting-title-previcon').remove();

        setttingTitleContainerElem.append(settingTitleElem);

        settingTitleElem.on('click', function(e) {

            e.stopPropagation();
        });

        if (player.getDuration() !== Infinity) {

            addPlayRateSettingItem();
        }
        
        // addCaptionsSettingItem();

        if (player.getQualityLevels().length > 1) {
         
            addQualitySettingItem();
        }
    }

    function addPlayRateSettingItem () {

        const playRate = player.getPlaybackRate();

        let playRateText = playRate;

        if (playRate === 1) {

            playRateText = 'Normal';
        }

        const playRateSettingItem = $(settingItemTemplate('Speed', playRateText));

        setttingItemContainerElem.append(playRateSettingItem);

        playRateSettingItem.on('click', function(e) {
            e.stopPropagation();
            showPlayRateSetting();
        });
    }

    function showPlayRateSetting() {

        setttingTitleContainerElem.empty();
        setttingItemContainerElem.empty();

        const settingTitleElem = $(settingTitleTemplate('Playback speed'));
        setttingTitleContainerElem.append(settingTitleElem);

        bindGoBackEvent(settingTitleElem);

        const playRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

        for (let rate of playRates) {
            
            let rateText = rate;

            if (rate === 1) {

                rateText = 'Normal';
            }

            const playRateValueElem = $(settingValueTemplate(rateText));

            if (player.getPlaybackRate() == rate) {

                setValueItemChecked(playRateValueElem);
            }

            setttingItemContainerElem.append(playRateValueElem);

            bindValueItemEvent(playRateValueElem, function() {

                player.setPlaybackRate(rate);
            });
        }
    }

    function addCaptionsSettingItem() {

        if (player.getCaptionsList().length == 0) {

            return;
        }

        const currentCaptions = player.getCurrentCaptions();

        let captionsDesc = '';

        if (currentCaptions == -1) {

            captionsDesc = 'Do not show';
        } else {

            const textTrack = player.getCaptionsList()[currentCaptions];

            captionsDesc = textTrack.label;
        }

        const captionsCount = player.getCaptionsList().length;

        const captionsSettingItem = $(settingItemTemplate('Caption (' + captionsCount + ')', captionsDesc));

        setttingItemContainerElem.append(captionsSettingItem);

        captionsSettingItem.on('click', function(e) {
            e.stopPropagation();
            showCaptionsSetting();
        });
    }

    function showCaptionsSetting() {

        setttingTitleContainerElem.empty();
        setttingItemContainerElem.empty();

        const settingTitleElem = $(settingTitleTemplate('Caption'));
        setttingTitleContainerElem.append(settingTitleElem);

        bindGoBackEvent(settingTitleElem);

        const defaultCaptionsValueElem = $(settingValueTemplate('Not used'));

        if (player.getCurrentCaptions() === -1) {

            setValueItemChecked(defaultCaptionsValueElem);
        }

        setttingItemContainerElem.append(defaultCaptionsValueElem);

        bindValueItemEvent(defaultCaptionsValueElem, function() {

            player.setCurrentCaptions(-1);
        });

        const textTracks = player.getCaptionsList();

        for (let index = 0; index < textTracks.length; index ++) {

            let textTrackDesc = textTracks[index].label;

            const captionsValueElem = $(settingValueTemplate(textTrackDesc));

            if (player.getCurrentCaptions() === index) {

                setValueItemChecked(captionsValueElem);
            }

            setttingItemContainerElem.append(captionsValueElem);

            bindValueItemEvent(captionsValueElem, function() {

                player.setCurrentCaptions(index);
            });
        }
    }

    function addQualitySettingItem() {

        const qualityLevels = player.getQualityLevels();
        const currentQuality = player.getCurrentQuality();

        const currentQualityLevel = qualityLevels[currentQuality];

        let label = 'Default';

        if (currentQualityLevel) {

            label = currentQualityLevel.label;
        }

        const qualitySettingItem = $(settingItemTemplate('Source', label));

        setttingItemContainerElem.append(qualitySettingItem);

        qualitySettingItem.on('click', function(e) {
            e.stopPropagation();
            showQualitySetting();
        });
    }

    function showQualitySetting() {

        setttingTitleContainerElem.empty();
        setttingItemContainerElem.empty();

        const settingTitleElem = $(settingTitleTemplate('Playback source'));
        setttingTitleContainerElem.append(settingTitleElem);

        bindGoBackEvent(settingTitleElem);

        const qualityLevels = player.getQualityLevels();

        for (let index = 0; index < qualityLevels.length; index ++) {

            let qualityLabel = qualityLevels[index].label;

            const qualityValueElem = $(settingValueTemplate(qualityLabel));

            if (player.getCurrentQuality() === index) {

                setValueItemChecked(qualityValueElem);
            }

            setttingItemContainerElem.append(qualityValueElem);

            bindValueItemEvent(qualityValueElem, function() {

                player.setCurrentQuality(index);
            });
        }
    }

    function bindGoBackEvent(element, callback) {

        element.on('click', function(e) {
            e.stopPropagation();
            showInitialSettingItems();
        });
    }

    function bindValueItemEvent(element, callback) {

        element.on('click', function(e) {
            e.stopPropagation();
            callback();
            close();
        });
    }

    function setValueItemChecked(element) {
        element.find('.ovp-setting-item-checked').css('visibility', 'visible');
    }
    
}

export default SettingPanel;