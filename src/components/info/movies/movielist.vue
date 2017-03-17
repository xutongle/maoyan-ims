<template>
	<div class="movielist left-inner">
		<el-table :data="movielist" @row-dblclick='rowBblclick' border stripe style="width: 100%" height="641">
			<el-table-column prop="cName" label="中文名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="eName" label="英文名称" show-overflow-tooltip></el-table-column>
			<el-table-column prop="type" label="影片类型" show-overflow-tooltip :formatter="typeFormatter"></el-table-column>
			<el-table-column prop="country" label="国家/地区" show-overflow-tooltip></el-table-column>
			<el-table-column prop="duration" label="片长(分钟)"></el-table-column>
			<el-table-column prop="release" label="上映时间" show-overflow-tooltip></el-table-column>
			<el-table-column prop="state" label="状态" :formatter='stateFormatter' align='center' width='70'></el-table-column>
			<el-table-column prop="_id" label="操作" align='center'>
				<template scope="scope">
					<el-button-group>
						<el-button type="primary" @click='updateMovie(scope.row._id)' size='small' icon="edit"></el-button>
						<el-button type="danger" @click='deleteMovie(scope.row._id)' size='small' icon="delete"></el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-box">
			<el-pagination :total="page.total" :page-size="page.eachPage" :current-page="page.curPage" :page-sizes="page.eachPages" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper">
			</el-pagination>
			<button @click='GET_MOVIE_BY_ID({movieID:142536})'>123123</button>
		</div>
	</div>
</template>
<script>
	import Vuex from 'vuex';
	import 'babel-polyfill';
	import _axios from "../../axios.js";
	import router from "../../routers.js";
	export default {
		name: 'movielist',
		data() {
			return {
				page: {
					total: 0,
					eachPage: 15,
					eachPages: [5, 10, 15, 20],
					curPage: 1,
				},
				movielist: []
			}
		},
		computed: Vuex.mapState(["MOVIE"]),
		beforeMount() {
			this.GetMovieByPage();
		},
		methods: {
		...Vuex.mapMutations(['GET_MOVIE_BY_ID']),
			rowBblclick(row, event) {
				console.log(row._id)
			},
			async GetMovieByPage() {
				var result = await _axios.post('/movies/getMoviesByPage', {
					page: this.page.curPage,
					rows: this.page.eachPage
				});
				this.movielist = result.data.rows;
				this.page.total = result.data.total;
			},
			typeFormatter(row, column) {
				var s = row.type.map((item) => item.type + '、').join('');
				return s.substring(0, s.length - 1);
			},
			stateFormatter(row, column) {
				switch (row.state) {
				case '0':
					return '下映';
				case '1':
					return '上映';
				case '2':
					return '热映'
				};
			},
			updateMovie(_id) {
				router.push('/info/movie/updatemovie/' + _id)
			},
			async deleteMovie(_id) {
				console.log(_id);
				var result = await _axios.post('/movies/delete', {
					_id
				});
				console.log(result)
				if(result.data){
					this.GetMovieByPage();
				}
			},
			handleSizeChange(val) {
				this.page.eachPage = val;
				this.GetMovieByPage();
			},
			handleCurrentChange(val) {
				this.page.curPage = val;
				this.GetMovieByPage();
			}
		}
	}
</script>