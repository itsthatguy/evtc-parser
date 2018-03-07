import 'dotenv/config';

const path = require('path');
const webpack = require('webpack');
const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');

const env = [
  'NODE_ENV'
].reduce((result, v) => {
  result[v] = JSON.stringify(process.env[v]);
  return result;
}, {});

const baseConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'babel-loader',
          {
            loader: 'awesome-typescript-loader',
            options: { silent: true }
          }
        ],
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules', path.join(__dirname, 'src')],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { BUILD_TARGET: JSON.stringify('server'), ...env }
    }),
  ],
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  }
};

const devConfig = merge.smart(baseConfig, {
  devtool: '#source-map',
  entry: ['webpack/hot/poll?1000', './src/index'],
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'express-hot-loader',
          'babel-loader',
          {
            loader: 'awesome-typescript-loader',
            options: { silent: true }
          }
        ],
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    // new StartServerPlugin('index.js'),
    new webpack.HotModuleReplacementPlugin(),
  ]
});

const prodConfig = merge.smart(baseConfig, {
  entry: ['./src/index'],
  externals: [nodeExternals()],
});

export default process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;
