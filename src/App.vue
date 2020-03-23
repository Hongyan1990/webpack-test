<template>
	<div>
		<h2>{{msg}}</h2>
		<img :src="imgUrl">
		<span class="icon icon-cz"></span>
		<span class="icon icon-sy"></span>
		<span class="icon icon-xhy"></span>
		<span class="icon icon-xn"></span>
		<span class="icon icon-medf"></span>
	</div>
	
</template>

<script>
	import imgUrl from './static/jizita.png'
	import './static/sprite/sprite.css'

	export default {
		name: 'app',
		data () {
			return {
				msg: 'hello webpack1234 !',
				imgUrl
			}
		}
	}
</script>

<style>
	h2 {
		color: pink;
		font-size: 15px;
		width: 100px;
		height:100px;
		background-image: url('./static/webpack.jpg');
		background-size: cover;
	}
</style>
