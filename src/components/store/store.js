import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import INFO from './info/info-store.js';
import MOVIE from './movie/movie-store.js';

const store = new Vuex.Store({
	modules: {
		INFO,
		MOVIE
	},
	mutations: {
		
	},
	action: {
		
	}
});

export default store;