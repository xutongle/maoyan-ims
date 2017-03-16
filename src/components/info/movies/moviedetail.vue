<template>
	<span>	
		<el-button type="primary" icon="search" @click="dialogTableVisible = true">电影详情</el-button>

		<el-dialog title="收货地址" v-model="dialogTableVisible" :modal-append-to-body='false'>
			<el-table :data="movie">
				<el-table-column property="date" label="日期" width="150"></el-table-column>
				<el-table-column property="name" label="姓名" width="200"></el-table-column>
				<el-table-column property="address" label="地址"></el-table-column>
			</el-table>
		</el-dialog>
	</span>
</template>

<script>
	export default {
		data() {
			return {
				porps: ['movie'],
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px'
			};
		}
	};
</script>