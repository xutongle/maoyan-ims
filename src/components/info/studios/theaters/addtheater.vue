<template>
    <div>
        <div class="auditorium left-inner">

            <el-row :gutter="20">

                <el-col :span="18" :push='3'>
                    <el-form label-width="100px" :model="theater">
                        <el-row >
                            <el-form-item label="当前影院：">
                                <el-input v-model="studio.name" disabled></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="影厅名：">
                                <el-input v-model="theater.name"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-col :span='12'>

                        <el-form-item label="行：">
                            <el-input v-model="theater.row"></el-input>
                        </el-form-item>
                            <el-form-item label="列：">
                                <el-input v-model="theater.column"></el-input>
                            </el-form-item>
                </el-col>
                        <el-col :span='24'>
                            <el-form-item label="操作：">
                                <el-button-group>
                                    <el-button @click='saveTheater' type="success"  icon="plus">保存</el-button>
                                    <el-button @click='clearTheater'  type="danger"  icon="delete">清空</el-button>
                                    <el-button @click='searchTheater' type="primary" icon="search">查看</el-button>
                                </el-button-group>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>

</template>



<script>
    import 'babel-polyfill';
    import axios from "../../../axios.js";
    import router from "../../../routers.js";
    export default {
        name: 'theaters',
        data(){
            return{
                theater:{},
                studio:{}
            }
        },
        beforeMount(){
             this.init()
        },
        
        methods:{
          init(){
            var theaterName = this.$route.params.studioParams.split("&")
            this.studio.name = theaterName[0]
          },
          /*新增影厅*/
          saveTheater(){
           
            var theaterID = this.$route.params.studioParams.split("&")
            axios.post("/theaters/addTheater",{
                studioID:theaterID[1],
                name:this.theater.name,
                row:this.theater.row,
                col:this.theater.column
                })
                .then(function(response){
                    console.log(response)
                })
          },
          clearTheater(){
            
               this.theater.name == ' eeee'
               console.log(this.theater.name)
               this.theater.row == ' '
               this.theater.column == ' '
          },
          searchTheater(){
             var theaterID = this.$route.params.studioParams.split("&")
             router.push('/info/studios/theaters/theatlist/' + theaterID[1])
           // router.push(`/info/studios/theaters/theatlist` + )
          }



        }
    }
</script>
<style scoped>
    .title{
        color:'#000';
        text-align: center;
        opacity: 1;
    }
</style>