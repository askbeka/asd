import {createVariants} from 'parallel-webpack';
import config from './webpack.config';
import merge from 'webpack-merge';
import pkg from '../package.json';

const prodConfig = createVariants({node: [0, 4, 5, 6]}, (o) => merge(config, {
    entry: {
        [`${pkg.name}-${o.node}`]: config.entry
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: [(o.node ? (`node${o.node}-`) : '') + 'es2015', 'stage-0']
            }
        }]
    }
}));

export default prodConfig;
