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
    showGif();
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