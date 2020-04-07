const Vue = require('vue')
// 创建vue实例
const app = new Vue({
	template: '<div>hello world</div>'
})
// 创建renderer
const renderer = require('vue-server-renderer').createRenderer()
// 将vue实例渲染为html
renderer.renderToString(app, (err, html) => {
	console.log(html)
})