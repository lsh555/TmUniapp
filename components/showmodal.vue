<template>
	<view class="showmodel anim" v-if="modeling">
		<view class="showmodel-view">
			<view class="showmodel-tips">
				<text>请登录后在操作</text>
			</view>
			<view class="showmodel-button">
				<button plain="true" @click="cancel()">取消</button>
				<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
// 登录
import wxLogin from '../login/login.js'
export default{
	data() {
		return {
			modeling: false,
			// 更新收藏状态
			msg:''
		}
	},
	methods:{
		cancel(){
			this.modeling = false
		},
		// 
		showing(msg = ''){
			this.msg = msg
			this.modeling = true
		},
		// 登录
		async getUserInfo(event){
			new this.$Toast('登录中').showloading()
			this.modeling = false
			let {userInfo,errMsg} = event.detail
			try{
				let data = await new wxLogin(userInfo,errMsg).loGin()
				uni.hideLoading();
				if(this.msg == 'coll'){
					// 更新收藏状态
					this.$bus.$emit('collict', {colldata:data})
				}
			}catch(e){
				uni.hideLoading();
				console.log(e)
			}
		},
	}
}
</script>

<style scoped>
.showmodel{
	background: rgba(0,0,0,0.7);
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
}
.showmodel-view{
	background: white;
	width: 100%;
	margin: 0 90rpx;
	height: 280rpx;
	border-radius: 20rpx;
	position: relative;
}
.showmodel-tips{
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 190rpx;
}
.showmodel-tips text{display: block; text-align: center; font-size: 32rpx;}
.showmodel-button{
	border-top: 0.5rpx solid #FEECEA;
	display: flex; justify-content: space-between;
	align-items: center;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
}
.showmodel-button button{
	font-size: 32rpx;
	font-weight: bold;
	border: none;
	padding: 0 !important;
	margin: 0;
	width: 100%;
	border-radius: inherit;
}
.showmodel-button button:nth-child(1){border-right: 0.5rpx solid #FEECEA;}
.showmodel-button button:nth-child(2){color: #ff6699}
</style>
