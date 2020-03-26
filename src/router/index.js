import Vue from 'vue'
import Router from 'vue-router'

import PageA from '../views/PageA.vue'
import PageB from '../views/PageB.vue'

Vue.use(Router)

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			{
				path: '/a',
				component: PageA
			},
			{
				path: '/b',
				component: PageB
			}
		]
	})
}