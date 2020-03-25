const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, '../src/entry-server.js'),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader?cacheDirectory=true']
			},
			{
				test: /\.vue$/,
				use: ['vue-loader']
			}
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new CleanWebpackPlugin()
	] 
}