import { createApp } from './app.js'

export default context => {
	return new Promise((resolve, reject) => {
		const {app, router, store} = createApp()
		router.push(context.url)
		// console.log(context.url)
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			// console.log(matchedComponents)
			if(!matchedComponents.length) {
				return reject({code: 404})
			}
			Promise.all(matchedComponents.map(Component => {
				if(Component.asyncData) {
					return Component.asyncData(store)
				}
			})).then(() => {
				context.state = store.state
				resolve(app)
			}).catch(err => {
				// console.log(err)
				reject({code: 404})
			})			
		}, () => {
			reject({code: 500})
		})
	})
	
}


