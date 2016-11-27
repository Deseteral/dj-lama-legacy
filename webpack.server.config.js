const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015-node6', 'react']
      }
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  }
};
