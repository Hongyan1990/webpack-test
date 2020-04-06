const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const config = require('./webpack.config.base.js')

module.exports = merge(config, {
	target: 'node',
	entry: path.resolve(__dirname, '../src/entry-server.js'),
	
	output: {
		libraryTarget: 'commonjs2',
		filename: 'server-bundle.js'
	},
	externals: nodeExternals({
		whitelist: /\.css$/
	}),
	plugins: [
		new VueSSRServerPlugin(),
		new webpack.DefinePlugin({ "process.env.VUE_ENV": JSON.stringify("server") })
	] 
})