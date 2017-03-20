import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// <<<<<<< HEAD
// import INFO from './info/info-store.js';
// import MOVIE from './movie/movie-store.js';
// import movieTypeList from './movieTypeList/movieTypeList.js';

// const store = new Vuex.Store({
// 	modules: {
// 		INFO,
// 		MOVIE/*,
// 		movieTypeList*/
// 	},
// 	mutations: {
		
// =======
import INFO_store from './info/info-store.js';
import MOVIE_store from './movie/movie-store.js';
import MOVIE_LIST_store from './movie/movielist/movielist-store.js';

const store = new Vuex.Store({
	modules: {
		INFO_store,
		MOVIE_store,
		MOVIE_LIST_store,
// >>>>>>> 0dbfe9678cdcb09ff449ee978b26347a870f2015
	},
	plugins: [createLogger()]
});

export default store;