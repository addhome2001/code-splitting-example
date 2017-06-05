const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = () =>
  ({
    entry: {
      bundle: [
        'webpack/hot/dev-server',
        path.resolve(__dirname, '../src'),
      ],
    },
    devServer: {
      host: '0.0.0.0',
      port: 8000,
      contentBase: path.resolve(__dirname, '../dist'),
      historyApiFallback: true,
    },
    devtool: 'eval',
    output: {
      path: path.join(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash:8].js',
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
        template: path.resolve(__dirname, '../templates', 'index.ejs'),
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
      }),
      new OfflinePlugin({
        ServiceWorker: {
          events: true,
        },
        caches: {
          main: ['index.html'],
        },
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
