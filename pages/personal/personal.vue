<template>
	<view>
		<view class="choice-tips">
			<block v-for="(item,index) in datas" :key="index">
			<text :class="{activetext:index == num}" @click="menubtn(index)">{{item}}</text>
			</block>
		</view>
		<view class="choice-content">
			<Tobepaid v-if="num == 0 ? true : false"></Tobepaid>
			<Deliverde v-if="num == 1 ? true : false"></Deliverde>
			<Received v-if="num == 2 ? true : false"></Received>
			<Evaluated v-if="num == 3 ? true : false"></Evaluated>
		</view>
	</view>
</template>

<script>
import Tobepaid from './component/tobepaid.vue'
import Deliverde from './component/delivered.vue'
import Received from './component/received.vue'
import Evaluated from './component/evaluated.vue'
export default{
	components:{Tobepaid,Deliverde,Received,Evaluated},
	data() {
		return {
			num:0,
			datas:['待付款','待发货','待收货','待评价']
		}
	},
	methods:{
		menubtn(index){
			this.num = index
		}
	},
	onLoad(e) {
		this.num = e.index
	}
}
</script>

<style>
page{background: #eeeeee;}	
.choice-tips{
background: #FFFFFF;
display: flex;
justify-content: space-around;
color: #6d6d6d;
font-size: 28upx;
position: fixed;
top: 0;
left: 0;
right: 0;
}
.choice-tips text{height: 70upx;
line-height: 70upx;
}
.activetext{color: #fe0036 !important;
border-bottom: 4upx solid #fe0036;
}
.choice-content{margin-top: 100upx;}
</style>