import Layout from '@/views/layout/Layout'

export const finance = [
	{
		path: '/finance',
		component: Layout,
		meta: { title: '财务管理', icon: 'service', noCache: true },
		redirect: '/settle/list',
		children: [
			{
				path: '/finance/settle',
				component: () => import('@/views/finance/settle'),
				name: 'settleList',
				meta: { title: '渠道结算', icon: 'service', noCache: true },
			},
			{
				path: '/finance/withdraw',
				component: () => import('@/views/finance/withdraw'),
				name: 'withdrawList',
				meta: { title: '提现管理', icon: 'service', noCache: true },
			},
		],
	},
]
