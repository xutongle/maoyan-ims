<template>
	<div class="login container">
		<el-row :gutter="20">
			<h1>登陆页面</h1>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form ref="form" :model="user" label-width="100px">
					<el-form-item label="用户名：">
						<el-input v-model="user.username"></el-input>
					</el-form-item>
					<el-form-item label="密　码：">
						<el-input v-model="user.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="login">登陆</el-button>
						<el-button type="text" @click="reg">没有账号？前往注册</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import routers from './routers.js'
	export default {
		name: 'login',
		data() {
			return {
				user: {
					username: this.$route.params.username,
					password: '',
				}
			}
		},
		methods: {
			login() {
				routers.push('/info')
			},
			reg() {
				routers.push('/reg')
			}
		}
	}
</script>


<style>

</style>