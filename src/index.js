const path = require('path');
const Server = require('http').Server;
const express = require('express');
const socket = require('socket.io');

import * as bot from './discord-bot';

const HTTP_PORT = 8000;

var app = express();
var server = Server(app);
var io = socket(server);

// HTTP server initialization
app.use('/', express.static(path.join(__dirname, 'static')));
server.listen(HTTP_PORT, () => {
  console.log('Started HTTP server');
});

// socket.io initialization
io.on('connection', (socket) => {
  console.log('New socket connection');

  socket.on('current-song', (id) => {
    bot.sendMessage(`https://www.youtube.com/watch?v=${id}`);
  })
});

// Discord bot initialization
bot.initialize();

bot.events.on('play', (info) => {
  io.emit('play', info);
});

bot.events.on('song', () => {
  io.emit('song');
});

bot.events.on('skip', () => {
  io.emit('skip');
});
