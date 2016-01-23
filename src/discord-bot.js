const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const Discord = require('discord.js');

export const CHANNEL_NAME = 'lama-fm';

export var client = null;
export var events = null;

var channel = null;

var helpContent = `Parametry podane w \`<>\` są obowiązkowe, \`*takie*\` są opcjonalne.
Czas podawać w formacie mm:ss, np. 1:30, 12:00 itd.
Dostępne są podane komendy:\n
  \`play <id> *start* *end*\` - dodaje utwór z podanym \`id\` do kolejki odtwarzania, rozpoczynając odtwarzanie od czasu \`start\` do \`end\`.\n
  \`song\` - wysyła link do aktualnie odtwarzanego utworu`;

export function initialize() {
  let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

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
        handleArgs(args);
      }
    }
  });
}

function handleArgs(args) {
  // TODO: Add checking whether args exist
  // TODO: Add documentation
  switch (args[0].toLowerCase()) {
    case 'help':
      sendMessage(helpContent);
      break;

    case 'play':
      events.emit('play', { id: args[1], start: args[2], end: args[3] });
      break;

    case 'song':
      events.emit('song');
      break;
  }
}

export function sendMessage(msg) {
  client.sendMessage(channel, msg);
}
