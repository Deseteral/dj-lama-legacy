const EventEmitter = require('events').EventEmitter;
const Discord = require('discord.js');

export class DiscordBot {
  constructor(botName, channelName) {
    this.client = new Discord.Client();
    this.events = new EventEmitter();

    this.name = botName;
    this.channelName = channelName;

    this._channel = null;
    this._messageQueue = [];
    this._isProcessingQueue = false;

    this.client.on('message', (message) => this._processMessage(message));
  }

  login(username, password) {
    this.client.login(username, password);
    console.log('Logged in to Discord server');
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

  _processMessage(message) {
    if (message.channel.name === this.channelName) {
      if (this._channel === null) {
        this._channel = message.channel;
      }

      if (message.author.username === this.name) {
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
  }
}
