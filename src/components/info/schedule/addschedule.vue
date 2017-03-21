<template>
    <el-form label-width="120px">
                <el-form-item label="选择电影" filterable>
                    <el-select
                            v-model="selectmovies"
                            placeholder="请选择电影"
                            @change="getmovieid">
                        <el-option
                                v-for="item in movies"
                                :label="item.cName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择影院" filterable>
                    <el-select
                            v-model="cinema"
                            :disabled="cinemasisdisabled"
                            placeholder="请选择影院"
                            @change="getcinemaid">
                        <el-option
                                v-for="item in cinemas"
                                :label="item.name"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择放映厅" filterable>
                    <el-select
                            v-model="auditorium"
                            multiple
                            placeholder="请选择放映厅"
                            @change="getauditoriumis"
                            :disabled="auditoriumisdisabled">
                        <el-option
                                v-for="item in auditoriums"
                                :label="item.name"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="放映时间">
                    <el-date-picker
                            v-model="times"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="pickerBeginDateBefore"
                            :style="{display: 'inline-block',width:'217px'}">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input
                            v-model="price"
                            placeholder="请输入价格"
                            @change="btnisdisabled"
                            :style="{display: 'inline-block',width:'217px'}"
                            ></el-input>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button-group>
                        <el-button
                                type="primary"
                                icon="plus"
                                :disabled="btndisabled"
                                @click="save">确定</el-button>
                        <el-button
                                type="primary"
                                icon="delete"
                                @click="reset">重置</el-button>
                    </el-button-group>

                </el-form-item>

            </el-form>

</template>

<script>
    import 'babel-polyfill';
    import _axios from '../../axios';
    import router from "../../routers.js";
    export default {
        name: 'addschedule',
        data(){
            return{
                //电影，影院，放映厅列表
                movies:[],
                cinemas:[],
                auditoriums:[],
                //model
                selectmovies:'',
                auditorium:'',
                cinema:'',
                times:'2017-03-21 16:35:03',
                price:'30',
                theaters:['F1','F2'],
                //选中的电影，影院，放映厅的ID
                movieid:[],
                cinemaid:'',
                auditoriumsid:[],
                //选择器与按钮是否禁用
                cinemasisdisabled:true,
                auditoriumisdisabled:true,
                btndisabled:true,

                pickerBeginDateBefore:{
                    disabledDate(time){
                        return time.getTime() < Date.now()
                    }
                },
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
                this.auditoriums=result.data.rows;
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
                this.auditoriumsid=id;
                this.btnisdisabled()
            },
            //提交按钮是否禁用
            btnisdisabled(){
                if(this.selectmovies!=''&&this.auditorium!=''&&this.cinema!=''&&this.times!=''&&this.price!=''){
                    this.btndisabled=false
                }else {
                    this.btndisabled=true
                }
            },
            save(){
                let movieID=this.movieid;
                let theaterID=this.auditoriumsid;
                let showTime=this.times;
                let studioID=this.cinema;
                let price=this.price;
                theaterID.forEach(function (theaterID) {
                    let result =_axios.post('/schedules/addSchedule',{
                        movieID:movieID,
                        showTime:showTime,
                        studioID:studioID,
                        theaterID:theaterID,
                        price:price
                    })
                });
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            reset(){
                this.selectmovies='';
                this.auditorium='';
                this.cinema='';
                this.times='';
                this. price='';
            }
        }
    }
</script>