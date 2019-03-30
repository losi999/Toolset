const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => ({
    entry: './src/app.module.ts',
    output: {
        filename: 'app.[contenthash:4].js',
        path: path.join(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: options.mode !== 'production' ? 'inline-source-map' : '',

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': path.resolve('src')
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8888,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
              }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
});