var webpack = require('webpack');
var config = require('./webpack.config.base.js');
// var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');

for (var i in config.entry) {
  if (i == 'common') continue;
  config.plugins.push(new HtmlWebpackPlugin({
    template: './src/' + i + '.html',
    filename: i + '.html',
    chunks: ['common', i]
    // publicPath: config.output.publicPath
  }));
}

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  port: 3002,
  hot: true,
  inline: true
  // proxy: {
  //   '/api/*': {
  //     target: 'http://10.253.9.30:7080',
  //     secure: false
  //   }
  // }
}

module.exports = config;