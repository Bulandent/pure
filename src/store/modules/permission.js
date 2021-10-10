import { asyncRouterMap, constantRouterMap } from '@/router'
import { getRouter } from '@/api/custom/login'
import Layout from '@/views/layout/Layout'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some(role => route.meta.roles.includes(role))
	} else {
		return true
	}
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
	const res = []
	routes.forEach(route => {
		const tmp = { ...route }
		if (hasPermission(roles, tmp)) {
			//admin edit
			if (tmp.children) {
				tmp.children = filterAsyncRouter(tmp.children, roles)
			}
			res.push(tmp)
		}
	})
	return res
}

const permission = {
	state: {
		routers: [],
		addRouters: [],
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
			state.routers = constantRouterMap.concat(routers)
		},
		SET_NULL: (state, routers) => {
			state.routers = routers
		},
	},
	actions: {
		testGenerateRoutes({ commit }, data) {
			return new Promise(resolve => {
				let accessedRouters = asyncRouterMap || []
				commit('SET_ROUTERS', accessedRouters)
				resolve()
			})
		},
		GenerateRoutes({ commit }, data) {
			return new Promise((resolve, reject) => {
				getRouter().then(res => {
					if (res.code == 20000) {
						let AddRoute = permission.state.addRouters.concat(toRouter(res.data))
						let AllRoute = asyncRouterMap.concat(AddRoute)
						commit('SET_ROUTERS', AllRoute)
						resolve()
					} else {
						reject(res)
					}
				})
			})
		},
	},
}
const checkRouter = component => {
	if (component == 'Layout') return Layout
	return resolve => require([`@/views/${component}`], resolve) || Layout
}
const routerTemple = routes => {
	let res = {
		path: routes.url || '',
		component: checkRouter(routes.component) || Layout,
		redirect: routes.redirect || 'noredirect',
		name: routes.name || '',
		hidden: routes.hidden || false,
		meta: {
			title: routes.title || '',
			icon: routes.icon || '',
			noCache: routes.noCache || true,
		},
		children: routes.children || [],
	}
	if (!routes.redirect) {
		delete res['redirect']
	}
	return res
}

const toRouter = routes => {
	const res = []
	routes.forEach(route => {
		const tmp = routerTemple({ ...route })
		if (tmp.children) {
			tmp.children = toRouter(tmp.children)
		}
		res.push(tmp)
	})
	return res
}

export default permission
