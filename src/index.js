import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';

const PORT = process.env.PORT || 8080;
const server = express();

server.use(compression());
server.use(
  favicon(path.join(__dirname, 'public/resources/favicon.ico'))
);

server.use('/', express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(PORT, () =>
  console.log(`DJ Lama running on port ${PORT}`)
);
