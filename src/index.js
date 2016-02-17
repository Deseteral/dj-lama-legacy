const fs = require('fs');
const path = require('path');
const Server = require('http').Server;
const express = require('express');
const socket = require('socket.io');
const fetch = require('node-fetch');

import { DiscordBot } from './discord-bot';
import { Database } from './database';
import * as help from './help-content';

var app = express();
var server = Server(app);
var io = socket(server);

var database = null;
var bot = null;

var cachedQueue = [];

var commands = {
  song: () => {
    io.emit('dashboard-song');
  },

  skip: () => {
    io.emit('dashboard-skip');
  },

  add: (song) => {
    database.add(song);
    io.emit('client-database-updated', database._sortedLibrary);
  },

  play: (song, after) => {
    if (song !== null) {
      io.emit('dashboard-play', { song: song, after: after });
    }
  },

  say: (what) => {
    io.emit('dashboard-say', what);
  },

  list: () => {
    const SPLIT_LINES_COUNT = 50;

    let lib = database._sortedLibrary;
    let messages = [];

    for (let line = 0; line < lib.length; line += SPLIT_LINES_COUNT) {
      let songList = '';

      // Put database length in the first line
      if (line === 0) {
        // RESOURCE
        songList = `Utworów w bazie danych: \`${database.library.length}\`\n\n`;
      }

      for (let i = 0; i < SPLIT_LINES_COUNT; i++) {
        let index = i + line;

        if (index === lib.length) {
          break;
        }

        let song = lib[index];
        songList += `\`${song.artist} - ${song.title}\`\n`;
      }

      messages.push(songList);
    }

    bot.sendMessagesSeries(messages);
  },

  random: (num = 1) => {
    for (let i = 0; i < num; i++) {
      let randomIndex = Math.floor(Math.random() * database.library.length);
      let song = database.library[randomIndex];

      commands.play(song, false);
    }
  },

  playNew: (num = 1) => {
    let notPlayedSongs = [];

    for (let i = 0; i < database.library.length; i++) {
      let song = database.library[i];
      if (song.played === 0 || song.played === undefined) {
        notPlayedSongs.push(song);
      }

      if (notPlayedSongs.length === num) {
        break;
      }
    }

    arrayShuffle(notPlayedSongs);

    for (let i = 0; i < notPlayedSongs.length; i++) {
      commands.play(notPlayedSongs[i], false);
    }

    return notPlayedSongs.length;
  }
};

// Get IP address;
var ip;
fetch('https://api.ipify.org/?format=json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    ip = json.ip;
  })
  .catch((err) => {
    console.error(err);
  });

// Load config
var config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data/config.json'))
);

// Update help
help.content = help.content.replace(
  '{{CHANNEL_NAME}}',
  config.discord['channel-name']
);

// Database initialization
database = new Database();
database.load();

// HTTP server initialization
app.use('/', express.static(path.join(__dirname, 'static')));
server.listen(config.port, () => {
  console.log(`Started HTTP server on port: ${config.port}`);
});

// socket.io initialization
io.on('connection', (socket) => {
  console.log('New socket connection');

  // Dashboard socket
  socket.on('dashboard-song-response', (info) => {
    // RESOURCE
    bot.sendMessage(
      `Utworów w kolejce: ${info.queueLength}\n
      https://www.youtube.com/watch?v=${info.id}`
    );
  });

  socket.on('dashboard-song-loaded', (details) => {
    let song = database.findById(details.id);
    if (song !== null) {
      if (database.library[song.index].played === undefined) {
        database.library[song.index].played = 0;
      }

      database.library[song.index].played++;
    }

    database.save();
  });

  socket.on('dashboard-queue-updated', (queue) => {
    io.emit('client-queue-updated', queue);
    cachedQueue = queue;
  });

  // Client socket
  socket.on('client-yt', (info) => {
    io.emit('play', info);
  });

  socket.emit('client-queue-updated', cachedQueue);
  socket.emit('client-database-updated', database._sortedLibrary);
});

// Discord bot initialization
bot = new DiscordBot(
  config.discord['bot-name'],
  config.discord['channel-name']
);

bot.login(config.discord.username, config.discord.password);
bot.events.on('command', (args) => {
  parseCommand(args);
});

