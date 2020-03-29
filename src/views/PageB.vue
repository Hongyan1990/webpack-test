<template>
	<div>PageB: {{item.content}}</div>
</template>

<script>
  import titleMixin from '../title.mixin.js' 
	export default {
		name: 'pageB',
		mixins: [titleMixin],
		title () {
			return this.item.content
		},
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