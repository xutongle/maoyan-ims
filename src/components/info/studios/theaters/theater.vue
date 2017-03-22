<template>
	<div class='left-container'>
		<h3 style='text-align: center'>影厅管理</h3>
		<router-view></router-view>
	</div>
</template>


<script>
	import 'babel-polyfill';
	import Vuex from 'vuex';
	// import {
	// 	GET_MOVIE_TYPE_LIST
	// } from '../../store/movie/movietypelist/mutations_type.js';
	export default {
		name: 'theater',
		// computed: Vuex.mapState(['MOVIE_store']),
		// methods: {
		// 	...Vuex.mapActions([GET_MOVIE_TYPE_LIST])
		// },
		// created() {
		// 	this.GET_MOVIE_TYPE_LIST();
		// }
	}

</script>
