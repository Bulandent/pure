import request from '@/utils/request'
export const test = (url, method, data) => {
	return request({
		method: method,
		url: url,
		data: JSON.stringify(data),
	})
}
