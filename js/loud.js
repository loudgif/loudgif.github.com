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
GIPHY = getParam('gtv');
TEXT = getParam('t');
START = parseInt(getParam('s'), 10) || 0;
END = parseInt(getParam('e'), 10) || null;


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

function loadGif() {
    $("<img/>")
        .attr("src", unescape(GIFID))
        .load(function() {

            // Play video
            player.playVideo();

        });
}

function showGif() {
    // If giphy tv, show that and return
    if(GIPHY !== 'null') {
        return showGiphy();
    }

    $('#gif').removeClass('loading');

    $('#gif').css('background-image','url(' + unescape(GIFID) + ')');

    if(this.width < this.height) {
        $('#gif').css('background-size','contain');
    }
}

function showGiphy() {
    var g = document.createElement('script'); g.type = 'text/javascript'; g.async = true;
    g.src = 'https://giphy.com/static/js/widgets/tv.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(g, s);

    $('#_giphy_tv').show();
    $('#gif').removeClass('loading');
}

function showError(error) {
    console.log(error);
    showGif();
    $('#message').text('Error loading sound. SILENTGIF!').show();
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
            'onError': onPlayerError,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    player.pauseVideo();
    loadGif();
}

function onPlayerError(event) {
    // console.log('damn')
    showError('Couldn\'t load sound. SILENTGIF!');
}

function onPlayerStateChange(event) {
    // If state is playing, finally show gif
    if(event.data === 1) {
        showGif();
    }
}

