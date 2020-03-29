<template>
	<div class="my-ssr">
		hello SSR
		<div>
			<router-link to="/a/1">GO to A-1</router-link>
			<router-link to="/a/2">GO to A-2</router-link>
			<router-link to="/b">GO to B</router-link>
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
		color: skyblue;
	}
</style>
