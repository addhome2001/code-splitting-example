const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

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
      chunkFilename: '[name].[chunkhash:8].js',
    },
    plugins: [
      // analyzer tool
      // new BundleAnalyzerPlugin(),
      new WebpackMd5Hash(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
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
      new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css',
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
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
      ],
    },
  });
