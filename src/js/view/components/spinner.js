import $ from 'utils/jquery';
import SpinnerTemplate from './spinnerTemplate'

function Spinner(container, player, ui) {

    const spinnerContainerElem = $(SpinnerTemplate());
    container.append(spinnerContainerElem);


    // TODO(rock): Actual test required
    player.on('buffer', function() {

        spinnerContainerElem.addClass('ovp-spinner-active');
    });
}

export default Spinner;