'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

  // module: {
  //   rules: utils.styleLoaders({
  //     sourceMap: config.build.productionSourceMap,
  //     extract: true,
  //     usePostCSS: true
  //   })
  // },

  devtool: '#source-map', // 'hidden-source-map'

  // output: {
  //   path: config.build.assetsRoot,
  //   // filename: utils.assetsPath('js/[name].[chunkhash].js'),
  //   // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  //   filename: utils.assetsPath('js/[name].js') // an hash will be appended by HtmlWebpackPlugin
  // },

  optimization: {
    runtimeChunk: false,
    concatenateModules: true, //ModuleConcatenationPlugin
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       ie8: false,
    //       compress: {
    //         warnings: false,
    //         conditionals: true,
    //         unused: true,
    //         dead_code: true,
    //         evaluate: true,
    //         comparisons: true,
    //         sequences: true
    //       }
    //     },
    //     sourceMap: config.build.productionSourceMap,
    //     parallel: true
    //   })
    // ],
  },

  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
          BASE_URL: '"/"'
        }
      }
    ),

    // // keep module.id stable when vendor modules does not change
    // new webpack.HashedModuleIdsPlugin()
  ]
});

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
