<template>
	<view>
		<block v-for="(item,index) in adddata" :key="index">
		<view class="my-address-view">
			<view class="my-address-name" @click="getAdd(item)">
				<text>{{item.address}}</text>
				<view class="my-address-adding">
					<text>{{item.name}}</text>
					<text>{{item.mobile}}</text>
				</view>
			</view>
			<view class="my-address-change" @click="chAnge('001',item)">
				<image src="../../static/loading/genggai.svg" mode="widthFix"></image>
			</view>
		</view>
		</block>
		<!-- 新增收货地址 -->
		<view class="button-address" @click="chAnge('002')">
			<image src="../../static/loading/xinzeng.svg" mode="widthFix"></image>
			<text>新增收货地址</text>
		</view>
		<!-- 登录界面 -->
		<loginpage ref="loginmen"></loginpage>
		<!-- 没有收货地址 -->
		<view class="empty-cart" v-if="searchno">
			<image src="../../static/search/sousuono.svg" mode="widthFix"></image>
			<text>你还没有收货地址</text>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			adddata:[],
			searchno:false
		}
	},
	methods:{
		async getadd(){
			try{
				let data = await new this.Request(this.Urls.m().gainadd).modeget()
				if(data.msg.errcode){
					// 需要登录
					this.$refs.loginmen.showing()
				}else if(data.data.length === 0){
					this.searchno = true
				}else{
					this.searchno = false
					this.$refs.loginmen.showing(false)
					this.adddata = data.data
				}
			}catch(e){
				console.log(e)
			}
		},
		// 更改，新增收货地址
		chAnge(value='002',data=[]){
			let obj = {value,data}
			let str = JSON.stringify(obj)
			wx.navigateTo({
				url:'./new-address?value=' + str
			})
		},
		// 跳转到订单页面
		getAdd(item){
			// console.log(item)
			this.$store.commit('mutaadd', item)
			uni.navigateBack({
			    delta: 1
			});
		}
	},
	
	onShow() {
		this.getadd()
	},
	mounted() {
		this.$bus.$on('mycart', res=> {
			if(res.cart == 'SUCCESS'){
				this.getadd()
			}
		})
	},
}
</script>

<style>
page{background-color: #F2F2F2;}
.my-address-view{
font-size: 30upx;
background: #FFFFFF; margin: 10upx;
padding: 0 10upx;
border-radius: 10upx;
display: flex;
align-items: center;
justify-content: space-between;
}
.my-address-name{
flex: 1;
height: 130rpx;
display: flex;
flex-direction: column;
justify-content: center;
}
.my-address-name view{display: flex; align-items: center;}
.my-address-change{width: 50upx; height: 50upx;}
.my-address-change image{width: 50upx; height: 50upx;}
.my-address-adding{color: #A7A7A7; padding-top: 8upx;}
.my-address-adding text:nth-child(1){padding-right: 15upx;}
/* 新增收货地址 */
.button-address{
font-size: 30upx;
display: flex; align-items: center;
justify-content: center;
height: 100upx;
background: #FFFFFF;
position: fixed;
bottom: 0;
left: 0;
right: 0;
}
.button-address image{width: 50upx; height: 50upx;
padding-right: 20upx;
}
</style>
