<template>
	<div class="workbench">
		<template v-if="role === 'companyManager'">
			<div class="select-time">
				<el-radio-group v-model="tabIndex" @change="changeTab">
					<el-radio-button v-for="item in timeList" :key="item.label" :label="item.value">
						{{ item.label }}
					</el-radio-button>
				</el-radio-group>
			</div>
			<h4>平台数据</h4>
			<div class="statistics-pannel">
				<div v-for="item in platformList" :key="item.label" class="sp-item">
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
						<div v-if="item.incress" class="incress">
							同比
							<span :class="{ green: item.incress > 0, red: item.incress < 0 }">
								{{ item.incress > 0 ? '+' : '' }}{{ item.incress }}
							</span>
						</div>
					</div>
					<div class="spi-bottom">
						<div>
							<p class="name">{{ item.firstName }}</p>
							<span>{{ item.firstCount }}</span>
						</div>
						<div v-if="item.secondName">
							<p class="name">{{ item.secondName }}</p>
							<span>{{ item.secondCount }}</span>
						</div>
					</div>
				</div>
			</div>
			<h4>销售数据</h4>
			<div class="statistics-pannel">
				<div v-for="item in sellList" :key="item.label" class="sp-item">
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
					</div>
					<div class="spi-bottom">
						<div v-if="item.incress" class="incress">
							同比
							<span :class="{ green: item.incress > 0, red: item.incress < 0 }">
								{{ item.incress > 0 ? '+' : '' }}{{ item.incress }}
							</span>
						</div>
					</div>
				</div>
			</div>
			<h4>渠道数据</h4>
			<div class="statistics-pannel">
				<div v-for="item in channelList" :key="item.label" class="sp-item">
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
					</div>
					<div class="spi-bottom">
						<div v-if="item.incress" class="incress">
							同比
							<span :class="{ green: item.incress > 0, red: item.incress < 0 }">
								{{ item.incress > 0 ? '+' : '' }}{{ item.incress }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'Workbench',
	components: {},
	data() {
		return {
			role: 'companyManager',
			tabIndex: 1,
			timeList: [
				{ label: '今日', value: 1 },
				{ label: '昨日', value: 2 },
				{ label: '上周', value: 3 },
				{ label: '本月', value: 4 },
				{ label: '上月', value: 5 },
				{ label: '全部', value: 6 },
				{ label: '选择时间', value: 7 },
			],
			platformList: [
				{
					label: '用户注册（个）',
					total: 10222,
					firstName: '昨日新增',
					firstCount: 602,
				},
				{
					label: '顾问服务购买（个）',
					total: 10222,
					incress: 12,
					firstName: '企业',
					firstCount: 602,
					secondName: '个人',
					secondCount: 102,
				},
				{
					label: '服务中顾问（个）',
					total: 10222,
					incress: -3,
					firstName: '企业',
					firstCount: 602,
					secondName: '个人',
					secondCount: 102,
				},
				{
					label: '即将到期顾问（个）',
					total: 10222,
					incress: -3,
					firstName: '企业',
					firstCount: 602,
					secondName: '个人',
					secondCount: 102,
				},
				{
					label: '已到期顾问（个）',
					total: 10222,
					incress: -3,
					firstName: '企业',
					firstCount: 602,
					secondName: '个人',
					secondCount: 102,
				},
			],
			sellList: [
				{
					label: '邀请用户注册（个）',
					total: 10222,
					incress: 12,
				},
				{
					label: '企业顾问下单（个）',
					total: 10222,
					incress: -3,
				},
				{
					label: '个人顾问下单（个）',
					total: 10222,
					incress: -3,
				},
				{
					label: '成交金额（元）',
					total: 10222,
					incress: -3,
				},
			],
			channelList: [
				{
					label: '邀请用户注册（个）',
					total: 10222,
					incress: 12,
				},
				{
					label: '企业顾问下单（个）',
					total: 10222,
					incress: -3,
				},
				{
					label: '个人顾问下单（个）',
					total: 10222,
					incress: -3,
				},
				{
					label: '成交金额（元）',
					total: 10222,
					incress: -3,
				},
				{
					label: '待结算佣金（元）',
					total: 10222,
					incress: -3,
				},
			],
			tableData: [
				{
					lectureNo: '1200001',
					lectureName: '讲座名称讲座名称',
					sponsor: '小宇宙公司',
					countPerson: 30,
					status: '未开始',
					hasCount: 12,
					actStartTime: '2021.12.12 13:02',
				},
			],
		}
	},
	created() {},
	methods: {
		changeTab(index) {
			this.tabIndex = index
			console.log('接口请求拉取数据')
		},
	},
}
</script>

<style lang="scss" scoped>
.workbench {
	.statistics-pannel {
		display: flex;
		.sp-item {
			border: 1px solid #dcdfe6;
			border-radius: 10px;
			padding: 20px 25px;
			text-align: center;
			margin-right: 25px;
			width: 250px;
			label {
				font-weight: 400;
				padding-bottom: 10px;
				display: inline-block;
			}
		}
		.spi-bottom {
			display: flex;
			justify-content: center;
			.name {
				margin: 10px 0;
			}
			div + div {
				margin-left: 40px;
			}
			.incress {
				span {
					padding-left: 15px;
				}
				margin-top: 15px;
			}
		}
		.label {
			font-size: 16px;
		}
		.total {
			padding-bottom: 15px;
			border-bottom: 1px solid #dcdfe6;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.num {
				font-size: 22px;
				font-weight: 500;
			}
		}
		.incress {
			font-size: 14px;
		}
		.green {
			color: green;
		}
		.red {
			color: red;
		}
	}
	.select-time {
		color: green;
		::v-deep {
			.el-radio-button__orig-radio:checked + .el-radio-button__inner {
				color: #2190ff;
				background-color: transparent;
			}
		}
	}
}
</style>
