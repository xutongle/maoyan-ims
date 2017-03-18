<template>
	<div class='content'>
		<el-form :model="movietypeText"  :rules="rules" ref="formName"  label-width="100px" >
		  <el-form-item
		  	style="margin-top:50px"
		    label-width="200px"
		    prop="movietype"
		    label="新增电影类型："
		  >
		  	<el-input style="width:500px"  v-model="movietypeText.textValue"></el-input>
		  </el-form-item>

		  <el-form-item 
		     style='position:absolute;right:138px;'>
		    <el-button type="primary" @click="submitForm('formName')">保存</el-button>
		    <el-button @click="resetForm('formName')">清空</el-button>
		  </el-form-item>

		  <el-form-item  
		  	label="已成功新增："
		  	:required="true"
		  	label-width="200px"
		  	v-if="status" >
		  	<el-input ref='mirror' style="width:300px" :readonly="true" v-model="movietypeText.textValue"></el-input>
		  </el-form-item>
		</el-form>
   </div>
</template>

<script>

  export default {
    data() {
	        var vlidate = (rule, value, callback) => {
		            if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
		                callback(new Error("请输入汉字或者英文字符"));
		            }
		            else {
		                callback();
		            }
		    };
	      	return {
	      		status:false,
	      		movietypeText: {
		          	textValue:"单独",
		          	typeId:''
	        	},
		    	rules: {
		    		movietype: [
		    			{
		    				required: true,
		    				message: '请输入电影类型',
		    				trigger: 'submit'
		    			},{
		    				validator: vlidate,
		    				trigger: 'blur,change'
		    			}
		    	    ]
		    	}
	      	}
        },
        methods: {
      	submitForm(formName) {
      		this.status =  true
      		console.log(this.movietypeText)
      		// this.$refs.mirror.value = this.movietypeText.textValue
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });

      	},
      resetForm(formName) {
      	this.status = false;
      	console.log(1)
        this.$refs[formName].resetFields();
      }
      
    }
  }
</script>
<style>
	.content{
		position:relative;
		height:300px;
		background:#fff;
		border:1px solid #3879D9;
	}
	
	.addMovie{
		color:red;
	}
</style>


        	