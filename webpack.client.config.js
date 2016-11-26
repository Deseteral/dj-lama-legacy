module.exports = process.env.NODE_ENV === 'production' ?
  require('./webpack.client.prod.config.js') :
  require('./webpack.client.dev.config.js');
