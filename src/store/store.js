import Vue from 'vue'
import Vuex from 'vuex'

const db = require('../../server/db.js') 

Vue.use(Vuex)

export function createStore() {
	return new Vuex.Store({
		state: {
			items: {},
			itemList: []
		},
		actions: {
			fetchItem({commit}, id) {
				return db.getTodoById(id).then(item => {
						commit('setItem', {id, item})
					})
			},
			fetchItems({commit}) {
				return db.getTodos().then(res => {
					commit('setItems', res)
				})
			}
		},
		mutations: {
			setItem(state, {id, item}) {
				Vue.set(state.items, id, item)
			},
			setItems(state, res) {
				state.itemList = res
			}
		}
	})
}