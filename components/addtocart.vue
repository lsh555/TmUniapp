<template>
	<view v-if="couponif">
		<view class="Coupon-yin anim" @click="hideCou()">></view>
		<view class="Coupon-view coup-anim padd">
			<!-- 商品图片 -->
			<view class="commodity-view">
				<view class="commodity-left-img">
					<image :src="attribute.image" mode="aspectFill"></image>
				</view>
				<view class="commodity-zh">
					<view>¥{{attribute.price}}</view>
					<view>库存{{attribute.totalstock}}件</view>
					<view class="choice">
						<text>{{choice}}:</text>
						<text>{{skumen.color}}</text>
						<text>{{skumen.size}}</text>
					</view>
				</view>
				<view class="commodity-right-img" @click="hideCou()">
					<image src="/static/details/guanbi.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- 主要颜色 -->
			<view class="sku-view">
				<text class="sku-title">主要颜色</text>
				<view class="sku-mian">
					<block v-for="(item,index) in skudata[1]" :key="index">
						<view @click="colorFun(item.color,index)" :class="{active:index == colornum}">
							<image :src="item.image" mode="aspectFill"></image>
							<text>{{item.color}}</text>
						</view>
					</block>
				</view>
			</view>
			<!-- 尺寸 -->
			<view class="sku-view">
				<text class="sku-title">尺寸</text>
				<view class="sku-mian sku-two">
					<block v-for="(item,index) in skudata[0]" :key="index">
						<view @click="sizeFun(item,index)" :class="{active:index == sizenum}">{{item}}</view>
					</block>
				</view>
			</view>
			<!-- 购买数量 -->
			<view class="sku-view sku-height">
				<view class="sku-title numes">购买数量</view>
				<view class="sku-mums-gight">
					<view @click="many === 1 ? forbid==false : forbid==true && reDuce()">-</view>
					<view>{{many}}</view>
					<view @click="pLus()">+</view>
				</view>
			</view>
		</view>
		<!-- 确定 -->
		<view class="determine coup-anim" v-if="mean == '001' " @click="skumen.ban && modifySku()">确定</view>
		<view class="determine coup-anim" v-if="mean == '002'" @click="skumen.ban && detErmine()">确定</view>
		<view class="determine coup-anim" v-if="mean == '003'" @click="skumen.ban && purChase()">确定</view>
		<!-- 登录弹窗 -->
		<showmodal ref="show"></showmodal>
	</view>
</template>

