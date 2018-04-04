var webpack = require('webpack');
var config = require('./webpack.config.base.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

for (var i in config.entry) {
  if (i == 'common') continue;
  config.plugins.push(new HtmlWebpackPlugin({
    template: './src/' + i + '.html',
    filename: i + '.html',
    minify: {
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: false // 删除空白符与换行符
    },
    chunks: ['common', i]
    // publicPath: config.output.publicPath
  }));
}

// 压缩js
// config.plugins.push(
//   new webpack.optimize.UglifyJsPlugin({
//     compress: { warnings: false }
//   })
// );

module.exports = config;