
<template>
	<div class="addstudio left-inner">
		<el-row :gutter="20">
		<el-col :span="16" :push='3'>
		<el-form label-width="120px" :model="studio">
		<el-form-item label="影院名称">
		<el-input v-model="studio.name"></el-input>
		</el-form-item>
		<el-form-item label="影院地址">
		<el-input v-model="studio.address"></el-input>
		</el-form-item>
		<el-form-item label="操作">
		<el-button-group>
		<el-button type="primary" icon="plus" @click='save'>保存</el-button>
		<el-button 
			type="primary" 
			icon="delete"
			@click='clearBtn'>
			重置
		</el-button>
		<el-button type="primary" icon="date" :disabled="flag" @click='goBtn'>影厅管理</el-button>
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
		name: 'addstudio',
		data(){
			return {
				studio:{
					name:"太平洋影城",
					address:"金牛区二环路北一段10号凯德广场4楼",
				},
				_id:"",
				flag:true,
			};

		},
		methods:{
			clearBtn(){
				this.studio.name = '';
				this.studio.address = ''
			},
			async save() {
				if(this.studio.name !='' && this.studio.address !=''){
					var result = await _axios.post("/studios/addStudio",{
					name:this.studio.name,
					address:this.studio.address
				})
				this._id = result.data._id;
				this.$message({
					message:"新增成功",
					type:"success"
				});
				this.flag = false
				}else{
					this.$message({
						message:"输入不能为空",
						type:"warning"
					});
				}
			},
			goBtn(){
				router.push('/info/studios/theaters/addtheater/' + this.studio.name + "&" + this._id)
				// router.push('/info/studios/theaters/{"name":"' + this.studio.name +'","id":"'+ this._id+'"}')
				console.log(this.studio.name)
			}
		}		
	}
</script>