const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

// analyzer tool
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () =>
  ({
    entry: {
      bundle: path.resolve(__dirname, '../src'),
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    plugins: [
      // analyzer tool
      // new BundleAnalyzerPlugin(),
      new WebpackMd5Hash(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          unused: true,
          dead_code: true,
        },
        output: {
          comments: false,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        title: 'Example',
        filename: 'index.html',
        template: path.resolve(__dirname, '../templates', 'index.ejs'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
      }),
      // Code splitting begin
      // inline your manifest.js with a script tag to save http request.
      new InlineManifestWebpackPlugin(),
      // inject manifest.json into <head>
      new InlineChunkManifestHtmlWebpackPlugin(),
      new ChunkManifestPlugin(),
      // extract vendor
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          const context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        },
      }),
      // after extract manifest.js from vendor
      // vendor asset hash won't change except modified vendor.
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        minChunks: Infinity,
      }),
      // load react-avatar whenever required.
      new webpack.optimize.CommonsChunkPlugin({
        async: 'react-avatar',
        minChunks(module) {
          const context = module.context;
          const target = ['react-avatar'];
          return context && context.indexOf('node_modules') >= 0 && target.find(t => new RegExp(t, 'gi').test(context));
        },
      }),
      // extract css file
      // 由於css是由進入點js引入的，所以chunkhash會相同
      // 這導致只要進入點js修改後，也會改變css的chunkhash
      // 而contenthash則是以內容產生hash
      new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css',
      }),
      // appCache 將被棄用，但safari不支持service worker
      new OfflinePlugin({
        ServiceWorker: {
          events: true,
        },
        caches: {
          main: ['all', ':rest:'],
          additional: [':externals:'],
          optional: ['*.chunk.js'],
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
            },
          ],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
      ],
    },
  });
