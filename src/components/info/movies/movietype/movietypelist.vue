<template>
	<div class="movie-type-list left-inner">
		<el-table :data="MOVIE_TYPE_LIST_store.MOVIE_TYPE_LIST" border style="width: 100%" height="641">
			<el-table-column align='center' type="index" label="编号"></el-table-column>
    		<el-table-column align='center' prop="type" label="电影类型名称">
		    </el-table-column>
			<el-table-column align='center' prop='_id' label="当前类型ID"></el-table-column>
		    <el-table-column align='center' label="操作">
		      <template scope="scope">
			        <el-button @click= "addBtn" type="success" size="small">新增</el-button>
					<span @click='upData(scope.$index, movietypelist)'>
						<el-button type="primary" size="small" @click="dialogVisible = true">修改</el-button>
					</span>
					<el-button @click.native.prevent="deleteRow(scope.$index, movietypelist)" type="danger" size="small">删除</el-button>
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
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Vuex from 'vuex';
	import axios from '../../../axios.js';
	import router from '../../../routers.js';
	export default {
		name: 'movietypelist',
		data() {
			return {
				currentPage4: 0, //当前页 number 1
				pageSizes: [5, 10, 15, 20, 30, 40], //每页显示个数选择器选项设置
				pageSize: 0, //每页显示条目个数
				total: 0,
				changeType: {
					newType: '',
					newId: ''
				},
				dialogVisible: false,
			}
		},
		computed: Vuex.mapState(['MOVIE_TYPE_LIST_store']),
//		mounted() {
//			this.getMovieTypeList(1, 10)
//		},
//		methods: {
//			handleSizeChange(val) {
//				this.getMovieTypeList(this.currentPage4, val);
//				console.log(this.currentPage4)
//				// console.log(`每页 ${val} 条`);
//			},
//			handleCurrentChange(val) {
//				this.getMovieTypeList(val, this.pageSize);
//				// console.log(`当前页: ${val}`);
//			},
//			//保存修改
//			saveBtn() {
//				if (/^[\u4e00-\u9fa5]+$/.test(this.$data.changeType.newType)) {
//
//					axios.post('/movieType/update', {
//							type: this.$data.changeType.newType,
//							_id: this.$data.changeType.newId
//						})
//						.then((response) => {
//							console.log(response)
//							this.getMovieTypeList(this.currentPage4, this.pageSize)
//						})
//						.catch(function(error) {
//							console.log(error);
//						});
//
//				} else {
//					this.$data.changeType.newType = '非法输入'
//
//					console.log("非法修改")
//				}
//			},
//			//修改
//			upData(index, rows) {
//				var currTypeArr = [];
//				var currnId = []
//				for (var i = 0; i < rows.length; i++) {
//					currTypeArr.push(rows[i].currType)
//					currnId.push(rows[i].typeId)
//				}
//				this.$data.changeType.newType = currTypeArr.slice(index, index + 1).join("")
//				this.$data.changeType.newId = currnId.slice(index, index + 1).join("")
//			},
//			addBtn() {
//				router.push('addmovietype');
//			},
//			deleteRow(index, rows) {
//				var newArr = new Array();
//				var currnId = ""
//				for (var i = 0; i < rows.length; i++) {
//					newArr.push(rows[i].typeId)
//				}
//				rows.splice(index, 1);
//				currnId = newArr.slice(index, index + 1)
//				axios.post('/movieType/delete', {
//						_id: currnId
//					})
//					.then((response) => {
//						console.log(response)
//					})
//					.catch(function(error) {
//						console.log(error);
//					});
//				this.getMovieTypeList();
//			},
//			//初始化列表
//			getMovieTypeList(page, rows) {
//				console.log()
//				axios.post('/movieType/getMovieType', {
//						page: page,
//						rows: rows
//					})
//					.then((response) => {
//						var intData = this
//						intData.total = response.data.total
//
//						/*总页数的显示，貌似插件不支持*/
//						// intData.pageSize = response.data.maxPage
//						intData.currentPage4 = page
//						intData.pageSize = rows
//						this.movietypelist = [...response.data.rows.map((item) => {
//							return {
//								currType: item.type,
//								typeId: item._id
//							}
//						})]
//					})
//					.catch(function(error) {
//						console.log(error);
//					});
//			}
//
//		}
	}

</script>
<style>

</style>
<!-- 
目前页面存在的问题：
	1,弹出后，点击任何地方，插件面板都会关闭;
	2,修改功能，改成相同名称的类型也能保存;
	3,关于调用初始化页面的方法的时机问题,有时候会只有一条数据;
	4,希望数据能够倒序排列，未解决
 -->
