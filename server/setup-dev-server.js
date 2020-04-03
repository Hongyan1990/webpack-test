const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const chokidar = require('chokidar')
const clientConfig = require('../build/webpack.config.client.js')
const serverConfig = require('../build/webpack.config.server.js')

const readFile = (fs, file) => {
	try {
		return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
	}catch(err) {}
}

module.exports = function setupDevServer(app, templatePath, cd) {
	let bundle
	let template
	let clientManifest
	console.log('------------------1----------------')
	let ready 
	const readyPromise = new Promise(r => {ready = r})
	const update = (bundle, clientManifest) => {
		console.log('---------------2------------------------')
		if(bundle && clientManifest) {
			console.log('-----------3-----------')
			ready()
			cd(bundle, {template, clientManifest})
		}
	}

	// tmplate 监控
	template = fs.readFileSync(templatePath, 'utf-8')
	chokidar.watch(templatePath).on('change', () => {
		template = fs.readFileSync(templatePath, 'utf-8')
		console.log('tempalte update')
		update()
	})

	// client 配置webpack相应
	clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
	clientConfig.output.filename = '[name].js'
	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)

	const clientCompiler = webpack(clientConfig)
	const devMiddleware = require('koa-webpack-dev-middleware')(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		noInfo: true
	})
	app.use(devMiddleware)
	clientCompiler.plugin('done', stats => {
		stats = stats.toJson()
		stats.errors.forEach(err => console.log(err))
		stats.warnings.forEach(err => console.log(err))
		if (stats.errors.length) return
		clientManifest = readFile(
			devMiddleware.fileSystem,
			'vue-ssr-client-manifest.json'
		)
		update()
	})
	app.use(require('koa-webpack-hot-middleware')(clientCompiler, {heartbeat: 5000}))

	// 配置server 端 响应式
	const serverCompiler = webpack(serverConfig)
	const mfs = new MFS()
	serverCompiler.outputFileSystem = mfs
	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err
		stats = stats.toJson()
		if(stats.errors.length) return
		bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
		update()
	})
	return readyPromise
}

