'use strict'

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

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
      },

      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.(sa|sc|c)ss$/,
        include: [path.resolve('src')],
        exclude: path.resolve('node_modules'),
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              minimize: isProduction
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              sourceMap: true,
              minimize: isProduction,
              plugins: (loader) => [
                require('postcss-import'),
                require('postcss-url'),
                require('autoprefixer'),
                require('postcss-flexbugs-fixes')
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: false,
              sourceMap: true,
              minimize: isProduction
            }
          }
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader:
          'url-loader',
        options:
          {
            limit: 10000,
            name:
              path.posix.join('assets', 'img/[name].[hash:7].[ext]')
          }
      }
      ,
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader:
          'url-loader',
        options:
          {
            limit: 10000,
            name:
              path.posix.join('assets', 'video/[name].[hash:7].[ext]')
          }
      }
      ,
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader:
          'url-loader',
        options:
          {
            limit: 10000,
            name:
              path.posix.join('assets', 'fonts/[name].[hash:7].[ext]')
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

  plugins: [
    new CleanWebpackPlugin(
      [path.resolve(__dirname, 'dist')],
      {
        root: path.resolve(__dirname)
      }
    ),

    new CaseSensitivePathsPlugin(),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('src/index.html'),
    }),

    /* config.plugin('preload') */
    new PreloadWebpackPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),

    /* config.plugin('prefetch') */
    new PreloadWebpackPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram:
      'empty',
    fs:
      'empty',
    net:
      'empty',
    tls:
      'empty',
    child_process:
      'empty'
  }
};
