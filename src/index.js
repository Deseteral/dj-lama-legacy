import path from 'path';
import express from 'express';

const PORT = process.env.PORT || 8080;
const server = express();

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

server.use('/public', express.static(path.join(__dirname, 'public')));

server.listen(PORT, () =>
  console.log(`DJ Lama running on port ${PORT}`)
);
