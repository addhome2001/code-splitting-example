const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const entryPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const template = path.resolve(__dirname, '../templates', 'index.ejs');

module.exports = () =>
  ({
    entry: {
      bundle: [
        'webpack/hot/dev-server',
        entryPath,
      ],
    },
    devServer: {
      host: '0.0.0.0',
      port: 8000,
      contentBase: distPath,
      historyApiFallback: true,
    },
    devtool: 'eval-source-map',
    output: {
      path: distPath,
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
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
      }),
      /**
       * 預設webpack的模塊id是數字
       * NamedModulesPlugin將數字替換成模塊路徑
       * 以方便除錯
       */
      new webpack.NamedModulesPlugin(),
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
