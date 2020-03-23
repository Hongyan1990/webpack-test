const path = require('path')
const merge = require('webpack-merge')
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.js')

const config = merge(baseConfig, {
	mode: 'production',
	module: {
		rules: [
			{
			    test: /\.css$/,
				use: [MiniCssExtractPlugin.loader,'css-loader']
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2
				}
			}
		}
	}
})

module.exports = config
