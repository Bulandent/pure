import serve from '@/utils/request'
const http = ({ url = '', method = 'post', params = {}, other = {} } = {}) => {
	if (method == 'post') {
		return serve.post(url, params)
	} else {
		return serve.get(url, params)
	}
}

export default http
