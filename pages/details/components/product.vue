<template>
	<view class="Product-view">
		<block v-for="(item,index) in priceetc.Detaileddrawing" :key="index">
			<image :src="item" mode="widthFix" @click="previmg(index,priceetc.Detaileddrawing)"></image>
		</block>
	</view>
</template>

<script>
const {Logic} = require('../../../public/logic.js')
export default{
	props:{priceetc:Object},
	methods:{
		// 预览图片
		previmg(index,imgArray){
			new Logic(index,imgArray).previewImg()
		}
	}
}
</script>

<style scoped>
	.Product-view{margin-top: 20upx; padding-bottom: 90upx;}
	.Product-view image{width: 100%; vertical-align: bottom;}
</style>
