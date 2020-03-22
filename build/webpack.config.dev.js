const path = require('path')
const merge = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const baseConfig = require('./webpack.config.js')

const config = merge(baseConfig, {
	mode: 'development',
	entry: ['webpack-hot-middleware/client',path.resolve(__dirname,'../src/main.js')],
	plugins: [
		new HotModuleReplacementPlugin(),
	],
	devtool: 'source-map'
})

module.exports = config
