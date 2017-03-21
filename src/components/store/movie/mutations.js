import {
	GET_MOVIE_BY_ID,
	GET_MOVIE_DETAIL,
	GET_MOVIE_TYPE_LIST
} from './mutations_type.js'
export default {
    [GET_MOVIE_BY_ID](state, { movie }) {
		state.movie = movie;
	}
}