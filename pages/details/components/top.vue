<template>
	<view>
		<view class="navs-view">
			<view class="navs-image" :style=" 'height:' + tophight.height + 'px;' " @click="pageRe()">
				<image src="../../../static/details/fanhuibai.jpg" mode="widthFix"></image>
			</view>
			<view class="navs">
				<block v-for="(item, index) in navalue" :key="index">
					<view class="navs-nav" :class="{ navactivetext: index == num }" :style=" 'height:' + tophight.height + 'px;' + 'line-height:' + tophight.height + 'px;' "
					 @click="navbtn(index)">{{item.name}}</view>
				</block>
			</view>
			<view style="width: 20px; padding-right: 20rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tophight: Object,
			currentIndex: Number
		},
		data() {
			return {
				num: 0,
				navalue: [{
						name: '商品'
					},
					{
						name: '评价'
					},
					{
						name: '详情'
					}
				]
			}
		},
		watch: {
			currentIndex(newval) {
				this.num = newval
			}
		},
		methods: {
			navbtn(index) {
				this.num = index
				if (index === 0) {
					this.backTop()
				} else {
					const data = {
						isScroll: false,
						index: index
					}
					this.$parent.fatherMethod(data)
				}
			},
			// 回到顶部
			backTop() {
				// if (wx.pageScrollTo) {
				wx.pageScrollTo({
					scrollTop: 0,
					duration: 300
					// })
				})
			},
			// 返回上一页面
			pageRe() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style scoped>
	.navs-nav {
		font-size: 30upx;
		width: 100upx;
		text-align: center;
		color: #464230;
	}

	.navs-image image {
		width: 20px;
		height: 20px;
	}

	.navs-image {
		width: 20px;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}

	.navs {
		display: flex;
		justify-content: center;
		align-self: center;
	}

	.navactivetext {
		border-bottom: 5upx solid #3d3b32;
	}

	.navs-view {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
