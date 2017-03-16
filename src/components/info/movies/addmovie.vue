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
						<el-select :style='{display: "block"}' v-model="type" multiple placeholder="请选择">
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
							<el-button type="primary" icon="plus" @click='save'>新增电影</el-button>
							<el-button type="primary" icon="delete">重置</el-button>
							<el-button type="primary" :disabled="flag" icon="picture" @click='uploadBtn'>上传图片</el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import 'babel-polyfill';
	import _axios from "../../axios.js";
	import router from "../../routers.js";
	export default {
		name: 'addmovie',
		data() {
			return {
				movie: {
					cName: '爱乐之城',
					eName: 'La La Land',
					country: '美国',
					duration: '129分钟',
					release: '2017/2/14大陆上映',
					synopsis: '在浪漫的星梦之都洛杉矶，怀揣明星梦的小演员米娅（艾玛·斯通 饰），渴望成功完成剧组的选角试镜，为寻求并争取到一次表演机会而倾尽心血的她却屡屡碰壁受挫，只好在片场的咖啡馆做起服务生的工作。落魄的蓝调爵士乐钢琴家塞巴斯汀（瑞恩·高斯林 饰），一心想开设一家自己的爵士乐俱乐部，却因收入问题而屈身于酒吧勉强糊口、维持生计。迷失星途的两人在这座充满无限机遇和可能性的繁嚣都市中邂逅相遇，心怀梦想而又不甘于现实的他们彼此相知相惜、一见钟情，并迅速深陷情网、坠入爱河。为追寻毕生梦想而相互慰藉扶持、激励牵引的两人，步步迈进了声色光影的璀璨世界。在艺术与商业、梦想与现实之间的朦胧博弈中，事业逐渐迈向成功的两人因面临重重考验而不断显露分歧。而他们努力成就的梦想，也由感情升温的助力转变为相爱的阻力。徘徊在梦想与爱情之间的他们陷入了进退两难的抉择取舍……',
				},
				flag: true,
				typelist: [],
				type: []
			};
		},
		async created() {
			var result = await axios.post('/movieType/getMovieType');
			this.typelist = result.data.rows;
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
					this.flag = false
				},
				uploadBtn() {
					router.push('/info/movie/imgs/' + this.movie._id)
				}
		}
	}
</script>