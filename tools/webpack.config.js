var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var pkg = require('../package.json');
var webpack = require('webpack');

var externals = Object.keys(pkg.dependencies).reduce(function(prev, cur) {

  prev[cur] = cur;
  return prev;

}, {});

var config = {
  entry: path.join(__dirname, '../src'),
  target: 'node',
  output: {
    path: path.join(__dirname, '../lib'),
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  resolve: {
    root: path.join(__dirname, '../src'),
    modulesDirectories: ['node_modules'],
    extensions: ['.js']
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   'fetch': 'imports?this=>global!exports?global.fetch!node-fetch'
    // }),
    new CleanWebpackPlugin(['lib'], {
      root: path.join(__dirname, '..'),
      verbose: false
    })],
  externals: externals,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};

module.exports = config;