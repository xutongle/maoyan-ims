import actions from './actions.js';
import mutations from './mutations.js';

const state = {
	user: {
		username: '',
		password: '',
		flag: '0',
		status: 0
	},
	flags: [{
		value: '0',
		label: '激活'
	},{
		value: '1',
		label: '注销'
	}],
	status: [{
		value: 0,
		label: '普通用户'
	},{
		value: 1,
		label: '管理员'
	}]
};
export default {
	state,
	actions,
	mutations
};