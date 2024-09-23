const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

const clientPort = process.env.PORT || 3000;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: clientPort,
    historyApiFallback: true,
    allowedHosts: 'all',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public', 'index.html'),
      filename: './index.html'
    })
  ]
})