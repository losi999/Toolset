const path = require('path');

module.exports = (env, options) => {
    return {
        entry: './src/server.ts',
        target: 'node',
        devtool: options.mode !== 'production' ? 'source-map' : '',
        externals: {
            express: 'commonjs express',
            'body-parser': 'commonjs body-parser',
            mongoose: 'commonjs mongoose',
            bcryptjs: 'commonjs bcryptjs',
            jsonwebtoken: 'commonjs jsonwebtoken',
            cors: 'commonjs cors',
            inversify: 'commonjs inversify',
            'reflect-metadata': 'commonjs reflect-metadata',
            dotenv: 'commonjs dotenv'
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
        },
    };
};