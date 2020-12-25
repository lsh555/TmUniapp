//request请求
import {errdata} from 'api/errdata.js'
let Base64= require('./base64.js').Base64

const request = class {
	constructor(url, arg) {
		this.url = url
		this.arg = arg
	}

	// post请求
	modepost() {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title:'加载中'
			})
			uni.request({
					url: this.url,
					method: 'POST',
					data: this.arg,
					header:{Authorization:this.baseFun()}
				})
				.then(res => {
					resolve(res[1].data)
					uni.hideLoading()
				})
				.catch(err => {
					reject(err)
					let errs = '服务器错误 请稍后再试'
					errdata.errlist(errs)
				})
		})
	}
	// get请求
	modeget() {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title:'加载中'
			})
			uni.request({
					url: this.url,
					method: 'GET',
					header:{Authorization:this.baseFun()}
				})
				.then(res => {
					resolve(res[1].data)
					uni.hideLoading()
				})
				.catch(err => {
					reject(err)
					let errs = '服务器错误 请稍后再试'
					errdata.errlist(errs)
				})
		})
	}
	baseFun(){
		  const token = uni.getStorageSync('wxuser').token
		  const base64 = Base64.encode(token+':')
		  return 'Basic ' + base64
	}
}

export default request
