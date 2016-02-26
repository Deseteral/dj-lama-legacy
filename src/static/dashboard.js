var socket = io();
var player;
var queue = [];

var $checkboxBlockQueue;
var $buttonDatabaseLoad;
var $buttonOnAir;

document.addEventListener('DOMContentLoaded', () => {
  $checkboxBlockQueue = document.querySelector('#checkbox-block-queue');
  $buttonDatabaseLoad = document.querySelector('#button-database-load');
  $buttonOnAir = document.querySelector('#button-on-air');

  $buttonDatabaseLoad.onclick = () =>
    socket.emit('dashboard-database-request-load');
  $buttonOnAir.onclick = () => socket.emit('dashboard-set-on-air');
});

var controller = {
  load: (info) => {
    player.loadVideoById({
      videoId: info.id,
      startSeconds: timeToSeconds(info.start),
      endSeconds: timeToSeconds(info.end)
    });

    socket.emit('dashboard-song-loaded', {
      id: info.id
    });

    // Just for fun :)
    if (info.id === '9C1BCAgu2I8') {
      // RESOURCE
      setTimeout(() => {
        say('A teraz na antenie radia Lama FM, ta gorsza wersja tego utworu.');
      }, 1000);
    } else if (info.id === 'SjkxkfBMCsE') {
      // RESOURCE
      setTimeout(() => {
        say('Zdecydowanie lepsza wersja tego utworu, tylko na antenie radia Lama FM.');
      }, 1000);
    }
  },

  next: () => {
    if (queue.length <= 1) {
      return;
    }

    queue.shift();
    controller.load(queue[0]);

    socket.emit('dashboard-queue-updated', queue);
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

window.saveQueue = () => {
  localStorage.queue = JSON.stringify(queue);
};

window.loadQueue = () => {
  queue = JSON.parse(localStorage.queue);
};

socket.on('dashboard-play', (details) => {
  if ($checkboxBlockQueue.checked) {
    return;
  }

  if (!details.after) {
    queue.push(details.song);
  } else {
    queue.splice(1, 0, details.song);
  }

  if (queue.length === 1) {
    controller.load(queue[0]);
  }

  if (queue.length === 2 && player.getPlayerState() === YT.PlayerState.ENDED) {
    queue.shift();
    controller.load(queue[0]);
  }

  socket.emit('dashboard-queue-updated', queue);
});

socket.on('dashboard-song', () => {
  if (queue[0]) {
    socket.emit('dashboard-song-response', {
      id: queue[0].id,
      queueLength: queue.length
    });
  }
});

socket.on('dashboard-skip', () => {
  if (queue.length === 1) {
    player.stopVideo();
    queue.shift();
  }

  controller.next();
});

socket.on('dashboard-say', (what) => {
  say(what);
});
