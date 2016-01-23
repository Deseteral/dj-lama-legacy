import * as bot from './discord-bot';

bot.initialize();
bot.events.on('play', (info) => {
  console.log(info);
});
