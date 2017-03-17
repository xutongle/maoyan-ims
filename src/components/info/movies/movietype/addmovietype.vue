
<template>
	<div>
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="添加电影类型" label-color="#1F2D3D" prop="type">
		    <el-input type="text" v-model="ruleForm2.types" auto-complete="off"></el-input>
		  </el-form-item>
		 
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
		    <el-button type="primary" @click="resetForm('ruleForm2')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
	  data() {
	       return {
	         ruleForm2: {
	           types: '',
	         },
	         rules2: {
	           type:''
	         }
	       }
	     },
	     methods: {
	       submitForm(formName) {
	         this.$refs[formName].validate((valid) => {
	           if (valid) {
	             alert('save success!');
	           } else {
	             console.log('error submit!!');
	             return false;
	           }
	         });
	       },
	       resetForm(formName) {
	         this.$refs[formName].resetFields();
	       }
	     }
	   }
	
</script>