<template>
	<div class="reg container">
		<el-row :gutter="20">
			<h1>注册页面</h1>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form :model="user" :rules="rules" ref="user" label-width="100px">
					<el-form-item label="用户名：" prop="username">
						<el-input v-model="user.username"></el-input>
					</el-form-item>
					<el-form-item label="密　码：" prop="password">
						<el-input v-model="user.password" type='password'></el-input>
					</el-form-item>
					<el-form-item label="确认密码：" prop="password2">
						<el-input v-model="user.password2" type='password'></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('user')" :disabled=flag>注册</el-button>
						<el-button type="text" @click="login">已有账号？前往登陆</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios';
	import routers from './routers.js';
	export default {
		name: 'reg',
		data() {
			var checkName = (rule, value, callback) => {
					setTimeout(() => {
						if (value) {
							axios.post('http://localhost:3010/users/isUse', {
									username: value
								})
								.then(function (res) {
									return res.data;
								})
								.then((data) => {
									console.log(data)
									if (data) {
										this.flag = true;
										callback(new Error('用户名已存在，请重新输入'));
									} else {
										this.flag = false;
										callback();
									}
								})
								.catch(function (err) {
									console.log(err);
								})
						}
					}, 1000);
				},
				checkPass = (rule, value, callback) => {
					var regPass = /^\w+$/;
					if (!value) return callback();
					if (value.length < 6) return callback(new Error('密码长度不能少于6位'));
					if (!regPass.test(value)) {
						callback(new Error('密码格式有误,只能由字母、数字、下划线组成'))
					} else {
						callback();
					}
				},
				checkPass2 = (rule, value, callback) => {
					if (this.user.password2 !== this.user.password)
						callback(new Error('两次输入密码不匹配，请确认密码'));
					else
						callback();
				};
			return {
				flag: false,
				user: {
					username: null,
					password: null,
					password2: null
				},
				rules: {
					username: [
						{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 16,
							message: '长度在 6 到 16 个字符',
							trigger: 'blur'
						},
						{
							validator: checkName,
							trigger: 'blur'
						}
				  ],
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: 'change'
						},
						{
							validator: checkPass,
							trigger: 'blur'
						}
				  ],
					password2: [
						{
							required: true,
							message: '请确认密码',
							trigger: 'change'
						},
						{
							validator: checkPass2,
							trigger: 'change'
						}
				  ],
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						routers.push('/login/' + this.user.username);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			login() {
				routers.push('/login');
			},
		}
	}
</script>


<style>

</style>