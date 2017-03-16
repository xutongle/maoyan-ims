<template>
	<div class="addmovie left-inner">
		<el-row :gutter="20">
			<el-col :span="16" :push='3'>
				<el-form label-width="120px" :model="movie">
					<el-form-item label="中文名称">
						<el-input v-model="movie.cName"></el-input>
					</el-form-item>
					<el-form-item label="英文名称">
						<el-input v-model="movie.eName"></el-input>
					</el-form-item>
					<el-form-item label="影片类型">
						<el-select :style='{display: "block"}' v-model="type" :value='movie.type' multiple placeholder="请选择">
							<el-option v-for="item in typelist" :label="item.type" :value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="制片国家/地区">
						<el-input v-model="movie.country"></el-input>
					</el-form-item>
					<el-form-item label="片长">
						<el-input v-model="movie.duration"></el-input>
					</el-form-item>
					<el-form-item label="上映时间">
						<el-input v-model="movie.release"></el-input>
					</el-form-item>
					<el-form-item label="剧情简介">
						<el-input v-model="movie.synopsis" type='textarea' :autosize='{ minRows: 6, maxRows: 12 }' resize='none'></el-input>
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
		<div>
			<moviedetail :movie='movie'></moviedetail>
		</div>
	</div>
</template>

<script>
	import 'babel-polyfill';
	import _axios from "../../axios.js";
	import router from "../../routers.js";
	import moviedetail from './moviedetail.vue'
	export default {
		name: 'addmovie',
		data() {
			return {
				movieID: this.$route.params.movieID,
				movie: {},
				typelist: [],
				type: []
			};
		},
		async created() {
			var result = await _axios.post('/movieType/getMovieType');
			this.typelist = result.data.rows;
			var result = await _axios.post('/movies/getMovieByMovieID', {
				_id: this.movieID
			});
			this.movie = result.data;
			this.type = result.data.type;
		},
		components: {
			moviedetail
		},
		methods: {
			async save() {
				var result = await _axios.post('/movies/addMovie', {
					movie: JSON.stringify(this.movie),
					type: JSON.stringify(this.type),
				})
				this.movie._id = result.data._id
				this.$message({
					message: '保存成功',
					type: 'success'
				});
			},
			uploadBtn() {
				router.push('/info/movie/imgs/' + this.movie._id)
			}
		}
	}
</script>