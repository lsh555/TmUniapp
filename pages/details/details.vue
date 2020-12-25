<template>
	<view class="detail">
		<!-- 返回按钮 -->
		<view class="header-fixed backno" v-show="showAbs">
			<view class="status_bar" :style="'height:' + tophight.top + 'px;'"></view>
			<view class="navs-image" :style=" 'height:' + tophight.height + 'px;' " v-show="showAbs" @click="pageRe()">
				<image src="/static/details/fanhuibai.jpg" mode="widthFix"></image>
			</view>
		</view>
		<!--2-->
		<view class="header-fixed backyes" v-show="!showAbs" :style="{opacity:styleObject}">
			<view class="status_bar" :style="'height:' + tophight.top + 'px;'"></view>
			<Top :tophight="tophight" :currentIndex="currentIndex"></Top>
		</view>
		<!-- 图片视频宣传 -->
		<!-- 注意:如果含有视频播放，在子组件里面无法触发视频播放，必须要在父组件 -->
		<view>
			<swiper :indicator-dots="dots" :interval="3000" :duration="1000" :circular="true" indicator-color="rgba(216, 216, 216)"
			 indicator-active-color="#7a7a7a" @change="bannerfun" :enable-progress-gesture="false">
				<block v-for="(iteming,index) in imagetext[0].media" :key="index">
					<swiper-item class="swiper-video" v-if="iteming.video != '' ">
						<view class="video-btn">
							<view>
								<video id="myVideo" ref="myVideo" :src="iteming.video" controls :show-center-play-btn="false" :controls="contimg"
								 object-fit="cover" @play="playFun()" @pause="pauseFun()" @ended="endedFun()">
								</video>
							</view>
							<view class="video-img" @tap="videoPlay()" v-show="startVideo">
								<image src="../../static/details/bofang.svg" mode=""></image>
							</view>
						</view>
					</swiper-item>
					<block v-for="(item,indexing) in iteming.imgArray" :key="indexing">
						<swiper-item>
							<view>
								<image :src="item" mode="aspectFill" class="imageurl" @click="previmg(indexing,iteming.imgArray)"></image>
							</view>
						</swiper-item>
					</block>
				</block>
			</swiper>
		</view>
		<!-- 价格标题 -->
		<Price :priceetc="priceetc"></Price>
		<!-- 评价 -->
		<Evaluate :comment="comment" class="evaluate"></Evaluate>
		<!-- 商品详情图 -->
		<Product :priceetc="priceetc" class="product"></Product>
		<!-- 参数 -->
		<Parame></Parame>
		<!-- 购物篮 -->
		<Shopping :goodid="goodid" :colldata="colldata" :cartdata="cartdata"></Shopping>
		<!-- SKU -->
		<Addtocart ref="addto" :skudata="skudata"></Addtocart>
	</view>
</template>

