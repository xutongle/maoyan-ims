const state = {
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
}
const mutations = {
	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$refs.mirror.$data.currentValue = this.$refs.ruleForm.model.name;
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
                  alert("已有该类型，请重新输入")
                  console.log("已有该类型，请重新输入")
                }
          })
          .catch(function (error) {
              console.log(error);
          });
      }else {
          this.$refs.mirror.$data.currentValue = '输入不能为空'
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
const getters = {


}


export default{
	state,
	mutations,
	getters
}