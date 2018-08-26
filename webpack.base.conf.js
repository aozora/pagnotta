'use strict'
const path = require('path')
// const utils = require('./utils')
// const config = require('../config')

function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  context: path.resolve(__dirname),

  entry: {
    app: './src/js/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src/js')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src/js') /* , resolve('node_modules/webpack-dev-server/client') */],
        // options: {
        //   presets: [
        //     ['env', {
        //       // modules: false,
        //       useBuiltIns: 'usage',
        //     }],
        //   ],
        // },
      },

      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              // plugins: () => [
              //   require('postcss-flexbugs-fixes'),
              //   // autoprefixer({
              //   //   browsers: [
              //   //     '>1%',
              //   //     'last 4 versions',
              //   //     'Firefox ESR',
              //   //     'not ie < 9', // React doesn't support IE8 anyway
              //   //   ],
              //   //   flexbox: 'no-2009',
              //   // }),
              // ],
            },
          },
        ],
      },


      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('assets', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('assets', 'video/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('assets', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  // optimization: {
  //   runtimeChunk: false,
  //
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         // test: /[\\/]node_modules[\\/](?!@pollyjs)/,
  //         /**
  //          * Create the vendor chunk with all the modules from node_modules, except for PollyJS that
  //          * will be included in the mock chunk. This will prevent that PollyJS is included in the vendor causing errors
  //          * on IE since it not supported on it yet.
  //          * See https://github.com/Netflix/pollyjs/issues/28
  //          *
  //          * @param module
  //          * @param chunks
  //          * @returns {boolean}
  //          */
  //         test: (module, chunks) => {
  //           // console.log(module.context);
  //
  //           if (module.context.indexOf('node_modules') > -1 && module.context.indexOf('@pollyjs') === -1) {
  //             return true;
  //           }
  //
  //           return false;
  //         },
  //         chunks: 'initial',
  //         name: 'vendor',
  //         priority: 10,
  //         enforce: true
  //       }
  //     }
  //   }
  // },

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
