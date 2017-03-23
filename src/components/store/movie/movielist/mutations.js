import {
	CHANGE_CURPAGE,
	CHANGE_EACHPAGES,
	GET_MOVIE_BY_PAGE
} from './mutations_type.js'
export default {
    [CHANGE_CURPAGE](state, curPage) {
		state.page.curPage = curPage;
	},
	[CHANGE_EACHPAGES](state, eachPage) {
		state.page.eachPage = eachPage;
	},
	[GET_MOVIE_BY_PAGE](state, {
		movielist,
		total
	}) {
		state.movielist = movielist;
		state.total = total;
	}
}