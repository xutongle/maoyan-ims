<template>
	<div class="movietypelistcontent">
		<el-table
		    :data="movietypelist"
		    border
		    style="width: 100%"
		    max-height="550">
			<el-table-column
			  fixed
			  align='center'
			  type="index"
			  label="编号"
			  width="80">
			</el-table-column>
    		<el-table-column
    		  fixed
		      align='center'
		      prop="currType"
		      label="电影类型列表"
		      width="200">
		    </el-table-column>
			<el-table-column
		      fixed
		      align='center'
		      prop='typeId'
		      label="当前类型ID"
		      width="238">
		    </el-table-column>
		    <el-table-column
		      align='center'
		      label="操作">
		      <template scope="scope">
			        <el-button 
			        	@click= "addBtn" 
			        	type="success" 
			        	size="small">
			          新增
			        </el-button>
					<span
						@click='upData(scope.$index, movietypelist)'>
						<el-button  
							type="primary" 
							size="small"
							@click="dialogVisible = true">
							修改
						</el-button>
					</span>
					<el-button 
			         	@click.native.prevent="deleteRow(scope.$index, movietypelist)" 
			         	type="danger" 
			         	size="small">
			            删除 
			        </el-button>
			  </template >
    		</el-table-column>
  		</el-table>
  		<template>
  			<el-dialog 
  					title="修改" 
					v-model="dialogVisible" 
					size="tiny">
				  <el-input   
				  	placeholder="请输入内容"
				  	v-model='changeType.newType'>
				  </el-input>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <span @click="saveBtn">
				    	<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				    </span>
				  </span>
			</el-dialog>
  		</template>
		<div class="block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage4"
		      :page-sizes="pageSizes"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</div>







	</div>

</template>

<script>
import router from '../../../routers.js'
import axios from '../../../axios.js'
	export default {
		name: 'movietypelist',
		data(){
		   	return {
		   		currentPage4:1,
		   		pageSizes:[10,15,20,30,40],
		   		pageSize:10,
		   		total:0,

		   		
		   		changeType:{
		   			newType:'',
		   			newId:''
		   		},
		   		movietypelist:[
		   			{
		   				currType:'测试',
	     				typeId:''
	     			}
			    ],
			    dialogVisible: false,
			}
		},
		mounted(){
			this.getMovieTypeList()
		},
		methods: {
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		        this.getMovieTypeList();
		     },
		     handleCurrentChange(val) {
		        this.currentPage = val;
		        this.getMovieTypeList()
		        console.log(`当前页: ${val}`);
		        this.getMovieTypeList();
		     },
			 saveBtn(){
			 	axios.post('/movieType/update', {
			 		type:this.$data.changeType.newType,
 					_id:this.$data.changeType.newId
 				})
 				.then((response) => {
 					console.log(response)
 				})
 				.catch(function (error) {
 				  console.log(error);
 				});
 				this.getMovieTypeList()
			 },
			 upData(index, rows){ 
			 	var currTypeArr =[] ;
			 	var currnId = []
			 	for(var i = 0; i< rows.length;i++){
			 		currTypeArr.push(rows[i].currType)
			 		currnId.push(rows[i].typeId)
			 	}
				this.$data.changeType.newType = currTypeArr.slice(index,index+1).join("")
				this.$data.changeType.newId = currnId.slice(index,index+1).join("")
			 },
			 addBtn(){
			 	router.push('addmovietype' );
			 },
		     deleteRow(index, rows) {
		     var newArr = new Array();
		     var currnId = ""
		     for(var i = 0; i< rows.length; i++){
		     	newArr.push(rows[i].typeId ) 
		     }
		    rows.splice(index, 1);
		    currnId = newArr.slice(index, index+1)
		     	axios.post('/movieType/delete', {
 				_id:currnId
 				})
 				.then((response) => {
 					console.log(response)
 				})
 				.catch(function (error) {
 				  console.log(error);
 				});
 			this.getMovieTypeList();	
		     },
		     getMovieTypeList(){
		     		axios.post('/movieType/getMovieType', {
	     				page:1,
	     	    		rows:10
	     				})
	     				.then((response) => {
	     					console.log(response.data)
	     					var intData = this
	     					intData.total = response.data.total
	     					/*总页数，貌似插件不支持*/
	     					// intData.pageSize = response.data.maxPage

	     				console.log(intData.total)

	     					 this.movietypelist = [...response.data.rows.map( (item) =>{
	     					 	return {
	     					 		currType:item.type,
	     					 		typeId:item._id
	     					 	}
	     					 })]
	     					
	     				})
	     				.catch(function (error) {
	     				  console.log(error);
	     				});
		     }
		     
		},
		computed:{
			
		}
		

	}

</script>
<style >
	.movietypelistcontent{
		height:600px;
		
	}
	.block{
		margin: 80px auto 0;
		text-align: center;
	}
	
	
</style>
<!-- 
 		 tableRowClassName(row, index) {
		     	console.log(this.rows)
		        if (index === 1) {
		          return 'info-row';
		        } else if (index === 3) {
		          return 'positive-row';
		        }
		        return '';
	      	}	
 :current-page="currentPage4"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="40"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="400"
 		 	 -->