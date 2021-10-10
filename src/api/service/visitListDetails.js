import request from '@/utils/request'

//获取回访客户信息

export const getDetails = params => {
	return request({
		url: `/visit/info/${params}`,
		method: 'get',
	})
}

//回访记录表格列表
export const getVisitList = data => {
	return request({
		url: '/visitlog/list',
		method: 'post',
		data,
	})
}

//编辑回访记录

export const editVisit = data => {
	return request({
		url: '/visit/edit',
		method: 'post',
		data,
	})
}

//新增回访记录

export const addVisit = data => {
	return request({
		url: '/visitlog/add',
		method: 'post',
		data,
	})
}

//获取回访客户状态

export const getVisitStatusis = () => {
	return request({
		url: '/visitlog/status',
		method: 'get',
	})
}

export const getVisitDetailType = () => {
	return request({
		url: '/visit/type',
		method: 'get',
	})
}