<script>
	var {log} = console
	export default {
		props: {
			skudata: Array
		},
		data() {
			return {
				//默认显示||隐藏
				couponif: false,
				// 001:购物车修改sku；002：加入购物车，003：直接购买
				mean: '002',
				//商品id
				id: '',
				//商品展示的sku
				attribute: {},
				//标题
				title: '',
				//选了颜色
				colornum: -1,
				colorvalue: '',
				// 选了尺寸
				sizenum: -1,
				sizevalue: '',
				// 数量等于1.禁止按钮点击
				forbid: true,
				// 购买数量：默认1
				many: 1,
				// 购物车来的商品数量
				momany: '',
				// 购物车来的购物车_id
				_id: '',

			}
		},
		computed: {
			// 选择sku的改变
			choice() {
				if (this.colorvalue == '' || this.sizevalue == '') {
					return '请选择'
				} else {
					return '已选择'
				}
			},
			// 颜色&&尺寸选择
			skumen() {
				if (this.sizevalue != '' && this.colorvalue != '') {
					return {
						color: this.colorvalue,
						size: this.sizevalue,
						ban: true
					}
				} else if (this.sizevalue == '' && this.colorvalue == '') {
					return {
						color: '主要颜色',
						size: '尺寸',
						ban: false
					}
				} else if (this.sizevalue == '' && this.colorvalue != '') {
					return {
						color: '',
						size: '尺寸',
						ban: false
					}
				} else if (this.colorvalue == '' && this.sizevalue != '') {
					return {
						color: '主要颜色',
						size: '',
						ban: false
					}
				}
			},
		},
		methods: {
			// 被其他组件调用显示sku组件
			showCou(mean, obj = {}) {
				this.mean = mean
				if (mean == '001') {
					let {
						sku,
						size,
						color,
						_id,
						many
					} = obj
					this._id = _id
					this.momany = many
					this.sizenum = sku[0].findIndex(item => item == size)
					this.colornum = sku[1].findIndex(item => item.color == color)
					this.colorvalue = color
					this.sizevalue = size
				}
				this.couponif = true
			},
			hideCou() {
				this.couponif = false
			},
			// 点击获取颜色
			colorFun(color, index) {
				this.colornum = index
				this.colorvalue = color
			},
			// 点击获取尺寸
			sizeFun(size, index) {
				this.sizenum = index
				this.sizevalue = size
			},
			// 加入购物车
			async detErmine() {
				log('加入购物车')
				let {
					image,
					price
				} = this.attribute
				let data = {
					id: this.id,
					size: this.sizevalue,
					color: this.colorvalue,
					image,
					price,
					title: this.title,
					many: this.many
				}
				try {
					let atcartdata = await new this.Request(this.Urls.m().atcart, data).modepost()
					if (atcartdata.msg.errcode) {
						// 需要登录
						this.$refs.show.showing('coll')
					} else if (atcartdata.msg == 'SUCCESS') {
						this.hideCou()
						new this.$Toast('加入购物车成功').showtoast()
						// 获取购物车的件数
						let mycart = await new this.Request(this.Urls.m().mycart).modeget()
						// vuex
						this.$store.commit('mutacart', mycart.data.length)
					}
				} catch (err) {
					log(err)
				}

			},
			// 减数量
			reDuce() {
				this.many--
			},
			// 加数量
			pLus() {
				this.many++
			},
			// 购物车修改sku
			async modifySku() {
				let {
					image,
					price
				} = this.attribute
				let data = {
					id: this._id,
					skuid: this.id,
					size: this.sizevalue,
					color: this.colorvalue,
					image,
					price,
					many: this.momany
				}
				try {
					let modifydata = await new this.Request(this.Urls.m().skubase, data).modepost()
					log(modifydata)
					if (modifydata.msg == 'SUCCESS') {
						this.hideCou()
						// 修改成功刷新购物车接口
						this.$bus.$emit('mycart', {
							cart: modifydata.msg
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			},

			// 调用接口请求sku
			async skuRequest(obj) {
				try {
					let sku = await new this.Request(this.Urls.m().queryskuurl, obj).modepost()
					this.attribute = sku.data[0]
				} catch (e) {
					console.log(e)
				}
			},
			// 加入购物车
			async detErmine() {
				let {
					image,
					price
				} = this.attribute
				let data = {
					id: this.id,
					size: this.sizevalue,
					color: this.colorvalue,
					image,
					price,
					title: this.title,
					many: this.many
				}
				try {
					let atcartdata = await new this.Request(this.Urls.m().atcart, data).modepost()
					if (atcartdata.msg.errcode) {
						this.$refs.show.showing('coll')
					} else if (atcartdata.msg == 'SUCCESS') {
						new this.$Toast('加入购物车成功').showtoast()
						this.hideCou()
						let cartdata = await new this.Request(this.Urls.m().mycart).modeget()
						this.$store.commit('mutacart', cartdata.data.length)
					} else {
						log(atcartdata)
					}

				} catch (e) {
					console.log(e)
				}
			},
			// 直接购买
			async purChase() {
				console.log('直接购买')
				let {
					image,
					price
				} = this.attribute
				let data = [{
					id: this.id,
					size: this.sizevalue,
					color: this.colorvalue,
					image,
					price,
					title: this.title,
					many: this.many,
					total_price: this.many * price
				}]
				// 校验登录状态
				try {
					let user = await new this.Request(this.Urls.m().tokening).modeget()
					if (user.msg.errcode) {
						this.$refs.show.showing('coll')
					} else if (user.msg == 'SUCCESS') {
						console.log(data)
						let cartdata = JSON.stringify(data)
						uni.navigateTo({
							url: '../paymentpage/payment?cartdata=' + cartdata
						})
					}
				} catch (e) {
					console.log(e)
				}

			},

		},
		watch: {
			// 获取父组件的数据的默认展示数据
			skudata(newValue, oldValue) {
				this.id = newValue[2].id
				this.attribute = newValue[2]
				this.title = newValue[2].title
				console.log(newValue)
			},
			// 是否选择了尺码，颜色
			skumen(newValue, oldValue) {
				let {
					color,
					size
				} = newValue
				if (color != '' && size != '') {
					this.skuRequest({
						id: this.id,
						size,
						color
					})
				}
			}
		}
	}
</script>

<style scoped>
	.padd {
		padding: 15upx;
		margin-bottom: 90rpx;
	}

	.Coupon-view text {
		display: block;
	}

	.commodity-view {
		/* background: #4CD964; */
		height: 200upx;
		display: flex;
	}

	.commodity-left-img {
		width: 200upx;
		height: 200upx;
	}

	.commodity-left-img image {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
	}

	.commodity-zh {
		font-size: 27upx;
		color: #3d4245;
		flex: 1;
	}

	.commodity-zh view:nth-child(1) {
		font-size: 35upx;
		color: #fe0036;
	}

	.commodity-zh view {
		padding-top: 10upx;
		padding-left: 15upx;
	}

	.choice {
		display: flex;
		align-items: center;
	}

	.choice text {
		padding-right: 8upx;
	}

	.commodity-right-img {
		width: 50upx;
		height: 50upx;
	}

	.commodity-right-img image {
		width: 50upx;
		height: 50upx;
	}

	/* sku */
	.sku-view {
		margin-top: 40upx;
		border-bottom: 1px solid #e5e5e5;
	}

	.sku-title {
		font-size: 30upx;
		color: #051b28;
		font-weight: bold;
		margin-bottom: 20upx;
	}

	.sku-mian image {
		width: 45upx;
		height: 45upx;
		padding-right: 17upx;
	}

	.sku-mian view {
		display: flex;
		align-items: center;
		height: 65upx;
		background: #f5f5f5;
		border: 1rpx solid #f5f5f5;
		border-radius: 20upx;
		padding: 0 14upx;
		margin-right: 30upx;
		margin-bottom: 30upx;
	}

	.sku-mian {
		font-size: 27upx;
		color: #051b28;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.sku-two view {
		padding: 0 35upx;
	}

	/* 购买数量 */
	.sku-height {
		height: 120upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.numes {
		margin: 0 !important;
	}

	.sku-mums-gight {
		display: flex;
		align-items: center;
	}

	.sku-mums-gight view {
		font-size: 30upx;
		color: #051b28;
		font-weight: bold;
		background: #f5f5f5;
		border-radius: 10upx;
		width: 90upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
	}

	.sku-mums-gight view:nth-child(2) {
		background: none !important;
	}

	.determine {
		z-index: 999;
		font-size: 30upx;
		color: #FFFFFF;
		background: #fe0036;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	/* 选了颜色加上边框 */
	.active {
		border: 1rpx solid red !important;
	}
</style>
