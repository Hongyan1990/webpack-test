const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const config = require('./webpack.config.base.js')

module.exports = merge(config, {
	entry: {app: path.resolve(__dirname, '../src/entry-client.js')},
	optimization: {
      runtimeChunk: 'single',
	    splitChunks: {
	       cacheGroups: {
	        vendor: {
	           test: /[\\/]node_modules[\\/]/,
	           name: 'vendors',
	           chunks: 'all',
	         },
	       },
	     },
    },
	plugins: [
		new VueSSRClientPlugin(),
		new webpack.DefinePlugin({ "process.env.VUE_ENV": JSON.stringify("client") })
	]
})