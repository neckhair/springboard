var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env, argv) {
  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './assets'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
        { test: /\.vue$/,
          use: {
            loader: 'vue-loader',
            options: {
              loaders: {
                sass: ExtractTextPlugin.extract('css-loader!sass-loader')
              }
            }
          }
        },
        { test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', options: { presets: ['env'] }
          }
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.css', {
        allChunks: true
      })
    ],
  }
}
