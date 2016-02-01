const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const Discord = require('discord.js');

const CHANNEL_NAME = 'lama-fm';

export class DiscordBot {
  constructor() {
    this.client = null;
    this.events = null;
    this._channel = null;
  }

  initialize() {
    let config = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/config.json'))
    );

    this.client = new Discord.Client();
    this.client.login(config.login, config.password);

    console.log('Logged in to Discord');

    this.events = new EventEmitter();

    this.client.on('message', (message) => {
      if (message.channel.name === CHANNEL_NAME) {
        if (this._channel === null) {
          this._channel = message.channel;
        }

        let args = message.content.split(' ');
        if (args[0].toLowerCase() === '!dj') {
          args.shift();
          this.events.emit('command', args);
        }
      }
    });
  }

  sendMessage(msg) {
    this.client.sendMessage(this._channel, msg);
  }
}
