import $ from 'utils/jquery';

function KeyboardEvents(playerElement, player, ui) {

    function togglePlayPause() {

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
    }

    playerElement.on('keydown.Space', function(e) {

        if (e.keyCode === 32) {

            e.preventDefault();
            
            togglePlayPause();
        }
    });

    playerElement.on('keydown.k', function(e) {
        
        if (e.keyCode === 75) {
            togglePlayPause();
        }
    });

    function rewind(seconds) {

        const duration = player.getDuration();
        const currentPosition = player.getPosition();

        let rewindPosition = Math.max(currentPosition - seconds, 0);

        player.seek(rewindPosition);
    }

    playerElement.on('keydown.ArrowLeft', function(e) {
        
        if (e.keyCode === 37) {
            
            rewind(5);
        }
    });

    playerElement.on('keydown.j', function(e) {
        
        if (e.keyCode === 74) {

            rewind(10);
        }
    });

    function forward(seconds) {

        const duration = player.getDuration();
        const currentPosition = player.getPosition();

        let forwardPosition = Math.min(currentPosition + seconds, duration);

        player.seek(forwardPosition);
    }

    playerElement.on('keydown.ArrowRight', function(e) {
        
        if (e.keyCode === 39) {
            
            forward(5);
        }
    });

    playerElement.on('keydown.k', function(e) {
        
        if (e.keyCode === 76) {

            forward(10);
        }
    });

    playerElement.on('keydown.Home', function(e) {
        
        if (e.keyCode === 36) {
            player.seek(0);
        }
    });

    playerElement.on('keydown.End', function(e) {
        
        if (e.keyCode === 35) {
            player.seek(player.getDuration());
        }
    });

    playerElement.on('keydown.ArrowUp', function(e) {
        
        if (e.keyCode === 38) {
            
            const currentVolumn = player.getVolume();
            const newVolume = Math.min(currentVolumn + 5, 100);
            player.setVolume(newVolume);
        }
    });

    playerElement.on('keydown.ArrowDown', function(e) {
        
        if (e.keyCode === 40) {

            const currentVolumn = player.getVolume();
            const newVolume = Math.max(currentVolumn - 5, 0);
            player.setVolume(newVolume);
        }
    });

    playerElement.on('keydown.m', function(e) {
        
        if (e.keyCode === 77) {

            player.setMute();
        }
    });

    playerElement.on('keydown.Numbers', function(e) {
        
        if (e.keyCode >= 48 && e.keyCode <= 57) {

            const percentage = (e.keyCode - 48) / 10;
            player.seek(player.getDuration() * percentage);
        }
    });

    playerElement.on('keydown.f', function(e) {
        
        if (e.keyCode === 70) {

            ui.toggleFullScreen();
        }
    });

    playerElement.on('keydown.c', function(e) {
        
        if (e.keyCode === 67) {

            player.toggleCaption();
        }
    });

}

export default KeyboardEvents;