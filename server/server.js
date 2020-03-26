const path = require('path')
const Koa = require('koa')
const Vue = require('vue')
const createApp = require('../dist/main.js').default
const renderer = require('vue-server-renderer').createRenderer({
	template: require('fs').readFileSync(path.resolve(__dirname, '../src/index.template.html'), 'utf-8')
})
const server = new Koa()

server.use(async (ctx, next) => {
	const context = {url: ctx.url}
	// console.log(app)
	// const app = new Vue({
	// 	template: '<div>hello</div>'
	// })
	createApp(context).then(app => {
		// console.log(app)
		renderer.renderToString(app, (err, html) => {
			console.log(html)
			ctx.body = html
		})
		// .then(html => {
		// 	console.log(html)
			
		// 	// await next()
		// }).catch(err => {
		// 	console.log(err)
		// 	ctx.body = err
		// })
	}).catch(err => {
		console.log(err)
	}) 
	
})

server.listen(3333, () => {
	console.log('server listening port 3333')
})