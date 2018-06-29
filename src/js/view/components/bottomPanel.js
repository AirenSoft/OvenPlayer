import $ from 'utils/jquery';
import BottomPanelTemplate from './bottomPanelTemplate';
import ProgressBar from './progressBar';
import PlayButton from './playButton';
import VolumeController from './volumeController';
import TimeDisplay from './timeDisplay';
import FullScreenButton from './fullScreenButton';
import SettingButton from './settingButton';
import CaptionButton from './captionButton';

/**
 * A panel located on the bottom for storing player seek and control buttons
 *
 * @class      BottomPanel asdasdasdasd
 * @param      {jQueryElem}  container  The container
 */
function BottomPanel(container, player, ui) {

    const bottomPanelElem = $(BottomPanelTemplate());
    container.append(bottomPanelElem);

    const progressBarContainerElem = bottomPanelElem.find('.ovp-progressbar-container');
    const leftControlsElem = bottomPanelElem.find('.ovp-left-controls');
    const rightControlsElem = bottomPanelElem.find('.ovp-right-controls');

    // Add progress bar
    const progressBar = new ProgressBar(progressBarContainerElem, player, ui);

    // Add play button
    const playButton = new PlayButton(leftControlsElem, player, ui);

    // Adding a Volume Controller
    const volumeController = new VolumeController(leftControlsElem, player, ui);

    // Add time display
    const timeDisplay = new TimeDisplay(leftControlsElem, player, ui);

    // Add subtitle button
    const captionButton = new CaptionButton(rightControlsElem, player, ui);

    // Add setting button
    const settingButton = new SettingButton(rightControlsElem, player, ui);

    // Add full-screen buttons
    const fullScreenButton = new FullScreenButton(rightControlsElem, player, ui);

}

export default BottomPanel;