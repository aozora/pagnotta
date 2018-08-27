'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

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
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            dead_code: true,
            evaluate: true,
            comparisons: true,
            sequences: true
          }
        },
        sourceMap: true,
        parallel: true,
        cache: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          map: {
            inline: false
          },
          discardComments: { removeAll: true }
        },
      })
    ],
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

// if (config.build.bundleAnalyzerReport) {
//   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//   webpackConfig.plugins.push(new BundleAnalyzerPlugin());
// }

module.exports = webpackConfig;
