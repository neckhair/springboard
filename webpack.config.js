var webpack = require('webpack');
var path = require('path');

const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
    ]
  },
  plugins: [
    new Uglify()
  ]
}
