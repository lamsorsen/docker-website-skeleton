const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'normal',
  optimization: {
    minimize: true
  },
  plugins: [new CompressionPlugin()]
})
