'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf')
const portfinder = require('portfinder')

// dynamically get a port
let port = 8080;
portfinder.basePort = 8080;
portfinder.getPortPromise().then((p) => {
  port = p;
  console.log(`Listening on port ${p}`);
});


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',

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
    new FriendlyErrorsWebpackPlugin(
      {
        compilationSuccessInfo: {
          messages: ['Compilation successful'],
          // notes: ['Some additionnal notes to be displayed unpon successful compilation']
        },

        additionalTransformers: [],
        additionalFormatters: []
      }
    ),


    new webpack.HotModuleReplacementPlugin()
  ],

  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },

  devServer: {
    open: true,
    https: true,
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
