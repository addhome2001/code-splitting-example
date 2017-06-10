const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = +process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

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
      host: HOST,
      port: PORT,
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
        __DEV__: true,
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
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
