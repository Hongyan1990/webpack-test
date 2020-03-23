const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./webpack.config.prod.js')

module.exports = merge(config, {
	plugins: [
		new BundleAnalyzerPlugin({
	    analyzerMode: 'server',
	    analyzerHost: '127.0.0.1',
	    analyzerPort: 8888,
	    reportFilename: 'report.html',
	    defaultSizes: 'parsed',
	    openAnalyzer: true,
	    generateStatsFile: false,
	    statsFilename: 'stats.json',
	    logLevel: 'info'
	  })
	]
})