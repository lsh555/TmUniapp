<template>
	<view class="Purchase-view">
		<view class="pur-flex">
			<!-- 左边 -->
			<view class="pur-left widthing">
				<view class="pur-top">
					<text>{{recomdata[0].title}}</text>
					<text>{{recomdata[0].lable}}</text>
				</view>
				<view class="pur-img">
					<block v-for="(item,index) in recomdata[0].image" :key="index">
					<view>
						<image :src="item.img" mode="widthFix" @click="deTails(item._id)"></image>
					</view>
					</block>
				</view>
			</view>
			<!-- 右边 -->
			<view class="pur-right widthing">
				<!-- 上 -->
				<view class="pur-right-top">
					<view class="pur-top two">
						<text>{{recomdata[1].title}}</text>
						<text>{{recomdata[1].lable}}</text>
					</view>
					<view class="pur-right-img">
						<block v-for="(item,index) in recomdata[1].image" :key="index">
						<view>
							<image :src="item.img" mode="widthFix" @click="deTails(item._id)"></image>
						</view>
						</block>
					</view>
				</view>
				<!-- 下 -->
				<view>
					<view class="pur-top three">
						<text>{{recomdata[2].title}}</text>
						<text>{{recomdata[2].lable}}</text>
					</view>
					<view class="pur-right-img">
						<block v-for="(item,index) in recomdata[2].image" :key="index">
						<view>
							<image :src="item.img" mode="widthFix" @click="deTails(item._id)"></image>
						</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		recomdata:Array
	},
	data() {
		return {
		}
	},
	methods:{
		deTails(id){
			console.log(id)
			uni.navigateTo({
				url:'../details/details?id=' + id
			})
		}
	}
}
</script>

<style scoped>
	.Purchase-view{background: #FFFFFF;
	margin: 0 10upx;
	border-radius: 10upx;}
	.pur-top{display: flex; align-items: center; height: 50upx;
	padding-left: 9upx;
	}
	.pur-top text:nth-child(1){font-size: 30upx; font-weight: bold;}
	.pur-top text:nth-child(2){font-size: 24upx; color: red; padding-left: 10upx;}
	/* 图片 */
	.pur-img{display: flex; flex-wrap: wrap;
	}
	.pur-img view{width: 50%; height: 150upx;
	display: flex;
	align-items: center;
	justify-content: center;}
	.pur-img image{width: 120upx; height: 120upx !important;}
	.pur-img view:nth-child(n+3){padding-top: 50upx;}
	.pur-right-img{display: flex; align-items: center;}
	.pur-right-img image{width: 120upx; height: 120upx;}
	.pur-right-img view{width: 50%; height: 150upx;
	display: flex;
	align-items: center;
	justify-content: center;
	}
	.pur-right{display: flex; flex-wrap: wrap;}
	.pur-right view{width: 100%;}
	.pur-flex{display: flex; align-items: center;}
	.widthing{width: 50%; box-sizing: border-box;}
	.pur-left{border-right: 1rpx solid #F1F1F1;}
	.pur-right-top{border-bottom: 1rpx solid #F1F1F1;}
	.two text:nth-child(2){color: #ff7594 !important;}
	.three text:nth-child(2){color: #96b06f !important;}
</style>

