var socket = io();
var player;
var queue = [];

var controller = {
  load: (info) => {
    player.loadVideoById({
      'videoId': info.id,
      'startSeconds': info.start,
      'endSeconds': info.end,
      // 'suggestedQuality': 'large'
    });
  },

  next: () => {
    if (queue.length <= 1) {
      return;
    }

    queue.shift();
    controller.load(queue[0]);
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    events: {
      onStateChange: ytStateChange
    }
  });
}

function ytStateChange(e) {
  if (e.data === YT.PlayerState.ENDED) {
    controller.next();
  }
}

socket.on('play', (info) => {
  queue.push(info);
  if (queue.length === 1) {
    controller.load(queue[0]);
  }
});

socket.on('song', () => {
  if (queue[0]) {
    socket.emit('current-song', queue[0].id);
  }
});
