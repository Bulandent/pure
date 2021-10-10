import request from '@/utils/request'

export const base64ToBlob = data => {
	return request({
		url: '/base64/data',
		method: 'post',
		data,
	})
}
