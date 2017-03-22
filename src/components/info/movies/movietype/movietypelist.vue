<template>
	<div class="movie-type-list left-inner">
		<el-table :data="Movie_TypeList.movietypelist" border stripe  style="width: 100%" >
			<el-table-column align='center' type="index"  label="编号" ></el-table-column>
     		<el-table-column align='center' prop="currType" label="电影类型名称">
 		    </el-table-column>
 			<el-table-column align='center' prop='typeId' label="当前类型ID"></el-table-column>
 		    <el-table-column align='center' label="操作">
 		      <template scope="scope">
 			        <el-button @click= "addBtn" type="success" size="small">新增</el-button>
 					<span @click='upData(scope.$index, Movie_TypeList.movietypelist)'>
 						<el-button type="primary" size="small" @click="dialogVisible = true">修改</el-button>
 					</span>
 					<el-button @click.native.prevent="deleteRow(scope.$index, Movie_TypeList.movietypelist)" type="danger" size="small">删除</el-button>
 			  </template >
     		</el-table-column>
		</el-table>
		<template>
 			<el-dialog title="修改当前类型" v-model="dialogVisible" size="tiny">
 				  <el-input placeholder="请输入内容" v-model='changeType.newType'></el-input>

 				  <span slot="footer" class="dialog-footer">
 					<el-button @click="dialogVisible = false">取 消</el-button>
 					<span @click="saveBtn">
 						<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
 					</span>
 				  </span>
 			</el-dialog>
 		</template>
 		<div class="pagination-box">
 			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Movie_TypeList.currentPage4" :page-sizes="Movie_TypeList.pageSizes" :page-size="Movie_TypeList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="Movie_TypeList.total">

 			</el-pagination>
 		</div>
	</div>
</template>

<script>

	import { mapState, mapMutations} from 'vuex';
	import axios from '../../../axios.js';
	import router from '../../../routers.js';
	
	export default {
		name: 'movietypelist',
		data(){
			return {
				dialogVisible: false,
				changeType: {
					newType: '',
					newId: ''
				}
			}
		},
		mounted() {
			this.getMovieTypeList({
				page: 1,
				rows: 10
			})
		},
		computed:{
			
			...mapState(["Movie_TypeList"])
		},
		methods: {
			...mapMutations(["getMovieTypeList"]),
			handleSizeChange(val) {
				this.getMovieTypeList(this.$store.state.Movie_TypeList.currentPage4, val);
				// console.log(this.$store.state.Movie_TypeList.currentPage4)
				// console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.getMovieTypeList(val,this.$store.state.Movie_TypeList.pageSize);
				// console.log(`当前页: ${val}`);
			},
			deleteRow(index, row) {
				var newArr = [];
				var currnId = ""
				for (var i = 0; i < row.length; i++) {
					newArr.push(row[i].typeId)
				}
				currnId = newArr.slice(index, index + 1)
				axios.post('/movieType/delete', {
						_id: currnId
					})
					.then((response) => {

						var currPage = this.$store.state.Movie_TypeList.currentPage4
						var currRow = this.$store.state.Movie_TypeList.pageSize
						this.getMovieTypeList(currPage,currRow)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			saveBtn() {
			if (/^[\u4e00-\u9fa5]+$/.test(this.changeType.newType)) {
				console.log(this.changeType.newType)
				axios.post('/movieType/update', {
						type: this.$data.changeType.newType,
						_id: this.$data.changeType.newId
					})
					.then((response) => {
						console.log(response)
						/*调用传参的时候参数的值存在问题*/
						this.getMovieTypeList(this.$store.state.Movie_TypeList.currentPage4,this.$store.state.Movie_TypeList.pageSize)
					})
					.catch(function(error) {
						console.log(error);
					});
				} else {
					this.$data.changeType.newType = '非法输入'
					console.log("非法修改")
				}

		},
		upData(index, rows) {
			var currTypeArr = [];
			var currnId = []
			for (var i = 0; i < rows.length; i++) {
				currTypeArr.push(rows[i].currType)
				currnId.push(rows[i].typeId)
			}
			this.$data.changeType.newType = currTypeArr.slice(index, index + 1).join("")
			this.$data.changeType.newId = currnId.slice(index, index + 1).join("")
			},
		addBtn() {
			router.push('addmovietype');
		}
	}
}
</script>
<style>
	.pagination-box{
		padding: 30px;
	}
</style>
<!-- 
目前页面存在的问题：
	1,弹出后，点击任何地方，插件面板都会关闭;
	2,修改功能，改成相同名称的类型也能保存;
	3,关于调用初始化页面的方法的时机问题,有时候会只有一条数据;
	4,希望数据能够倒序排列，未解决
 -->