$(document).ready(function() {

    // Return defaults
    // TODO: Make this intro page instead
    if (VIDEOID === 'null') {
        VIDEOID = 's7L2PVdrb_8';
    } else {
        $('#loudvideo').val(unescape('https://www.youtube.com/watch?v=' + VIDEOID));
    }

    if (GIFID === 'null') {
        GIFID = escape('https://i.imgur.com/FvKyA.gif');
    } else {
        $('#loudimage').val(GIFID);
    }

    if (START === 'null') {
        START = 0;
    }

    if (END === 'null') {
        END = 0;
    }

    // Start loading
    $('#gif').addClass('loading');

    // Init clipboard object
    ZeroClipboard.setDefaults( {
        moviePath: '/js/zeroclipboard/ZeroClipboard.swf',
        hoverClass: 'copy-is-hover',
        activeClass: 'copy-is-active'
    });

    var clip = new ZeroClipboard($(".copy"));

    clip.on( 'complete', function(client, args) {
        $('.copy').html('COPIED!');
    } );

    if (VIDEOID !== 'null') {
        // Init YouTube Video
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else showGif();

    if (TEXT !== 'null') {
        $('#message').text(TEXT).show();
    }

    // -------------------------------------------------------------------------------------
    // Events

    var URL_INITED = false,
        ANIM_SPEED = 300,       // milliseconds
        OFFSCREEN_HEIGHT = 60,  // percentage
        windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
        $info = $('#info'),
        $meta = $('#meta'),
        $wrapper = $('#wrapper');

    $("input[type=text]").click(function() {
        $(this).select();
    });

    // Modal ex button
    $('.modal .ex').on('click',function(){
        $('.modal').animate({
            top: '-100%'
        }, ANIM_SPEED);
    })

    // Information section
    $('.show-screen').on('click',function(){
        if($meta.hasClass('active')) {
            toggleScreen('off');
        } else {
            toggleScreen('on');
        }
        return false;
    });

    // Share button
    $('#share').on('click',function(){
        if(URL_INITED == false) {

            $.getJSON(
                "https://api-ssl.bitly.com/v3/shorten?callback=?",
                {
                    "format": "json",
                    "access_token": '50adfb7be005f4a3d8f8005ff98939e844016675',
                    "longUrl": document.URL
                },
                function(response) {

                    var bitlyUrl = response.data.url;

                    if(bitlyUrl !== undefined) {
                        $('#share-url-to-copy').html(bitlyUrl);
                    } else {
                        $('#share-url-to-copy').html('http://loudgif.com');
                    }

                    // Show modal
                    $('.modal').animate({
                        top: '25%'
                    }, ANIM_SPEED);

                    URL_INITED = true;
                }
            );
        } else {
            // Show modal
            $('.modal').animate({
                top: '25%'
            }, ANIM_SPEED);
        }

    });

    $('#wrapper').on('click',function(){
        toggleScreen('off');
    });

    $('#toggle-video').on('click',function() {
        if($(this).data('playing') === true) {
            player.pauseVideo();
            $(this)
                .removeClass('icon-sound')
                .addClass('icon-mute')
                .data('playing',false);

        } else {
            player.playVideo();
            $(this)
                .addClass('icon-sound')
                .removeClass('icon-mute')
                .data('playing',true);
        }
    });

    $(window).scroll(function (e) {
        if($(this).scrollTop() > 0) {
            $meta.addClass('active');

            // Distance from gif = quieter
            if(player) {

                var wintop = $(window).scrollTop(),
                    docheight = $(document).height(),
                    winheight = $(window).height();


                var volume = 100 - ((wintop/(docheight-winheight))*100);
                if(volume < 30) { volume = 30; }
                player.setVolume(volume);
            }

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

    // Reset form
    $('#another').on('click', function(){
        $('#created').fadeOut(ANIM_SPEED, function(){
            $('#newLoudgif').fadeIn(ANIM_SPEED);
        });
        $('#newLoudgif .field input').val('');
        $('#loudstart').val(0);
    });

    // Validate form
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
            loudstart: {
                required: true,
                maxlength: 5
            },
            loudtext: {
                required: false,
                maxlength: 200
            }
        },
        messages: {
            loudimage: {
                required: 'Need an image here, friend',
                url: 'This has to be a URL. You know, HTTPS:// and so on and so forth.'
            },
            loudvideo: {
                required: 'What\'s a loudgif without sound?',
                url: 'This has to be a URL'
            },
            loudstart: {
                required: '',
                maxlength: ''
            },
            loudtext: {
                required: false,
                maxlength: 'Sorry, we cut you off at 200 characters'
            }
        },
        submitHandler: function(form) {
            var $submit = $('#submit'),
                loudgif = {
                gif:    escape($('#loudimage').val()),
                video:  parseYoutubeId($('#loudvideo').val()),
                start:  parseInt($('#loudstart').val()),
                text:   escape($('#loudtext').val())
            };

            // Make submit loading style
            var submitText = $submit.val();
            $submit.addClass('loading').html('LOUDGIFIN\'');

            // Build string
            var loudgif_url = 'http://loudgif.com/?g=' + loudgif.gif + '&v=' + loudgif.video;

            if(loudgif.text !== '') {
                loudgif_url += '&t=' + loudgif.text;
            }
            if(loudgif.start > 0) {
                loudgif_url += '&s=' + loudgif.start;
            }


            $.getJSON(
                "https://api-ssl.bitly.com/v3/shorten?callback=?",
                {
                    "format": "json",
                    "access_token": '50adfb7be005f4a3d8f8005ff98939e844016675',
                    "longUrl": loudgif_url
                },
                function(response)
                {
                    // Reset buttons
                    $submit.val(submitText).removeClass('loading');
                    $('#copy-loudgif').html('COPY!');

                    // Hide form, show url
                    $('#newLoudgif').fadeOut(ANIM_SPEED, function(){
                        $('#created').fadeIn(ANIM_SPEED);
                    });

                    var bitlyUrl = response.data.url;

                    $('#new-loudgif-url')
                        .attr('href',bitlyUrl)
                        .html(bitlyUrl);

                    // console.log(bitlyUrl);
                }
            );
            // window.location = loudgif_url;

            return false;
        }
    });


});
