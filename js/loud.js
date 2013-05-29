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
    VIDEOID = 's7L2PVdrb_8';
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

    // Init YouTube Video
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    // Click listens
    var ANIM_SPEED = 350;

    $('#logo').on('click',function(){
        var $this = $(this);

        if($this.hasClass('active')) {
            $('#wrapper').animate({ top: '0px'}, ANIM_SPEED);
            $('#info').animate({ top: '100%'}, ANIM_SPEED);
        } else {
            $('#wrapper').animate({ top: '-30%'}, ANIM_SPEED);
            $('#info').animate({ top: '70%'}, ANIM_SPEED);
        }

        $this.toggleClass('active');


    });

});
