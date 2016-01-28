var socket = io();

var $buttonYtPlay;
var $inputYtId;
var $inputYtStart;
var $inputYtEnd;

document.addEventListener('DOMContentLoaded', () => {
  $buttonYtPlay = document.querySelector('#button-yt-play');
  $inputYtId = document.querySelector('#input-yt-id');
  $inputYtStart = document.querySelector('#input-yt-start');
  $inputYtEnd = document.querySelector('#input-yt-end');

  $buttonYtPlay.onclick = () => {
    socket.emit('client-yt', {
      id: $inputYtId.value,
      start: $inputYtStart.value,
      end: $inputYtEnd.value
    });
  };
});
