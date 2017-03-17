import 'babel-polyfill';
import axios from 'axios';
import {
	GET_MOVIE_BY_ID,
	GET_MOVIE_DETAIL,
	GET_MOVIE_BY_PAGE
} from './mutations_type.js'
export default {
	async [GET_MOVIE_BY_ID](context, {
		movieID,
		callback
	}) {
		callback = callback || function(){};
		let r = await axios.post('http://localhost:3010/movies/getMovieByMovieID', {
			_id: movieID
		});
		callback(r.data);

	},
	[GET_MOVIE_DETAIL](context, {
		movieID
	}) {
		console.log(movieID)
	},
	[GET_MOVIE_BY_PAGE](context, {
		page,
		eachPage
	}) {
		console.log(page, eachPage)
	}
}