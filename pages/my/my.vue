<template>
<view class="my-view">
	<view class="my-view-user">
		<view>
			<image v-if="usering" src="/static/details/weidenglu.svg" mode="widthFix"></image>
			<image v-else :src="userdata.avatarUrl" mode="widthFix"></image>
		</view>
		<view class="my-view-name">
			<button v-if="usering" plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登录</button>
			<text v-else>{{userdata.nickName}}</text>
		</view>
	</view>
	<!-- 菜单 -->
	<view class="my-menu">
		<block v-for="(item,index) in datas" :key="index">
			<view @click="myIng(index)">
				<image :src="item.img" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
		</block>
	</view>
</view>
</template>

<script>
import wxLogin from '../../login/login.js'
export default{
	data() {
		return {
			datas: [
				{
					'img':'/static/details/daifukuan.svg',
					'name':'待付款'
				},
				{
					'img':'/static/details/daifahuo.svg',
					'name':'待发货'
				},
				{
					'img':'/static/details/daishouhuo.svg',
					'name':'待收货'
				},
				{
					'img':'/static/details/daipingjia.svg',
					'name':'待评价'
				}
			],
			usering:true,
			userdata:{}
		}
	},
	methods:{
		ifUser(){
			let user = uni.getStorageSync('wxuser')
			console.log(user)
			if(!user){
				this.usering = true
			}else{
				this.usering = false
				this.userdata = user
			}
		},
		// 触发登录
		async getUserInfo(event){
			let {userInfo,errMsg} = event.detail
			try{
				let data = await new wxLogin(userInfo,errMsg).loGin()
				console.log(data)
				this.ifUser()
			}catch(e){
				//TODO handle the exception
			}
		},
		// 详情页
		myIng(index){
			wx.navigateTo({
				url:'../personal/personal?index=' + index
			})
		}
	},
	onShow() {
		this.ifUser()
	}
}
</script>

<style scoped>
.my-view{
background: linear-gradient(to top, #ff0714 10%, #ff3388 100%);
height: 500upx;
border-bottom-left-radius: 50upx;
border-bottom-right-radius: 50upx;
position: relative;
}
.my-view-user{height: 100upx;
display: flex;
align-items: center;
position: absolute;
left: 50upx;
top: 170upx;
/* width: 100%; */
color: #FFFFFF;
}
.my-view-user text{display: block;}
.my-view-user image{width: 100upx; height: 100upx; border-radius: 50%;}
.my-view-user view:nth-child(1){width: 100upx; height: 100upx;}
.my-view-name text{font-size: 32upx;}
.my-view-name button{border: none;font-size: 32upx;
color: #FFFFFF;
padding: 0 !important;
}
.my-view-name{padding-left: 20upx;}
.my-menu{height: 200upx; background: #FFFFFF;
position: absolute;
top: 350upx;
left: 35upx;
right: 35upx;
border-radius: 10upx;
/* margin: 0 35upx; */
box-shadow: 0upx 10rpx 10rpx #e9e9e9;
display: flex;
align-items: center;
justify-content: space-around;
font-size: 28upx;
}
.my-menu image{width: 45upx; height: 45upx;
display: block;
align-self: center;
padding-bottom: 10upx;
}
.my-menu view{
display: flex;
flex-direction: column;
}
</style>
