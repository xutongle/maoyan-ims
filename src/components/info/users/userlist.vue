<template>
	<div class="userlist left-inner">
		<el-table  :data="uesrList" border stripe style="width: 100%"   type="expand">
			<el-table-column prop="username" label="用户名称" show-overflow-tooltip ></el-table-column>
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
		<div class="block">
			<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="nowPage"
					:page-sizes="[12, 24, 36, 48]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
			</el-pagination>
		</div>
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
				userlist:[],
				uesrList:[],
				total:0,
				pageSize:12,
				nowPage:1
			}
		},
		beforeMount(){
			this.getUserList()
		},
		methods:{
			async getUserList(){
			    this.userlist=[]
				var userData= await _axios.post('/users/getUsers');
				for(let i=0;i<userData.data.rows.length;i++){
					if(userData.data.rows[i].status==0){
						this.userlist.push(userData.data.rows[i])
					}
					this.total=this.userlist.length
				}
				this.getArr()
			},
			getArr(){
				let firstpage=(this.nowPage-1) * this.pageSize
				let lastpage=this.nowPage * this.pageSize - 1 > this.userlist.length ? this.userlist.length-1:this.nowPage * this.pageSize - 1
				for(let i=firstpage;i<=lastpage;i++){
					this.uesrList.push(this.userlist[i])
				}
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
				if(delUser.data){
				this.userlist=[]
				this.uesrList=[]
				this.getUserList()
				}
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.uesrList=[]
				this.pageSize=val
				this.getUserList()

			},
			handleCurrentChange(val) {
				this.nowPage=val
				console.log(`当前页: ${val}`);
				console.log(this.nowPage)
				this.uesrList=[]
				this.getArr()
		    }
		}
	}
</script>
<style>
	.block{
		display: flex;
		justify-content: space-around;
	}
</style>