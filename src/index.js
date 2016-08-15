import fs from 'fs';
import path from 'path';
import express from 'express';

// Load config
const config = loadConfig();

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
    res.send('Lama FM');
  });

  server.listen(config.port, () =>
    console.log(`DJ Lama running on port ${config.port}`)
  );
}
