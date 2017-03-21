<template>
	<div class="addmin left-inner">
		<h4>新增管理员</h4>
		<el-row :gutter="20">
			<el-col :span="16" :push='3'>
				<el-form label-width="120px" :model="user">
					<el-form-item label="用户名">
						<el-input v-model="user.username" class="username"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="user.password" class="password"></el-input>
					</el-form-item>
					<el-form-item label="用户权限">
						<el-select v-model="value1"  placeholder="请选择" @change="onChange_S" >
							<el-option
									v-for="item in user.status"
									:label="item.label"
									:value="item.value"
									:disabled="item.disabled">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="启用状态">
						<el-select v-model="value2"  placeholder="请选择" @change="onChange_B" :disabled='selectType'>
							<el-option
									v-for="item in user.flag"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作" :model="user">
						<el-button-group>
							<el-button type="primary" icon="plus" @click='save' :disabled='btnType'>新增用户</el-button>
							<el-button type="primary" icon="delete" @click="clearValue">重置</el-button>
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
		name: 'addadmin',
		data() {
			return {
				user: {
					username: '',
					password: '',
					flag: [{
						value: '0',
						label: '激活'
					}],
					status: [{
						value: 0,
						label: '普通用户',
						disabled: true
					}, {
						value: 1,
						label: '后台管理用户'
					}]
				},
				value1: null,
				value2: null,
				btnType: true,
				selectType: true
			};
		},
		methods: {
			onChange_B() {
				this.btnType = false
			},
			onChange_S() {
				this.selectType = false
			},
			clearValue() {
				this.user.username = '',
					this.user.password = '',
					this.value1 = null,
					this.btnType = true
			},
			async save() {
				var result = await _axios.post('/users/reg', {
					username: this.user.username,
					password: this.user.password,
					flag: this.value2,
					status: this.value1
				})
				this.$message('授权猫眼管理员用户成功');
			},
		}
	}

</script>
<style>
	.addmin {
		margin: 100px 0 0 100px;
	}
	
	h4 {
		margin-left: 290px;
		color: #5e7382;
	}
	
	.username,
	.password {
		width: 196px;
	}

</style>
