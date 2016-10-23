import fs from 'fs';
import path from 'path';
import express from 'express';

import Database from './database';

const DATA_DIRECTORY_PATH = path.join(__dirname, 'data');
const DATABASE_PATH = path.join(DATA_DIRECTORY_PATH, 'database.json');

// Create data folder if it doesn't exist
try {
  fs.statSync(DATA_DIRECTORY_PATH);
} catch (e) {
  fs.mkdirSync(DATA_DIRECTORY_PATH);
}

// Load config
const config = loadConfig();

// Load database
const database = new Database(DATABASE_PATH);

// Start server
const server = express();
startServer();

function loadConfig() {
  let fileData;

  try {
    fileData = fs.readFileSync(path.join(__dirname, 'data/config.json'));
  } catch (e) {
    console.error('No config file!');
    console.log('Exiting...');
    process.exit(1);
  }

  return JSON.parse(fileData);
}

function startServer() {
  server.get('/', (req, res) => {
    res.send('DJ Lama');
  });

  server.use('/dashboard', express.static(path.join(__dirname, 'dashboard')));

  server.listen(config.port, () =>
    console.log(`DJ Lama running on port ${config.port}`)
  );
}
