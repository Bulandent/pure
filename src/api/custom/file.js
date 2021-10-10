import request from '@/utils/request'

export const postFile = data => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	}
	return request({
		url: '/upload/file',
		method: 'post',
		config,
		data,
	})
}
export const updata = data => {
	return request({
		url: '/updata/file',
		method: 'post',
		data,
	})
}
