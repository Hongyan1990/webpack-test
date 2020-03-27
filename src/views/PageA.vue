<template>
	<div>
		PageA: {{item.content}}<br/>
		routeId: {{$route.params.id}}
		<!-- <div>
			<router-link :to="{path: 'a/c', params: { id: '1' }}">GO to A-1</router-link>
			<router-link :to="{path: 'a/c', params: { id: '2' }}">GO to B-2</router-link>
		</div>
		<router-view></router-view> -->

	</div>
</template>

<script>
	export default {
		name: 'pageA',
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