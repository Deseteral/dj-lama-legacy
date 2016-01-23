var socket = io();

socket.on('play', (info) => {
  console.log(info);
});
