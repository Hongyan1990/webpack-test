const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	target: 'node',
	entry: path.resolve(__dirname, '../src/entry-server.js'),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			}
		]
	},
	output: {
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin()
	] 
}