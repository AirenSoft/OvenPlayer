import $ from 'utils/jquery';
import ContextPanelTemplate, {contextItemTemplate} from './contextPanelTemplate';

function ContextPanel(container, player, ui) {

    ui.contextShown = false;

    let contextPanelElem = null;

    function renderContextPanel() {

        if (contextPanelElem != null) {

            closeContextPanel();
        }

        contextPanelElem = $(ContextPanelTemplate());
        $('body').append(contextPanelElem);

        contextPanelElem.attr('data-player-id', ui.containerElem.id);

        contextPanelElem.empty();

        const helpItem = $(contextItemTemplate('Help'));
        contextPanelElem.append(helpItem);
        bindContextItemClickEvent(helpItem);

        const versionItem = $(contextItemTemplate('About OvenPlayer'));
        contextPanelElem.append(versionItem);
        bindContextItemClickEvent(versionItem);
    }

    function bindContextItemClickEvent(item) {

        item.on('click', function(e) {

            closeContextPanel();
        });
    }

    function positionContextPanel(x, y) {

        const panelWidth = contextPanelElem.width();
        const panelHeight = contextPanelElem.height();

        const xCollision = Math.max((x + panelWidth) - window.innerWidth, 0);
        const yCollision = Math.max((y + panelHeight) - window.innerHeight, 0);

        contextPanelElem.css('left', x - xCollision);
        contextPanelElem.css('top', y - yCollision);
    }

    function openContextPanel(e) {

        renderContextPanel();

        positionContextPanel(e.pageX, e.pageY);

        contextPanelElem.addClass('ovp-context-panel-active');

        ui.contextShown = true;

        contextPanelElem.on('click', function(e) {

            e.stopPropagation();
        });

        contextPanelElem.on('contextmenu', function(e) {

            e.preventDefault();
        });

        $(document).one('click.contextPanel', function(e) {

            closeContextPanel();
        });
    }

    function closeContextPanel() {

        contextPanelElem.removeClass('ovp-context-panel-active');
        $(document).off('click.contextPanel');

        contextPanelElem.remove();
        contextPanelElem = null;
        ui.contextShown = false;
    }

    ui.data('ovpElement').on('contextmenu', function(e) {

        e.preventDefault();
        openContextPanel(e);
    });

    player.on('destroy', function(e) {

        if (contextPanelElem != null) {

            closeContextPanel();
        }

    });

}

export default ContextPanel;
