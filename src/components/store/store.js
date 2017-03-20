import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import INFO from './info/info-store.js';
import MOVIE from './movie/movie-store.js';
// import movieTypeList from './movieTypeList/movieTypeList.js';

const store = new Vuex.Store({
	modules: {
		INFO,
		MOVIE/*,
		movieTypeList*/
	},
	mutations: {
		
	},
	action: {
		
	}
});

export default store;