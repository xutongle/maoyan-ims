<template>
	<div class="imgs left-inner">
		<el-row :gutter="20">
			<el-col :span="18" :push='3'>
				<el-form label-width="80px" :model="movie">
					<el-col :span='12'>
						<el-form-item label="中文名称">
							<el-input v-model="movie.cName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='12'>
						<el-form-item label="英文名称">
							<el-input v-model="movie.eName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='24'>
						<el-form-item label="图片类型">
							<el-select v-model="imgData.type" placeholder="请选择">
								<el-option v-for="item in options" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="上传图片">
							<el-upload
							ref="upload"
							:data='imgData'
							:multiple="true"
							action='http://localhost:3000/files/upload'
							:on-preview="handlePreview"
							:show-file-list="true"
							:file-list="fileList"
							:auto-upload="false"
							:before-upload="beforeAvatarUpload">
								<el-button slot="trigger" type="primary">选取文件</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且单次最多5张。</div>
							</el-upload>
						</el-form-item>
						<el-row :gutter='20'>
							<el-col :span='8' v-for='item in fileList'>
								{{item}}
							</el-col>
						</el-row>
					</el-col>
					<el-col :span='24'>
						<el-form-item label="操作">
							<el-button-group>
								<el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
								<el-button type="primary" icon="delete">重置</el-button>
							</el-button-group>
						</el-form-item>
					</el-col>
				</el-form>
			</el-col>
		</el-row>
		<!--
		<el-row :gutter="20">
			<el-col :span='24'>
				<ul class="movieImgList">
					<li v-for="item in movie.imgs">
						<img :src='`http://127.0.0.1:3000${item.url}`' />
					</li>
				</ul>
			</el-col>
		</el-row>
-->
	</div>
</template>

<script>
	import _axios from "../../../axios.js";
	import 'babel-polyfill';
	export default {
		name: 'movieImgs',
		data() {
			return {
				imageUrl:'',
				movieID: this.$route.params.movieID,
				movie: {},
				fileList: [],
				imgData: {
					movieId: this.$route.params.movieID,
					type: "indexImg "
				},
				options: [{
					value: 'indexImg',
					label: '主页图片'
        		}, {
					value: 'normal',
					label: '剧情图片'
        		}],
			}
		},
		beforeMount() {
			this.GetMovieById();
		},
		methods: {
			async GetMovieById() {
					var result = await _axios.post('/movies/getMovieDetailsByMovieID', {
						_id: this.movieID
					});
					this.movie = result.data;
				},
				async submitUpload() {
					this.$refs.upload.submit();
				},
				handleRemove(file, fileList) {
					console.log(file, fileList);
				},
				handlePreview(file) {
					console.log(file);
				},
				handleAvatarScucess(res, file) {
					this.imageUrl = URL.createObjectURL(file.raw);
				},
				beforeAvatarUpload(file) {
					const isJPG = file.type === 'image/jpeg';
					const isLt2M = file.size / 1024 / 1024 < 2;
					if (!isJPG) {
						this.$message.error('上传图片只能是 JPG 格式!');
					}
					if (!isLt2M) {
						this.$message.error('上传图片大小不能超过 2MB!');
					}
					return isJPG && isLt2M;
				}
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
