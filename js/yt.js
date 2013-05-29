// Youtube Embed Code

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 's7L2PVdrb_8',
    playerVars: {
        'autoplay': 1,
        'controls': 0,
        'modestbranding': 1,
        'showinfo': 0,
        'start': 8.9,
        'loop': 1 },
    events: {
      'onReady': onPlayerReady,
      'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

function onPlayerReady(event) {
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
