const path = require('path')
const merge = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const baseConfig = require('./webpack.config.js')

const config = merge(baseConfig, {
	mode: 'development',
	devServer: {
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new HotModuleReplacementPlugin(),
	],
	devtool: 'source-map'
})

module.exports = config
