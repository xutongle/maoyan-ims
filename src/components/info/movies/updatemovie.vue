<template>
	<div class="addmovie left-inner">
		<el-row :gutter="20">
			<el-col :span="16" :push='3'>
				<el-form label-width="120px" :model="MOVIE_store.movie">
					<el-form-item label="中文名称">
						<el-input v-model="MOVIE_store.movie.cName"></el-input>
					</el-form-item>
					<el-form-item label="英文名称">
						<el-input v-model="MOVIE_store.movie.eName"></el-input>
					</el-form-item>
					<el-form-item label="影片类型">
						<el-select :style='{display: "block"}' v-model="MOVIE_store.movie.type" :value='MOVIE_store.movie.type' multiple placeholder="请选择">
							<el-option v-for="item in MOVIE_TYPE_LIST_store.MOVIE_TYPE_LIST" :label="item.type" :value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="制片国家/地区">
						<el-input v-model="MOVIE_store.movie.country"></el-input>
					</el-form-item>
					<el-form-item label="片长">
						<el-input v-model="MOVIE_store.movie.duration"></el-input>
					</el-form-item>
					<el-form-item label="上映时间">
						<el-input v-model="MOVIE_store.movie.release"></el-input>
					</el-form-item>
					<el-form-item label="剧情简介">
						<el-input v-model="MOVIE_store.movie.synopsis" type='textarea' :autosize='{ minRows: 6, maxRows: 12 }' resize='none'></el-input>
					</el-form-item>
					<el-form-item label="操作">
						<el-button-group>
							<el-button type="primary" icon="plus" @click='save'>更新电影</el-button>
							<el-button type="primary" icon="delete">重置</el-button>
							<el-button type="primary" icon="picture" @click='uploadBtn'>上传图片</el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import 'babel-polyfill';
	import Vuex from "vuex";
	import _axios from "../../axios.js";
	import router from "../../routers.js";
	import moviedetail from './moviedetail.vue';
	import {
		GET_MOVIE_BY_ID,
		GET_MOVIE_DETAIL
	} from '../../store/movie/mutations_type.js';
	export default {
		name: 'addmovie',
		computed: Vuex.mapState(['MOVIE_store',"MOVIE_TYPE_LIST_store"]),
		created() {
			this.GET_MOVIE_BY_ID({
				movieID: this.$route.params.movieID
			});
		},
		methods: {
			...Vuex.mapActions([GET_MOVIE_BY_ID]),
			async save() {
				let r = await _axios.post('/movies/update', {
					movie: JSON.stringify(this.MOVIE_store.movie),
				});
				if (r.data) {
					this.$message({
						message: '更新电影信息成功',
						type: 'success'
					});
				}
			},
			uploadBtn() {
				router.push('/info/movie/imgs/' + this.MOVIE_store.movie._id)
			}
		}
	}

</script>
