const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].bundle.js',
    // path: 'dist', 
    clean: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.(le|c)ss$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CopyPlugin({
      patterns: [{
        from: './public',
        to: './',
        filter: async (resourcePath) => { // 这里排除index.html 不然会和HtmlWebpackPlugin插件冲突
          if (resourcePath.endsWith('index.html')) {
            return false;
          }
          return true;
        },
      }]
    })
  ]
}