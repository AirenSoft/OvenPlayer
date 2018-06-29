import $ from 'utils/jquery';
import PlayButtonTemplate from './playButtonTemplate'

function PlayButton(container, player, ui) {

    const self = this;

    const playButtonElem = $(PlayButtonTemplate());
    container.append(playButtonElem);

    const playIcon = playButtonElem.find('.ovp-play-button-playicon');
    const pauseIcon = playButtonElem.find('.ovp-play-button-pauseicon');
    const replayIcon = playButtonElem.find('.ovp-play-button-replayicon');

    /**
     * Depending on the player's status, the button icon changes to play or pause.
     *
     * @param      {string}  state the state
     */
    self.changeButtonState = function(state) {

        setButtonState(state);
    }

    function setButtonState(state) {

        playIcon.hide();
        pauseIcon.hide();
        replayIcon.hide();

        if (state === 'play') {
            playIcon.show();
        } else if (state === 'pause') {
            pauseIcon.show();
        } else if (state === 'complete') {
            replayIcon.show();
        }
    }

    playButtonElem.on('click', function() {

        const state = player.getState();

        if (state === 'idle') {
            player.play();
        } else if (state === 'playing') {
            player.pause();
        } else if (state === 'paused') {
            player.play();
        } else if (state === 'complete') {
            player.play();
        }
    });

    player.on('ready', function() {
        self.changeButtonState('play');
    });

    player.on('play', function() {

        self.changeButtonState('pause');
    });

    player.on('pause', function() {
        self.changeButtonState('play');
    });


    player.on('complete', function() {

        self.changeButtonState('play');
    });

    player.on('error', function(e) {

        self.changeButtonState('play');
    });

    playIcon.show();
}

export default PlayButton;