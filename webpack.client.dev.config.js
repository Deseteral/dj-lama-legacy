const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/client.js',
  output: {
    path: path.join(__dirname, 'build/public'),
    publicPath: '/',
    filename: 'client.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
