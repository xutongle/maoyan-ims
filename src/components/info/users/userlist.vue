<template>
	<div class="userlist left-inner">
		<el-table  :data="USER_LIST_store.userlist" border stripe style="width: 100%" height="641">
			<el-table-column prop="username" label="用户名称" show-overflow-tooltip ></el-table-column>
			<el-table-column prop="password" label="用户密码" show-overflow-tooltip></el-table-column>
			<el-table-column prop="status" label="用户权限" show-overflow-tooltip :formatter='statusFormatter'></el-table-column>
			<el-table-column prop="flag" label="是否禁用" show-overflow-tooltip :formatter='flagFormatter'></el-table-column>
			<el-table-column prop="_id" label="操作" align='center'>
				<template scope="scope">
					<el-button-group>
						<el-button type="primary" size='small' icon="edit" @click="updateUser(scope.row._id)" ></el-button>
						<el-button v-if='scope.row.flag==="0"' type="danger"  size='small' icon="delete" @click="DELETE_USER_BY_ID({_id: scope.row._id})"></el-button>
						<el-button v-else type="success"  size='small' icon="check" @click="DELETE_USER_BY_ID({_id: scope.row._id})"></el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-box">
			<el-pagination 
			:total="USER_LIST_store.total" 
			:page-size="USER_LIST_store.page.eachPage" 
			:current-page="USER_LIST_store.page.curPage" 
			:page-sizes="USER_LIST_store.page.eachPages" 
			@size-change="CHANGE_EACHPAGES" 
			@current-change="CHANGE_CURPAGE" 
			layout="total, sizes, prev, pager, next, jumper">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Vuex from 'vuex';
		import router from "../../routers.js";
	import {
		CHANGE_CURPAGE,
		CHANGE_EACHPAGES,
		GET_USER_BY_PAGE,
		DELETE_USER_BY_ID
	} from '../../store/user/userlist/mutations_type.js';
	export default {
		name: 'userlist',
		computed: Vuex.mapState(["USER_LIST_store"]),
		created() {
			this.GET_USER_BY_PAGE()
		},
		methods:{
			...Vuex.mapActions([GET_USER_BY_PAGE,DELETE_USER_BY_ID,CHANGE_EACHPAGES,CHANGE_CURPAGE]),
			updateUser(_id){
				router.push('/info/users/updateUser/'+_id)
			},
			statusFormatter(row, column){
				switch(row.status){
					case 0:return '普通用户'
					case 1:return '管理员用户'
				}
			},
			flagFormatter(row, column){
				switch(row.flag){
					case '0':return '已激活'
					case '1':return '已注销'
				}
			}
		}
	}
</script>