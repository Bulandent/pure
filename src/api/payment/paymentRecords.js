import request from '@/utils/request'

//获取支付列表
export const getPaymentList = data => {
	return request({
		url: '/order/list',
		method: 'post',
		data,
	})
}

//获取支付订单名称状态

export const getPaymentListStatus = () => {
	return request({
		url: '/order/status',
		method: 'get',
	})
}

//获取支付状态
export const getPaymentListTitle = () => {
	return request({
		url: '/order/title',
		method: 'get',
	})
}
