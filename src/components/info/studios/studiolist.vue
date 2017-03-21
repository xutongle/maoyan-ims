<template>
    <div class="studiolist left-inner">
        <el-table  :data="studiolist" border stripe style="width: 100%" type="expand">
            <el-table-column prop="name" label="影院名称" show-overflow-tooltip align='center'></el-table-column>
            <el-table-column prop="address" label="影院地址" show-overflow-tooltip align='center'></el-table-column>
            <el-table-column prop="auditorium" label="查看放映厅" show-overflow-tooltip align='center'>
                <template scope="scope">
                    <el-button type="primary" size='small'  >查看放映厅</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="_id" label="操作" align='center'>
                <template scope="scope">
                    <el-button-group>
                        <el-button type="primary" size='small' icon="edit">更新</el-button>
                        <el-button @click='deleteBtn' type="danger"  size='small' icon="delete">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
    import Vuex from 'vuex';
    import 'babel-polyfill';
    import _axios from "../../axios.js";
    import router from "../../routers.js";
    export default {
        name: 'studiolist',
        data(){
            return{
                studiolist:[]
        }
    },
    beforeMount(){
        this.getStudiosList()
    },
    methods:{
        deleteBtn(){

        },
        async getStudiosList(){
            var studiosData = await _axios.post("/studios/getStudios");

            this.studiolist = studiosData.data.rows
            console.log(studiosData)
        }
    }
    }
</script>