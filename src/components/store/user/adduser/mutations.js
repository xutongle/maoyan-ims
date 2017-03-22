import {
	FLAGS_ONCHANGE,
	STATUS_ONCHANGE
} from './mutations_type.js';
export default {
    [FLAGS_ONCHANGE](state, flag) {
		state.user.flag = flag;
	},
	[STATUS_ONCHANGE](state, status) {
		state.user.status = status;
	}
}