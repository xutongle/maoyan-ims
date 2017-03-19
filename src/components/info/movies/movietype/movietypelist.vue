<template>
	<div class="movietypelistcontent">
		<el-table
		    :data="movietypelist"
		    border
		    style="width: 100%"
		    max-height="250">
    		<el-table-column
		      align='center'
		      prop="currType"
		      label="电影类型列表">
		    </el-table-column>
		    <el-table-column
		      align='center'
		      label="操作">
		      <template scope="scope">
		        <el-button
		          @click= "addBtn"
				  type="primary"
		          size="small">
		          新增
		        </el-button>
		         <el-button
		          @click.native.prevent="deleteRow(scope.$index, tableData4)"
		          type="primary"
		          size="small">
		          修改
		        </el-button>
		         <el-button
		          @click.native.prevent="deleteRow(scope.$index, movietypelist)"
		          type="primary"
		          size="small">
		          删除 
		        </el-button>
		      </template >
    		</el-table-column>
  		</el-table>
	</div>
</template>

<script>
import router from '../../../routers.js'
	export default {
		name: 'movietypelist',
		methods: {
			 addBtn(){
			 	router.push('addmovietype' );
			 },
		     deleteRow(index, rows) {
		       rows.splice(index, 1);
		     }
		   },
		   data() {
		     return {
		       movietypelist: [{
		         currType: '搞笑',
		         
		       }]
		     }
		   }
	}
</script>
<style>
	.movietypelistcontent{
		height:600px;
		
	}
</style>