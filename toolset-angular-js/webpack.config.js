module.exports = {
    entry: "./src/app.ts",
    output: {
        filename: "app.[contenthash:4].js",
        path: __dirname + "/dist",
    },
    mode: 'development',
    devtool: "source-map",

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
    ],
    externals: {
        "angular": "angular"
    },
};