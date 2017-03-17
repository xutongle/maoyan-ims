import {
	GET_MOVIE_BY_ID,
	GET_MOVIE_DETAIL
} from './mutations_type.js'
export default {
    [GET_MOVIE_BY_ID](state, {
		movieID
	}) {
		console.log(movieID)
	},
	    [GET_MOVIE_DETAIL](state, {
		movieID
	}) {
		console.log(movieID)
	}
}