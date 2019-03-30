const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, options) => ({
    entry: "./src/app.ts",
    output: {
        filename: options.mode !== 'production' ? 'app.js' : 'app.[contenthash:4].js',
        path: path.join(__dirname, options.mode !== 'production' ? 'dist' : 'build'),
    },
    mode: 'development',
    devtool: options.mode !== 'production' ? 'inline-source-map ' : '',

    resolve: {
        extensions: [".ts", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    externals: {
        "angular": "angular"
    },
});