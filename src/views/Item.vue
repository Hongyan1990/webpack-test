<template>
	<div>
		<span>{{item.content}}</span>
		<span>{{item.createdAt}}</span>
		<span>{{item.id}}</span>
	</div>
</template>

<script>
	export default {
		name: 'item',
		props: ['item'],
		serverCacheKey: props => props.item.id
	}
</script>

<style>
	
</style>