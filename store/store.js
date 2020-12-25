import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 详情页的购物多少条
const cartnum = {
	nums:''
}

//收货地址页面携带数据跳转到下单页
const addordr = {
	address:{}
}

const state = {
	cartnum,
	addordr
}

export default new Vuex.Store({
	state,
	mutations:{
		// 详情页的购物多少条
		mutacart(state,nums){
			// console.log(nums)
			state.cartnum = {nums}
		},
		//收货地址页面携带数据跳转到下单页
		mutaadd(state,address){
			console.log(address)
			state.addordr = {address}
		}
	}
})