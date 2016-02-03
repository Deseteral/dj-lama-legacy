const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const Discord = require('discord.js');

const CHANNEL_NAME = 'lama-fm';
const BOT_NAME = 'DJ Lama';

export class DiscordBot {
  constructor() {
    this.client = null;
    this.events = null;

    this._channel = null;
    this._messageQueue = [];
    this._isProcessingQueue = false;
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

        if (message.author.username === BOT_NAME) {
          if (this._isProcessingQueue) {
            this.sendMessage(this._messageQueue.shift());

            if (this._messageQueue.length === 0) {
              this._isProcessingQueue = false;
            }
          }
        }

        let args = message.content.split(' ');
        if (args[0].toLowerCase() === '!dj') {
          args.shift();
          this.events.emit('command', args);
        }
      }
    });
  }

  sendMessage(msg, callback) {
    this.client.sendMessage(this._channel, msg, {}, callback);
  }

  sendMessagesSeries(messages) {
    this._messageQueue =  this._messageQueue.concat(messages);

    if (!this._isProcessingQueue) {
      this._isProcessingQueue = true;
      this.sendMessage(this._messageQueue.shift());
    }
  }
}
