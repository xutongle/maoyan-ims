import {
	CHANGE_CURPAGE,
	CHANGE_EACHPAGES,
	GET_USER_BY_PAGE
} from './mutations_type.js'
export default {
    [CHANGE_CURPAGE](state, curPage) {
		state.page.curPage = curPage;
	},
	[CHANGE_EACHPAGES](state, eachPage) {
		state.page.eachPage = eachPage;
	},
	[GET_USER_BY_PAGE](state, {
		userlist,
		total
	}) {
		state.userlist = userlist;
		state.total = total;
	}
}