var socket = io();

addEventListener('WebComponentsReady', () => {
  let app = document.querySelector('#app');

  app.selected = 0;
  app.queue = [];
  app.database = [];
  app.timeSinceOnAir = '';
  app.onAir = {
    status: false,
    time: null
  };

  setInterval(() => {
    if (!app.onAir.status) {
      return;
    }

    if (app.onAir.time === null) {
      return;
    }

    let t = new Date().getTime() - app.onAir.time;

    let hours = Math.floor(t / (1000 * 60 * 60));
    t -= hours * 60 * 60 * 1000;

    let minutes = Math.floor(t / (1000 * 60));
    t -= minutes * 60 * 1000;

    let seconds = Math.floor(t / 1000);

    app.timeSinceOnAir = `${hours}h ${minutes}m ${seconds}s`;
  }, 1000);

  socket.on('client-queue-updated', (queue) => {
    app.queue = queue;
  });

  socket.on('client-database-updated', (database) => {
    app.database = database;
  });

  socket.on('client-on-air', (details) => {
    app.onAir = details;
  });
});
