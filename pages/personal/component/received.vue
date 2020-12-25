<template>
<view class="payment-view">
	<!-- 商品详情 -->
	<block v-for="(item,index) in tobepaid" :key='index'>
	<view class="payment-commodity">
		<text class="order-tips">卖家已发货</text>
		<block v-for="(iteming, indexs) in item.order" :key='indexs'>
		<view class="payment-order" @click="payDeatil(item._id)">
			<view class="payment-order-img">
				<image :src="iteming.image" mode="aspectFill"></image>
			</view>
			<view class="payment-title">
				<text>{{iteming.title}}</text>
				<text class="text-you">颜色:{{iteming.color}};尺码:{{iteming.size}}</text>
			</view>
			<view class="payment-flex">
				<view class="payment-price">
					<text>￥ {{iteming.price}}</text>
					<text class="text-you">x{{iteming.many}}</text>
				</view>
			</view>
		</view>
		</block>
		<!-- 价格 -->
		<view class="presonal-Price">实付款￥{{item.total_price}}</view>
		<!-- 付款 -->
		<view class="presonal-payment">
			<text @click="conRece(item._id)">确认收货</text>
		</view>
	</view>
	</block>
	<!-- 登录界面 -->
	<loginpage ref="loginmen"></loginpage>
	<!-- 没有相关订单 -->
	<ordering ref="orderload"></ordering>
</view>
</template>

<script>
import '../../../style/order.css'
export default{
	data() {
		return {
			tobepaid:[]
		}
	},
	methods:{
		// 获取待付款数据
		async Tobepaid(){
			try{
				let data = await new this.Request(this.Urls.m().gtbreceived).modeget()
				if(data.msg.errcode){
					this.$refs.loginmen.showing()
				}else if(data.msg == 'SUCCESS'){
					if(data.data.length == 0){
						this.tobepaid = []
						this.$refs.orderload.init()
					}else{
						this.tobepaid = data.data
					}
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		// 订单详情页
		payDeatil(id){
			let tip = {tips:'卖家已发货',sum:'实付款',show:true,text:'确认收货',id}
			let value = JSON.stringify(tip)
			uni.navigateTo({
				url:'../order-details/order?value=' + value
			})
		},
		// 确认收货
		async conRece(id){
			try{
				let data = await new this.Request(this.Urls.m().conreceipt + '?id=' + id).modeget()
				if(data.msg == 'SUCCESS'){
					this.Tobepaid()
					new this.$Toast('确认收货成功').showtoast()
				}
			}catch(e){
				//TODO handle the exception
			}
		}
	},
	
	created() {
		this.Tobepaid()
	},
	// 小程序的生命周期在子组件不会执行
	mounted() {
		this.$bus.$on('mycart',res=>{
			if(res.cart == 'SUCCESS'){
				this.Tobepaid()
			}
		})
	}
}
</script>

<style>
</style>
