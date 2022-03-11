const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const resolve = (_path) => {
  return path.resolve(__dirname, _path);
}

module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		publicPath: '/',
		filename: '[name].[contenthash].bundle.js',
		clean: true,
	},
  devServer: {
    static: './dist',
    port: 9000,
    proxy: {
      '/uaa': {
        target: 'http://192.168.4.158:32560',
        pathRewrite: { '^/uaa': '' },
      }
    }
  },
  // devtool: 'source-map',
  resolve: {
    alias: {
      '@': resolve('../src'),
      '@views': resolve('../src/views'),
      '@assets': resolve('../src/assets')
    },
    extensions: ['.vue', '...'], // '...'表示默认扩展 ['.js', '.json', '.wasm']
  },
	optimization: {
		splitChunks: {
			chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20
        },
      },
		},
	},
	module: {
		rules: [
      {
        test: /\.js$/,
        include: /\/src/,
        use: ['babel-loader']
      },
			{
				// 处理.vue文件
				test: /\.vue$/,
				use: ['vue-loader'],
			},
			{
				// 处理样式文件
				test: /\.(le|c)ss$/i,
				use: ['vue-style-loader', 'css-loader', 'less-loader'],
			},
			{
				// 处理图片
				test: /\.(png|jpg|jpeg|svg|gif)$/i,
				type: 'asset',
				generator: {
					filename: 'images/[name][ext][query]',
				},
				parser: {
					dataUrlCondition: {
						maxSize: 1024, // 1kb 小于1kb的文件用`inline`模式，反之用`resource`模式
					},
				},
			},
			{
				// 处理字体
				test: /\.(ttf|otf|woff|eot|woff2)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext][query]',
				},
			},
		],
	},
	plugins: [ 
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'PRODUCTION': JSON.stringify(false)
    }),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			inject: 'body',
			template: './public/index.html',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: 'public',
					// to: './',
					filter: async (resourcePath) => {
						// 这里排除index.html 不然会和HtmlWebpackPlugin插件冲突
						if (resourcePath.endsWith('index.html')) {
							return false;
						}
						return true;
					},
				},
			],
		}),
	],
};
