<template>
	<div>PageA-2: {{item.content}}</div>
</template>

<script>
	export default {
		name: 'pageA',
		asyncData (store) {
			return store.dispatch('fetchItem', '5e7d6f2961b440387a4822c2')
		},
		computed: {
			item () {
				return this.$store.state.items['5e7d6f2961b440387a4822c2'] || {}
			}
		}
	}
</script>

<style>
	
</style>