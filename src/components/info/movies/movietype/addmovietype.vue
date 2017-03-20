

<template>
	<div class='content'>
		 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm"
		 style="margin-top:50px"
		>
		  <el-form-item label="新增电影类型" prop="name">
		    <el-input v-model="ruleForm.name" style="width:620px;"></el-input>
		  </el-form-item>

		  <el-form-item  style='position:absolute;right:108px;top:135px;z-index:9'>
		    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" @click="resetForm('ruleForm')">清空</el-button>
		    <el-button type="primary" @click="lookFor('ruleForm')">查看</el-button>
		  </el-form-item>
		</el-form>

		<el-form  label-width="150px" class="demo-ruleForm" style="margin-top:50px">
		  <el-form-item label="新增成功" >
		    <el-input ref="mirror" value='' 
		    	style="width:390px;"
		    	:required="true"
		    	:readonly='true'
		    	></el-input>
		  </el-form-item>
		</el-form>
	</div>	
</template>	
<script>
import axios from '../../../axios.js'
import router from '../../../routers.js'
  export default {
    data() {
	 var bitVlidate = (rule, value, callback) => {
			            if (!/^[\u4e00-\u9fa5，]+$/.test(value)) {
			                callback(new Error("请输入汉字或者英文字符"));
			            }
			            else {
			                callback();
			            }
			    };
      return {
      	status:false,
        ruleForm: {
          name:''
        },
        mirror:{
        	text:"测试"
        },
        rules: {
          name: [
            { 
            	required: true,
             	message: '不能为空', 
             	trigger: 'blur' 
             },{ 
     	    	  min: 0, max: 22,
         		 	message: '请输入中文',
         			trigger: 'change,blur',
         			validator:bitVlidate
             	
            },{
          	 	min: 2, max: 22, 
          	 	message: '请输入至少2个汉字',
          		trigger: 'change,blur'
            }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$refs.mirror.$data.currentValue = this.$refs.ruleForm.model.name;
             // this.$refs.ruleForm.model.name = ''
               axios.post('/movieType/MovieTypeIsUpload', {
              type: this.$refs.ruleForm.model.name
            })
            .then(function (response) {
                var getType= response.config.data
                var newType = getType.substring(9,getType.length-2)
                if(response.data.count === 0){
                  axios.post('/movieType/addMovieType', {
                      type: newType
                    })
                    .then(function (response) {
                      console.log(response)
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  
                }else{
                  
                  console.log("已有该类型，请重新输入")
                }
          })
          .catch(function (error) {
              console.log(error);
          });
      }else {
          this.$refs.mirror.$data.currentValue = 'ddd'
          console.log('error submit!!');
          return false;
        }
      });
      
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$refs.mirror.$data.currentValue = ''
      },
      lookFor(){
        router.push('movietypelist')
      }
    }
  }
</script>   
<style>
	.content{
		position:relative;
		height:250px;
		background:#fff;
		border:1px solid rgba(17,212,134,.8);
	}
	.test{
		color:red
	}
</style>    	