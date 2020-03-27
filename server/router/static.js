const send = require('koa-send')
const Router = require('koa-router')

const router = new Router({prefix: '/dist'})

router.get('/*', async ctx => {
	send(ctx, ctx.path)
})

module.exports = router
