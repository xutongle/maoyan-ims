<template>
    <div>
        <el-table  :data="theatlist" border stripe style="width: 100%" type="expand">
            <el-table-column align='center' type="index" label="编号" ></el-table-column>
             <el-table-column prop="studioID.name" label="所属影院" width='100' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column prop="name" label="影厅名称" width='100' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column prop="_id" label="操作" align='center'>
                <template scope="scope">
                    <el-button-group>
                        <el-button  @click.native.prevent="deleteTheater(scope.$index, theatlist)"  type="danger"  size='small' icon="delete">删除</el-button>
                        <span @click="dialogFormVisible0 = true" >
                            <el-button @click.native.prevent="changeStudioBtn(scope.$index, theatlist)"  type="primary" size='small' icon="edit">更改</el-button>
                        </span>
                        <span  @click="dialogFormVisible = true">
                            <el-button @click='lookTheaterSeats(scope.$index, theatlist)' type="success" size='small' icon='search' >座位</el-button>
                        </span>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-box" style="padding: 30px 0;" :modal='dialogFormVisible'>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1"  :page-sizes="pageSizes"  
            :page-size="pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        
            <el-dialog title="修改当前影院" v-model="dialogFormVisible0" >
              <el-form :model="form" >
                <el-form-item label="影院名称：" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="影院地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <span @click='savaChange'><el-button type="primary" @click="dialogFormVisible = false">确 定</el-button></span>
              </div>
            </el-dialog>
            <el-dialog title="座位列表" v-model="dialogFormVisible" size='large'>
                 <template scope="scope">
                    <el-table :data="theaterSeats" border stripe style="width: 100%" type="expand">
                        <el-table-column prop="displayName" label="座位位置"  show-overflow-tooltip align='center'></el-table-column>
                        <el-table-column prop="rowNo" label="座位排数" how-overflow-tooltip align='center'></el-table-column>
                        <el-table-column prop="colNo" label="座位列数"  show-overflow-tooltip align='center'></el-table-column>

                        <!-- <el-table-column prop="count" label="座位总数"  how-overflow-tooltip align='center'></el-table-column> -->
                    </el-table>
            </template>
            </el-dialog>

    </div>
</template>



<script>

import Vuex from 'vuex';
import 'babel-polyfill';
import axios from "../../../axios.js";
import router from "../../../routers.js";
export default {
    name: 'theatlist',
    data(){
        return{
            currentPage1: 1, //当前页 number 1
            pageSizes: [2,5, 10, 15, 20, 30, 40], //每页显示个数选择器选项设置
            pageSize: 0, //每页显示条目个数
            total: 4,
            theatlist:[{
                name:'',
                row:'',
                col:''
                
            }],
            dialogFormVisible0: false,
            dialogFormVisible: false,
            form: {
                  name: '',
                  address: '',
                  _id:''
                },
            formLabelWidth: '120px',
            theaterSeats:[]

        }
    },
    beforeMount(){
        this.getStudiosList(1,10)
    },
    methods:{
    handleSizeChange(val) {
        /*未改,功能不具备*/
        // this.getStudiosList(this.currentPage1, val);
        // console.log(this.currentPage1)
        // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        /*未改,功能不具备*/
        // this.getStudiosList(val, this.pageSize);
         // console.log(`当前页: ${val}`);
    },//查看影厅
    lookTheaterSeats(index, rows){
        var newArr = [];
        for (var i = 0; i < rows.length; i++) {
            newArr.push(rows[i]._id)
        }
       axios.post("/seats/getSeatsByTheaterID",{
                theaterId:newArr.slice(index,index+1),
                page:1,
                rows:999
            })
            .then((response) =>{
                this.theaterSeats = [...response.data.rows.map((item) =>{
                    return{
                        colNo:item.colNo,
                        rowNo:item.rowNo,
                        count:item.colNo*item.rowNo,
                        displayName:item.displayName
                    }
                                    
                })]
            });
    },//点击修改影院信息 /*未改,功能不具备*/
    changeStudioBtn(index, rows){
        var newArr = []
        for (var i = 0; i < rows.length; i++) {
            newArr.push(rows[i]._id)
        }
        newArr = rows.splice(index, 1);
        this.form.name = newArr[0].name
        this.form.address = newArr[0].address
        this.form._id = newArr[0]._id
    },//保存影院信息的修改 /*未改,功能不具备*/
    savaChange(){
        axios.post('/theaters/updateByStudioID', {
            _id: this.form._id,
            name: this.form.name
            
        })
        .then((response) => {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error);
        });
    },//删除当前影院
    deleteTheater(index, rows){
        var newArr = new Array();
        var currnId = ""
        for (var i = 0; i < rows.length; i++) {
            newArr.push(rows[i]._id)
        }
        rows.splice(index, 1);
        currnId = newArr.slice(index, index + 1)
        axios.post('/theaters/deleteByStudioID', {
                _id: currnId
            })
            .then((response) => {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error);
            });
    },//获取放映厅列表
    async getStudiosList(page, rows){
        var studioMess = this.$route.params.studioIDParams.split("&")
        await axios.post("/theaters/getTheatersByStudioID",{
            studioID:studioMess[0],
            name:this.theatlist.name,
            row:this.theatlist.row,
            col:this.theatlist.col
            })
            .then((response) =>{
                this.theatlist = response.data.rows

                 // console.log(response.data.rows[0]._id)
                
            });
        

        
    }
   }
}
   
</script>
<style scoped>
   
</style>