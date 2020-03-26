const path = require('path')
const Koa = require('koa')
const Vue = require('vue')
const createApp = require('../dist/main.js').default
const renderer = require('vue-server-renderer').createRenderer({
	template: require('fs').readFileSync(path.resolve(__dirname, '../src/index.template.html'), 'utf-8')
})
const db = require('./db.js')
const server = new Koa()

server.use(async (ctx, next) => {
	const context = {url: ctx.url}
	// console.log(app)
	// const app = new Vue({
	// 	template: '<div>hello</div>'
	// })
	const list = await db.getTodos()
	console.log(list)
	try {
		const app = await createApp(context)
		const html = await renderer.renderToString(app)
		// console.log(html)
		ctx.body = html
	} catch (e) {
		ctx.body = JSON.stringify(list)
		console.log('e--' + e.code)
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