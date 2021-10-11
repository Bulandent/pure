import Layout from '@/views/layout/Layout'

export const contract = [
	{
		path: '/contract',
		component: Layout,
		meta: { title: '', icon: 'service', noCache: true },
		redirect: '/contract/list',
		children: [
			{
				path: 'list',
				component: () => import('@/views/contract/list'),
				name: 'contractList',
				meta: { title: '合同模板', icon: 'service', noCache: true },
			},
			{
				path: 'list',
				component: () => import('@/views/layout/menuIndex'),
				name: 'contractList',
				meta: { title: '合同模板', icon: 'service', noCache: true },
				hidden: true,
				children: [
					{
						path: '/contract/add',
						component: () => import('@/views/contract/detail'),
						name: 'addcontract',
						hidden: true,
						meta: { title: '新增合同模板', icon: 'service', noCache: true },
					},
					{
						path: '/contract/detail',
						component: () => import('@/views/contract/detail'),
						name: 'contractDetail',
						hidden: true,
						meta: { title: '合同模板详情', icon: 'service', noCache: true },
					},
				],
			},
		],
	},
]
