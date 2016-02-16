var socket = io();

addEventListener('WebComponentsReady', () => {
  let app = document.querySelector('#app');

  app.selected = 0;
  app.queue = [];
  app.database = [];

  socket.on('client-queue-updated', (queue) => {
    app.queue = queue;
  });

  socket.on('client-database-updated', (database) => {
    app.database = database;
  });
});
