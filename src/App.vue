<template>
	<div>
		<h2>{{msg}}</h2>
		<img :src="imgUrl">
	</div>
	
</template>

<script>
	import imgUrl from './static/jizita.png'
	export default {
		name: 'app',
		data () {
			return {
				msg: 'hello webpack',
				imgUrl
			}
		}
	}
</script>

<style>
	h2 {
		color: yellow;
		font-size: 15px;
		width: 100px;
		height:100px;
		background-image: url('./static/webpack.jpg');
		background-size: cover;
	}
</style>