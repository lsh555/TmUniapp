<template>
	<view class="login-page" v-if="login">
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
	</view>
</template>

<script>
// 登录
import wxLogin from '../login/login.js'
export default{
	data() {
		return {
			login: false
		}
	},
	methods:{
		showing(boll=true){
			this.login = boll
		},
		async getUserInfo(event){
			let {userInfo,errMsg} = event.detail
			new this.$Toast('登录中').showloading()
			try{
				let data = await new wxLogin(userInfo,errMsg).loGin()
				// 登录成功更换页面
				this.$bus.$emit('mycart', {cart:data})
				this.login = false
				uni.hideLoading();
			}catch(e){
				uni.hideLoading();
			}
		},
	}
}
</script>

<style scoped>
.login-page{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #FFFFFF;
	z-index: 999;
}
.login-page button{
	width: 350rpx;
}
</style>
