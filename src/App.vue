<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	body {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		background-image: url('./assets/img/000.jpg');
		background-size: cover;
		background-attachment: fixed;
		background-color: #e6e6e6;
	}
	
	ul, li{
		list-style: none;
	}
	
	.login,
	.reg {
		margin: 0 auto;
		max-width: 950px;
	}
	
	.login.container,
	.reg.container {
		min-width: 350px;
		max-width: 500px;
		padding: 30px;
		margin-top: 50px;
		border-radius: 8px;
		margin-bottom: 50px;
		background: rgba(255, 255, 255, 0.8);
		box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
	}
	
	.container h1 {
		text-align: center;
		margin-bottom: 35px;
	}
	
	.info.container {
		margin: 0 auto;
		width: 1200px;
		min-height: 800px;
		height: 101%;
		padding: 30px;
		margin-top: 45px;
		margin-bottom: 50px;
		background: rgba(47, 170, 113, 0.8);
		box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
	}
	
	.el-menu-vertical-demo {
		min-height: 800px;
	}
	
	.info-container {
		height: 800px;
		background-color: rgba(255, 255, 255, 0.5);
	}
	
	.left-container {
		padding: 0 30px;
		margin: 10px;
	}
	
	.left-inner {
		padding: 5px;
	}
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	
	.bg-purple {
		background: #d3dce6;
	}
	
	.bg-purple-light {
		background: #e5e9f2;
	}
	
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	
	.pagination-box {
		text-align: center;
		background: #fff
	}
	.movieImgList{
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: top;
	}
		
	.movieImgList li{
		padding: 5px;
	}
	.movieImgList img{
		max-height: 200px;
		border: 1px solid #FFF;
	}
</style>