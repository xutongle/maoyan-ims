<template>
    <div>
        <el-form
                label-width="60px"
                :style="{display:'flex'}">
            <el-form-item label="电影">
                <el-select
                        v-model="INQUIRE_SCHEDULE_store.selectmovies"
                        placeholder="请选择电影"
                        @change="getmovieid">
                    <el-option
                            v-for="item in INQUIRE_SCHEDULE_store.movies"
                            :label="item.cName"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="影院">
                <el-select
                        v-model="INQUIRE_SCHEDULE_store.cinema"
                        :disabled="cinemasisdisabled"
                        placeholder="请选择影院"
                        @change="getcinemaid">
                    <el-option
                            v-for="item in INQUIRE_SCHEDULE_store.cinemas"
                            :label="item.name"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="放映厅">
                <el-select
                        v-model="INQUIRE_SCHEDULE_store.auditorium"
                        placeholder="请选择放映厅"
                        @change="getauditoriums"
                        :disabled="auditoriumisdisabled">
                    <el-option
                            v-for="item in INQUIRE_SCHEDULE_store.auditoriums"
                            :label="item.name"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="操作">
                <el-button-group>
                    <el-button
                            type="primary"
                            icon="search"
                            :disabled="btndisabled"
                            @click="save">查询</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-table
                :data="INQUIRE_SCHEDULE_store.tableData"
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
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="INQUIRE_SCHEDULE_store.page"
                :page-sizes="INQUIRE_SCHEDULE_store.sizes"
                :page-size="INQUIRE_SCHEDULE_store.rows"
                layout="total, sizes, prev, pager, next, jumper"
                :total="INQUIRE_SCHEDULE_store.total">
        </el-pagination>
    </div>


</template>
<script>
    import 'babel-polyfill';
    import _axios from '../../axios';
    import router from "../../routers.js";
    import Vuex from 'vuex';
    import {mapState,mapActions,mapMutations} from 'Vuex'
    import {GET_MOVIE,
        GET_CINEMAS,
        BTN_IS_DISABLED,
        GET_MOVIEID,
        GET_CINEMAID,
        GET_AUDITORIUMIS,
        GET_CINEMAS_BY_MOVIEID
        } from'../../store/schedule/mutations_type'

    export default {
        name: 'inquireschedule',
        computed:mapState(['INQUIRE_SCHEDULE_store']),
        data(){
            return{
                //是否禁用
                cinemasisdisabled:true,
                auditoriumisdisabled:true,
                btndisabled:true,
            }
        },
        beforeMount(){
            this.GET_MOVIE();
        },
        methods:{
            ...mapMutations([
                GET_MOVIEID,
                GET_AUDITORIUMIS,
            ]),
            ...mapActions([
                GET_MOVIE,
                GET_CINEMAS_BY_MOVIEID,
                GET_CINEMAID
            ]),

            //获取选中的电影的id并调用获取影院列表的方法
            getmovieid(id){
                this.GET_MOVIEID(id)
                this.GET_CINEMAS_BY_MOVIEID(id);
                this.cinemasisdisabled=id.length==0;
                this.btnisdisabled()
            },
            //获取选中的影院id和该影院的放映厅
            getcinemaid(id){
                this.GET_CINEMAID(id);
                this.auditoriumisdisabled=id=='';
                this.btnisdisabled()
            },
            getauditoriums(id){
                this.GET_AUDITORIUMIS(id);
                this.btnisdisabled()
            },
            //提交按钮是否禁用
            btnisdisabled(){
                if(this.INQUIRE_SCHEDULE_store.movieid!=''&&
                    this.INQUIRE_SCHEDULE_store.auditoriumid!=''&&
                    this.INQUIRE_SCHEDULE_store.cinemaid!=''){
                    this.btndisabled=false
                }else {
                    this.btndisabled=true
                }
            },
            //查询
            async save(){
                let result =await _axios.post('/schedules/getSchedulesByMST',{
                    movieID:this.INQUIRE_SCHEDULE_store.movieid,
                    studioID:this.INQUIRE_SCHEDULE_store.cinemaid,
                    theaterID:this.INQUIRE_SCHEDULE_store.auditoriumid,
                });
                this.INQUIRE_SCHEDULE_store.alldata=result.data.rows;
                this.INQUIRE_SCHEDULE_store.tableData=this.INQUIRE_SCHEDULE_store.alldata
                    .slice(
                        (this.INQUIRE_SCHEDULE_store.page-1)*this.INQUIRE_SCHEDULE_store.rows,
                        this.INQUIRE_SCHEDULE_store.page*this.INQUIRE_SCHEDULE_store.rows);
                this.INQUIRE_SCHEDULE_store.total=this.INQUIRE_SCHEDULE_store.alldata.length;
                this.INQUIRE_SCHEDULE_store.pagesizes=[10,20,50]
            },
            handleDelete(index,row){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let result =_axios.post('/schedules/deleteByScheduleID',{
                        _id:row._id
                    });
                    this.save();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleSizeChange(val) {
                this.INQUIRE_SCHEDULE_store.rows=val;
                this.INQUIRE_SCHEDULE_store.tableData=this.INQUIRE_SCHEDULE_store.alldata
                    .slice(
                        (this.INQUIRE_SCHEDULE_store.page-1)*this.INQUIRE_SCHEDULE_store.rows,
                        this.INQUIRE_SCHEDULE_store.page*this.INQUIRE_SCHEDULE_store.rows
                    );
            },
            handleCurrentChange(val) {
                this.INQUIRE_SCHEDULE_store.page = val;
                this.INQUIRE_SCHEDULE_store.tableData=this.INQUIRE_SCHEDULE_store.alldata
                    .slice(
                        (this.INQUIRE_SCHEDULE_store.page-1)*this.INQUIRE_SCHEDULE_store.rows,
                        this.INQUIRE_SCHEDULE_store.page*this.INQUIRE_SCHEDULE_store.rows
                    );
            }
        }
    }
</script>