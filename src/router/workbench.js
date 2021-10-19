import Layout from '@/views/layout/Layout'

export const workbench = [
	{
		path: '/workbench',
		component: Layout,
		meta: { title: '', icon: 'service', noCache: true },
		redirect: '/workbench/index',
		children: [
			{
				path: 'index',
				component: () => import('@/views/workbench/index'),
				name: 'workbenchIndex',
				meta: { title: '工作台', icon: 'service', noCache: true },
			},
		],
	},
]
