import Layout from '@/views/layout/Layout'

export const lecture = [
	{
		path: '/lecture',
		component: Layout,
		meta: { title: '沙龙讲座', icon: 'service', noCache: true },
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
				component: () => import('@/views/lecture/index'),
				name: 'lectureList',
				meta: { title: '沙龙讲座', icon: 'service', noCache: true },
				children: [
					{
						path: 'add',
						component: () => import('@/views/lecture/detail'),
						name: 'addLecture',
						hidden: true,
						meta: { title: '新增沙龙讲座', icon: 'service', noCache: true },
					},
					{
						path: 'detail',
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
