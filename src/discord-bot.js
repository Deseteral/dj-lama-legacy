const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

export var client = new Discord.Client();

export function initialize() {
  let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

  client.login(config.login, config.password);
  console.log('Logged in to Discord');
}
