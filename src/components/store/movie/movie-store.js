// 引入 store 模块文件
import ADD_MOVIE_store from './addmovie/addmovie-store.js';

import actions from './actions.js';
import mutations from './mutations.js';

const state = {
	ADD_MOVIE_store,
	MOVIE_TYPE_LIST: [],
	movie: {}
};
export default {
	state,
	actions,
	mutations
};