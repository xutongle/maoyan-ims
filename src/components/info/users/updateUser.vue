<template>
<div class="updataUser left-inner">
    <h4>更新用户</h4>
    <el-row :gutter="20">
        <el-col :span="16" :push='3'>
            <el-form label-width="120px" :model="user">
                <el-form-item label="用户名">
                    <el-input  class="username" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input  class="password" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item label="用户权限">
                    <el-select v-model="value1"  placeholder="请选择" :disabled='selectType'>
                        <el-option
                                v-for="item in status"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用状态">
                    <el-select v-model="value2"  placeholder="请选择" :disabled='selectType'>
                        <el-option
                                v-for="item in flag"
                                :label="item.label"
                                :value="item.value"
                                >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作" :model="user">
                    <el-button-group>
                        <el-button type="primary" icon="plus" @click="saveUser">保存</el-button>
                        <el-button type="primary" icon="delete" @click="clearValue">重置</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>
</template>
<script type="es6">
    import 'babel-polyfill';
	import _axios from "../../axios.js";
	import router from "../../routers.js";
	export default {
		name: 'updateUser',
		data() {
		return {
            user:{},
			status:[{
                    value: 0,
                    label: '普通用户'

				},{
                     value: 1,
                     label: '管理员用户'
				}],
				flag:[{
                    value: '0',
                    label: '激活'
				}],
			value1:'不可更改',
			value2:'不可更改',
			selectType:true
		};
	},
	beforeMount(){
			this.getUser()
		},
	methods: {
        async getUser(){
				var userData= await _axios.post('/users/getUsers')
				for(let i=0;i<userData.data.total;i++){
					if(userData.data.rows[i]._id==this.$route.params.data){
					  this.user=userData.data.rows[i]
					}
				}
			},
		async saveUser(){
		        var userData = await _axios.post('/users/update',{
                    _id:this.$route.params.data,
                    username:this.user.username,
                    password:this.user.password,
		        })
		       router.push('/info/users/userlist')
		},
		clearValue(){
		    this.user.username='',
			this.user.password=''
		},
	}
}
</script>
<style>
    .addmin{
        margin: 100px 0 0 100px;
    }
    h4{
        margin-left: 290px;
        color:#5e7382;
    }
    .username,.password{
        width:196px;
    }
</style>