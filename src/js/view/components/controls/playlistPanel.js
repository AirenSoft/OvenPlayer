/**
 * Created by hoho on 06/03/2019.
 */
import OvenTemplate from "view/engine/OvenTemplate";
import {naturalHms} from "utils/strings"
import {playlistItemTemplate} from "view/components/controls/playlistPanelTemplate";
import LA$ from "utils/likeA$";
import {
    PLAYER_RESIZED,
    PLAYLIST_CHANGED
} from "api/constants";

const PlaylistPanel = function($container, api){
    const $root = LA$("#"+api.getContainerId());

    let $playlistPanel = "";
    let playlist = api.getPlaylist();
    let totalCount = playlist.length;

    let pageSize = 6;
    let page = 0;
    let pagedList = [];

    if($root.width() > 576){
        pageSize = 6;
    }else if($root.width() <= 576) {
        pageSize = 1;
    }

    function pagenate(page){
        let totalPageCount = Math.ceil(totalCount / pageSize);
        let currentPlaylistIndex = api.getCurrentPlaylist();

        pagedList = playlist.slice(page*pageSize, (page*pageSize)+pageSize);

        $playlistPanel.find(".op-playlist-body-row").removeChild();
        $playlistPanel.find(".op-arrow-left").removeClass("disable");
        $playlistPanel.find(".op-arrow-right").removeClass("disable");

        for(let i = 0; i < pagedList.length; i ++){
            let originalItemIndex = (page * pageSize) + i;
            pagedList[i].index = originalItemIndex;
            $playlistPanel.find(".op-playlist-body-row").get().append(
                createAndSelectElement(playlistItemTemplate(pagedList[i], currentPlaylistIndex === originalItemIndex))
            );
        }

        if(page === 0){
            $playlistPanel.find(".op-arrow-left").addClass("disable");
        }
        if(page+1 === totalPageCount){
            $playlistPanel.find(".op-arrow-right").addClass("disable");
        }
    };
    function findCurrentPage(){
        let currentPlaylistIndex = api.getCurrentPlaylist();
        return Math.ceil((currentPlaylistIndex+1)/ pageSize) -1
    };
    function createAndSelectElement(html) {
        const newElement = document.createElement('div');
        newElement.innerHTML = html;
        return newElement.firstChild;
    }
    const onRendered = function($current, template){
        $playlistPanel = $current;

        page = findCurrentPage();
        pagenate(page);

        api.on(PLAYER_RESIZED, function(size){
            if( (size === "xsmall") && pageSize === 6 ){
                pageSize = 1;
                page = findCurrentPage();
                pagenate(page);
            }else if((size === "small" || size === "medium" || size === "large") && pageSize === 1){
                pageSize = 6;
                page = findCurrentPage();
                pagenate(page);
            }
        },template);

        api.on(PLAYLIST_CHANGED, function(size){
            page = findCurrentPage();
            pagenate(page);
        },template);


        //돔에서 엘리먼트가 제거되면 이벤트도 같이 제거 되어 버리기 때문에 일단 이렇게 해당 템플릿내에서만 live 되도록 처리. 추후 TemplateEngine에 개선
        $current.get().addEventListener("click",function(evt){
            var gtarget = evt.target;
            while (gtarget){
                if (LA$(gtarget).hasClass("op-playlist-card")){
                    api.setCurrentPlaylist(parseInt(LA$(gtarget).attr("data-index")));
                    return;
                }
                gtarget = gtarget.parentElement;
            }
        }, true);

    };
    const onDestroyed = function(template){
        api.off(PLAYER_RESIZED, null, template);
        api.off(PLAYLIST_CHANGED, null, template);
    };
    const events = {
        "click .btn-close" : function(event, $current, template){
            event.preventDefault();
            template.destroy();

        },
        "click .op-arrow-left" : function(event, $current, template){
            event.preventDefault();
            if( !LA$(event.target).hasClass("disable") ){
                page--;
                pagenate(page);
            }
        },
        "click .op-arrow-right" : function(event, $current, template){
            event.preventDefault();
            if( !LA$(event.target).hasClass("disable") ){
                page++;
                pagenate(page);
            }
        }/*,
        "click .op-playlist-card" : function(event, $current, template){
            event.preventDefault();
        }*/
    };

    return OvenTemplate($container, "PlaylistPanel", api.getConfig(), playlist, events, onRendered, onDestroyed );
};

export default PlaylistPanel;
