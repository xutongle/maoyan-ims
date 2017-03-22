import axios from '../../axios.js'
import router from '../../routers.js'

const state = {
	currentPage4: 0, //当前页 number 1
	pageSizes: [5, 10, 15, 20, 30, 40], //每页显示个数选择器选项设置
	pageSize: 0, //每页显示条目个数
	total: 0,
	movietypelist:[]
}

const mutations = {
		getMovieTypeList(state,{page,rows}){
			axios.post('/movieType/getMovieType', {
					page: page,
					rows: rows
				})
				.then(function(response){
					state.total = response.data.total
					state.currentPage4 = response.data.page
					state.pageSize = response.data.rows.length
					state.movietypelist = [...response.data.rows.map((item) => {
						return {
							currType: item.type,
							typeId: item._id
						}
					})]
				})
				.catch(function(error) {
					console.log(error)
				});
			
		}
}


export default {
	state,
	mutations
}
