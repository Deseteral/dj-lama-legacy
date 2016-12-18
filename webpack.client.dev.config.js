const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/client.js',
  output: {
    path: path.join(__dirname, 'build/src/public'),
    publicPath: '/',
    filename: 'client.js'
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
      loader: 'style-loader!css?sourceMap&modules&localIdentName=[name]__[local]__[hash:base64:5]!less'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
