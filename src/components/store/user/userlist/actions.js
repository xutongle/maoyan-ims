import 'babel-polyfill';
import axios from 'axios';

import {
	CHANGE_CURPAGE,
	CHANGE_EACHPAGES,
	GET_USER_BY_PAGE,
	DELETE_USER_BY_ID
} from './mutations_type.js';
export default {
	async [CHANGE_CURPAGE](context, curPage) {
		context.commit('CHANGE_CURPAGE', curPage);
		context.dispatch('GET_USER_BY_PAGE');
	},
	async [CHANGE_EACHPAGES](context, eachPage) {
		context.commit('CHANGE_EACHPAGES', eachPage);
		context.dispatch('GET_USER_BY_PAGE');
	},
	async [GET_USER_BY_PAGE](context) {
		let r = await axios.post('http://localhost:3010/users/getUsers', {
			page: context.state.page.curPage,
			rows: context.state.page.eachPage
		});
		context.commit("GET_USER_BY_PAGE", {
			userlist: r.data.rows,
			total: r.data.total
		});
	},
	async [DELETE_USER_BY_ID](context,{
		_id
	}) {
		let r = await axios.post('http://localhost:3010/users/del', {
			_id
		});
		if(r.data){
			context.dispatch('GET_USER_BY_PAGE');
		}
	}
}
