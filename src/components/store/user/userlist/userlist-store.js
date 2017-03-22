import actions from './actions.js';
import mutations from './mutations.js';

const state = {
	total: 0,
	page: {
		eachPage: 15,
		eachPages: [5, 10, 15, 20],
		curPage: 1,
	},
	userlist: []
};
export default {
	state,
	actions,
	mutations
};