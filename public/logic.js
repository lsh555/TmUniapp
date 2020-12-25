let {log} = console

class Logic{
	constructor(index,imgarr) {
	    this.index = index
		this.imgarr = imgarr
	}
	
	// 预览图片
	previewImg(){
		uni.previewImage({
			current:this.index,
			urls: this.imgarr,
			longPressActions: {
				itemList: ['发送给朋友', '保存图片', '收藏']
			}
		})
		.then((res)=>{
			log(res)
		})
		.catch((err)=>{
			log(err)
		})
	}
}

module.exports = {Logic}