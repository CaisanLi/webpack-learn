const path = require('path')
// 将已存在的单个文件或整个目录复制到构建目录中
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: './src/index.js', // 入口文件配置
  output: { // 输出文件配置
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production', // 设置模式
  module: {
    rules: [{ // 对 css 文件进行转换
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new CopyWebpackPlugin({
      // 这里将 public 目录复制到输出目录
      patterns: ['public']
    })
  ]
}