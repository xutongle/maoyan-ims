<template>
	<div class="movielist left-inner">
		<el-table :data="MOVIE_LIST_store.movielist" border stripe style="width: 100%" height="641">
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
			<el-pagination 
			:total="MOVIE_LIST_store.total" 
			:page-size="MOVIE_LIST_store.page.eachPage" 
			:current-page="MOVIE_LIST_store.page.curPage" 
			:page-sizes="MOVIE_LIST_store.page.eachPages" 
			@size-change="CHANGE_EACHPAGES" 
			@current-change="CHANGE_CURPAGE" 
			layout="total, sizes, prev, pager, next, jumper">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import Vuex from 'vuex';
	import 'babel-polyfill';
	import _axios from "../../axios.js";
	import router from "../../routers.js";
	import {
		CHANGE_CURPAGE,
		CHANGE_EACHPAGES,
		GET_MOVIE_BY_PAGE
	} from '../../store/movie/movielist/mutations_type.js';
	export default {
		name: 'movielist',
		computed: Vuex.mapState(["MOVIE_LIST_store"]),
		created() {
			console.log(this)
			this.GET_MOVIE_BY_PAGE()
		},
		methods: {
			...Vuex.mapActions([GET_MOVIE_BY_PAGE,CHANGE_EACHPAGES,CHANGE_CURPAGE]),
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
				var result = await _axios.post('/movies/delete', {
					_id
				});
				if (result.data) {
					this.GET_MOVIE_BY_PAGE();
				}
			}
		}
	}

</script>
