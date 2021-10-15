import Layout from '@/views/layout/Layout'

export const channel = [
	{
		path: '/channel',
		component: Layout,
		meta: { title: '渠道管理', icon: 'service', noCache: true },
		redirect: '/channel/list',
		children: [
			{
				path: 'list',
				component: () => import('@/views/channel/list'),
				name: 'channelList',
				meta: { title: '渠道列表', icon: 'service', noCache: true },
			},
			{
				path: 'list',
				component: () => import('@/views/layout/menuIndex'),
				name: 'systemCounselorList',
				meta: { title: '渠道列表', icon: 'service', noCache: true },
				hidden: true,
				children: [
					{
						path: '/channel/add',
						component: () => import('@/views/channel/add'),
						name: 'addChannel',
						meta: { title: '新增渠道', icon: 'service', noCache: true },
					},
					{
						path: '/channel/detail',
						component: () => import('@/views/channel/detail'),
						name: 'channelDetail',
						meta: { title: '渠道详情', icon: 'service', noCache: true },
					},
				],
			},
		],
	},
]
