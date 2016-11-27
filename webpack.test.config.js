module.exports = {
  target: 'node',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
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
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
