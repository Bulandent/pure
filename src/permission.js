import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
	if (!roles) return true
	if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
	if (!permissionRoles) return true
	return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach((to, from, next) => {
	NProgress.start() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
	if (store.getters.addRouters.length == 0) {
		store.dispatch('testGenerateRoutes').then(res => {
			router.addRoutes(store.getters.addRouters)
			next({ ...to, replace: true })
		})
	}
	next()
	return
})

router.afterEach(() => {
	NProgress.done() // finish progress bar
})
