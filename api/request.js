var url = 'https://meituan.thexxdd.cn/api/'

const urls = class{
	static m(){
		// 首页轮播图
		let bannerget = `${url}getbanner/`
		// 首页推荐
		let getrecommurl = `${url}recom/`
		// 首页天猫榜单
		let billboardurl = `${url}billboard/`
		// 首页卡片商品
		let commodcradurl = `${url}commodcrad/`
		// 商品一级分类
		let comclassurl = `${url}comclass/`
		// 商品二级分类
		let secondurl = `${url}secondclass/`
		// 商品详情介绍
		let introduceurl = `${url}introduce/`
		// 请求sku
		let skuurl = `${url}wxsku/`
		// 查询sku:库存，价格
		let queryskuurl = `${url}querysku/`
		// 商品参数
		let parameterurl = `${url}parameter/`
		// 查询分类
		let queryurl = `${url}queryclass/`
		// 查询分类：销量，价格查询
		let querycod = `${url}querycod/`
		// 微信登录
		let wxlogin = `${url}wxlogin/`
		// 用户令牌token:校验登录状态：过期，失效。
		let tokening = `${url}tokening/`
		// 获取单个商品是否收藏
		let collection = `${url}collection/`
		// 收藏和取消收藏
		let enshrine = `${url}enshrine/`
		// 加入购物车
		let atcart = `${url}atcart/`
		// 获取购物车数据
		let mycart = `${url}mycart/`
		// 购物车加减数量
		let pride = `${url}pride/`
		// 购物车商品重选sku
		let cartsku = `${url}cartsku/`
		// 购物车重选sku修改
		let skubase = `${url}skubase/`
		// 购物车选中与未选中
		let selecturl = `${url}selecting/`
		// 全选和取消全选接口
		let selectall = `${url}selectall/`
		// 购物车删除
		let cartdelete = `${url}cartdelete/`
		// 首页搜索
		let searchurl = `${url}search/`
		// 提交收货地址
		let sudeadd = `${url}sudeadd/`
		// 获取收货地址
		let gainadd = `${url}gainadd/`
		// 修改收货地址
		let modifyadd = `${url}modifyadd/`
		// 删除收货地址
		let deleadd = `${url}deleadd/`
		// 微信支付
		let wxpay = `${url}placeorder/`
		// 查询支付状态
		let queryorder = `${url}queryorder/`
		// 待付款
		let tobepaid = `${url}tobepaid/`
		// 订单详情：待付款，待发货，待收货
		let tobedetail = `${url}tobedetail/`
		// 待发货
		let tbdelivered = `${url}tbdelivered/`
		// 待收货
		let gtbreceived = `${url}gtbreceived/`
		// 确认收货
		let conreceipt = `${url}conreceipt/`
		// 待评价
		let tbevaluated = `${url}tbevaluated/`
		// 待评价详情
		let dtpepage = `${url}dtpepage/`
		// 提价评价
		let subcomm = `${url}subcomm/`
		// 获取详情页的评论
		let wxcommnt = `${url}wxcommnt/`
		// 评论详情页评论标签
		let comtag = `${url}comtag/`
		// 评论详情页评论内容
		let comtconent = `${url}comtconent/`
		// 虚拟支付
		let fictpay = `${url}fictpay/`
		// 删除订单
		let deleorder = `${url}deleorder/`
		return{
			bannerget,
			getrecommurl,
			billboardurl,
			commodcradurl,
			comclassurl,
			secondurl,
			introduceurl,
			skuurl,
			queryskuurl,
			parameterurl,
			queryurl,
			querycod,
			wxlogin,
			tokening,
			collection,
			enshrine,
			atcart,
			mycart,
			pride,
			cartsku,
			skubase,
			selecturl,
			selectall,
			cartdelete,
			searchurl,
			sudeadd,
			gainadd,
			modifyadd,
			deleadd,
			wxpay,
			queryorder,
			tobepaid,
			tobedetail,
			tbdelivered,
			gtbreceived,
			conreceipt,
			tbevaluated,
			dtpepage,
			subcomm,
			wxcommnt,
			comtag,
			comtconent,
			fictpay,
			deleorder
		}
	}
	
}

export default urls