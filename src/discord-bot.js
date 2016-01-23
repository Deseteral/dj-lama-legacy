const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const Discord = require('discord.js');

export const CHANNEL_NAME = 'lama-fm';

export var client = null;
export var events = null;

export function initialize() {
  let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

  client = new Discord.Client();
  client.login(config.login, config.password);

  console.log('Logged in to Discord');

  events = new EventEmitter();

  client.on('message', (message) => {
    if (message.channel.name === CHANNEL_NAME) {
      let args = message.content.split(' ');
      if (args[0].toLowerCase() === '!dj') {
        args.shift();
        handleArgs(args);
      }
    }
  });
}

function handleArgs(args) {
  // TODO: Add checking whether args exist
  // TODO: Add documentation
  switch (args[0].toLowerCase()) {
    case 'play':
      events.emit('play', { id: args[1] });
      break;
  }
}
