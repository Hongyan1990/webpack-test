const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
	entry: {
		vue: ['vue']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dist'),
		library: '_dll_[name]'
	},
	plugins: [
		new DllPlugin({
			name: '_dll_[name]',
			path: path.join(__dirname, '../dist', '[name].manifest.json')
		})
	]
}