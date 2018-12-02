const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// analyzer tool
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const entryPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const template = path.resolve(__dirname, '../templates', 'index.ejs');

module.exports = () => ({
  target: 'web',
  entry: {
    bundle: entryPath,
  },
  output: {
    path: distPath,
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  devtool: 'cheap-source-map',
  mode: 'production',

  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],

    // *** Code-spliting Section ***
    splitChunks: {
      cacheGroups: {
        /**
         * extract vendor
         * 將路徑有node_modules的模組分開打包
         * 並命名為vendor
         */
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },

        /**
         * extracting react-avatar from vendor
         * 將react-avatar從vendor分離出來
         * 並且設定為async，該模塊將會懶加載
         */
        'react-avatar': {
          chunks: 'async',
          name: 'react-avatar',
          test: /[\\/]node_modules[\\/](react-avatar)[\\/]/,
        },
      },
    },

    /**
    * after extracted manifest.js from vendor
    * vendor asset hash won't change except modified vendor.
    * 在vendor被分離出來後（上面），只剩下runtime code的部分
    * 而runtime code包含了每個模塊的id和hash
    * 如不把runtime分開，會導致vendor的hash和模塊的變化會連動
    * 所以將runtime code單獨打包並命名為manifest（任何命名都可）
    */
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    /**
     * 由於chunk異步加載會使用到promise
     * 所以需要promise polyfill
     */
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
    }),

    /**
     * 預設webpack的模塊id是數字
     * HashedModuleIdsPlugin將數字替換成模塊路徑的hash值
     * 增加產生hash的一致性和穩定性
     * 並以md5替換掉webpack默認計算hash的方法
     */
    new webpack.HashedModuleIdsPlugin(),

    /**
     * analyzer tool
     */
    // new BundleAnalyzerPlugin(),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    /**
     * 合併較小chunk
     * 默認是總size要減少50%
     * OccurrenceOrderPlugin默認已啟用
     */
    new webpack.optimize.AggressiveMergingPlugin(),

    new HtmlWebpackPlugin({
      title: 'Example',
      filename: 'index.html',
      template,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),

    /**
     * 假設chunk會在未來使用
     * 但不是在將下來
     * 將異步模塊設定為prefetch
     */
    new PreloadWebpackPlugin({
      rel: 'prefetch',
    }),

    // *** Manifest Section ***
    /**
     * inline your runtime.js with a script tag to save http request.
     * 將產生的runtime.js提取出來，以節省請求
     * 需透過htmlWebpackPlugin注入至index.html
     */
    new InlineManifestWebpackPlugin('runtime'),

    /**
     * extract css file
     * 由於css是由進入點js引入的，所以chunkhash會相同
     * 這導致只要進入點js修改後，也會改變css的chunkhash
     * 而contenthash則是以內容產生hash
     */
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),

    /**
     * 增加離線功能
     */
    new OfflinePlugin({
      safeToUseOptionalCaches: true,

      /**
       * 預設appCache只有快取cache且沒有延遲請求的
       * 所以需手動添加additional和optional
       * appCache將被棄用
       * 但safari不支持service worker
       * FALLBACK會在斷線時去讀取已經獲取的manifest
       * 只有在開發環境才會請求/appcache/manifest.html
       */
      AppCache: {
        caches: ['main', 'optional'],
        FALLBACK: {
          '/': '/appcache/manifest.html',
        },
      },

      /**
       * 增加SW events hook
       */
      ServiceWorker: {
        events: true,
      },

      /**
       * caches物件為SW和appCache共用
       * additional：因為chunk並不需要立即使用
       *            所以會在下載後才進入cache
       *            SW並不會一開始下載
       * externals：選項對應:externals:特殊字
       *            可添加沒有被webpack打包的靜態資源
       *            例如：字體
       */
      caches: {
        main: [':rest:'],
        // additional: [':externals:'],
        optional: ['*.chunk.js'],
      },
      // externals: [],
    }),
    new CopyWebpackPlugin([
      {
        /**
         * copy the manifest.json from src to dist directory
         */
        from: `${entryPath}/manifest.json`,
        to: `${distPath}/manifest.json`,
      },
      {
        from: `${entryPath}/assets/images`,
        to: `${distPath}/images`,
      },
    ]),
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
});
