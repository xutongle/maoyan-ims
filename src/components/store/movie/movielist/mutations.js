import {
	CURPAGE,
	EACHPAGES,
	GET_MOVIE_BY_PAGE
} from './mutations_type.js'
export default {
    [CURPAGE](state, curPage) {
		state.page.curPage = curPage;
	},
	[EACHPAGES](state, eachPage) {
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