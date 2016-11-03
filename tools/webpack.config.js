import path from 'path';
import pkg from '../package.json';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const
    externals = Object.keys(pkg.dependencies).reduce((prev, cur) => ({...prev, [cur]: cur}), {}),
    root = path.resolve(__dirname, '..');

const config = {
    target: 'node',
    output: {
        path: path.join(root, 'lib'),
        filename: '[name].js'
    },
    resolve: {
        root: path.join(root, 'src'),
        modulesDirectories: ['node_modules'],
        extensions: ['.js']
    },
    plugins: [new CleanWebpackPlugin(['lib'], {root: root, verbose: false})],
    externals
};

export default config;
