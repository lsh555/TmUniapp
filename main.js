import Vue from 'vue'
import App from './App'
import store from './store/store.js'
Vue.prototype.$store = store

// 请求方式
import request from './api/api.js'
Vue.prototype.Request = request
// 请求地址
import urls from './api/request.js'
Vue.prototype.Urls = urls

// loading上拉加载
import loadn from 'components/loading-men.vue'
Vue.component('loader-on',loadn)
// 登录弹窗
import showmodal from 'components/showmodal.vue'
Vue.component('showmodal',showmodal)
// 登录纯页面
import loginpage from 'components/login-page.vue'
Vue.component('loginpage',loginpage)
// toast弹窗
import toast from 'public/toast.js'
Vue.prototype.$Toast = toast
//返回顶部
import backtop from 'components/backtop.vue'
Vue.component('backtop',backtop)
// 没有订单数据的提示
import ordering from 'components/ordering.vue'
Vue.component('ordering',ordering)

// 全局没有数据的提示样式
import './style/style.css'
//动画样式
import './pattern/animat.css'
//产品参数
import './pattern/styles.css'


Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
