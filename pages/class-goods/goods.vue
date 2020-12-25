<template>
<view>
	<!-- 排序 -->
	<view class="condition-view">
		<block v-for="(item,index) in sorting" :key="index">
		<view :class="{active:index == num}" @click="sortIng(index)">
			<text>{{item.text}}</text>
			<image :src="item.image" :class="{admining : rotate}"></image>
		</view>
		</block>
	</view>
	<view style="height: 70rpx;"></view>
	<!-- 商品 -->
	<Commodity :commdata="commdata"></Commodity>
</view>
</template>

<script>
// 引入公用的组件：卡片流
import Commodity  from '../../components/commodity.vue'
// qs模块
const qs = require('querystring')
export default{
	components:{Commodity},
	data() {
		return {
			num:0,
			rotate:false,
			sorting:[
				{
					text:'全部',
					image:''
				},
				{
					text:'销量',
					image:''
				},
				{
					text:'价格',
					image:'/static/details/jiantou.svg'
				}
			],
			// 查询值
			querydata:{},
			// 查询的结果
			commdata:[],
			// 按销量
			savo:1,
			// 按价格
			pri:1
		}
	},
	methods:{
		sortIng(index){
			this.num = index
			if(index == 0){
				console.log('按全部')
				this.goodsRequest()
			}else if(index == 1){
				console.log('按销量')
				this.savo = this.savo == 1 ? -1 : 1
				console.log(this.savo)
				this.qsFun('001',this.savo)
			}else if(index == 2){
				console.log('按价格')
				this.rotate = this.rotate == true ? false : true
				this.pri = this.pri == 1 ? -1 : 1
				this.qsFun('002',this.pri)
			}
		},
		// 按销量按价格查询
		qsFun(spvalue,number){
			const param = qs.stringify({
				cid:this.querydata.cid,
				name:this.querydata.name,
				spvalue,
				number
			})
			this.queryCod(param)
		},
		async queryCod(param){
			try{
				let commdata = await new this.Request(this.Urls.m().querycod + '?' + param).modeget()
				console.log(commdata)
				this.commdata = commdata.data
			}catch(e){
				//TODO handle the exception
			}
		},
		
		
		
		
		// 进入页面执行
		async goodsRequest(){
			let {cid,name} = this.querydata
			let id = '?cid=' + cid + '&name=' + name
			try{
				let commdata = await new this.Request(this.Urls.m().queryurl + id).modeget()
				console.log(commdata)
				this.commdata = commdata.data
			}catch(e){
				//TODO handle the exception
			}
		}
	},
	onLoad(e) {
		console.log(e)
		this.querydata = e
		this.goodsRequest()
	}
}
</script>

<style>
page{background: #f4f4f4;}
.condition-view{
background: #ffffff; height: 70upx; font-size: 28upx;
display: flex; align-items: center;
justify-content: space-around;
position: fixed;
top: 0;
left: 0;
right: 0;
}
.condition-view image{width: 25upx; height: 25upx;}
.condition-view text{padding-right: 8upx;}
.condition-view view{display: flex; align-items: center; color: #999;}
.active{color: #DD2727 !important;}
.admining{transform:rotate(180deg);}
</style>
