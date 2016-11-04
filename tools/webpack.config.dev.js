var merge = require('webpack-merge');
var config = require('./webpack.config');
var pkg = require('../package.json');
var webpack = require('webpack');

var devConfig = merge(config, {
  entry: {},
  devtool: 'source-map',
  debug: true,
  cache: true,
  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel',
      query: {
        babelrc: false,
        cacheDirectory: true,
        presets: ['es2015-node', 'stage-0']
      }
    }]
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      {
        raw: true,
        entryOnly: false
      })
  ]
});

// Node version
var v = parseInt(process.versions.node.split('.').shift());

if (v < 4) {
  v = 0;
}

devConfig.entry[pkg.name + '-' + v] = config.entry;

module.exports = devConfig;
