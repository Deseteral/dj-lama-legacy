const path = require('path');
const configurator = process.env.NODE_ENV === 'production'
  ? require('./webpack.client.prod.config.js')
  : require('./webpack.client.dev.config.js');

const initialConfig = {
  entry: './src/client.jsx',
  output: {
    path: path.join(__dirname, 'build/src/public'),
    publicPath: '/',
    filename: 'client.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.less$/,
      loader: `style-loader!css?sourceMap&modules&localIdentName=${configurator.cssHash}!less`
    }]
  }
};

module.exports = Object.assign(initialConfig, configurator.config);
