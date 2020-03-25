const Vue = require('vue')
const Koa = require('koa')
const path = require('path')
const renderer = require('vue-server-renderer').createRenderer({
	template: require('fs').readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')
})

const creatApp = require('./app.js')

const context = {
	title: 'hello SSR',	
	meta: `<meta charset="utf-8" />`
}
const server = new Koa()

server.use(async (ctx, next) => {
	const param = {url: ctx.url}
	const app = creatApp(param)
	renderer.renderToString(app, context).then(html => {
		ctx.body = html
	}).catch(err => {
		ctx.status = 500
		ctx.body = '服务器错误'
	})
})

server.listen(8080, () => {
	console.log('server start listen port 8080')
})


