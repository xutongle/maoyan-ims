import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import {
	INFO_NAV_LIST
} from './info/info-store.js';
const INFO = {
	state: {
		INFO_NAV_LIST
	}
}

const store = new Vuex.Store({
	modules: {
		INFO
	}
});

export default store;