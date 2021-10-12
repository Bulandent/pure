import Layout from '@/views/layout/Layout'

export const system = [
	{
		path: '/system',
		component: Layout,
		meta: { title: '系统管理', icon: 'service', noCache: true },
		redirect: '/system/counselorList',
		children: [
			{
				path: 'counselorList',
				component: () => import('@/views/system/counselorList'),
				name: 'systemCounselorList',
				meta: { title: '顾问服务设置', icon: 'service', noCache: true },
			},
			{
				path: 'counselorList',
				component: () => import('@/views/layout/menuIndex'),
				name: 'systemCounselorList',
				meta: { title: '顾问服务设置', icon: 'service', noCache: true },
				hidden: true,
				children: [
					{
						path: '/system/counselorDetail',
						component: () => import('@/views/system/counselorDetail'),
						name: 'systemCounselorDetail',
						meta: { title: '顾问服务详情', icon: 'service', noCache: true },
					},
				],
			},
			{
				path: 'contractList',
				component: () => import('@/views/system/contractList'),
				name: 'systemContractList',
				meta: { title: '合同模板分类', icon: 'service', noCache: true },
			},
			{
				path: 'lectureList',
				component: () => import('@/views/system/lectureList'),
				name: 'systemLectureList',
				meta: { title: '沙龙须知', icon: 'service', noCache: true },
			},
			{
				path: 'channelList',
				component: () => import('@/views/system/channelList'),
				name: 'systemChanneleList',
				meta: { title: '渠道类型设置', icon: 'service', noCache: true },
			},
			{
				path: 'channelList',
				component: () => import('@/views/layout/menuIndex'),
				name: 'systemChanneleList',
				meta: { title: '渠道类型设置', icon: 'service', noCache: true },
				hidden: true,
				children: [
					{
						path: '/system/addChannel',
						component: () => import('@/views/system/channelDetail'),
						name: 'systemAddChannel',
						meta: { title: '新增渠道类型', icon: 'service', noCache: true },
					},
					{
						path: '/system/channelDetail',
						component: () => import('@/views/system/channelDetail'),
						name: 'systemChannelDetail',
						meta: { title: '渠道类型详情', icon: 'service', noCache: true },
					},
				],
			},
		],
	},
]
