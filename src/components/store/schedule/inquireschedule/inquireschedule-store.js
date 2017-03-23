/**
 * Created by lyh on 2017/3/23.
 */
/**
 * Created by lyh on 2017/3/22.
 */
import 'babel-polyfill'
import _axios from 'axios'
import {
    GET_MOVIE,
    GET_CINEMAS,
    GET_AUDITORIUM,

    GET_MOVIEID,
    GET_CINEMAID,
    GET_AUDITORIUMIS,
    GET_CINEMAS_BY_MOVIEID

}from '../mutations_type.js'

const state={
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

    page:1,
    rows:10,
    total:0,
    pagesizes:[],
    alldata:[],
    tableData:[]
};

const mutations={
    //获取选中的电影的id
    [GET_MOVIEID](state,id){
        state.movieid=id;

    },

    //获取选中的放映厅id
    [GET_AUDITORIUMIS](state,id){
        state.auditoriumid=id;
    },
}

const actions={
    async [GET_MOVIE](context) {
        let result =await _axios.post('http://localhost:3010/movies/getMoviesByPage');
        context.state.movies=result.data.rows;
    },
    //获取影院列表
    async [GET_CINEMAS_BY_MOVIEID](context) {
        let time=new Date();
        let result =await _axios.post('http://localhost:3010/schedules/getStudiosByMovieID',{
            movieID:state.movieid,
            time:`${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
        });
        context.state.cinemas=result.data.rows;
    },
    //获取选中的影院id和该影院的放映厅
    async[GET_CINEMAID](context,id){
        context.state.auditorium='';
        context.state.cinemaid=id;
        let result =await _axios.post('http://localhost:3010/theaters/getTheatersByStudioID',{
            studioID:id
        });
        context.state.auditoriums=result.data.rows;
    },



}

const getters={

};
export default {
    state,
    mutations,
    getters,
    actions
}