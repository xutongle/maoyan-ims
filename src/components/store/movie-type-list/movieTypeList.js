import axios from '../../axios.js'

const state = {
	movietypelist: [{
		currType: "HTML",
		typeId: ''
	}]

}

const mutations = {
	init(state) {
		var typeObj = []
		axios.post('/movieType/getMovieType', {
		    page:1,
		    rows:10
		  })
		  .then(function (response) {
		  	typeObj = response.data
		  	state.movietypelist = typeObj;
		  	console.log(typeObj);
		    
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		
	}

}
console.log(this.store)
const actions = {
	// asyncAddtodo({ commit }) {
	// 		async init ({ commit }) {
	// 		   commit('gotData', await getData())
	// 		 },
	// 		 async actionB ({ dispatch, commit }) {
	// 		   await dispatch('actionA') // 等待 actionA 完成
	// 		   commit('gotOtherData', await getOtherData(newObj))
	// 		 },
 //  			getData(){
 //  				axios.post('/movieType/MovieTypeIsUpload', {
	// 	 	    type：''
	// 	 	  })
	// 	 	  .then(function (response) {
	// 	 	  	typeObj = response.data
	// 	 	  	console.log(typeObj);
		 	    
	// 	 	  })
	// 	 	  .catch(function (error) {
	// 	 	    console.log(error);
	// 	 	  });
 //  			},
 //  			getOtherData(){

 //  			}
		 	
		// setTimeout(() => {
		// 	commit({
		// 		type: ADD_TODO,
		// 		text
		// 	})
		// }, 2000)
// 	}
}
/*Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
因此你可以调用 context.commit 提交一个 mutation，或者通过 
context.state 和 context.getters 来获取 state 和 getters。
当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 
实例本身了。*/
const getters = {
	// completedTodos(state) {
	// 	switch (state.showType) {
	// 		case filters.ALL:
	// 			return state.todoList;
	// 		case filters.COMPLETED:
	// 			return state.todoList.filter((item) => item.completed)
	// 		case filters.ACTIVE:
	// 			return state.todoList.filter((item) => !item.completed)
	// 	}
	// }
}

export default {
	state,
	mutations,
	getters,
	actions
}

/*
 tableRowClassName(row, index) {
		     	console.log(this.rows)
		        if (index === 1) {
		          return 'info-row';
		        } else if (index === 3) {
		          return 'positive-row';
		        }
		        return '';
	      	}	
 :current-page="currentPage4"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="40"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="400"
 */