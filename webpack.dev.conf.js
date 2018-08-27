'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const portfinder = require('portfinder')
// const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

portfinder.basePort = 8080;
const port = portfinder.getPortPromise();


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',

  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  // },

  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',

  optimization: {
    namedModules: true, // NamedModulesPlugin()
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
  },

  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
        }
      }
    ),

    // Add FriendlyErrorsPlugin
    new FriendlyErrorsPlugin(),

    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin({
    //   NODE_ENV: 'development',
    //   PUBLIC_URL: '/'
    // }),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('src/index.html'),
    }),

    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    open: true,
    https: false,
    port: port,
    clientLogLevel: 'none',
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /./, to: '/index.html' }
      ]
    },
    contentBase: path.resolve('dist'),
    watchContentBase: true,
    hot: true,
    quiet: true,
    compress: false,
    publicPath: '/',
    overlay: { warnings: false, errors: true }
  }
});

module.exports = devWebpackConfig;
