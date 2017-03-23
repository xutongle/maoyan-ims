<template>
	<div class="movie-type-list left-inner">
		<el-table :data="MOVIE_TYPE_LIST_store.MOVIE_TYPE_LIST" border stripe  style="width: 100%" >
			<el-table-column align='center' type="index" width= "60" label="编号" ></el-table-column>
     		<el-table-column align='center' prop="currType" label="电影类型名称">
 		    </el-table-column>
 			<el-table-column align='center' prop='typeId' label="当前类型ID"></el-table-column>
 		    <el-table-column align='center' label="操作">
 		      <template scope="scope">
 			        <el-button @click= "addBtn" type="success" size="small">新增</el-button>
 					<span @click='upData(scope.$index, MOVIE_TYPE_LIST_store.MOVIE_TYPE_LIST)'>
 						<el-button type="primary" size="small" @click="dialogVisible = true">修改</el-button>
 					</span>
 					<el-button @click.native.prevent="DELETE_MOVIE_TYPE_ROW(scope.$index, MOVIE_TYPE_LIST_store.MOVIE_TYPE_LIST)" type="danger" size="small">删除</el-button>
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
 			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="MOVIE_TYPE_LIST_store.currentPage4" :page-sizes="MOVIE_TYPE_LIST_store.pageSizes" :page-size="MOVIE_TYPE_LIST_store.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="MOVIE_TYPE_LIST_store.total">

 			</el-pagination>
 		</div>
	</div>
</template>

<script>

	import { mapState, mapMutations,mapActions} from 'vuex';
	import axios from '../../../axios.js';
	import router from '../../../routers.js';
	import {
		GET_MOVIE_TYPE_LIST,
		DELETE_MOVIE_TYPE_ROW
	} from '../../../store/movie/movietypelist/mutations_type.js'

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
		created() {
			// this.GET_MOVIE_TYPE_LIST({
			// 	page: 1,
			// 	rows: 10
			// })
		},
		computed:{
			...mapState(['MOVIE_TYPE_LIST_store'])
		},
		methods: {
			...mapActions([GET_MOVIE_TYPE_LIST,DELETE_MOVIE_TYPE_ROW]),
			handleCurrentChange(val) {
				// var maxPage = Math.ceil(this.$store.state.MOVIE_TYPE_LIST_store.total/this.$store.state.MOVIE_TYPE_LIST_store.pageSize)
				// for (let index of cur.values()) {
				//   console.log(index);
				// }
				this.GET_MOVIE_TYPE_LIST({
					page:val,
					rows: this.$store.state.MOVIE_TYPE_LIST_store.pageSize 
				})
			},
			handleSizeChange(sizeVal){
				this.GET_MOVIE_TYPE_LIST({
					page:this.$store.state.MOVIE_TYPE_LIST_store.currentPage4,
					rows:sizeVal
				})
			},
			saveBtn() {
			if (/^[\u4e00-\u9fa5]+$/.test(this.changeType.newType)) {
				axios.post('/movieType/update', {
						type: this.$data.changeType.newType,
						_id: this.$data.changeType.newId
					})
					.then((response) => {
						this.GET_MOVIE_TYPE_LIST({
							page:this.$store.state.MOVIE_TYPE_LIST_store.currentPage4,
							row:this.$store.state.MOVIE_TYPE_LIST_store.pageSize,
						})
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
			console.log(this.$store.state.MOVIE_TYPE_LIST_store.currentPage4)
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
	3,翻页,翻到最后一页的时候rows参数有问题;
	4,希望数据能够倒序排列，未解决
 -->

