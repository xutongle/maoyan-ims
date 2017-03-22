<template>
    <div class="studiolist left-inner">
        <el-table  :data="studiolist" border stripe style="width: 100%" type="expand">
            <el-table-column align='center' type="index" label="编号" ></el-table-column>
            <el-table-column prop="name" label="影院名称" show-overflow-tooltip align='center'></el-table-column>
            <el-table-column prop="address" label="影院地址" show-overflow-tooltip align='center'></el-table-column>
            <el-table-column prop="auditorium" label="查看放映厅" show-overflow-tooltip align='center'>
                <template scope="scope">
                    <el-button @click='lookTheater(scope.$index, studiolist)' type="primary" size='small'  >查看放映厅</el-button>
                    <el-button @click='addTheater(scope.$index, studiolist)' type="success" size='small'  >新增放映厅</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="_id" label="操作" align='center'>
                <template scope="scope">
                    <el-button-group>
                        <span @click="dialogFormVisible = true" >
                            <el-button @click.native.prevent="changeStudioBtn(scope.$index, studiolist)"  type="primary" size='small' icon="edit">更改</el-button>
                        </span>
                        <el-button  @click.native.prevent="deleteBtn(scope.$index, studiolist)"  type="danger"  size='small' icon="delete">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-box" style="padding: 30px 0;" :modal='dialogFormVisible'>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1"  :page-sizes="pageSizes"  
            :page-size="pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        
            <el-dialog title="修改当前影院" v-model="dialogFormVisible" >
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
       
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import 'babel-polyfill';
    import axios from "../../axios.js";
    import router from "../../routers.js";
    export default {
        name: 'studiolist',
        data(){
            return{
                currentPage1: 1, //当前页 number 1
                pageSizes: [5, 10, 15, 20, 30, 40], //每页显示个数选择器选项设置
                pageSize: 0, //每页显示条目个数
                total: 4,
                studiolist:[],
                dialogFormVisible: false,
                form: {
                      name: '',
                      address: '',
                      _id:''
                    },
                formLabelWidth: '120px'
            }
        },
        beforeMount(){
            this.getStudiosList(1,10)
        },
        methods:{
        handleSizeChange(val) {
            this.getStudiosList(this.currentPage1, val);
            console.log(this.currentPage1)
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.getStudiosList(val, this.pageSize);
             console.log(`当前页: ${val}`);
        },//查看影厅
        lookTheater(index, rows){
            var newArr = []
            var studioName = []
            for (var i = 0; i < rows.length; i++) {
                newArr.push(rows[i]._id)

                studioName.push(rows[i].name)
            }
            console.log(studioName[index])
            router.push('/info/studios/theaters/theatlist/'  + newArr[index]  )

            // newArr = rows.splice(index, 1);
            // this.form._id = newArr[index]._id
            // console.log(this.form._id)
        },//点击修改影院信息
        addTheater(index, rows){
            var currID = []
            var currName = []
            for (var i = 0; i < rows.length; i++) {
                currID.push(rows[i]._id)
                currName.push(rows[i].name)
            }
            router.push('/info/studios/theaters/addtheater/' + currName[index] + "&" + currID[index])
        },
        changeStudioBtn(index, rows){
            var newArr = []
            for (var i = 0; i < rows.length; i++) {
                newArr.push(rows[i]._id)
            }
            console.log(newArr)
            newArr = rows.splice(index, 1);
            this.form.name = newArr[0].name
            this.form.address = newArr[0].address
            this.form._id = newArr[0]._id
        },//保存影院信息的修改
        savaChange(){
            axios.post('/studios/updateByID', {
                _id: this.form._id,
                name: this.form.name,
                address: this.form.address
            })
            .then((response) => {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error);
            });
            this.getStudiosList(this.currentPage1, this.pageSize)
        },//删除当前影院
        deleteBtn(index, rows){
            var newArr = new Array();
            var currnId = ""
            for (var i = 0; i < rows.length; i++) {
                newArr.push(rows[i]._id)
            }
            rows.splice(index, 1);
            currnId = newArr.slice(index, index + 1)
            axios.post('/studios/deleteByID', {
                    _id: currnId
                })
                .then((response) => {
                    // console.log(response)
                })
                .catch(function(error) {
                    console.log(error);
                });
        },//获取影院列表
        async getStudiosList(page, rows){
            await axios.post("/studios/getStudios",{
                page:page,
                rows:rows,
                })
                .then((response) =>{
                     // console.log(response)
                     this.studiolist = response.data.rows
                     this.pageSize = rows
                     this.total = response.data.total
                });
        }
    }
}
</script>