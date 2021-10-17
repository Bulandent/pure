import Layout from '@/views/layout/Layout'

export const sell = [
	{
		path: '/sell',
		component: Layout,
		meta: { title: '销售管理', icon: 'service', noCache: true },
		redirect: '/sell/list',
		children: [
			{
				path: 'list',
				component: () => import('@/views/sell/list'),
				name: 'sellList',
				meta: { title: '销售管理', icon: 'service', noCache: true },
			},
			{
				path: 'list',
				component: () => import('@/views/layout/menuIndex'),
				name: 'sellList',
				meta: { title: '销售管理', icon: 'service', noCache: true },
				hidden: true,
				children: [
					{
						path: '/sell/detail',
						component: () => import('@/views/sell/detail'),
						name: 'sellDetail',
						meta: { title: '销售详情', icon: 'service', noCache: true },
					},
				],
			},
		],
	},
]
