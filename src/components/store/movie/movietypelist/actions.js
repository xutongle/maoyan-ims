import 'babel-polyfill';
import axios from 'axios';
import {
	GET_MOVIE_TYPE_LIST,
	DELETE_MOVIE_TYPE_ROW,
	CHANGE_MOVIE_TYPE,

} from './mutations_type.js'
export default {
	async [GET_MOVIE_TYPE_LIST](context,{page,rows}) {
		var result = await axios.post('http://localhost:3010/movieType/getMovieType',{
			page: page,
			rows: rows
		})
		context.state.total = result.data.total
		context.state.currentPage4 = result.data.page
		context.state.pageSize = result.data.rows.length
		context.state.MOVIE_TYPE_LIST = [...result.data.rows.map((item) => {
			return {
				currType: item.type,
				typeId: item._id
			}
		})]
		context.commit('GET_MOVIE_TYPE_LIST', { MOVIE_TYPE_LIST: context.state.MOVIE_TYPE_LIST})
	},
	async [DELETE_MOVIE_TYPE_ROW](context,index) {
		var newArr = [];
		var currnId = ""
		for (var i = 0; i < context.state.MOVIE_TYPE_LIST.length; i++) {
			newArr.push(context.state.MOVIE_TYPE_LIST[i].typeId)
		}
		currnId = newArr.slice(index, index + 1)
		var  delteResult = await axios.post('http://localhost:3010/movieType/delete', {
					_id: currnId
				})
		if(delteResult.data){
			context.dispatch('GET_MOVIE_TYPE_LIST',{
				page: context.state.currentPage4,
				rows: context.state.MOVIE_TYPE_LIST.length
			})/*通过context.dispatch()直接触发了GET_MOVIE_TYPE_LIST(),
				并没有提交到mutations里,并且提交了荷载*/
		}
	},

}







 


