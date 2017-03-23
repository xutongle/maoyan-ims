<template>
	<div class='left-container'>
		<h3>电影管理</h3>
		<router-view></router-view>
	</div>
</template>
<script>
	import 'babel-polyfill';
	import Vuex from 'vuex';
	import {
		GET_MOVIE_TYPE_LIST
	} from '../../store/movie/movietypelist/mutations_type.js';
	export default {
		name: 'movies',
		computed: Vuex.mapState(['MOVIE_store']),
		methods: {
			...Vuex.mapActions(['GET_MOVIE_TYPE_LIST'])
		},
		created() {
			this.GET_MOVIE_TYPE_LIST({
				page: 1,
				rows: 10
			});
		}
	}

</script>
