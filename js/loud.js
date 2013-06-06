// Global vars
var VIDEOID, GIFID;

// Get URL params
function getParam(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

VIDEOID = getParam('v');
GIFID = getParam('g');
START = getParam('s');
END = getParam('e');

// Return defaults
// TODO: Make this intro page instead
if (VIDEOID === 'null') {
    // VIDEOID = 's7L2PVdrb_8';
}

if (GIFID === 'null') {
    GIFID = 'FvKyA';
}

if (START === 'null') {
    START = 0;
}

if (END === 'null') {
    END = 0;
}

$(document).ready(function() {

    function showGif() {
        $('#gif').css('background-image','url(http://i.imgur.com/' + GIFID + '.gif)');
    }

    if (VIDEOID !== 'null') {
        // Init YouTube Video
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else showGif();

    // -------------------------------------------------------------------------------------
    // Events

    var ANIM_SPEED = 300,       // milliseconds
        OFFSCREEN_HEIGHT = 50,  // percentage
        windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
        $info = $('#info'),
        $meta = $('#meta'),
        $wrapper = $('#wrapper');

    // Information section
    $('.show-screen').on('click',function(){
        if($meta.hasClass('active')) {
            toggleScreen('off');
        } else {
            toggleScreen('on');
        }
        return false;
    });

    $('#wrapper').on('click',function(){
        toggleScreen('off');
    });

    // Debug init
    if(getParam('sc')) {
        toggleScreen('on');
    }

    function toggleScreen(direction) {
        if(direction === 'on') {
            $wrapper.animate({ top: (-1 * OFFSCREEN_HEIGHT) + '%'}, ANIM_SPEED);
            $info.animate({ top: (100 - OFFSCREEN_HEIGHT) + '%'}, ANIM_SPEED);
            return $meta.addClass('active');
        } else {
            $wrapper.animate({ top: '0px'}, ANIM_SPEED);
            $info.animate({ top: '100%'}, ANIM_SPEED);
            return $meta.removeClass('active');
        }
    }


});
