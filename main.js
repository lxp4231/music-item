import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局icon css文件
import '@/common/iconfont.css'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

// 注册全局过滤器
Vue.filter('formatCount',function(value){
	if(value >= 10000 && value <= 100000000){
		value /= 1000;
		return value.toFixed(1) + '万';
	}else if(value > 100000000){
		value /= 100000000;
		return value.toFixed(1) + '亿'
	}else{
		return value;
	}
});

Vue.filter('formatime',function(value){
	var data = new Date(value)
	return data.getFullYear() + '年' +( data.getMonth() + 1) + '月' + data.getDate() + '日'
})


// 挂载vuex
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
import store from '@/store';

const app = new Vue({
	store,
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

// 自定义工具
import utils from '@/common/utils.js'
Vue.use(utils, app)




app.$mount()
