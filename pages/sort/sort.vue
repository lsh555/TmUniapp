<template>
<view class="sort-view">
	<!-- 左边 -->
	<view class="sort-left">
		<block v-for="(item,index) in comclassdata" :key="index">
		<view class="sort-name" :class="{activesort : index == num}" @click="sortFun(index,item.cid)">{{item.sort}}</view>
		</block>
	</view>
	<!-- 右边 -->
	<view class="sort-right">
		<block v-for="(item,index) in seconddata" :key="index">
		<view class="sort-name sort-title">{{item.sort}}</view>
		<view class="sort-flex">
			<block v-for="(iteming,indexs) in item.secon_classif" :key="indexs">
			<view class="sort-goods" @click="sortIng(item.cid,iteming.name)">
				<image :src="iteming.name_image" mode="aspectFill"></image>
				<text>{{iteming.name}}</text>
			</view>
			</block>
		</view>
		</block>
	</view>
</view>
</template>

<script>
export default{
	data() {
		return {
			num:0,
			comclassdata:[],
			seconddata:[]
		}
	},
	methods:{
		// 选中
		sortFun(index,cid){
			this.num = index
			this.seCond(cid)
		},
		// 一级分类
		async sortRequest(){
			try{
				let comclassdata = await new this.Request(this.Urls.m().comclassurl).modeget()
				console.log(comclassdata)
				this.comclassdata = comclassdata.data
				// 进入页面默认请求选中的分类下的商品
				this.seCond(comclassdata.data[0].cid)
			}catch(e){
				//TODO handle the exception
			}
		},
		// 二级分类
		async seCond(cid){
			try{
				let seconddata = await new this.Request(this.Urls.m().secondurl + '?cid=' + cid).modeget()
				console.log(seconddata)
				this.seconddata = seconddata.data
			}catch(e){
				//TODO handle the exception
			}
		},
		// 相亲页
		sortIng(cid,name){
			wx.navigateTo({
				url:'../class-goods/goods?cid=' + cid + '&name=' + name
			})
		}
	},
	created() {
		this.sortRequest()
	}
}
</script>

<style scoped>
.sort-view{display: flex;}
.sort-left{width: 150upx; background: #f8f8f8;
height: 100vh;
overflow-y: auto;
position: fixed;
left: 0;
bottom: 0;
top: 0;
}
.sort-right{flex: 1; margin-left: 150upx;}
.sort-name{height: 80upx;
line-height: 80upx;
font-size: 28upx;
text-align: center;
}
.activesort{background: #FFFFFF;}
/* right */
.sort-title{text-align: left !important;
padding-left: 40upx;
font-weight: bold;
}
.sort-flex{display: flex; flex-wrap: wrap; align-items: center;
}
.sort-flex image{width: 80upx; height: 100upx; display: block;}
.sort-goods text{padding-top: 10upx;}
.sort-goods{
font-size: 28upx;
width: 33.333%;
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 40upx;
}
</style>

