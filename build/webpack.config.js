const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith');
const HappyPack = require('happypack')
// const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const spriteTemplate = require('../sprite.js')

module.exports = {
	entry: path.resolve(__dirname,'../src/main.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist')
	},
	resolve: {
		// webpack在引入无后缀的文件时，默认匹配的后缀名  源码中尽量带上后缀 减少构建时的搜索
		extensions: ['.vue', '.js'],
		// webpack搜索第三方模块的默认路径
		modules: [path.resolve(__dirname, '../node_modules')],
		mainFields: ['jsnext:main', 'browser', 'main']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'happypack/loader?id=happy-babel-js',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
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
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['**/*', '!vue.*']
		}),
		
		new HTMLPlugin({
			title: 'hello webpack',
			template:  path.join(__dirname, 'template.html')
		}),
		new HappyPack({
			id: 'happy-babel-js',
			loaders: ['babel-loader?cacheDirectory=true']
		}),
		// new HappyPack({
		// 	id: 'happy-vue-loader',
		// 	loaders: ['vue-loader']
		// }),
		new VueLoaderPlugin(),
		// new HotModuleReplacementPlugin(),
		// 雪碧图
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve(__dirname, '../src/static/icon'), // 雪碧图引入的路径
				glob: '*.png' // 图片类型
			},
			target: {
				image: path.resolve(__dirname, '../src/static/sprite/sprite.png'), // 雪碧图生成后导出的路径
				css: [
					[
						path.resolve(__dirname, '../src/static/sprite/sprite.css'), // css的导出路径
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
		}),
		// 动态连接库 避免模块的多次打包 缩短编译时间
		new DllReferencePlugin({
			manifest: require('../dist/vue.manifest.json')
		})
	],
	
}