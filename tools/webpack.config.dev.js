import merge from 'webpack-merge';
import config from './webpack.config';
import pkg from '../package.json';

const devConfig = merge(config, {
    entry: {
        [pkg.name]: config.entry
    },
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
    }
});

export default devConfig;
