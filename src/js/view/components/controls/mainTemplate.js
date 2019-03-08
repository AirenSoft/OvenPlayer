
const Controls = function(hasPlaylist){
    return '<div class="ovp-controls-container">'+

         '<div class="ovp-bottom-panel">' +
         '    <div class="ovp-gradient-bottom"></div>' +
         '    <div class="ovp-progressbar-container">' +
         '    </div>' +
         '    <div class="ovp-controls">' +
         '        <div class="ovp-left-controls">' +
         '        </div>' +
         '        <div class="ovp-right-controls">' +
        (hasPlaylist? ('<button class="ovp-button ovp-playlist-button"><i class="ovp-setting-button-icon"></i></button>') : '') +
         '               <button class="ovp-button ovp-setting-button"><i class="ovp-setting-button-icon"></i></button>' +
         '        </div>' +
         '    </div>' +
         '</div>';
    '</div>';

};



export default Controls;







