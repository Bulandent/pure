import Layout from '@/views/layout/Layout'

export const lecture = [
	{
		path: '/lecture',
		component: Layout,
		meta: { title: '', icon: 'service', noCache: true },
		redirect: '/lecture/list',
		children: [
			{
				path: 'list',
				component: () => import('@/views/lecture/list'),
				name: 'lectureList',
				meta: { title: '沙龙讲座', icon: 'service', noCache: true },
			},
			{
				path: 'list',
				component: () => import('@/views/layout/menuIndex'),
				name: 'lectureList',
				meta: { title: '沙龙讲座', icon: 'service', noCache: true },
				hidden: true,
				children: [
					{
						path: '/lecture/add',
						component: () => import('@/views/lecture/detail'),
						name: 'addLecture',
						hidden: true,
						meta: { title: '新增沙龙讲座', icon: 'service', noCache: true },
					},
					{
						path: '/lecture/detail',
						component: () => import('@/views/lecture/detail'),
						name: 'lectureDetail',
						hidden: true,
						meta: { title: '沙龙讲座详情', icon: 'service', noCache: true },
					},
				],
			},
		],
	},
]
