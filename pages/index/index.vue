<template>
	<view>
		<!-- 搜索 -->
		<Search></Search>
		<!-- 轮播 -->
		<Swipers :bannerdata="bannerdata"></Swipers>
		<!-- 抢购 -->
		<Purchase :recomdata="recomdata"></Purchase>
		<!-- 榜单 -->
		<List :billdata="billdata"></List>
		<!-- 卡片 -->
		<Commodity :commdata="commdata"></Commodity>
		<!-- 上拉加载 -->
		<loader-on ref="loadon"></loader-on>
		<!-- 返回顶部 -->
		<backtop v-if="isShowBacktop"></backtop>
	</view>
</template>

<script>
	import Search from './components/search.vue'
	import Swipers from './components/swiper.vue'
	import Purchase from './components/purchase.vue'
	import List from './components/list.vue'
	import Commodity from '../../components/commodity.vue'
	export default {
		components: {
			Search,
			Swipers,
			Purchase,
			List,
			Commodity
		},
		data() {
			return {
				bannerdata: [],
				recomdata: [],
				billdata: [],
				commdata: [],
				isShowBacktop:false,
				// 上拉加载值
				pageid: 0,
				//数据为空之后不再进行网络请求
				nodata: false
			}
		},
		methods: {
			async indexRequest() {
				let banner = new this.Request(this.Urls.m().bannerget).modeget()
				let recomm = new this.Request(this.Urls.m().getrecommurl).modeget()
				let billboard = new this.Request(this.Urls.m().billboardurl).modeget()
				let commodcrad = new this.Request(this.Urls.m().commodcradurl + '?page=' + this.pageid).modeget()
				try {
					//同时并发请求:
					let res = await Promise.all([banner, recomm, billboard, commodcrad])
					console.log(res)
					this.bannerdata = res[0].data
					this.recomdata = res[1].data
					this.billdata = res[2].data
					this.commdata = res[3].data
				} catch (e) {
					console.log(e)
				}
			},
			// 上拉加载
			async pullUp() {
				try {
					let commodcrad = await new this.Request(this.Urls.m().commodcradurl + '?page=' + this.pageid).modeget()
					console.log(commodcrad)
					if (commodcrad.data.length == 0) {
						this.$refs.loadon.loAd({
							whether: true,
							tips: '没有更多了',
							picture: false
						})
						this.nodata = true
					} else {
						this.commdata = [...this.commdata, ...commodcrad.data]
					}
				} catch (e) {
					console.log(e)
				}
			}
		},
		created() {
			this.indexRequest()
		},
		//页面触底事件
		onReachBottom() {
			if (!this.nodata) {
				this.$refs.loadon.loAd({
					whether: true,
					tips: '玩命加载中',
					picture: true
				})
				this.pageid++
				this.pullUp()
			}
		},
		onPageScroll(e) {
			if(e.scrollTop > 500) {
				this.isShowBacktop = true
			}else{
				this.isShowBacktop = false
			}
		}
	}
</script>

<style>

</style>
