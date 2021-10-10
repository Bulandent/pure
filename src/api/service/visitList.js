import request from '@/utils/request'

//回访名单列表

export const getVisitList = data => {
	return request({
		url: '/visit/list',
		method: 'post',
		data,
	})
}

//添加回访客户

export const addVisitList = data => {
	return request({
		url: '/visit/add',
		method: 'post',
		data,
	})
}

//获取回访客户类型

export const getVisitType = () => {
	return request({
		url: '/visit/usertype',
		method: 'get',
	})
}

//获取回访客户状态

export const getVisitStatus = () => {
	return request({
		url: '/visit/userstatus',
		method: 'get',
	})
}
