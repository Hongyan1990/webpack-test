<template>
	<div>PageA-1: {{item.content}}</div>
</template>

<script>
	export default {
		name: 'pageA1',
		asyncData (store) {
			return store.dispatch('fetchItem', '5e7cc3b6dc613c8f1863c8d2')
		},
		computed: {
			item () {
				return this.$store.state.items['5e7cc3b6dc613c8f1863c8d2'] || {}
			}
		}
	}
</script>

<style>
	
</style>