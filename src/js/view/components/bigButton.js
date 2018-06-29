import $ from 'utils/jquery';
import BigButtonTemplate from './bigButtonTemplate'
/**
 *
 *
 * @class      BigButton (name)
 * @param      {<type>}  container  The operation element
 * @param      {<type>}  player        The player
 * @param      {<type>}  ui      The ui
 */
function BigButton(container, player, ui) {

    const self = this;

    let playing = true;

    const bigButtonContainerElem = $(BigButtonTemplate());
    container.append(bigButtonContainerElem);

    const playIcon = bigButtonContainerElem.find('.ovp-bigbutton-play');
    const pauseIcon = bigButtonContainerElem.find('.ovp-bigbutton-pause');
    const replayIcon = bigButtonContainerElem.find('.ovp-bigbutton-replay');

    /**
     * Depending on the player's status, the big button icon changes to play or pause.
     *
     * @param      {boolean}  paused  The paused
     */
    self.changeButtonState = function(state) {

        setButtonState(state);
    };

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


    self.show = function(withAnimation, showingTime) {
        bigButtonContainerElem.css('opacity', '1');
    };

    self.wink = function(withAnimation, showingTime) {

        if (playing) {

            return;
        }

        bigButtonContainerElem.css('opacity', '1');
        bigButtonContainerElem.animate({
            start : function() {
                bigButtonContainerElem.css('opacity', '1');
            },
            duration : 250,
            opacity: 0,
            queue: false
        });
    };

    self.hide = function(withAnimation) {
       bigButtonContainerElem.css('opacity', '0');
    };

    bigButtonContainerElem.on('click', function() {

        if (ui.settingsShown) {
            return;
        }

        if (ui.contextShown) {
            return;
        }

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

        playing = false;
    });

    player.on('play', function(e) {

        self.changeButtonState('play');
        self.wink();

        playing = true;
    });

    player.on('pause', function() {

        playing = false;

        self.changeButtonState('pause');
        self.wink();
    });

    player.on('complete', function() {

        playing = false;

        self.changeButtonState('play');
        self.show();
    });

    player.on('error', function(e) {

        self.hide();
    });

}

export default BigButton
