import * as bot from './discord-bot';
const path = require('path');
const express = require('express');

const HTTP_PORT = 8000;

var http = express();

// HTTP server initialization
http.use('/', express.static(path.join(__dirname, 'static')));
http.listen(HTTP_PORT, () => {
  console.log('Started HTTP server');
});

// Discord bot initialization
bot.initialize();
bot.events.on('play', (info) => {
  console.log(info);
});
