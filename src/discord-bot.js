const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const Discord = require('discord.js');

export const CHANNEL_NAME = 'lama-fm';

export var client = null;
export var events = null;

var channel = null;

var helpContent = `Bot reaguje na komendy tylko na kanale #${CHANNEL_NAME}.
Parametry podane w \`<>\` są obowiązkowe, \`*takie*\` są opcjonalne.
Czas podawać w formacie mm:ss, np. 1:30, 12:00 itd.
Dostępne są podane komendy:\n
    \`yt <id> *start* *end*\` - dodaje utwór z podanym \`id\` do kolejki odtwarzania, rozpoczynając odtwarzanie od czasu \`start\` do \`end\`.
    \`song\` - wysyła link do aktualnie odtwarzanego utworu.
    \`skip\` - pomija aktualnie odtwarzany utwór.
    \`add <id> | <artist> | <title> | *start* | *end*\` - dodaje utwór o podanym id do bazy daych jako tytuł \`title\`, wykonawcę \`artist\` oraz z opcjonalnymi czasami. Ważne, poszczególne pola oddzielone są znakiem \`|\`.
    \`play <title>\` - odtwarza utwór o danym tytule z bazy danych.
    \`say <sentence>\` - prośba do spikera radiowego o pozdrowienia :wink:
    \`list\` - wyświetla listę wszystkich utworów w bazie danych (sortowanych po wykonawcy)`;

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

    case 'yt':
      events.emit('yt', {
        id: args[1].trim(),
        start: typeof args[2] !== 'undefined' ? args[2].trim() : undefined,
        end: typeof args[3] !== 'undefined' ? args[3].trim() : undefined
      });
      break;

    case 'song':
      events.emit('song');
      break;

    case 'skip':
      events.emit('skip');
      break;

    case 'add':
      args.shift();
      args = args.join(' ').split('|');

      let info = {
        id: args[0].trim(),
        artist: args[1].toLowerCase().trim(),
        title: args[2].toLowerCase().trim(),
        start: typeof args[3] !== 'undefined' ? args[3].trim() : undefined,
        end: typeof args[4] !== 'undefined' ? args[4].trim() : undefined,
      };

      events.emit('add', info);
      break;

    case 'play':
      args.shift();
      args = args.join(' ').toLowerCase().trim();

      events.emit('play', args);
      break;

    case 'say':
      args.shift();
      args = args.join(' ');

      events.emit('say', args);
      break;

    case 'list':
      events.emit('list');
      break;
  }
}

export function sendMessage(msg) {
  client.sendMessage(channel, msg);
}
