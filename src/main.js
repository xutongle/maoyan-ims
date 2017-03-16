// @Author: Mr_Lee 
// @E-mail: 1425894599@qq.com
// @仅供测试使用
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'element-theme-default';
import router from './components/routers.js';
import App from './App.vue';
Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});