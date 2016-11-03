import yargs from 'yargs';
import webpack from 'webpack';
import parallelWebpack from 'parallel-webpack';
import devConfig from './webpack.config.dev';

const isDebug = yargs.argv.prod;

if (isDebug) {
    let bundler = webpack(devConfig);

    bundler.watch({}, (err, stats) => {
        if (err) console.error(err);
        console.log(stats.toString({
            colors: true,
            chunks: false,
            chunkModules: false
        }));
    });

    process.on('exit', () => {
        bundler.close();
    });

} else {
    
    parallelWebpack.run(require.resolve('./webpack.config.prod'), {
        watch: false,
        stats: true,
        maxRetries: 1,
        maxConcurrentWorkers: 4
    });
}
