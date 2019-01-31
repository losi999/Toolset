const path = require('path');

module.exports = (env, options) => {
    return {
        entry: './src/server.ts',
        target: 'node',
        devtool: options.mode !== 'production' ? 'inline-source-map ' : '',
        externals: {
        },
        module: {
            rules: [{
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },],
        },
        mode: options.mode || 'development',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.join(__dirname, options.mode === 'production' ? 'build' : 'dist'),
            filename: 'server.js',
            devtoolModuleFilenameTemplate: '[absolute-resource-path]'
        },
        stats: {
            warnings: false
        }
    };
};