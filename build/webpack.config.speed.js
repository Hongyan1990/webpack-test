const merge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const config = require('./webpack.config.prod.js')

module.exports = merge(config, {
	plugins: [
		new SpeedMeasurePlugin()
	]
})