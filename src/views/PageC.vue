<template>
	<div>
		<h5>pageC</h5>
		<item v-for="item in items" :item="item" :key="item.id" />
	</div>
</template>

<script>
  import Item from './Item.vue'
	export default {
		name: 'pageA',
		components: {
			Item
		},
		title () {
			return 'PageC'
		},
		asyncData (store) {
			return store.dispatch('fetchItems')
		},
		computed: {
			items () {
				return this.$store.state.itemList || []
			}
		}
	}
</script>

<style>
	
</style>