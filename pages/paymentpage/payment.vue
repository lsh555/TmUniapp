<template>
	<view>
		<view class="payment-view">
			<!-- 收货地址 -->
			<view class="payment-name" @click="shAddress()">
				<view class="payment-left-img">
					<image src="../../static/loading/address-shouhuo.svg" mode="widthFix"></image>
				</view>
				<view class="payment-add" v-if="nameadd">
					<text>{{address.name}}</text>
					<text>{{address.mobile}}</text>
					<text>{{address.city}}{{address.address}}</text>
				</view>
				<view class="payment-add" v-if="!nameadd">请选择收货地址</view>
				<view class="payment-right-img">
					<image src="../../static/loading/shouhuo-jiantou.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- 商品详情 -->
			<view class="payment-commodity">
				<block v-for="(item,index) in comminfo" :key='index'>
					<view class="payment-order">
						<view class="payment-order-img">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
						<view class="payment-title">
							<text>{{item.title}}</text>
							<text class="text-you">颜色:{{item.color}};尺码:{{item.size}}</text>
						</view>
						<view class="payment-flex">
							<view class="payment-price">
								<text>￥ {{item.price}}</text>
								<text class="text-you">x{{item.many}}</text>
							</view>
							<view>
								共{{item.many}}件 小计: ￥ {{item.total_price}}
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 底部提交订单 -->
		<view class="place-order">
			<text>合计: ￥{{Totalprice}} </text>
			<text @click="placeOrder()">提交订单</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 接收的商品
				comminfo: [],
				// 底部合计总价
				Totalprice: '',
				address: {},
				// 存储购物车的商品id
				idcard: [],
				// 存储商户订单号和订单id
				outno: '',
				ide: ''
			}
		},
		methods: {
			//跳转收货地址
			shAddress() {
				uni.navigateTo({
					url: '../my-address/my-address'
				})
			},
			//提交订单
			async placeOrder() {
				new this.$Toast('正在下单').showloading()
				// 商品数据
				let codata = this.comminfo.map(item => {
					let data = {
						id: item.id,
						image: item.image,
						title: item.title,
						size: item.size,
						color: item.color,
						price: item.price,
						many: item.many
					}
					return data
				})
				let dataobj = {
					consignee: this.address,
					commodity: codata,
					total_price: this.Totalprice,
					idcard: this.idcard
				}
				// 1.请求统一下单接口
				try {
					var paydata = await new this.Request(this.Urls.m().fictpay, dataobj).modepost()
					console.log(paydata)
					if (paydata.msg == 'SUCCESS') {
						// 存储商户订单号和订单id
						this.outno = paydata.data.out_trade_no
						this.ide = paydata.data.id
						new this.$Toast(paydata.data).showtoast()
					} else {
						// 如果出现throw关键词就会进入catch里面
						throw paydata.msg
					}
				} catch (e) {
					//TODO handle the exception500,501,502,503,504
					new this.$Toast(e, 'none').showtoast()
					throw e //遇到throw下面的代码就不会再执行
				}

				//2.调用支付 
				try {
					// package:源码里面的关键词
					let {
						nonceStr,
						paySign,
						signType,
						timeStamp
					} = paydata.data
					await this.wxPay({
						nonceStr,
						paySign,
						signType,
						timeStamp,
						package: paydata.data.package
					})
				} catch (e) {
					new this.$Toast('支付失败', 'none').showtoast()
					wx.redirectTo({
						url: '../personal/personal?index=' + 0
					})
					throw e
				}

				// 3.查询订单是否支付成功 wx:TYLZ115
				try {
					let querydata = await new this.Request(this.Urls.m().queryorder, {
						outno: this.outno,
						id: this.ide
					}).modepost()
					if (querydata.msg == 'SUCCESS') {
						new this.$Toast('支付成功').showtoast()
						wx.redirectTo({
							url: '../personal/personal?index=' + 1
						})
					}
				} catch (e) {
					new this.$Toast(e, 'none').showtoast()
				}

			},
			// 调用支付；promise
			wxPay(payment) {
				return new Promise((resolve, reject) => {
					wx.requestPayment({
						...payment,
						success: res => {
							resolve(res)
						},
						fail: Error => {
							reject(Error)
						}
					})
				})
			},
			// 金额显示.00格式
			NumFormat(value) {
				if (!value) return '0.00'
				value = value.toFixed(2)
				var intPart = Math.trunc(value) // 获取整数部分
				var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
				var floatPart = '.00' // 预定义小数部分
				var value2Array = value.split('.')
				// =2表示数据有小数位
				if (value2Array.length === 2) {
					floatPart = value2Array[1].toString() // 拿到小数部分
					if (floatPart.length === 1) { // 补0,实际上用不着
						return intPartFormat + '.' + floatPart + '0'
					} else {
						return intPartFormat + '.' + floatPart
					}
				} else {
					return intPartFormat + floatPart
				}
			}
		},
		watch: {
			"$store.state.addordr"(newval, olval) {
				// console.log(newval)
				this.address = newval.address
			}
		},
		computed: {
			nameadd() {
				if (JSON.stringify(this.address) === "{}") {
					return false
				} else {
					return true
				}
			}
		},
		// 接受上个页面的值
		onLoad(e) {
			console.log(JSON.parse(e.cartdata))
			this.comminfo = JSON.parse(e.cartdata)
			// 合计支付总价计算
			let numdata = 0
			JSON.parse(e.cartdata).forEach(item => {
				numdata += item.total_price
			})
			// 合计总价
			this.Totalprice = this.NumFormat(numdata)
			// 6-6.00;6.1——6.10;6.66-6.66;6.10-6.10
			// 存储购物车来的数据的_id
			// filter:过滤，筛选
			let _id = JSON.parse(e.cartdata).filter(item => item._id)
			this.idcard = _id.map(item => item._id)
		},
	}
