<template>
	<div class="adduser left-inner">
		<h4>新增用户</h4>
		<el-row :gutter="20">
			<el-col :span="16" :push='3'>
				<el-form label-width="120px" :model="ADD_USER_store.user">
					<el-form-item label="用户名">
						<el-input v-model="ADD_USER_store.user.username"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="ADD_USER_store.user.password"></el-input>
					</el-form-item>
					<el-form-item label="用户权限">
						<el-select v-model="ADD_USER_store.user.status" placeholder="请选择" @change="STATUS_ONCHANGE">
							<el-option v-for="item in ADD_USER_store.status" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="启用状态">
						<el-select v-model="ADD_USER_store.user.flag" placeholder="请选择" @change="FLAGS_ONCHANGE">
							<el-option v-for="item in ADD_USER_store.flags" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作">
							<el-button type="primary" icon="plus" @click='ADD_USER'>新增用户</el-button>
							<el-button type="primary" icon="delete" @click="clearValue">重置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Vuex from 'vuex';
	import {
		ADD_USER,
		FLAGS_ONCHANGE,
		STATUS_ONCHANGE
	} from '../../store/user/adduser/mutations_type.js';
	export default {
		name: 'adduser',
		computed: Vuex.mapState(["ADD_USER_store"]),
		methods: {
			...Vuex.mapMutations([FLAGS_ONCHANGE,STATUS_ONCHANGE]),
			...Vuex.mapActions([ADD_USER]),
			clearValue() {
				console.log('clearValue')
			}
		}
	}

</script>
