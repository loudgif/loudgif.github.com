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
    $('#gif').css('background-image','url(http://i.imgur.com/' + GIFID + '.gif)');
});