</script>

<style scoped>
	page {
		background-color: #f2f2f2;
	}

	.payment-view {
		margin: 15upx;
	}

	.payment-name {
		height: 150upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		font-size: 28upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10upx;
	}

	.payment-left-img {
		width: 60upx;
		height: 60upx;
	}

	.payment-left-img image {
		width: 60upx;
		height: 60upx;
	}

	.payment-add text {
		display: block;
	}

	.payment-add text:nth-child(2) {
		padding: 4rpx 0;
	}

	.payment-add {
		flex: 1;
		padding-left: 20rpx;
	}

	.payment-right-img {
		width: 40upx;
		height: 40upx;
	}

	.payment-right-img image {
		width: 40upx;
		height: 40upx;
	}

	/* 下单商品 */
	.payment-commodity {
		background-color: #FFFFFF;
		border-radius: 15upx;
		font-size: 28upx;
		padding: 10rpx;
		margin: 15upx 0;
	}

	.payment-order {
		display: flex;
		justify-content: space-between;
		height: 200upx;
		/* background: #4CD964; */
		margin-bottom: 20rpx;
	}

	.payment-order text {
		display: block;
	}

	.payment-order-img {
		width: 200upx;
		height: 200upx;
		border-radius: 8upx;
		padding-right: 10upx;
	}

	.payment-order-img image {
		width: 200upx;
		height: 200upx;
		border-radius: 8upx;
	}

	.payment-title {
		flex: 1;
	}

	.payment-title text:nth-child(1) {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.payment-title text:nth-child(2) {
		background-color: rgb(250, 250, 250);
		padding: 5upx;
		border-radius: 7upx;
	}

	.payment-price {
		text-align: right;
	}

	.payment-flex {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.text-you {
		color: rgb(156, 156, 156);
		margin-top: 8upx;
	}

	/* 提交 */
	.place-order {
		height: 90upx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.place-order text:nth-child(2) {
		background-color: rgb(255, 0, 54);
		height: 90upx;
		width: 270upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 90upx;
		margin-left: 30upx;
	}
</style>
