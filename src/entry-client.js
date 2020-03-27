import Vue from 'vue'
import {createApp} from './app.js'



const {app, router, store} = createApp()

if(window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
	beforeMount () {
		console.log('-----beforeMount-----')
		const { asyncData } = this.$options
		if(asyncData) {
			this.dataPromise = asyncData(store)
		}
	},
	beforeRouteUpdate (to, from, next) {
		console.log('-----beforeRouteUpdate-----')
		const { asyncData } = this.$options
		if(asyncData) {
			asyncData(this.$store).then(next).catch(next)
		} else {
			next()
		}
	}
})

router.onReady(() => {

	// router.beforeResolve((to, from, next) => {
	// 	const matched = router.getMatchedComponents(to)
	// 	const preMatched = router.getMatchedComponents(from)
	// 	let diffed = false
	// 	const actived = matched.filter((c, i) => {
	// 		return diffed || (diffed = (preMatched[i] !== c))
	// 	})

	// 	console.log('matched', matched)
	// 	console.log('preMatched', preMatched)
	// 	console.log('actived', actived)

	// 	if(!actived.length) {
	// 		return next()
	// 	}

	// 	Promise.all(actived.map(c => {
	// 		if(c.asyncData) {
	// 			return c.asyncData(store)
	// 		}
	// 	})).then(() => {
	// 		next()
	// 	}).catch(next)
	// })

	app.$mount('#app')
})

