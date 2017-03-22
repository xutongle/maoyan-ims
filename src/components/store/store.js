import Vue from 'vue';
import Vuex from 'vuex';

// 鏃ュ織鎻掍欢
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

import INFO_store from './info/info-store.js';
import MOVIE_store from './movie/movie-store.js';
import MOVIE_LIST_store from './movie/movielist/movielist-store.js';
import MOVIE_TYPE_LIST_store from './movie/movietypelist/movietypelist-store.js';
<<<<<<< HEAD
import Movie_TypeList from './movie-type-list/movieTypeList.js'
=======
import ADD_SCHEDULE_store from './schedule/addschedule/addschedule-store.js';
import USER_LIST_store from './user/userlist/userlist-store.js';
>>>>>>> fb086a5726041d5be7fd66d1546d08d8a81930e3

const store = new Vuex.Store({
	state:{
		testData:"1"
	},
	modules: {
		INFO_store,
		MOVIE_store,
		MOVIE_LIST_store,
		MOVIE_TYPE_LIST_store,
<<<<<<< HEAD
		Movie_TypeList
=======
		USER_LIST_store,
        ADD_SCHEDULE_store,
>>>>>>> fb086a5726041d5be7fd66d1546d08d8a81930e3
	},
	plugins: [createLogger()]
});

export default store;