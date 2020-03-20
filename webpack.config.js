const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

module.exports = {
	mode: 'none',
	entry: ['webpack-hot-middleware/client','./src/main.js'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	resolve: {
		extensions: ['.vue', '.js']
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
					loader: 'url-loader',
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
		new HotModuleReplacementPlugin()
	],
	devtool: 'source-map'
}