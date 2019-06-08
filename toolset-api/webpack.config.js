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
                test: /.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },],
        },
        mode: options.mode || 'development',
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                'node_modules'
            ],
            alias: {
                '@': path.resolve('src')
            }
        },
        output: {
            path: path.join(__dirname, options.mode === 'production' ? 'build' : 'dist'),
            filename: 'server.js'
        },
        stats: {
            warnings: false
        }
    };
};