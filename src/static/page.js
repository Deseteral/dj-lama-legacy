var socket = io();
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640'
  });
}

socket.on('play', (info) => {
  player.loadVideoById({
    'videoId': info.id,
    // 'startSeconds': 0,
    // 'endSeconds': 60,
    // 'suggestedQuality': 'large'
  });
});
