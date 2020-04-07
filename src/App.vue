<template>
	<div class="my-ssr">
		hello SSR!!QQQQ
		<div>
			<router-link to="/a/1">GO to A-1</router-link>
			<router-link to="/a/2">GO to A-2</router-link>
			<router-link to="/b">GO to B</router-link>
			<router-link to="/c">GO to C</router-link>
			<div>hello world!!!!</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	// import imgUrl from './static/jizita.png'
	// import './static/sprite/sprite.css'

	export default {
		name: 'app',
		data () {
			return {
				
			}
		}
	}
</script>

<style>
	.my-ssr {
		font-size: 18px;
		color: yellow;
	}
</style>
