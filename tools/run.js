var yargs = require('yargs');
var webpack = require('webpack');
var parallelWebpack = require('parallel-webpack');
var devConfig = require('./webpack.config.dev');

var isDebug = !yargs.argv.prod;

var statsFormat = {
    colors: true,
    chunks: false,
    chunkModules: false
  };

if (isDebug) {

  var bundler = webpack(devConfig);

  var watcher = bundler.watch({}, function(err, stats) {
    if (err) console.error(err);
    console.log(stats.toString(statsFormat));
  });

  process.on('exit', function() {
    watcher.close();
  });

} else {

  parallelWebpack.run(require.resolve('./webpack.config.prod'), {
    watch: false,
    stats: true,
    colors: true,
    maxRetries: 1,
    maxConcurrentWorkers: 4
  }, function(err) {
    if (err) console.error(err);
  });
}