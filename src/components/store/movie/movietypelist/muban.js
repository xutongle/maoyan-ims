const state = {
	todoList: [{
		text: "HTML",
		completed: false
	}, {
		text: "CSS",
		completed: true
	}, {
		text: "JavaScript",
		completed: false
	}],
	showType: "all"
}

const mutations = {
	[ADD_TODO](state, {
		text
	}) {
		state.todoList.push({
			text,
			completed: false
		})
	},
	[COMPLETED_TODO](state, {
		item
	}) {
		item.completed = !item.completed
	},
	[SET_SHOW_TYPE](state, {
		showType
	}) {
		state.showType = showType
	}
}

const actions = {
	asyncAddtodo({
		commit
	}, {
		text
	}) {
		setTimeout(() => {
			commit({
				type: ADD_TODO,
				text
			})
		}, 2000)
	}
}

const getters = {
	completedTodos(state) {
		switch (state.showType) {
			case filters.ALL:
				return state.todoList;
			case filters.COMPLETED:
				return state.todoList.filter((item) => item.completed)
			case filters.ACTIVE:
				return state.todoList.filter((item) => !item.completed)
		}
	}
}

export default {
	state,
	mutations,
	getters,
	actions
}