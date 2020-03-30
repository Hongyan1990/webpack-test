const path = require('path')
const Koa = require('koa')
const Vue = require('vue')
const send = require('koa-send')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')
// const createApp = require('../dist/main.js').default
const template = require('fs').readFileSync(path.resolve(__dirname, '../src/index.template.html'), 'utf-8')

const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')
// const renderer = require('vue-server-renderer').createRenderer(serverBundle, {
// 	runInNewContext: false, 
// 	template,
// 	clientManifest
// })

// const microCache = new LRU({
// 	max: 100,
// 	maxAge: 1000 * 60
// })

// const isCacheable = (req) => {
// 	return req.url === '/c' ? true : false
// }

const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false, 
	template,
	clientManifest
})

// const db = require('./db.js')
const server = new Koa()
const PATHREG = /^\/dist\//
server.use(async (ctx, next) => {
	const context = {url: ctx.url, title: 'hello ssr'}
	const cacheAble = isCacheable(ctx)
	if(ctx.url === '/favicon.ico')return;
	if(PATHREG.test(ctx.url)) {
		await send(ctx, ctx.path)
		return
	}
	// if(cacheAble) {
	// 	const hit = microCache.get(ctx.url)
	// 	if(hit) {
	// 		console.log('--------hit--------')
	// 		ctx.body = hit
	// 		return
	// 	}
		
	// }
	// renderer.renderToString(context, (err, html) => {
	// 	if(err) {
	// 		console.log(err)
	// 		return
	// 	}
	// 	console.log(html)
	// 	ctx.body = html
	// })
	try {
		// const app = await createApp(context)
		const html = await renderer.renderToString(context)

		ctx.body = html
		// if(cacheAble) {
		// 	microCache.set(ctx.url, html)
		// }

		// renderer.renderToString(context, (err, html) => {
		// 	if(err) {
		// 		console.log(err)
		// 		return
		// 	}
		// 	ctx.body = html
		// })
	} catch (e) {
		// console.log('------start4------')
		// ctx.body = JSON.stringify(e)
		console.log(e.code)
	}
	
	// createApp(context).then(app => {
	// 	// console.log(app)
	// 	renderer.renderToString(app, (err, html) => {
	// 		console.log(html)
	// 		if(err) {
	// 			if(err.code === 404) {
	// 				ctx.status = 404
	// 				ctx.body = '找不到页面了'
	// 			} else {
	// 				ctx.status = 500
	// 				cx.body = '500的错误'
	// 			}
	// 		} else {
	// 			ctx.body = html
	// 		}
			
	// 	})
		// .then(html => {
		// 	console.log(html)
			
		// 	// await next()
		// }).catch(err => {
		// 	console.log(err)
		// 	ctx.body = err
		// })
	// }).catch(err => {
	// 	console.log(err)
	// }) 
	
})

server.listen(3333, () => {
	console.log('server listening port 3333')
})