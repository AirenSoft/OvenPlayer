import $ from 'utils/jquery';
import LowLatencyInfoPanelTemplate from './lowLatencyInfoPanelTemplate';

function LowLatencyInfoPanel(container, player, ui) {

    const lowLatencyInfoPanelElem = $(LowLatencyInfoPanelTemplate());
    container.append(lowLatencyInfoPanelElem);
}

export default LowLatencyInfoPanel;
