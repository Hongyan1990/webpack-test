<template>
	<div>
		hello SSR
		<div>
			<router-link to="/a">GO to A</router-link>
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
	/* h2 {
	 	color: red;
	 	font-size: 15px;
	 	width: 100px;
	 	height:100px;
	 	background-image: url('./static/webpack.jpg');
	 	background-size: cover;
	 }*/
</style>
