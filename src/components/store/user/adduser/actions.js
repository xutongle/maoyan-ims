import 'babel-polyfill';
import axios from 'axios';

import {
	ADD_USER
} from './mutations_type.js';
export default {
	async [ADD_USER](context,{
		_id
	}) {
		let r = await axios.post('http://localhost:3010/users/reg', {
			...context.state.user
		});
		if(r.data){
		}
	}
}
