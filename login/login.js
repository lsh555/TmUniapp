// 请求方式
import request from '../api/api.js'
// 请求地址
import urls from '../api/request.js'
import toast from '../public/toast.js'
class wxLogin{
	constructor(user,msg) {
	    this.wxuser = user
		this.msg = msg
	}
	
	async loGin(){
		// 用户头像，昵称，code
		if(this.msg != 'getUserInfo:ok')
		{	
			throw ('拒绝登录')
		}
		let userdata = await this.wxlogin()
		// 请求接口：登录
		try{
			let user = await new request(urls.m().wxlogin,userdata).modepost()
			if(user.msg == 'SUCCESS'){
			uni.setStorageSync('wxuser',user.data)
			new toast('登录成功').showtoast()
			return('SUCCESS')
			}
		}catch(e){
			return e
		}
	}
	// 获取code
	wxlogin(){
		let {nickName,avatarUrl} = this.wxuser
		return new Promise((resolve,reject)=>{
			wx.login({
				success:(res)=>{
					let data = {
						appid:'',
						secret:'',
						nickName,
						avatarUrl,
						code:res.code
					}
					resolve(data)
				},
				fail:(err)=>{
					reject('登录失败')
				}
			})
		})
	}
}

export default wxLogin