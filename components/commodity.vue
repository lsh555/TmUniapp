<template>
	<view class="comm-view">
		<block v-for="(item, index) in commdata" :key="index">
		<view class="comm-card" @click="deTails(item._id)">
			<view class="comm-img">
				<image :src="item.image" mode="aspectFill"/>
			</view>
			<view class="comm-title">
				{{item.title}}
			</view>
			<view class="comm-left">
				<text>{{item.freight}}</text>
				<text>预计{{item.Duration}}h发货</text>
			</view>
			<view class="comm-right">￥{{item.Price}}</view>
		</view>
		</block>
	</view>
</template>

<script>
	export default{
		props:{commdata:Array},
		data() {
			return {
				datas:[
					{
						'img':'/static/pur/com.jpg',
						'titlea':'安踏篮球鞋安踏篮球鞋安踏篮球鞋安踏篮球鞋',
						'titleb':'退货运费险',
						'titlec':'预计24h发货',
						'titled':'聚划算价',
						'titlee':'￥1234'
					},
					{
						'img':'/static/pur/com.jpg',
						'titlea':'安踏篮球鞋安踏篮球鞋安踏篮球鞋安踏篮球鞋',
						'titleb':'退货运费险',
						'titlec':'每300减30',
						'titled':'聚划算价',
						'titlee':'￥1234'
					},
					{
						'img':'/static/pur/com.jpg',
						'titlea':'安踏篮球鞋安踏篮球鞋安踏篮球鞋安踏篮球鞋',
						'titleb':'退货运费险',
						'titlec':'每300减30',
						'titled':'聚划算价',
						'titlee':'￥1234'
					}
				]
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
	.comm-img{height: 450rpx;}
	.comm-img image{width: 100%; height: 450rpx;
	border-top-left-radius: 10upx;
	border-top-right-radius: 10upx;}
	.comm-card{
	width: calc(50% - 5rpx*2);
	margin: 5rpx;
	background: #FFFFFF;
	border-radius: 10upx;
	}
	.comm-title{font-size: 28rpx;
	height: 100rpx;
	line-height: 50rpx;
	padding-left: 10rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;  // 控制多行的行数
	-webkit-box-orient: vertical;
	}
	.comm-left{font-size: 20rpx; text-align: center;
	display: flex;
	align-items: center;
	padding-left: 10rpx;
	height: 50rpx;
	}
	.comm-left text{padding: 3rpx 4rpx;
	border-radius: 10rpx;
	}
	.comm-left text:nth-child(1){border: 2rpx solid #1183e6;
	margin-right: 10rpx;
	color: #1183e6;
	}
	.comm-left text:nth-child(2){border: 2rpx solid red; color: red;}
	.comm-right{font-size: 30rpx;
	font-weight: bold;
	color: #f3022f;
	height: 50rpx;
	line-height: 50rpx;
	padding-left: 10rpx;
	}
	.comm-view{display: flex; flex-wrap: wrap; padding: 0 5rpx;}
</style>
