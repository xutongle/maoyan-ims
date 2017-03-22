<template>
    <el-form label-width="120px">
                <el-form-item label="选择电影" filterable>
                    <el-select
                            v-model="ADD_SCHEDULE_store.selectmovies"
                            placeholder="请选择电影"
                            @change="GET_MOVIEID">
                        <el-option
                                v-for="item in ADD_SCHEDULE_store.movies"
                                :label="item.cName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择影院" filterable>
                    <el-select
                            v-model="ADD_SCHEDULE_store.cinema"
                            :disabled="ADD_SCHEDULE_store.cinemasisdisabled"
                            placeholder="请选择影院"
                            @change="GET_CINEMAID">
                        <el-option
                                v-for="item in ADD_SCHEDULE_store.cinemas"
                                :label="item.name"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择放映厅" filterable>
                    <el-select
                            v-model="ADD_SCHEDULE_store.auditorium"
                            multiple
                            placeholder="请选择放映厅"
                            @change="GET_AUDITORIUMIS"
                            :disabled="ADD_SCHEDULE_store.auditoriumisdisabled">
                        <el-option
                                v-for="item in ADD_SCHEDULE_store.auditoriums"
                                :label="item.name"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="放映时间">
                    <el-date-picker
                            v-model="ADD_SCHEDULE_store.times"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="ADD_SCHEDULE_store.pickerBeginDateBefore"
                            :style="{display: 'inline-block',width:'217px'}">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input
                            v-model="ADD_SCHEDULE_store.price"
                            placeholder="请输入价格"
                            @change="BTN_IS_DISABLED"
                            :style="{display: 'inline-block',width:'217px'}"
                            ></el-input>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button-group>
                        <el-button
                                type="primary"
                                icon="plus"
                                :disabled="ADD_SCHEDULE_store.btndisabled"
                                @click="save">确定</el-button>
                        <el-button
                                type="primary"
                                icon="delete"
                                @click="RESET">重置</el-button>
                    </el-button-group>

                </el-form-item>

            </el-form>

</template>

<script>
    import Vuex from 'vuex'
    import 'babel-polyfill';
    import _axios from '../../axios';
    import router from "../../routers.js";
    import {mapState,mapActions,mapMutations} from 'Vuex'
    import {GET_MOVIE,
        GET_CINEMAS,
        BTN_IS_DISABLED,
        GET_MOVIEID,
        GET_CINEMAID,
        GET_AUDITORIUMIS,
        SAVE,
        RESET} from'../../store/schedule/mutations_type'
    export default {
        name: 'addschedule',
        computed:mapState(['ADD_SCHEDULE_store']),
        beforeMount(){
            this.GET_MOVIE();
            this.GET_CINEMAS()
        },

        methods:{
            ...mapActions([
                GET_MOVIE,
                GET_CINEMAS,
                GET_CINEMAID,
                SAVE,
                RESET
                ]),
            ...mapMutations([
                GET_MOVIEID,
                GET_AUDITORIUMIS,
                BTN_IS_DISABLED,
            ]),
            save(){
                this.SAVE()
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            }
        }
    }
</script>