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
			<div class="statis-pannel">
				<div v-for="item in platformPannel" :key="item.label" class="sp-item">
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
						<div v-if="item.incress" class="incress">
							{{ item.incressText }}
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
			<div class="statis-pannel">
				<div v-for="item in sellPannel" :key="item.label" class="sp-item">
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
					</div>
					<div class="spi-bottom">
						<div v-if="item.incress" class="incress">
							{{ item.incressText }}
							<span :class="{ green: item.incress > 0, red: item.incress < 0 }">
								{{ item.incress > 0 ? '+' : '' }}{{ item.incress }}
							</span>
						</div>
					</div>
				</div>
			</div>
			<h4>渠道数据</h4>
			<div class="statis-pannel">
				<div v-for="item in channelPannel" :key="item.label" class="sp-item">
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
					</div>
					<div class="spi-bottom">
						<div v-if="item.incress" class="incress">
							{{ item.incressText }}
							<span :class="{ green: item.incress > 0, red: item.incress < 0 }">
								{{ item.incress > 0 ? '+' : '' }}{{ item.incress }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else-if="role === 'laywer'">
			<div class="statis-pannel">
				<div v-for="item in laywerPannel" :key="item.label" class="sp-item">
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
						<div v-if="item.incress" class="incress">
							{{ item.incressText }}
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
			<div class="statis-bar mart25">
				<div
					v-for="(item, index) in laywerBar"
					:key="item.label"
					class="sb-item"
					:class="{ 'sb-item-first': index === 0 }"
				>
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
						<div v-if="item.incress" class="incress">
							{{ item.incressText }}
							<span :class="{ green: item.incress > 0, red: item.incress < 0 }">
								{{ item.incress > 0 ? '+' : '' }}{{ item.incress }}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-list mart25">
				<el-tabs v-model="laywerTab" type="card" @tab-click="changeLaywerTab">
					<el-tab-pane :label="laywerFirstLabel" name="first"></el-tab-pane>
					<el-tab-pane :label="laywerSecondLabel" name="second"></el-tab-pane>
				</el-tabs>
				<div class="tab-list-con" v-if="laywerTab === 'first'">
					<el-table
						:data="laywerFirstTable"
						header-row-class-name="updatecolumn"
						:header-row-style="
							() => {
								return 'color:black;font-size:15px'
							}
						"
						style="width: 100%"
					>
						<el-table-column prop="jobType" label="工作类型"></el-table-column>
						<el-table-column prop="customerType" label="客户类型"></el-table-column>
						<el-table-column prop="customerName" label="客户名称"></el-table-column>
						<el-table-column prop="time" label="发起时间"></el-table-column>
						<el-table-column prop="isUgent" label="是否加急"></el-table-column>
						<el-table-column label="操作" width="70px" fixed="right">
							<template slot-scope="scope">
								<div class="operation">
									<div class="m1-margin-left-to-right" @click.stop="toDetail(scope.row.id)">
										查看
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="tab-list-con" v-if="laywerTab === 'second'">
					<el-table
						:data="laywerSecondTable"
						header-row-class-name="updatecolumn"
						:header-row-style="
							() => {
								return 'color:black;font-size:15px'
							}
						"
						style="width: 100%"
					>
						<el-table-column prop="consultType" label="咨询类型"></el-table-column>
						<el-table-column prop="customerType" label="客户类型"></el-table-column>
						<el-table-column prop="customerName" label="客户名称"></el-table-column>
						<el-table-column prop="time" label="发起时间"></el-table-column>
						<el-table-column prop="status" label="是否加急"></el-table-column>
						<el-table-column label="操作" width="70px" fixed="right">
							<template slot-scope="scope">
								<div class="operation">
									<div class="m1-margin-left-to-right" @click.stop="toDetail(scope.row.id)">
										查看
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</template>
		<template v-else-if="role === 'laywerManager'">
			<div class="statis-pannel">
				<div v-for="item in laywerPannel" :key="item.label" class="sp-item">
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
						<div v-if="item.incress" class="incress">
							{{ item.incressText }}
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
			<div class="statis-bar mart25">
				<div
					v-for="(item, index) in laywerBar"
					:key="item.label"
					class="sb-item"
					:class="{ 'sb-item-first': index === 0 }"
				>
					<label>{{ item.label }}</label>
					<div class="total">
						<span class="num">{{ item.total }}</span>
						<div v-if="item.incress" class="incress">
							{{ item.incressText }}
							<span :class="{ green: item.incress > 0, red: item.incress < 0 }">
								{{ item.incress > 0 ? '+' : '' }}{{ item.incress }}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-list mart25">
				<el-tabs v-model="laywerTab" type="card" @tab-click="changeLaywerTab">
					<el-tab-pane :label="laywerFirstLabel" name="first"></el-tab-pane>
					<el-tab-pane :label="laywerSecondLabel" name="second"></el-tab-pane>
				</el-tabs>
				<div class="tab-list-con" v-if="laywerTab === 'first'">
					<el-table
						:data="laywerFirstTable"
						header-row-class-name="updatecolumn"
						:header-row-style="
							() => {
								return 'color:black;font-size:15px'
							}
						"
						style="width: 100%"
					>
						<el-table-column prop="jobType" label="工作类型"></el-table-column>
						<el-table-column prop="customerType" label="客户类型"></el-table-column>
						<el-table-column prop="customerName" label="客户名称"></el-table-column>
						<el-table-column prop="laywerName" label="主办律师"></el-table-column>
						<el-table-column prop="time" label="发起时间"></el-table-column>
						<el-table-column prop="isUgent" label="是否加急"></el-table-column>
						<el-table-column label="操作" width="70px" fixed="right">
							<template slot-scope="scope">
								<div class="operation">
									<div class="m1-margin-left-to-right" @click.stop="toDetail(scope.row.id)">
										查看
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="tab-list-con" v-if="laywerTab === 'second'">
					<el-table
						:data="laywerSecondTable"
						header-row-class-name="updatecolumn"
						:header-row-style="
							() => {
								return 'color:black;font-size:15px'
							}
						"
						style="width: 100%"
					>
						<el-table-column prop="consultType" label="咨询类型"></el-table-column>
						<el-table-column prop="customerType" label="客户类型"></el-table-column>
						<el-table-column prop="customerName" label="客户名称"></el-table-column>
						<el-table-column prop="laywerName" label="主办律师"></el-table-column>
						<el-table-column prop="time" label="发起时间"></el-table-column>
						<el-table-column prop="status" label="是否加急"></el-table-column>
						<el-table-column label="操作" width="70px" fixed="right">
							<template slot-scope="scope">
								<div class="operation">
									<div class="m1-margin-left-to-right" @click.stop="toDetail(scope.row.id)">
										查看
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</template>
		<template v-else-if="role === 'finance'">
			<div class="tab-list mart25">
				<el-tabs v-model="financeTab" type="card" @tab-click="changeFinanceTab">
					<el-tab-pane :label="financeFirstLabel" name="first"></el-tab-pane>
					<el-tab-pane :label="financeSecondLabel" name="second"></el-tab-pane>
				</el-tabs>
				<div class="tab-list-con" v-if="financeTab === 'first'">
					<el-table
						:data="financeFirstTable"
						header-row-class-name="updatecolumn"
						:header-row-style="
							() => {
								return 'color:black;font-size:15px'
							}
						"
						style="width: 100%"
					>
						<el-table-column prop="channelLevel" label="渠道级别"></el-table-column>
						<el-table-column prop="channelName" label="渠道名称"></el-table-column>
						<el-table-column prop="month" label="结算月份"></el-table-column>
						<el-table-column prop="companyCount" label="邀请企业顾问数"></el-table-column>
						<el-table-column prop="personalCount" label="邀请个人顾问数"></el-table-column>
						<el-table-column prop="price" label="待结算佣金（元）"></el-table-column>
						<el-table-column label="操作" width="140px" fixed="right">
							<template slot-scope="scope">
								<div class="operation">
									<div class="m1-margin-left-to-right" @click.stop="toFinanceDetail(scope.row)">
										查看
									</div>
									<div class="m1-margin-left-to-right" @click.stop="toAudit(scope.row)">结算</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="tab-list-con" v-if="financeTab === 'second'">
					<el-table
						:data="financeSecondTable"
						header-row-class-name="updatecolumn"
						:header-row-style="
							() => {
								return 'color:black;font-size:15px'
							}
						"
						style="width: 100%"
					>
						<el-table-column prop="channelLevel" label="渠道级别"></el-table-column>
						<el-table-column prop="channelName" label="渠道名称"></el-table-column>
						<el-table-column prop="applyPrice" label="可提现金额（元）"></el-table-column>
						<el-table-column prop="canPrice" label="申请提现金额（元）"></el-table-column>
						<el-table-column prop="bank" label="提现银行"></el-table-column>
						<el-table-column prop="branchBank" label="所属支行"></el-table-column>
						<el-table-column label="操作" width="140px" fixed="right">
							<template slot-scope="scope">
								<div class="operation">
									<div class="m1-margin-left-to-right" @click.stop="toTransfer(scope.row)">
										确认转账
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</template>
		<ConfirmAdmin
			:alert-data="Audit_Data"
			v-if="showConfrimAudit"
			@submitForm="submitAudit"
			@closeForm="closeForm"
		></ConfirmAdmin>
		<ConfirmAdmin
			:alert-data="Withdraw_Data"
			v-if="showConfrimWithdraw"
			@submitForm="submitWithdraw"
			@closeForm="showConfrimWithdraw = false"
		></ConfirmAdmin>
	</div>
</template>

<script>
import ConfirmAdmin from '@/components/confirm'
export default {
	name: 'Workbench',
	components: {
		ConfirmAdmin,
	},
	data() {
		return {
			role: 'companyManager', // laywer，laywerManager，finance
			tabIndex: 1,

			// 公司管理员
			timeList: [
				{ label: '今日', value: 1 },
				{ label: '昨日', value: 2 },
				{ label: '上周', value: 3 },
				{ label: '本月', value: 4 },
				{ label: '上月', value: 5 },
				{ label: '全部', value: 6 },
				{ label: '选择时间', value: 7 },
			],
			platformPannel: [
				{
					label: '用户注册（个）',
					total: 10222,
					firstName: '昨日新增',
					firstCount: 602,
				},
				{
					label: '顾问服务购买（个）',
					total: 10222,
					incressText: '同比',
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
					incressText: '同比',
					firstName: '企业',
					firstCount: 602,
					secondName: '个人',
					secondCount: 102,
				},
				{
					label: '即将到期顾问（个）',
					total: 10222,
					incress: -3,
					incressText: '同比',
					firstName: '企业',
					firstCount: 602,
					secondName: '个人',
					secondCount: 102,
				},
				{
					label: '已到期顾问（个）',
					total: 10222,
					incress: -3,
					incressText: '同比',
					firstName: '企业',
					firstCount: 602,
					secondName: '个人',
					secondCount: 102,
				},
			],
			sellPannel: [
				{
					label: '邀请用户注册（个）',
					total: 10222,
					incress: 12,
					incressText: '同比',
				},
				{
					label: '企业顾问下单（个）',
					total: 10222,
					incress: -3,
					incressText: '同比',
				},
				{
					label: '个人顾问下单（个）',
					total: 10222,
					incress: -3,
					incressText: '同比',
				},
				{
					label: '成交金额（元）',
					total: 10222,
					incress: -3,
					incressText: '同比',
				},
			],
			channelPannel: [
				{
					label: '邀请用户注册（个）',
					total: 10222,
					incress: 12,
					incressText: '同比',
				},
				{
					label: '企业顾问下单（个）',
					total: 10222,
					incress: -3,
					incressText: '同比',
				},
				{
					label: '个人顾问下单（个）',
					total: 10222,
					incress: -3,
					incressText: '同比',
				},
				{
					label: '成交金额（元）',
					total: 10222,
					incress: -3,
					incressText: '同比',
				},
				{
					label: '待结算佣金（元）',
					total: 10222,
					incress: -3,
					incressText: '同比',
				},
			],

			// 律师，律师管理员
			laywerTab: 'first',
			laywerFirstLabel: '工作(12)',
			laywerSecondLabel: '咨询(12)',
			laywerPannel: [
				{
					label: '顾问客户总数（个）',
					total: 10222,
					incressText: '较昨日',
					incress: 12,
					firstName: '服务中',
					firstCount: 602,
					secondName: '已到期',
					secondCount: 102,
				},
				{
					label: '企业客户（个）',
					total: 10222,
					incressText: '较昨日',
					incress: 12,
					firstName: '服务中',
					firstCount: 602,
					secondName: '已到期',
					secondCount: 102,
				},
				{
					label: '个人客户（个）',
					total: 10222,
					incress: -3,
					incressText: '较昨日',
					firstName: '服务中',
					firstCount: 602,
					secondName: '已到期',
					secondCount: 102,
				},
			],
			laywerBar: [
				{ label: '服务次数（次）', total: 2000, incress: 12 },
				{ label: '咨询', total: 2000, incress: 12 },
				{ label: '合同/文书审核', total: 2000, incress: 12 },
				{ label: '合同/文书草拟', total: 2000, incress: 12 },
				{ label: '规章制度审核', total: 2000, incress: 12 },
				{ label: '律师函', total: 2000, incress: 12 },
				{ label: '债券催收函', total: 2000, incress: 12 },
			],
			laywerFirstTable: [
				{
					jobType: '文件审核',
					customerType: '私人常年法律顾问',
					customerName: '常文亲',
					laywerName: '江涛',
					time: '2021.10.12 12:02',
					isUgent: '是',
				},
				{
					jobType: '合同审核',
					customerType: '私人常年法律顾问',
					customerName: '常文亲',
					laywerName: '江涛',
					time: '2021.10.12 12:02',
					isUgent: '否',
				},
			],
			laywerSecondTable: [
				{
					consultType: '文件审核',
					customerType: '私人常年法律顾问',
					customerName: '常文亲',
					laywerName: '江涛',
					time: '2021.10.12 12:02',
					status: '待确认',
				},
				{
					consultType: '合同审核',
					customerType: '私人常年法律顾问',
					customerName: '常文亲',
					laywerName: '江涛',
					time: '2021.10.12 12:02',
					status: '待开始',
				},
			],

			// 财务
			financeTab: 'first',
			financeFirstLabel: '待结算佣金(12)',
			financeSecondLabel: '待处理提现申请(12)',
			financeFirstTable: [
				{
					channelLevel: '上级渠道',
					channelName: '渠道A',
					month: '7月',
					companyCount: 12,
					personalCount: 12,
					price: 2500,
				},
			],
			financeSecondTable: [
				{
					channelLevel: '上级渠道',
					channelName: '渠道A',
					applyPrice: 1200,
					canPrice: 1200,
					bank: '招行银行',
					branchBank: '新大街支行',
				},
			],
			showConfrimAudit: false,
			showConfrimWithdraw: false,
			Audit_Data: {
				title: '确认结算',
				centerDialogVisible: true,
				showPrepend: false,
				type: 1,
				region: '',
				content: '',
				closeText: '不通过',
				enterText: '通过',
			},
			Withdraw_Data: {
				title: '确认转账',
				centerDialogVisible: true,
				showPrepend: false,
				type: 1,
				region: '',
				content: '请确认已完成转账并填写业务参考号。',
				ruleForm: {
					businessNo: '',
				},
				rules: {
					businessNo: [{ required: true, message: '请输入', trigger: 'blur' }],
				},
				input: [{ lable: '业务参考号:', prop: 'businessNo', text: '请输入', val: '' }],
			},
		}
	},
	created() {
		this.role = this.$route.query.role || 'companyManager'
		if (this.role === 'laywer') {
			this.laywerBar[0].label = '服务次数（次）'
		} else if (this.role === 'laywerManager') {
			this.laywerBar[0].label = '律师服务次数（次）'
		}
	},
	methods: {
		submitAudit() {
			this.showConfrimAudit = false
			console.log('提交成功')
		},
		submitWithdraw() {
			this.showConfrimWithdraw = false
			console.log('提交成功')
		},
		closeForm() {
			this.showConfrimAudit = false
		},
		toAudit({ channelName = '', price = 0 }) {
			this.Audit_Data.content = `【${channelName}】申请提现<span style="color: #409eff;"> ${price} 元</span>，是否通过审核？`
			this.showConfrimAudit = true
		},
		toTransfer() {
			this.showConfrimWithdraw = true
		},
		toFinanceDetail(row) {},
		changeLaywerTab() {},
		changeFinanceTab() {},
		changeTab(index) {
			this.tabIndex = index
			console.log('接口请求拉取数据')
		},
	},
}
</script>

<style lang="scss" scoped>
.mart25 {
	margin-top: 25px;
}
.workbench {
	.statis-pannel {
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
	.statis-bar {
		display: flex;
		border: 1px solid #dcdfe6;
		border-radius: 10px;
		padding: 20px 25px;
		justify-content: space-around;
		.total {
			display: flex;
			align-items: center;
			justify-content: space-around;
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
		.sb-item {
			text-align: center;
			label {
				font-size: 14px;
				font-weight: 400;
				padding-bottom: 10px;
				display: inline-block;
			}
			.num {
				font-size: 18px;
			}
		}
		.sb-item-first {
			padding-right: 30px;
			border-right: 1px solid #dcdfe6;
			label {
				font-size: 18px;
			}
			.num {
				font-size: 22px;
			}
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
	.tab-list-con {
		border: 1px solid #dcdfe6;
	}
	.el-tabs--card {
		::v-deep {
			.el-tabs__header {
				border-bottom: none;
				margin: 0;
			}
		}
	}
	.operation {
		color: #1989fa;
		display: flex;
		div {
			cursor: pointer;
		}
	}
}
</style>
