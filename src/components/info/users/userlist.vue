<template>
	<div class="userlist left-inner">
		<el-table  :data="userlist" border stripe style="width: 100%" height="641" type="expand">
			<el-table-column prop="username" label="用户名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="password" label="用户密码" show-overflow-tooltip></el-table-column>
			<el-table-column prop="status" label="用户状态" show-overflow-tooltip :formatter='statusFormatter'></el-table-column>
			<el-table-column prop="flag" label="是否禁用" show-overflow-tooltip :formatter='flagFormatter'></el-table-column>
			<el-table-column prop="_id" label="操作" align='center'>
				<template scope="scope">
					<el-button-group>
						<el-button type="primary" size='small' icon="edit" @click="updateUser(scope.row._id)" >更新</el-button>
						<el-button type="danger"  size='small' icon="delete" @click="delUser(scope.row._id)">删除</el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>


<script type="es6">
	import 'babel-polyfill';
	import _axios from "../../axios.js";
	import router from "../../routers.js";
	export default {
		name: 'userlist',
		data(){
			return {
				userlist:[]
			}
		},
		beforeMount(){
			this.getUserList()
		},
		methods:{
			async getUserList(){
				var userData= await _axios.post('/users/getUsers');
				this.userlist=userData.data.rows
			},
			statusFormatter(row, column) {
				switch (row.status) {
				case 0 :
					return '普通用户';
				case 1 :
					return '管理员用户';
				};
			},
			flagFormatter(row, column) {
				switch (row.flag) {
				case '0' :
					return '已激活';
				case '1' :
					return '已注销';
				};
			},
			async updateUser (_id) {
				console.log(_id)
				router.push('/info/users/updateUser/'+_id)
			},
			async delUser (_id) {
				console.log(_id)
				var delUser= await _axios.post('/users/del', {
					_id:_id
				});
				console.log(delUser)
				if(delUser.data){this.getUserList()}
			}
		}
	}
</script>