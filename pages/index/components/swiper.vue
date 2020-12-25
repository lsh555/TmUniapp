<template>
	<view class="swiper-top">
		<view>
			<swiper :autoplay="false" :circular="true" :interval="2000" :duration="1000" @change="swiperfun">
				<block v-for="(item,index) in bannerdata" :key="index">
				<swiper-item>
					<view class="swiper-item" @click="deTails(item._id)">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
				</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 指示点 -->
		<view class="instruct-view">
			<block v-for="(item, index) in bannerdata" :key="index">
			<view class="instruct" :class="{active:index == num}">{{}}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			bannerdata:Array
		},
		data() {
			return {
				num:0
			}
		}, 
		methods:{
			swiperfun(e){
				this.num = e.detail.current
			},
			// 详情页
			deTails(id){
				console.log(id)
				uni.navigateTo({
					url:'../details/details?id=' + id
				})
			}
		},
		
	}
</script>

<style scoped>
	.swiper-top{height: 250upx; margin: 20upx 10upx;
	border-radius: 10upx;
	position: relative;
	}
	swiper{height: 250upx !important;
	background: yellow; border-radius: 10upx;
	overflow: hidden;}
	.swiper-item{height: 250upx !important;
	overflow: hidden;}
	.swiper-item image{width: 100%; height: 250upx !important; border-radius: 10upx;
	}
	/* 指示点 */
	.instruct-view{display: flex; justify-content: center;
	position: absolute;
	bottom: 10upx;
	left: 0;
	width: 100%;}
	.instruct{background: #4e90a6; height: 10upx; width: 30upx; border-radius: 50upx;
	margin: 0 10upx;
	}
	.active{background: #FFFFFF !important;}
</style>
