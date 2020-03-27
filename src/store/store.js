import Vue from 'vue'
import Vuex from 'vuex'

const db = require('../../server/db.js') 

Vue.use(Vuex)

export function createStore() {
	return new Vuex.Store({
		state: {
			items: {}
		},
		actions: {
			fetchItem({commit}, id) {
				return db.getTodoById(id).then(item => {
						commit('setItem', {id, item})
					})
			}
		},
		mutations: {
			setItem(state, {id, item}) {
				Vue.set(state.items, id, item)
			}
		}
	})
}