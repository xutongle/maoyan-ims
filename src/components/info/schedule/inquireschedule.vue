<template>
    <div>
        <el-form
                label-width="60px"
                :style="{display:'flex'}">
            <el-form-item label="电影">
                <el-select
                        v-model="selectmovies"
                        placeholder="请选择电影"
                        @change="getmovieid">
                    <el-option
                            v-for="item in movies"
                            :label="item.cName"
                            :value="item._id"
                            :style="{display: 'inline-block',width:'217px'}">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="影院">
                <el-select
                        v-model="cinema"
                        :disabled="cinemasisdisabled"
                        placeholder="请选择影院"
                        @change="getcinemaid">
                    <el-option
                            v-for="item in cinemas"
                            :label="item.name"
                            :value="item._id"

                            :style="{display: 'inline-block',width:'217px'}">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="放映厅">
                <el-select
                        v-model="auditorium"
                        placeholder="请选择放映厅"
                        @change="getauditoriumis"
                        :disabled="auditoriumisdisabled">
                    <el-option
                            v-for="item in auditoriums"
                            :label="item.name"
                            :value="item._id"
                            :style="{display: 'inline-block',width:'217px'}">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="操作">
                <el-button-group>
                    <el-button
                            type="primary"
                            icon="plus"
                            :disabled="btndisabled"
                            @click="save">查询</el-button>
                </el-button-group>

            </el-form-item>

        </el-form>
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
                    prop="showTime"
                    label="日期"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="_id"
                    label="排片ID">
            </el-table-column>
            <el-table-column label="操作"
                             width="180">
                <template scope="scope">
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>


</template>
<script>
    import 'babel-polyfill';
    import _axios from '../../axios';
    import router from "../../routers.js";
    export default {
        name: 'inquireschedule',
        data(){
            return{
                //列表
                movies:[],
                cinemas:[],
                auditoriums:[],
                //model
                selectmovies:'',
                auditorium:'',
                cinema:'',
                //ID
                movieid:'',
                cinemaid:'',
                auditoriumid:'',
                //是否禁用
                cinemasisdisabled:true,
                auditoriumisdisabled:true,
                btndisabled:true,

                page:1,
                rows:10,

                tableData:[]
            }
        },
        beforeMount(){
            this.getMovie();
            this.getCinemas();
        },
        methods:{
            //获取电影列表
            async getMovie() {
                let result =await _axios.post('/movies/getMoviesByPage');
                this.movies=result.data.rows;
            },
            //获取影院列表
            async getCinemas() {
                let result =await _axios.post('/studios/getStudios');
                this.cinemas=result.data.rows;
            },
            //获取放映厅
            async getauditorium(id) {
                let result =await _axios.post('/theaters/getTheatersByStudioID',{
                    studioID:id
                });
                this.auditoriums=result.data.rows
            },
            //获取选中的电影的id
            getmovieid(id){
                this.movieid=id;
                this.cinemasisdisabled=id.length==0;
                this.btnisdisabled()
            },
            //获取选中的影院id
            getcinemaid(id){
                this.cinemaid=id;
                this.getauditorium(id);
                this.auditoriumisdisabled=id=='';
                this.btnisdisabled()
            },
            //获取选中的放映厅id
            getauditoriumis(id){
                this.auditoriumid=id;
                this.btnisdisabled()
            },
            //提交按钮是否禁用
            btnisdisabled(){
                if(this.movieid!=''&&this.auditoriumid!=''&&this.cinemaid!=''){
                    this.btndisabled=false
                }else {
                    this.btndisabled=true
                }
            },
            async save(){
                let result =await _axios.post('/schedules/getSchedulesByMST',{
                    movieID:this.movieid,
                    studioID:this.cinemaid,
                    theaterID:this.auditoriumid,
                    page:this.page,
                    rows:this.rows
                });
                this.tableData=result.data.rows;
            },
            async handleDelete(index,row){
                let result =await _axios.post('/schedules/deleteByScheduleID',{
                    _id:row._id
                });
                this.save();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });

            }
        }
    }
</script>