const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const Discord = require('discord.js');

export const CHANNEL_NAME = 'lama-fm';

export var client = null;
export var events = null;

var channel = null;

export function initialize() {
  let config = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/config.json'))
  );

  client = new Discord.Client();
  client.login(config.login, config.password);

  console.log('Logged in to Discord');

  events = new EventEmitter();

  client.on('message', (message) => {
    if (message.channel.name === CHANNEL_NAME) {
      if (channel === null) {
        channel = message.channel;
      }

      let args = message.content.split(' ');
      if (args[0].toLowerCase() === '!dj') {
        args.shift();
        events.emit('command', args);
      }
    }
  });
}

export function sendMessage(msg) {
  client.sendMessage(channel, msg);
}
