import $ from 'utils/jquery';
import playerTemplate from 'view/playerTemplate';
import Spinner from 'view/components/spinner';
import BigButton from 'view/components/bigButton';
import SettingPanel from 'view/components/settingPanel';
import CaptionViewer from 'view/components/captionViewer';
import MessageBox from 'view/components/messageBox';
import BottomPanel from 'view/components/bottomPanel';
import LowLatencyInfoPanel from 'view/components/lowLatencyInfoPanel';
import ContextPanel from 'view/components/contextPanel';
import KeyboardEvents from 'view/features/keyboardEvents';

function View() {

    /**
     * View object
     */
    const self = this;

    /**
     * ui model.
     * 
     * @type       {jQueryElem}
     */
    const ui = self.ui =$({});

    /**
     * Top DomElement of player.
     */
    let ovpElem = null;

    const PLAYING_MODE = ui.PLAYING_MODE ={
        READY : 'READY',
        PLAYING : 'PLAYING',
        PAUSED : 'PAUSED',
        ENDED : 'ENDED'
    };


    const UI_STATUS = ui.UI_STATUS = {
        PLAYER_MOUSE_IN : 'PLAYER_MOUSE_IN',
        PLAYER_MOUSE_OUT : 'PLAYER_MOUSE_OUT',
        BOTTOM_PANEL_MOUSE_IN : 'BOTTOM_PANEL_MOUSE_IN',
        BOTTOM_PANEL_MOUSE_OUT : 'BOTTOM_PANEL_MOUSE_OUT',
        SETTING_PANEL_ACITVE : 'SETTING_PANEL_ACITVE',
        SETTING_PANEL_DEACTIVE : 'SETTING_PANEL_DEACTIVE'
    };

    self.appendPlayerMarkup = function(containerElem) {

        const $containerElem = $(containerElem);

        ui.data('containerElem', $containerElem);
        ui.containerElem = containerElem;

        ovpElem = $(playerTemplate());

        $containerElem.append(ovpElem);
        ui.data('ovpElement', ovpElem);
        ui.ovpElement = ovpElem[0];

        const mediaElementContainer = ovpElem.find('.ovp-media-element-container');

        ui.data('mediaElementContainer', mediaElementContainer[0]);
        ui.mediaElementContainer = mediaElementContainer[0];
    }

    self.getMediaElementContainer = function() {

        return ui.mediaElementContainer;
    }

    self.addComponentsAndFunctions = function(player, options) {

        /**
         * Bind options to ui model.
         */
        ui.options = options

        /**
         * The parent element of the player's UI elements
         */
        const opUiElem = ovpElem.find('.ovp-ui');

        // Low latency display part
        const lowLatencyInfoPanel = new LowLatencyInfoPanel(opUiElem, player, ui);
        self.lowLatencyInfoPanel = lowLatencyInfoPanel;

        // Subtitle display part
        const captionViewer = new CaptionViewer(opUiElem, player, ui);
        self.captionViewer = captionViewer;

        // Message box
        const messageBox = new MessageBox(opUiElem, player, ui);
        self.messageBox = messageBox;

        // Add spinner
        const spinner = new Spinner(opUiElem, player, ui);
        self.spinner = spinner;

        // Add Big Button
        const bigButton = new BigButton(opUiElem, player, ui);
        self.bigButton = bigButton;

        // Add setting panel
        const settingPanel = new SettingPanel(opUiElem, player, ui);
        self.settingPanel = settingPanel;
        
        // Add bottom panel
        const bottomPanel = new BottomPanel(opUiElem, player, ui);
        self.bottomPanel = bottomPanel;

        // Add Context Panel
        const contextPanel = new ContextPanel(opUiElem, player, ui);
        self.contextPanel = contextPanel;

        let playingMode = 'ready';

        ui.playingMode = playingMode;
        
        function setPlayingModeUI(mode) {

            ovpElem.removeClass('ovp-playing-mode');
            ovpElem.removeClass('ovp-paused-mode');
            ovpElem.removeClass('ovp-ended-mode');

            if (mode === 'play') {

                ui.playingMode = ui.PLAYING_MODE.PLAYING;
                ovpElem.addClass('ovp-playing-mode');
                setAutoHide(false, true);
            } else if (mode === 'pause') {

                ui.playingMode = ui.PLAYING_MODE.PAUSED;
                ovpElem.addClass('ovp-paused-mode');
                setAutoHide(false);
            } else if (mode === 'complete') {
                
                ui.playingMode = ui.PLAYING_MODE.ENDED;
                ovpElem.addClass('ovp-ended-mode');
                setAutoHide(false);
            }
        };

        ui.setPlayingModeUI = setPlayingModeUI;

        let autoHideTimer = null;

        function setAutoHide(hide, withTimer) {

            if (autoHideTimer != null) {

                clearTimeout(autoHideTimer);
                autoHideTimer = null;
            }

            if (hide) {

                addAutoHideClass();
            } else {

                removeAutoHideClass();

                if (withTimer) {

                    autoHideTimer = setTimeout(function() {

                        addAutoHideClass();
                    }, 1800);
                }
            }
        }

        function addAutoHideClass() {

            if (ui.settingsShown) {
                return;
            }
            
            ovpElem.addClass('ovp-autohide');
        }

        function removeAutoHideClass() {

            ovpElem.removeClass('ovp-autohide');
        }

        ui.setAutoHide = setAutoHide;

        /**
         * Events
         */

        player.on('error', function(e) {

            ovpElem.addClass('ovp-on-error');
        });

        player.on('metaChanged', function(e) {

            ovpElem.removeClass('ovp-on-error');
        });

        player.on('play', function(e) {

            setPlayingModeUI('play');
            ovpElem.removeClass('ovp-on-error');
        });

        player.on('pause', function(e) {

            setPlayingModeUI('pause');
        });

        player.on('complete', function(e) {

            setPlayingModeUI('complete');
        });

        player.on('seek', function(e) {

            setAutoHide(false, true);
        });

        player.on('volume', function(e) {

            setAutoHide(false, true);
        });

        player.on('mute', function(e) {

            setAutoHide(false, true);
        });

        player.on('stateChaged', function(e) {

        });

        player.on('captionChanged', function(e, track) {

            setAutoHide(false, true);

            if (player.getCurrentCaptions() > -1) {

                ovpElem.addClass('ovp-caption-active');

                ui.showMessage(track.label + ' 자막이 활성화됐습니다.', true, 1800);
            } else {

                ovpElem.removeClass('ovp-caption-active');
                ui.hideMessage();
            }
        });

        ovpElem.on('mouseenter', function(e) {

            if (ui.playingMode == ui.PLAYING_MODE.PLAYING) {
                setAutoHide(false, true);
            } else {
                setAutoHide(false);
            }
        });

        ovpElem.on('mousemove', function(e) {

            if (ui.playingMode == ui.PLAYING_MODE.PLAYING) {
                setAutoHide(false, true);
            } else {
                setAutoHide(false);
            }
        });

        ovpElem.on('mouseleave', function(e) {
            
            if (ui.playingMode == ui.PLAYING_MODE.PLAYING) {
                setAutoHide(true);
            }
        });

        // Add keyboard events
        new KeyboardEvents(ovpElem, player, ui);

        // when player removed.
        player.on('destroy', function(e) {

            ui.data('containerElem').empty();

        });
    };

}

export default View;