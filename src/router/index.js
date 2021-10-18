import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import { lecture } from './lecture'
import { contract } from './contract'
import { system } from './system'
import { channel } from './channel'
import { sell } from './sell'
import { finance } from './finance'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) {
		return originalPush.call(this, location, onResolve, onReject)
	}
	return originalPush.call(this, location).catch(err => err)
}
export const constantRouterMap = [
	{
		path: '',
		component: Layout,
		redirect: 'dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index'),
				name: 'Dashboard',
				meta: { title: '法帮你', icon: 'fbn_icon', noCache: true, affix: false },
			},
		],
	},
	{
		path: '/service',
		component: Layout,
		meta: { title: '客服管理', icon: 'service', noCache: true },
		redirect: '/service/visitList',
		children: [
			{
				path: 'visitList',
				component: () => import('@/views/service/visitList'),
				name: 'visitList',
				meta: { title: '客服管理', icon: 'service', noCache: true },
			},
			{
				path: 'visitList',
				component: () => import('@/views/service/index'),
				name: 'visitList',
				meta: { title: '客服管理', icon: 'service', noCache: true },
				hidden: true,
				children: [
					{
						path: 'index',
						component: () => import('@/views/service/visitList'),
						name: 'visitList',
						hidden: true,
						meta: { title: '回访名单', icon: 'visitList', noCache: true },
					},
					{
						path: 'visitListDetails',
						component: () => import('@/views/service/visitListDetails'),
						name: 'visitListDetails',
						hidden: true,
						meta: { title: '回访详情', icon: 'visitList', noCache: true },
					},
				],
			},
			// {
			//   path: 'visitList1',
			//   component: () => import('@/views/service/index'),
			//   name: 'visitList1',
			//   meta: { title: '', noCache: true },
			// },
		],
	},
	{
		path: '/payment',
		component: Layout,
		meta: { title: '支付记录', icon: 'payment', noCache: true },
		redirect: '/payment/records',
		children: [
			{
				path: 'records',
				component: () => import('@/views/payment/paymentRecords'),
				name: 'paymentRecords',
				meta: { title: '支付记录', icon: 'payment', noCache: true },
			},
		],
	},
	...lecture,
	...contract,
	...system,
	...channel,
	...sell,
	...finance,
]

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap,
})
export const asyncRouterMap = [
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path*',
				component: () => import('@/views/redirect/index'),
			},
		],
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true,
	},
	{
		path: '/404',
		component: () => import('@/views/errorPage/404'),
		hidden: true,
	},
	{
		path: '/401',
		component: () => import('@/views/errorPage/401'),
		hidden: true,
	},
	{ path: '*', redirect: '/404', hidden: true },
]
