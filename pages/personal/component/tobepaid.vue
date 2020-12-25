<template>
<view class="payment-view">
	<!-- 商品详情 -->
	<block v-for="(item,index) in tobepaid" :key="index">
	<view class="payment-commodity">
		<text class="order-tips" v-if="item.expire">该订单已过期</text>
		<text class="order-tips" v-else>等待买家付款</text>
		<block v-for="(iteming,indexs) in item.order" :key="indexs">
		<view class="payment-order" @click="!item.expire && payDetail(item._id)">
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
		<view class="presonal-Price">需付款￥{{item.total_price}}</view>
		<!-- 付款 -->
		<view class="presonal-payment">
			<text v-if="item.expire" @click="deteOrder(item._id)">删除订单</text>
			<text v-else @click="payMent({_id:item._id,timeStamp:item.timeStamp,nonceStr:item.nonceStr,package:item.package,signType:item.signType,paySign:item.paySign,out_trade_no:item.out_trade_no})">付款</text>
		</view>
	</view>
	</block>
	<!-- 登录界面 -->
	<loginpage ref="loginmen"></loginpage>
	<!-- 没有订单数据 -->
	<ordering ref="orderload"></ordering>
</view>
</template>

<script>
import '../../../style/order.css'
const {Payment} = require('../../../public/payment.js')
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
				let data = await new this.Request(this.Urls.m().tobepaid).modeget()
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
		payDetail(id){
			let tip = {tips:'等待买家付款',sum:'需付款',show:true,text:'付款',id}
			let value = JSON.stringify(tip)
			uni.navigateTo({
				url:'../order-details/order?value=' + value
			})
		},
		//在付款
		payMent(obj){
			new this.$Toast('正在下单').showloading()
			new Payment(obj).paySucc()
			.then(res=>{
				this.Tobepaid()
				new this.$Toast('支付成功').showtoast()
			})
			.catch(err=>{
				new this.$Toast('支付失败','none').showtoast()
			})
		},
		// 删除订单
		async deteOrder(id){
			try{
				let data = await new this.Request(this.Urls.m().deleorder + '?orderid=' + id).modeget()
				if(data.msg == 'SUCCESS'){
					this.Tobepaid()
					new this.$Toast('删除成功').showtoast()
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
