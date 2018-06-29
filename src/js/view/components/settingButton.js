import $ from 'utils/jquery';
import SettingButtonTemplate from './settingButtonTemplate';

function SettingButton(container, player, ui) {

    const settingButtonElement = $(SettingButtonTemplate());
    container.append(settingButtonElement);

    settingButtonElement.on('click', function(e) {

        e.stopPropagation();
        ui.toggleSettingPanel();
    });

}

export default SettingButton;