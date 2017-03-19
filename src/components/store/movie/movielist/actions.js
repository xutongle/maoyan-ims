import 'babel-polyfill';
import axios from 'axios';

import {
	CURPAGE,
	EACHPAGES,
	GET_MOVIE_BY_PAGE
} from './mutations_type.js';
export default {
	async [CURPAGE](context, curPage) {
		context.commit('CURPAGE', curPage);
		context.dispatch('GET_MOVIE_BY_PAGE');
	},
	async [EACHPAGES](context, eachPage) {
		context.commit('EACHPAGES', eachPage);
		context.dispatch('GET_MOVIE_BY_PAGE');
	},
	async [GET_MOVIE_BY_PAGE](context) {
		let r = await axios.post('http://localhost:3010/movies/getMoviesByPage', {
			page: context.state.page.curPage,
			rows: context.state.page.eachPage
		});
		context.commit("GET_MOVIE_BY_PAGE", {
			movielist: r.data.rows,
			total: r.data.total
		});
	}
}
