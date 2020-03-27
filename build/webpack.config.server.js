const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const config = require('./webpack.config.base.js')

module.exports = merge(config, {
	target: 'node',
	entry: path.resolve(__dirname, '../src/entry-server.js'),
	
	output: {
		libraryTarget: 'commonjs2'
	},
	externals: nodeExternals({
		whitelist: /\.css$/
	}),
	plugins: [
		new VueSSRServerPlugin()
	] 
})