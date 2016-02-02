var socket = io();
var player;
var queue = [];

var $checkboxBlockQueue;

document.addEventListener('DOMContentLoaded', () => {
  $checkboxBlockQueue = document.querySelector('#checkbox-block-queue');
});

var controller = {
  load: (info) => {
    player.loadVideoById({
      videoId: info.id,
      startSeconds: timeToSeconds(info.start),
      endSeconds: timeToSeconds(info.end)
    });
  },

  next: () => {
    if (queue.length <= 1) {
      return;
    }

    queue.shift();
    controller.load(queue[0]);
  }
};

function say(message) {
  const tweenTime = 1;
  let volume = { level: player.getVolume() };

  TweenLite.to(volume, tweenTime, {
    level: 10,

    onUpdate: () => {
      player.setVolume(volume.level);
    },

    onComplete: () => {
      _speechApiSay(message, () => {
        TweenLite.to(volume, tweenTime, {
          level: 100,
          onUpdate: () => {
            player.setVolume(volume.level);
          }
        });
      });
    }
  });
}

function _speechApiSay(message, callback) {
  let msg = new SpeechSynthesisUtterance();

  msg.text = message;
  msg.voice = window.speechSynthesis.getVoices()[13];
  msg.lang = 'pl-PL';

  msg.onend = () => {
    if (callback) {
      callback();
    }
  };

  window.speechSynthesis.speak(msg);
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

function timeToSeconds(time) {
  if (time === undefined) {
    return undefined;
  }

  time = time.split(':');
  return parseInt(time[0]) * 60 + parseInt(time[1]);
}

socket.on('play', (info) => {
  if ($checkboxBlockQueue.checked) {
    return;
  }

  queue.push(info);

  if (queue.length === 1) {
    controller.load(queue[0]);
  }

  if (queue.length === 2 && player.getPlayerState() === YT.PlayerState.ENDED) {
    queue.shift();
    controller.load(queue[0]);
  }
});

socket.on('song', () => {
  if (queue[0]) {
    socket.emit('song-response', {
      id: queue[0].id,
      queueLength: queue.length
    });
  }
});

socket.on('skip', () => {
  if (queue.length === 1) {
    player.stopVideo();
    queue.shift();
  }

  controller.next();
});

socket.on('say', (what) => {
  say(what);
});
