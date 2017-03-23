import actions from './actions.js';
import mutations from './mutations.js';

const state = {
	currentPage4: 0, //当前页 number 1
	pageSizes: [5, 10, 15, 20, 30, 40], //每页显示个数选择器选项设置
	pageSize: 0, //每页显示条目个数
	total: 0,
	MOVIE_TYPE_LIST: []
};

export default {
	state,
	actions,
	mutations
};
