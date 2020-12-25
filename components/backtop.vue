<template>
	<view class='back-top' @click="backTop()">
		<image src="../static/top.png" />
	</view>
</template>

<script>
	export default {
         methods:{
			 backTop(){
				 wx.pageScrollTo({
				 	scrollTop: 0,
				 	duration: 300
				 })
			 }
		 }
	}
</script>

<style lang="scss" scoped>
	.back-top {
		position: fixed;
		right: 16rpx;
		bottom: 10rpx;
	}

	.back-top image {
		width: 90rpx;
		height: 90rpx;
	}
</style>
