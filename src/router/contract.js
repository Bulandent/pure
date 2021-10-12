import Layout from '@/views/layout/Layout'

export const contract = [
	{
		path: '/contract',
		component: Layout,
		meta: { title: '内容管理', icon: 'service', noCache: true },
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
				meta: { title: '合同模板2', icon: 'service', noCache: true },
				hidden: true,
				children: [
					{
						path: '/contract/add',
						component: () => import('@/views/contract/detail'),
						name: 'addcontract',
						meta: { title: '新增合同模板', icon: 'service', noCache: true },
					},
					{
						path: '/contract/detail',
						component: () => import('@/views/contract/detail'),
						name: 'contractDetail',
						meta: { title: '合同模板详情', icon: 'service', noCache: true },
					},
				],
			},
		],
	},
]
