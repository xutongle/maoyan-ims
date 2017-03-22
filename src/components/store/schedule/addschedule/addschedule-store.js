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
    BTN_IS_DISABLED,
    SAVE,
    RESET
}from '../mutations_type.js'

const state={
    movies:[],
    cinemas:[],
    auditoriums:[],
    //model
    selectmovies:'',
    auditorium:'',
    cinema:'',
    times:'2017-03-21 16:35:03',
    price:'30',
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
            return time.getTime()<Date.now()
        }
    }
};

const mutations={
    //获取选中的电影的id
    [GET_MOVIEID](state,id){
        state.movieid=id;
        state.cinemasisdisabled=id.length==0;
        if(state.selectmovies!=''&&state.auditorium!=''&&state.cinema!=''&&state.times!=''&&state.price!=''){
            state.btndisabled=false
        }else {
            state.btndisabled=true
        }
    },

    //获取选中的放映厅id
    [GET_AUDITORIUMIS](state,id){
        state.auditoriumsid=id;
        if(state.selectmovies!=''&&state.auditorium!=''&&state.cinema!=''&&state.times!=''&&state.price!=''){
            state.btndisabled=false
        }else {
            state.btndisabled=true
        }
    },

}

const actions={
    async [GET_MOVIE](context) {
        let result =await _axios.post('http://localhost:3010/movies/getMoviesByPage');
        context.state.movies=result.data.rows;
    },
    //获取影院列表
    async [GET_CINEMAS](context) {
        let result =await _axios.post('http://localhost:3010/studios/getStudios');
        context.state.cinemas=result.data.rows;
    },
    //获取选中的影院id
    async[GET_CINEMAID](context,id){
        context.state.cinemaid=id;
        context.state.auditoriumisdisabled=id=='';
        let result =await _axios.post('http://localhost:3010/theaters/getTheatersByStudioID',{
            studioID:id
        });
        context.state.auditoriums=result.data.rows;
        if(state.selectmovies!=''&&state.auditorium!=''&&state.cinema!=''&&state.times!=''&&state.price!=''){
            state.btndisabled=false
        }else {
            state.btndisabled=true
        }
    },
    [SAVE](context){
        context.state.auditoriumsid.forEach(function (theaterID) {
            let result =_axios.post('http://localhost:3010/schedules/addSchedule',{
                movieID:context.state.movieid,
                showTime:context.state.times,
                studioID:context.state.cinema,
                theaterID:theaterID,
                price:context.state.price
            })
        });

    },
    [RESET](context){
        context.state.selectmovies='';
        context.state.auditorium='';
        context.state.cinema='';
        context.state.times='';
        context.state.price='';
    }



}

const getters={

};
export default {
    state,
    mutations,
    getters,
    actions
}