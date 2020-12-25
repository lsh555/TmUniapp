<template>
	<!-- 没有订单数据 -->
<view class="empty-cart" v-if="emcart">
	<image src="http://h.thexxdd.cn/video/tianmao/noorder.png" mode="aspectFit"></image>
	<text>没有相关订单数据</text>
</view>
</template>

<script>
export default{
	data() {
		return {
			emcart: false
		}
	},
	methods:{
		init(od=true){
			this.emcart = od
		}
	}
}
</script>

<style>
</style>
