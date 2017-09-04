var webpack = require('webpack');
var path = require('path');

var EXCLUDE = /node_modules|bower_components/;

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true,
})

module.exports = function (env, argv) {
  return {
    context: path.resolve('src'),
    entry: './main.js',
    output: {
      path: path.resolve(__dirname, './assets'),
      filename: '[name].js'
    },
    module: {
      rules: [
        { test: /\.scss$/,
          exclude: EXCLUDE,
          loader: extractPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader',
          })
        },
        { test: /\.vue$/,
          exclude: EXCLUDE,
          use: {
            loader: 'vue-loader',
            options: {
              loaders: {
                sass: extractPlugin.extract({
                  use: ['css-loader', 'sass-loader'],
                  fallback: 'vue-style-loader',
                })
              }
            }
          }
        },
        { test: /\.js$/,
          exclude: EXCLUDE,
          use: {
            loader: 'babel-loader', options: { presets: ['env'] }
          }
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      extractPlugin,
    ],
  }
}
