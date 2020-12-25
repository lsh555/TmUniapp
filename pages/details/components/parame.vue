<template>
	<view v-if="couponif">
		<view class="Coupon-yin anim" :catchtouchmove="true" @click="hideCou()"></view>
		<view class="Coupon-view coup-anim">
			<view class="Coupon-title">产品参数</view>
			<block v-for="(item,index) in paramedata" :key="index">
				<div class="parame-view">
					<div class="parame-left">{{item.title}}</div>
					<div class="parame-right">{{item.label}}</div>
				</div>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponif: false,
				paramedata: [],
			}
		},
		methods: {
			hideCou() {
				this.couponif = false
			}
		},
		created() {
			//接收
			this.$bus.$on('parames', (v) => {
				let {
					show,
					data
				} = v
				this.paramedata = data
				this.couponif = show

			})
		}
	}
</script>

<style scoped>
	.parame-view {
		font-size: 28rpx;
		display: flex;
		border-bottom: 1px solid #F0F0F0;
		justify-content: flex-start;
		padding: 25rpx 15rpx;
	}

	.parame-left {
		width: 100upx;
		padding-right: 25upx;
	}

	.parame-right {
		flex: 1;
	}
</style>
