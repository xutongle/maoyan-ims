import Vue from 'vue';
import Router from 'vue-router';

import Reg from './reg.vue';
import Login from './login.vue';
import Info from './info/info.vue';
import Users from './info/users/users.vue';
import AddUser from './info/users/adduser.vue';
import AddAdmin from './info/users/addadmin.vue';
import UserList from './info/users/userlist.vue';
import AdminList from './info/users/adminlist.vue';
import UpdateUser from './info/users/updateUser.vue';
import Movie from './info/movies/movies.vue';
import AddMovie from './info/movies/addmovie.vue';
import MovieList from './info/movies/movielist.vue';
import UpdateMovie from './info/movies/updatemovie.vue';
import MovieType from './info/movies/movietype/movietype.vue';
import AddMovieType from './info/movies/movietype/addmovietype.vue';
import MovieTypeList from './info/movies/movietype/movietypelist.vue';
import MovieImgs from './info/movies/imgs/img.vue';
import Studios from './info/studios/studios.vue';
import StudiosList from './info/studios/studiolist.vue';
import AddStudios from './info/studios/addstudio.vue';
import UpdateStudio from './info/studios/updatestudio.vue';

import Theater  from './info/studios/theaters/theater.vue';
import AddTheater  from './info/studios/theaters/addtheater.vue';
import Theaterlist from './info/studios/theaters/theatlist.vue';


import Schedule from './info/schedule/schedule.vue';
import AddSchedule from './info/schedule/addschedule.vue';
import Inquireschedule from './info/schedule/inquireschedule.vue';


Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		component: Login
	}, {
		path: '/login',
		component: Login
	}, {
		path: '/login/:username',
		component: Login
	}, {
		path: '/reg',
		component: Reg
	}, {
		path: '/info',
		component: Info,
		children: [{
			path: 'users',
			component: Users,
			children: [{
				path: 'adduser',
				component: AddUser
			}, {
				path: 'addadmin',
				component: AddAdmin
			}, {
				path: 'userlist',
				component: UserList
			}, {
				path: 'adminlist',
				component: AdminList
			},{
				path: 'updateUser/:data',
				component: UpdateUser
			}]
		}, {
			path: 'movie',
			component: Movie,
			children: [{
				path: 'addmovie',
				component: AddMovie
			}, {
				path: 'updatemovie/:movieID',
				component: UpdateMovie
			}, {
				path: 'movielist',
				component: MovieList
			}, {
				path: 'movietype',
				component: MovieType,
				children: [{
					path: 'addmovietype',
					component: AddMovieType
				}, {
					path: 'movietypelist',
					component: MovieTypeList
				}]
			}, {
				path: 'imgs/:movieID',
				component: MovieImgs
			}]
		}, {
			path: 'studios',
			component: Studios,
			children: [{
				path: 'studiolist',
				component: StudiosList
			},{
				path: 'addstudio',
				component: AddStudios
			},{
				path: 'updatestudio',
				component: UpdateStudio
			},{
				path: 'theaters',
				component: Theater,
				children:[{
					path: 'addtheater/:studioParams+',
					component: AddTheater,
				},{
					path: 'theatlist/:studioIDParams+',
					component: Theaterlist,
				}]
				
			}]
		},
			{
            path: 'schedule',
            component: Schedule,
            children: [{
                path: 'addschedule',
                component: AddSchedule
            },{
                path: 'inquireschedule',
                component: Inquireschedule
            }]
        }
        ]
	}]
});

/*

path: 'theaterlist',
component: Theaterlist

*/