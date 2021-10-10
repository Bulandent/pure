import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

let base_url = process.env.VUE_APP_BASE_API
// if (process.env.NODE_ENV === 'production') {
//   base_url = process.env
// } else if (process.env.NODE_ENV === 'development') {
// }
// create an axios instance
const service = axios.create({
	baseURL: base_url, // api 的 base_url
	timeout: 5000, // request timeout
})
service.defaults.withCredentials = true
// request interceptor
service.interceptors.request.use(
	config => {
		// Do something before request is sent
		// if (getToken()) {
		//   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
		//   config.headers['X-Token'] = getToken()
		// }
		return config
	},
	error => {
		// Do something with request error
		Promise.reject(error)
	},
)

// response interceptor
service.interceptors.response.use(
	// response =>  response,
	/**
	 * 下面的注释为通过在response里，自定义code来标示请求状态
	 * 当code返回如下情况则说明权限有问题，登出并返回到登录页
	 * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
	 * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
	 */
	response => {
		const res = response.data
		if (res.code !== 20000) {
			switch (response.data.code) {
				// 10002: 未登录
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作。
				case 10002:
					// router.replace({
					//   path: '/'
					// });
					// router.replace({
					//   path: '/login',
					//   query: {
					//     redirect: router.currentRoute.fullPath
					//   }
					// });
					break
				case 10003:
					Message({
						message: '暂无权限',
						type: 'warning',
						duration: 2000,
					})
					// 清除token
					localStorage.removeItem('token')
					store.commit('loginSuccess', null)
					// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
					setTimeout(() => {
						router.replace({
							path: '/error/401',
						})
					}, 1000)
					break
				// 404请求不存在
				case 404:
					Message({
						message: '网络请求不存在',
						type: 'warning',
						duration: 2000,
					})
					break
				// 其他错误，直接抛出错误提示
				default:
				// Message({
				//   message: response.data.msg,
				//   type: 'warning',
				//   duration: 2000
				// });
			}
			// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				// 请自行在引入 MessageBox
				MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					store.dispatch('FedLogOut').then(() => {
						location.reload() // 为了重新实例化vue-router对象 避免bug
					})
				})
			}
			return Promise.resolve(res)
		} else {
			return Promise.resolve(response.data)
		}
	},
	error => {
		return Promise.reject(error)
	},
)
export default service
