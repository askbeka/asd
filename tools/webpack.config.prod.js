var createVariants = require('parallel-webpack').createVariants;
var config = require('./webpack.config');
var merge = require('webpack-merge');
var pkg = require('../package.json');

module.exports = createVariants({
  node: [0, 4, 5, 6]
}, function(o) {

  var prodConfig = merge(config, {
    entry: {},
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015' + (o.node ? ('-node' + o.node) : ''), 'stage-0']
        }
      }]
    }
  })

  prodConfig.entry[pkg.name + '-' + o.node] = config.entry;

  return prodConfig;
});