function parseCommand(args, silent = false) {
  if (args[0] === undefined) {
    if (!silent) {
      bot.sendMessage('Nie wiem o co Ci biega? lol?'); // RESOURCE
    }
    return;
  }

  // Trim all of the arguments
  for (let i = 0; i < args.length; i++) {
    args[i] = args[i].trim();
  }

  switch (args[0].toLowerCase()) {
    // Chat bot only command
    case 'help':
      bot.sendMessage(help.content);
      break;

    // Chat bot only command
    case 'song':
      commands.song();
      break;

    // Chat bot only command
    case 'list':
      commands.list();
      break;

    // Chat bot only command
    case 'link':
      bot.sendMessage(`http://${ip}:${config.port}`);
      break;

    case 'yt': {
      if (args[1] === undefined) {
        if (!silent) {
          // RESOURCE
          bot.sendMessage('A podać ID filmu to kto poda. No chyba nie ja.');
        }
        return;
      }

      let song = {
        id: args[1],
        start: args[2],
        end: args[3]
      };

      commands.play(song, false);
    } break;

    case 'skip':
      commands.skip();
      break;

    case 'add': {
      args.shift();
      args = args.join(' ').split('|');

      // Make sure args fulfill the requirement of having at least id, artist
      // and title.
      if (args.length < 3) {
        if (!silent) {
          // RESOURCE
          bot.sendMessage('Wróć do mnie jak będziesz mieć ID, wykonwacę i tytuł, a teraz nie zawracaj mi głowy. Mam audycję do poprowadzenia.');
        }
        return;
      }

      // Trim all of the arguments
      for (let i = 0; i < args.length; i++) {
        args[i] = args[i].trim();
      }

      let dbSong = database.findById(args[0]);
      if (dbSong !== null) {
        if (!silent) {
          // RESOURCE
          bot.sendMessage(`\`${dbSong.song.title}\` jest już w bazie.`);
        }
        return;
      }

      dbSong = database.findByTitle(args[2].toLowerCase());
      if (dbSong !== null) {
        if (!silent) {
          // RESOURCE
          bot.sendMessage(`Utwór o tytule \`${dbSong.song.title}\` jest już w bazie. Jeżeli masz pewność że to inny utwór, pogoń programistę tego cudownego bota żeby dodał możliwość dodawania kawałków o takim samym tytule. A tymczasem spadaj!`);
        }
        return;
      }

      let song = {
        id: args[0],
        artist: args[1].toLowerCase(),
        title: args[2].toLowerCase(),
        start: args[3],
        end: args[4]
      };

      commands.add(song);
    } break;

    case 'play': {
      args.shift();
      if (args.length === 0) {
        if (!silent) {
          // RESOURCE
          bot.sendMessage('Skąd mam wiedzieć co mam grać? Tytuł mi podaj!');
        }
        return;
      }

      if (args.length === 1 && args[0] === 'now') {
        if (!silent) {
          // RESOURCE
          bot.sendMessage('Skąd mam wiedzieć co mam grać? Tytuł mi podaj!');
        }
        return;
      }

      let after;
      if (args[0] === '--after' || args[0] === '-a') {
        after = true;
        args.shift();
      }

      args = args.join(' ').toLowerCase();

      let songFromDatabase = database.findByTitle(args);
      if (songFromDatabase !== null) {
        commands.play(songFromDatabase.song, after);
      } else {
        if (!silent) {
          // RESOURCE
          bot.sendMessage('Takiego utworu nie ma w bazie. Wiem, bo szukałam.');
        }
      }
    }
      break;

    case 'play-new':
      if (args[1] !== undefined) {
        if (!isNaN(args[1])) {
          commands.playNew(parseInt(args[1]));
        }
      } else {
        commands.playNew();
      }
      break;

    case 'say': {
      args.shift();
      if (args.length === 0) {
        if (!silent) {
          // RESOURCE
          bot.sendMessage('Jak chcesz kogoś pozdrowić, to wypadało by napisać te pozdrowienia...');
        }
        return;
      }

      args = args.join(' ');

      commands.say(args);
    } break;

    case 'random':
      let len;

      if (args[1] !== undefined) {
        if (!isNaN(args[1])) {
          len = commands.random(parseInt(args[1]));
        }
      } else {
        len = commands.random();
      }

      if (len === 0 && !silent) {
        // RESOURCE
        bot.sendMessage('Nie mam żadnych nowych kawałków ziomeczki. Dodajcie coś nowego to zagram :wink:');
      }
      break;

    default:
      if (!silent) {
        bot.sendMessage('Nie wiem o co Ci biega? lol?'); // RESOURCE
      }
  }
}

function arrayShuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

// devtool binding
//
// window.bot = bot;
// window.database = database;
// window.parseCommand = parseCommand;
// window.exit = () => {
//   database.save();
//   window.close();
// };
