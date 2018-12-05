const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = +process.env.PORT || 8000;

const entryPath = path.resolve(__dirname, '../src');
const destPath = path.resolve(__dirname, '../build');
const template = path.resolve(__dirname, '../templates', 'index.ejs');

module.exports = () => ({
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      entryPath,
    ],
  },
  devServer: {
    host: HOST,
    port: PORT,
    contentBase: destPath,
    historyApiFallback: true,
  },
  mode: 'development',
  output: {
    path: destPath,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Example',
      filename: 'index.html',
      template,
      __DEV__: true,
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
});