<script>
	import {
		Logic
	} from '../../public/logic.js'
	import Top from './components/top.vue'
	import Price from './components/price.vue'
	import Parame from './components/parame.vue'
	import Evaluate from './components/evaluate.vue'
	import Product from './components/product.vue'
	import Shopping from './components/shopping.vue'
	//公用的商品sku选择组件
	import Addtocart from '../../components/addtocart.vue'
	export default {
		data() {
			return {
				// 是否显示指示点
				dots: false,
				// 胶囊按钮数据
				tophight: {},
				// 返回按钮
				showAbs: true,
				//透明度
				styleObject: 0,
				//video对象
				videoplay: {},
				//中间播放按钮
				startVideo: true,
				//是否显示下方的播放，暂停等
				contimg: false,
				// 请求的商品图片
				imagetext: [],
				// 是否有视频
				truevideo: '',
				// 商品标题，价格等
				priceetc: {},
				// 详情页评论：评论条数，内容，标签
				comment: [],
				// 备用商品id
				goodid: '',
				// 评论dom需要滚动的距离
				evaluateDistance: null,
				// 商品详情图滚动的距离
				productDistance: null,
				//滚动监听
				currentIndex: null,
				//是否启动onpagescroll
				isScroll: true,
				// 收藏
				colldata: {},
				// 购物车几条
				cartdata: {},
				// sku
				skudata: [],
			}
		},
		components: {
			Top,
			Price,
			Parame,
			Evaluate,
			Product,
			Shopping,
			Addtocart
		},
		computed: {
			Distancee() {
				this.$nextTick(() => {
					let hei = this.tophight.top + this.tophight.height
					const query = this.createSelectorQuery();
					query.select('.evaluate').boundingClientRect()
					query.selectViewport().scrollOffset();
					query.exec((res) => {
						this.evaluateDistance = res[0].top - hei
					})

					query.select('.product').boundingClientRect()
					query.selectViewport().scrollOffset();
					query.exec((res) => {
						this.productDistance = res[1].scrollHeight
					})

				})
			},
		},
		methods: {
			async detRequest(id) {
				let introduce = new this.Request(this.Urls.m().introduceurl + '?id=' + id).modeget()
				// 购物车
				let cartdata = await new this.Request(this.Urls.m().mycart).modeget()
				//获取商品是否已经收藏
				let collection = new this.Request(this.Urls.m().collection + '?id=' + id).modeget()
				// 评论
				let wxcommnt = new this.Request(this.Urls.m().wxcommnt + '?id=' + id).modeget()
				// 商品SKU
				let sku = new this.Request(this.Urls.m().skuurl + '?id=' + id).modeget()
				try {
					let res = await Promise.all([introduce, wxcommnt, collection, cartdata, sku])
					console.log(res)
					//图片视频的数据
					this.imagetext = res[0].data
					let mendata = res[0].data[0]
					//商品评价
					this.comment = res[1].data
					//商品标题，价格等
					let describe = mendata.describe
					describe['id'] = mendata.id
					this.priceetc = describe
					// 备用商品id
					this.goodid = mendata.id
					// 收藏
					this.colldata = res[2],
						// 购物车
						this.cartdata = res[3]
					// sku数据
					let defaultdata = {
						image: mendata.media[0].imgArray[0],
						price: mendata.describe.Trueprice,
						totalstock: mendata.describe.Total_stock,
						id: mendata.id,
						title: mendata.describe.title
					}
					// sku
					this.skudata = res[4].data
					this.skudata.push(defaultdata)
					//如果有视频，就不显示面板指示点
					this.truevideo = mendata.media[0].video
					this.dots = this.truevideo == '' ? true : false
				} catch (e) {
					console.log(e)
				}
			},
			//导航栏的显示
			handleScroll(top) {
				if (top > 90) {
					let opacity = top / 300
					opacity = opacity > 1 ? 1 : opacity
					this.showAbs = false
					this.styleObject = opacity
				} else {
					this.showAbs = true
				}
			},
			//滑块滑动时触发
			bannerfun(e) {
				// 出现指示点
				let inx = e.detail.current
				// 没有视频要显示指示点
				if (this.truevideo != '') {
					this.dots = inx == 0 ? false : true,
						// 滑动时暂停视频播放
						this.videoplay.pause()
				} else {
					this.dots = true
				}
			},
			// 视频播放时触发
			playFun() {
				this.startVideo = false
				this.contimg = true
			},
			// 视频暂停时触发
			pauseFun() {
				this.startVideo = true
				this.contimg = false
			},
			//播放到末尾触发
			endedFun() {
				this.startVideo = true
				this.contimg = false
			},
			//手动触发视频播放
			videoPlay() {
				setTimeout(() => {
					this.videoplay.play()
				}, 200)
			},
			// 预览图片
			previmg(index, imgArray) {
				new Logic(index, imgArray).previewImg()
			},
			pageRe() {
				uni.navigateBack({
					delta: 1
				});
			},
			//被子组件top调用来锚点跳转
			// 顶部描点链接
			fatherMethod(data) {
				// console.log(index)
				this.isScroll = data.isScroll
				let hei = this.tophight.top + this.tophight.height
				let clsdata = data.index === 1 ? '.evaluate' : '.product'
				// console.log(clsdata)
				const query = this.createSelectorQuery();
				query.select(clsdata).boundingClientRect()
				query.selectViewport().scrollOffset();
				query.exec((res) => {
					if (res[0] && res[1]) {
						uni.pageScrollTo({
							scrollTop: res[0].top + res[1].scrollTop - hei,
							duration: 300
						})
						setTimeout(() => {
							this.isScroll = true
						}, 1000)
					}
				})
			},
			// 被子组件调用显示购物车
			fatherShopp(mean) {
				this.$refs.addto.showCou(mean)
			},
		},
		mounted() {
			this.videoplay = wx.createVideoContext('myVideo')
		},
		//滚动监听
		onPageScroll(e) {
			let scrollTop = e.scrollTop
			this.handleScroll(scrollTop)
			let that = this
			if (that.isScroll === true) {
				function scrollCurrentIndex(param) {
					let distance = [that.productDistance, that.evaluateDistance - 20, 0]
					let currentIndex = [2, 1, 0]
					for (let i = 0; i < distance.length; i++) {
						if (param >= distance[i]) {
							return currentIndex[i];
						};
					};
					return currentIndex[currentIndex.length - 1];
				}
				const level = scrollCurrentIndex(scrollTop)
				this.currentIndex = level
			}
		},
		created() {
			//获取胶囊按钮的数据
			this.tophight = uni.getMenuButtonBoundingClientRect()
			console.log(this.tophight)
		},
		onLoad(e) {
			this.detRequest(e.id)
		}
	}
</script>

<style scoped>
	.detail {
		background: #f2f2f2;
	}

	.header-fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}

	.backyes {
		background: #f8f8f8;
	}

	.backno {
		background: none;
	}

	.status_bar {
		width: 100%;
	}

	.navs-image image {
		width: 28px;
		height: 28px;
		border-radius: 50%;
	}

	.navs-image {
		display: flex;
		align-items: center;
		padding-left: 20upx;
	}

	/* banner部分 */
	.imageurl {
		width: 100%;
		height: 700upx !important;
	}

	swiper {
		height: 700upx !important;
	}

	.swiper-video {
		height: 700upx;
		background: #4CD964;
	}

	.swiper-video video {
		width: 100%;
		height: 700upx;
	}

	/* 自定义按钮 */
	.video-img image {
		width: 90upx;
		height: 90upx;
		z-index: 999;
		border: 2px solid #FFFFFF;
		border-radius: 50%;
	}

	.video-img {
		width: 90upx;
		height: 90upx;
		position: absolute;
		bottom: 0;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.video-btn {
		height: 700upx;
		position: relative;
	}
</style>
