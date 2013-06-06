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
TEXT = getParam('t');
START = getParam('s');
END = getParam('e');

// Return defaults
// TODO: Make this intro page instead
if (VIDEOID === 'null') {
    // VIDEOID = 's7L2PVdrb_8';
}

if (GIFID === 'null') {
    GIFID = 'http://i.imgur.com/FvKyA.gif';
}

if (START === 'null') {
    START = 0;
}

if (END === 'null') {
    END = 0;
}


// Misc Functions

function parseYoutubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[2].length==11){
        return match[2];
    }else{
        return false;
    }
}

function showGif() {
    $('#gif').css('background-image','url(' + decodeURIComponent(GIFID) + ')');
}

// Youtube Embed Code

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: VIDEOID,
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'end': END,
            'modestbranding': 1,
            'playlist': VIDEOID,
            'showinfo': 0,
            'start': START,
            'loop': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    setTimeout(function() {
        showGif();
    }, 200);
    event.target.playVideo();
}

function onPlayerPlaybackQualityChange(event){

}

function onPlayerError(event) {

}

// var done = false;
function onPlayerStateChange(event) {
// if (event.data == YT.PlayerState.PLAYING && !done) {
//   setTimeout(stopVideo, 6000);
//   done = true;
// }
}

// function stopVideo() {
//   player.stopVideo();
// }

$(document).ready(function() {

    if (VIDEOID !== 'null') {
        // Init YouTube Video
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else showGif();

    if (TEXT !== 'null') {
        $('#message').html(TEXT).show();
    }

    // -------------------------------------------------------------------------------------
    // Events

    var ANIM_SPEED = 300,       // milliseconds
        OFFSCREEN_HEIGHT = 60,  // percentage
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

    $(window).scroll(function (e) {
        if($(this).scrollTop() > 0) {
            $meta.addClass('active');
        } else {
            $meta.removeClass('active');
        }
    });

    // Debug init
    if(getParam('sc') !== 'null') {
        toggleScreen('on');
    }

    function toggleScreen(direction) {
        if(direction === 'on') {
            $('html, body').animate({
                scrollTop: (OFFSCREEN_HEIGHT / 100) * $info.offset().top
            }, ANIM_SPEED);
            return $meta.addClass('active');
        } else {
            $('html, body').animate({
                scrollTop: 0
            }, ANIM_SPEED);
            return $meta.removeClass('active');
        }
    }

    // Create form submit
    // $('#submit').click(function() {
    //     if($('#input-image').)
    //     return false;
    // });

    $("#newLoudgif").validate({
        rules: {
            loudimage: {
                required: true,
                url: true
            },
            loudvideo: {
                required: true,
                url: true
            },
            loudtext: {
                required: false,
                maxlength: 200
            }
        },
        messages: {
            loudimage: {
                required: 'Need an image here, friend',
                url: 'This has to be a URL. You know, HTTP:// and so on and so forth.'
            },
            loudvideo: {
                required: 'What\'s a loudgif without sound?',
                url: 'This has to be a URL'
            },
            loudtext: {
                required: false,
                maxlength: 'Sorry, we cut you off at 200 characters'
            }
        },
        submitHandler: function(form) {
            var loudgif = {
                gif:    encodeURIComponent($('#loudimage').val()),
                video:  parseYoutubeId($('#loudvideo').val()),
                text:   encodeURIComponent($('#loudtext').val())
            };

            // Build string
            var loudgif_url = 'http://loudgif.com/?g=' + loudgif.gif + '&v=' + loudgif.video;

            if(loudgif.text !== '') {
                loudgif_url += '&t=' + loudgif.text;
            }


            console.log(loudgif_url);

            return false;
        }
    });


});
