<template>
	<div class="info container">
		<el-row class="tac">
			<el-col :span="4">
				<el-menu default-active="1" :router=true class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
					<el-submenu index="1">
						<template slot="title">用户管理</template>
						<el-menu-item-group title='查询用户'>
							<el-menu-item index="/info/users/userlist">用户列表</el-menu-item>
							<el-menu-item index="/info/users/adminlist">管理员列表</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="新增用户">
							<el-menu-item index="/info/users/adduser">新增用户</el-menu-item>
							<el-menu-item index="/info/users/addadmin">新增管理员</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">电影管理</template>
						<el-menu-item index="/info/movie/movielist">电影列表</el-menu-item>
						<el-menu-item index="/info/movie/addmovie">新增电影</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">电影类型管理</template>
						<el-menu-item index="/info/movie/movietype/movietypelist">类型列表</el-menu-item>
						<el-menu-item index="/info/movie/movietype/addmovietype">新增类型</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">排片管理</template>
						<el-menu-item index="/info">新增排片</el-menu-item>
						<el-menu-item index="/info">排片查询</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span='20' class='info-container'>
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>


<script>
	export default {
		name: 'info',
		data(){
			return {
			}
		},
		methods: {
			handleOpen(key, keyPath) {
//					console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
//					console.log(key, keyPath);
			}
		}
	}
</script>