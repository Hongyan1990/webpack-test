const path = require('path')
const merge = require('webpack-merge')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const baseConfig = require('./webpack.config.js')

const config = merge(baseConfig, {
	entry: {
		app: path.resolve(__dirname, '../src/main.js')
	},
	plugins: [
		new ParallelUglifyPlugin({
			uglifyJS: {
				output: {
					comments: false
				},
				compress: {
					warnings: false
				}
			}
		})
	]
})

module.exports = config
