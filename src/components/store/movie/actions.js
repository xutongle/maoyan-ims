import 'babel-polyfill';
import axios from 'axios';
import {
	GET_MOVIE_BY_ID,
	GET_MOVIE_DETAIL,
	GET_MOVIE_BY_PAGE,
	GET_MOVIE_TYPE_LIST
} from './mutations_type.js'
export default {
	async [GET_MOVIE_BY_ID](context, {
		movieID
	}) {
		let r = await axios.post('http://localhost:3010/movies/getMovieByMovieID', {
			_id: movieID
		});
		context.commit("GET_MOVIE_BY_ID", {movie: r.data});
	},
//	async [GET_MOVIE_DETAIL](context, {
//		movieID
//	}) {
//		console.log(movieID)
//	},
//	async [GET_MOVIE_BY_PAGE](context, {
//		page,
//		eachPage
//	}) {
//		console.log(page, eachPage)
//	},
	async [GET_MOVIE_TYPE_LIST](context) {
		var r = await axios.post('http://localhost:3010/movieType/getMovieType');
		context.commit('GET_MOVIE_TYPE_LIST', { MOVIE_TYPE_LIST: r.data.rows})
	}
}
