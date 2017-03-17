<template>
	<div class="info container">
		<el-row>
			<el-col :span="4">
				<el-menu :router=true unique-opened class="el-menu-vertical-demo">
					<el-submenu v-for="item in INFO.INFO_NAV_LIST" :index='item.title'>
						<template slot="title">{{item.title}}</template>
						<el-menu-item v-for='sub in item.children' :index="sub.url">{{sub.title}}</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span='20' class='info-container'>
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>


<script>
	import Vuex from 'vuex';
	export default {
		name: 'info',
		computed: Vuex.mapState(["INFO"]),
		methods: {    
		...mapMutations(['GET_MOVIE_BY_ID'])
		}
	}
</script>