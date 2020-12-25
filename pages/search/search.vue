<template>
	<view>
		<view class="search-cont">
			<view class="search">
				<input type="text" placeholder-class="inputclass" confirm-type="search" focus="true" placeholder="请输入关键字" v-model="searchdata"
				 @confirm="onKeyInput" />
			</view>
			<view class="search-code" @click="seArch()">搜索</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>最近搜索</view>
				<view @click="removeStorage()">
					<image src="/static/search/searchend.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view @click="menubtn(item)">{{item}}</view>
				</block>
			</view>
		</view>
		<!-- 展示内容 -->
		<Commodity :commdata="commdata" v-if="!searchno"></Commodity>
		<!-- 上拉加载 -->
		<loader-on ref="loadon"></loader-on>
		<!-- 没有搜索结果 -->
		<view class="empty-cart" v-if="searchno">
			<image src="../../static/search/sousuono.svg" mode="widthFix"></image>
			<text>抱歉！暂无相关商品</text>
		</view>
	</view>
</template>

<script>
	import Commodity from '../../components/commodity.vue'
	export default {
		components: {
			Commodity
		},
		data() {
			return {
				searchdata: '',
				setdata: [],
				// 是否有搜索历史
				ifhistory: false,
				// 搜索展示
				commdata: [],
				// 没有搜索结果
				searchno: false,
				// 上拉加载值
				pageid: 0,
				// 最后一次搜索词
				searchkey: ''
			}
		},
		methods: {
			// 键盘上搜索或者回车键的触发
			onKeyInput(e) {
				let searchkey = e.detail.value
				if (searchkey != '') {
					this.ifhistory = false
					this.pageid = 0
					this.searchData(searchkey)
					this.getStorage(searchkey)
				}
			},
			// 点击搜索按钮触发的
			seArch() {
				if (this.searchdata != '') {
					this.ifhistory = false
					let searchkey = this.searchdata
					this.pageid = 0
					this.searchData(searchkey)
					this.getStorage(searchkey)
				}
			},
			// 储存搜索历史到本地缓存
			getStorage(searchkey) {
				// 存之前先取出本地缓存的数据
				let seararray = uni.getStorageSync('search_key') || []
				// 要存入一个数组array
				seararray.unshift(searchkey)
				uni.setStorageSync('search_key', seararray);
			},
			// 取出本地缓存的数据
			setStorage() {
				let setdata = uni.getStorageSync('search_key')
				// 数组去重
				let setdataarr = Array.from(new Set(setdata))
				if (!setdataarr.length) {
					this.ifhistory = false
				} else {
					this.setdata = setdataarr
					this.ifhistory = true
				}
			},
			// 手动清除搜索历史
			removeStorage() {
				uni.removeStorageSync('search_key');
				this.setStorage()
			},
			// 搜索历史的搜索
			menubtn(item) {
				this.ifhistory = false
				this.pageid = 0
				this.searchData(item)
			},
			// 发送请求搜索
			async searchData(searchkey, idn = "001") {
				this.searchkey = searchkey
				const keys = '?keyword=' + searchkey + '&&' + 'page=' + this.pageid
				try {
					let searchdata = await new this.Request(this.Urls.m().searchurl + keys).modeget()
					console.log(searchdata)
					if (idn == '002') {
						// 上拉加载
						if (!searchdata.data.length) {
							this.$refs.loadon.loAd({
								whether: true,
								tips: '没有更多了',
								picture: false
							})
						} else {
							this.commdata = [...this.commdata, ...searchdata.data]
						}
					} 
					//不是上拉加载
					else {
						this.$refs.loadon.loAd({
							whether: false
						})
						if (!searchdata.data.length) {
							this.searchno = true
						} else {
							this.commdata = searchdata.data
							this.searchno = false
						}
					}
				} catch (e) {
					console.log(e)
				}
			}

		},
		// 上拉加载
		onReachBottom() {
			this.$refs.loadon.loAd({
				whether: true,
				tips: '玩命加载中',
				picture: true
			})
			this.pageid++
			this.searchData(this.searchkey, '002')
		},
		created() {
			this.setStorage()
		}
	}
</script>

<style scoped>
	.search {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		background: #FFFFFF;
		border-radius: 20upx;
		margin-left: 20upx;
	}

	.search input {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		font-size: 30upx;
		color: #666666;
		padding-left: 30upx;
	}

	.search-cont {
		display: flex;
		justify-content: space-between;
		height: 70upx;
		align-items: center;
		padding: 30upx 0;
		background: #f8f8f8;
	}

	.search-code {
		width: 150upx;
		height: 50upx;
		text-align: center;
		font-size: 30upx;
	}

	.search-history {
		margin: 20upx;
	}

	.search-title {
		font-size: 30upx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60upx;
		line-height: 60upx;
	}

	.search-title image {
		width: 36upx;
		height: 36upx;
		display: block;
	}

	.menu-block view {
		background: #f7f8fa;
		border-radius: 6upx;
		font-size: 27upx;
		color: #292c33;
		text-align: center;
		padding: 10upx;
		margin: 20upx 20upx 0 0;
	}

	.menu-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
