const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/server.ts',
  watch: true,
  target: 'node',
  devtool: 'source-map',
  externals: {
    express: 'commonjs express',
    'body-parser': 'commonjs body-parser',
    mongoose: 'commonjs mongoose',
    bcryptjs: 'commonjs bcryptjs',
    jsonwebtoken: 'commonjs jsonwebtoken',
    cors: 'commonjs cors'
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new Dotenv()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};