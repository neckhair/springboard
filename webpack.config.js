var webpack = require('webpack');
var path = require('path');

module.exports = function (env, argv) {
  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './assets'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.vue$/, use: 'vue-loader' },
      ],
      loaders: [
        { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015'] } },
      ]
    },
    plugins: [

    ],
  }
}
