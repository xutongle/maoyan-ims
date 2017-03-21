import 'babel-polyfill';
import axios from 'axios';
import {
	GET_MOVIE_TYPE_LIST
} from './mutations_type.js'
export default {
	async [GET_MOVIE_TYPE_LIST](context) {
		var r = await axios.post('http://localhost:3010/movieType/getMovieType');
		context.commit('GET_MOVIE_TYPE_LIST', { MOVIE_TYPE_LIST: r.data.rows})
	}
}
