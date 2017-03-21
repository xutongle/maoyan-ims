import {
	GET_MOVIE_TYPE_LIST
} from './mutations_type.js'
export default {
	[GET_MOVIE_TYPE_LIST](state, { MOVIE_TYPE_LIST }) {
		state.MOVIE_TYPE_LIST = MOVIE_TYPE_LIST;
	}
}