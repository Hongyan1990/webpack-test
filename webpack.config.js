const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

const spriteTemplate = require('./sprite.js')

module.exports = {
	mode: 'none',
	entry: ['webpack-hot-middleware/client','./src/main.js'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	resolve: {
		// webpack在引入无后缀的文件时，默认匹配的后缀名  源码中尽量带上后缀 减少构建时的搜索
		extensions: ['.vue', '.js'],
		// webpack搜索第三方模块的默认路径
		modules: [path.resolve(__dirname, 'node_modules')]
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg)$/,
				use: [{
					loader: 'url-loader',// 如果图片大小小于30kb 就使用url-loader 否则用file-loader
					options: {
						limit: 1024*30,
						fallback: 'file-loader'
					}
				}]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new HTMLPlugin({
			title: 'hello webpack',
			template: './src/index.html'
		}),
		new HotModuleReplacementPlugin(),
		// 雪碧图
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve(__dirname, 'src/static/icon'), // 雪碧图引入的路径
				glob: '*.png' // 图片类型
			},
			target: {
				image: path.resolve(__dirname, 'src/static/sprite/sprite.png'), // 雪碧图生成后导出的路径
				css: [
					[
						path.resolve(__dirname, 'src/static/sprite/sprite.css'), // css的导出路径
						{
							format: "function_based_tempalte" // css的生成模板
						}
					]
				]
			},
			customTemplates: {
				"function_based_tempalte": spriteTemplate
			},
			apiOptions: {
				cssImageRef: "./sprite.png" // 生成的css中 所引入的雪碧图路径
			},
			spritesmithOptions: {
				algorithm: 'top-down', // 雪碧图生成排列方式
				padding: 10
			}
		})
	],
	devtool: 'source-map'
}