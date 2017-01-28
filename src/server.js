import fs from 'fs';
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';

import packageJson from '../package.json';
import { loggerSetQuiet, logger, expressLogger } from './utils/logger';

import Database from './domain/database';

import buildFakeStorage from './storages/fake-storage';
import DropboxStorage from './storages/dropbox-storage';

import LibraryService from './services/library-service';
import getApiController from './controllers/api-controller';

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'dev';
const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
const TAG = 'APP';

// Main entry point
export default function start(initialAppState) {
  return Promise.resolve(initialAppState)
    .then(initializeLogger)
    .then((appState) => {
      logger(TAG, `PORT=${PORT}`, 'log');
      logger(TAG, `ENV=${ENV}`, 'log');

      return appState;
    })
    .then(readTemplateHtml)
    .then(connectToStorage)
    .then(initializeDatabase)
    .then(loadDatabaseFromStorage)
    .then(setupServices)
    .then(createServer)
    .then(setupRouting)
    .then(startServer)
    .then((appState) => {
      logger(TAG, `Application started on port ${PORT}`);
      return appState;
    })
    .catch(err => logger(TAG, err, 'error'));
}

function initializeLogger(appState) {
  loggerSetQuiet(appState.quiet);
  return appState;
}

function readTemplateHtml(appState) {
  return new Promise((resolve, reject) => {
    logger(TAG, 'Reading template HTML');

    const filePath = path.join(__dirname, 'public/index.html');
    const options = { encoding: 'utf8' };

    fs.readFile(filePath, options, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(
        Object.assign(appState, { templateHtml: data })
      );
    });
  });
}

function connectToStorage(appState) {
  logger(TAG, 'Connecting to remote storage');
  return DROPBOX_ACCESS_TOKEN
    ? Object.assign(appState, { storage: new DropboxStorage(DROPBOX_ACCESS_TOKEN) })
    : Object.assign(appState, { storage: buildFakeStorage() });
}

function initializeDatabase(appState) {
  logger(TAG, 'Initializing database');
  return Object.assign(appState, { database: new Database(appState.storage) });
}

function loadDatabaseFromStorage(appState) {
  return new Promise((resolve, reject) => {
    logger(TAG, 'Fetching database from storage');
    const { storage, database } = appState;

    storage
      .fetchDatabase()
      .then((data) => {
        database
          .bootstrap(data)
          .then(() => resolve(appState));
      })
      .catch(reject);
  });
}

function setupServices(appState) {
  logger(TAG, 'Setting up services');

  const services = {
    library: new LibraryService(appState.database)
  };

  return Object.assign(appState, { services });
}

function createServer(appState) {
  logger(TAG, 'Creating server instance');
  const server = express();

  server.use(expressLogger);
  server.use(compression());
  server.use(
    favicon(path.join(__dirname, 'public/resources/favicon.ico'))
  );

  return Object.assign(appState, { server });
}

function setupRouting(appState) {
  logger(TAG, 'Setting up routing');
  const { server, templateHtml } = appState;

  server.use('/public', express.static(path.join(__dirname, 'public')));
  server.use('/api', getApiController(appState));

  server.get('/', (req, res) => {
    const props = {
      appVersion: packageJson.version,
      route: '/'
    };

    res.send(injectPropsIntoMarkup(templateHtml, props));
  });

  server.get('/style-guide', (req, res) => {
    const props = {
      route: '/style-guide'
    };

    res.send(injectPropsIntoMarkup(templateHtml, props));
  });

  return appState;
}

function startServer(appState) {
  return new Promise((resolve) => {
    logger(TAG, 'Starting the server');
    const serverInstance = appState.server.listen(PORT, () => {
      resolve(Object.assign(appState, { serverInstance }));
    });
  });
}

function injectPropsIntoMarkup(html, props) {
  return html.replace(
    '<div id="props"></div>',
    `<script>window.applicationConfig=${JSON.stringify(props)}</script>`
  );
}
