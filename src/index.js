import fs from 'fs';
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';

import { logger, expressLogger } from './utils/logger';

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'dev';
const server = express();

logger('APP', `PORT=${PORT}`, 'log');
logger('APP', `ENV=${ENV}`, 'log');

const initialHtml = fs.readFileSync(
  path.join(__dirname, 'public/index.html'),
  { encoding: 'utf8' }
);

server.use(expressLogger);
server.use(compression());
server.use(
  favicon(path.join(__dirname, 'public/resources/favicon.ico'))
);

server.use('/public', express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  const props = {
    route: '/'
  };

  res.send(injectProps(props));
});

server.get('/style-guide', (req, res) => {
  const props = {
    route: '/style-guide'
  };

  res.send(injectProps(props));
});

server.listen(PORT, () =>
  logger('APP', `DJ Lama running on port ${PORT}`, 'log')
);

function injectProps(props) {
  return initialHtml.replace(
    '<div id="props"></div>',
    `<script>window.__props=${JSON.stringify(props)}</script>`
  );
}
