<template>
	<div class="accountManagement">
		<div class="accMent-tab m1-margin-top-to-bottom">
			<el-tabs v-model="queryParams.tabActive" type="card" @tab-click="handleClick">
				<el-tab-pane label="未完成" name="first"></el-tab-pane>
				<el-tab-pane label="已完成" name="second"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="LayMent-input m1-margin-top-to-bottom">
			<div class="select-1 m1-margin-left-to-right">
				<el-date-picker
					v-model="queryParams.settleMonth"
					type="date"
					value-format="yyyy-MM-dd"
					format="yyyy-MM-dd"
					placeholder="申请时间"
				></el-date-picker>
			</div>
			<div class="select-1 m1-margin-left-to-right">
				<el-select v-model="queryParams.channelType" placeholder="渠道类型" class="select-default">
					<el-option
						v-for="item in channelList"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
			<div class="search m1-margin-left-to-right">
				<el-input
					:clearable="true"
					placeholder="搜索渠道编号、名称、手机号"
					v-model="queryParams.searchInput"
					class="input-with-select active-margin"
				>
					<el-button
						slot="append"
						icon="el-icon-search"
						class="search-icon"
						@click.stop="search"
					></el-button>
				</el-input>
			</div>
			<div class="custom-flex m1-margin-left-to-right">
				<el-button @click.stop="search">搜索</el-button>
			</div>
			<div class="custom-flex rester m1-margin-left-to-right">
				<el-button @click.stop="handleRest">重置</el-button>
			</div>
		</div>
		<div class="LayMent-table m1-margin-top-to-bottom">
			<div class="healthName">
				<el-table
					:data="tableData"
					header-row-class-name="updatecolumn"
					:header-row-style="
						() => {
							return 'color:black;font-size:15px'
						}
					"
					style="width: 100%"
				>
					<el-table-column prop="applyTime" label="申请时间"></el-table-column>
					<el-table-column prop="channelNo" label="渠道编号"></el-table-column>
					<el-table-column prop="channelName" label="渠道名称"></el-table-column>
					<el-table-column prop="mobile" label="手机号"></el-table-column>
					<el-table-column prop="channelType" label="渠道类型"></el-table-column>
					<el-table-column prop="canPrice" label="可提现金额（元）"></el-table-column>
					<el-table-column prop="applyPrice" label="申请提现金额（元）"></el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<span v-if="scope.row.status === 1" style="color: orange">待审核</span>
							<span v-if="scope.row.status === 2" style="color: green">待转账</span>
						</template>
					</el-table-column>
					<el-table-column prop="bank" label="收款银行"></el-table-column>
					<el-table-column prop="branchBank" label="收款支行"></el-table-column>
					<el-table-column prop="bankCard" label="卡号"></el-table-column>
					<el-table-column label="操作" width="140px" fixed="right">
						<template slot-scope="scope">
							<div class="operation">
								<div
									v-if="scope.row.status === 1"
									class="m1-margin-left-to-right"
									@click.stop="toAudit(scope.row)"
								>
									审核
								</div>
								<div
									v-if="scope.row.status === 2"
									class="m1-margin-left-to-right"
									@click.stop="toTransfer(scope.row)"
								>
									转账确认
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="LayMent-pages m1-margin-top-to-bottom" v-if="tableData.length > 0">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="currentChange"
				:page-sizes="[10, 20, 30, 40]"
				:current-page.sync="queryParams.pageNum"
				:page-size="queryParams.pageSize"
				layout=" prev, pager, next, sizes, total,jumper"
				:total="total"
			></el-pagination>
		</div>
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
	name: 'WithdrawList',
	components: {
		ConfirmAdmin,
	},
	data() {
		return {
			total: 0,
			showConfrimAudit: false,
			showConfrimWithdraw: false,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
				tabActive: 'first',
				settleMonth: null,
				channelType: null,
				searchInput: null,
			},
			channelList: [
				{ label: '类型一', value: 1 },
				{ label: '类型二', value: 2 },
			],
			tableData: [
				{
					id: 1,
					applyTime: '2021.10.12 13:21',
					channelNo: 'CH00001',
					channelName: '新宇宙公司',
					mobile: '13308201102',
					channelType: '合作',
					canPrice: 3000,
					applyPrice: 1000,
					status: 1,
					bank: '招行银行',
					branchBank: '新街路支行',
					bankCard: '6220203212119901',
				},
				{
					id: 1,
					applyTime: '2021.10.12 13:21',
					channelNo: 'CH00001',
					channelName: '新宇宙公司',
					mobile: '13308201102',
					channelType: '合作',
					canPrice: 3000,
					companyPrice: 1000,
					status: 2,
					bank: '招行银行',
					branchBank: '新街路支行',
					bankCard: '6220203212119901',
				},
			],
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
		this.getList()
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
		toAudit({ channelName = '', applyTime, applyPrice = 0 }) {
			this.Audit_Data.content = `【${channelName}】于${applyTime}申请提现<span style="color: #409eff;"> ${applyPrice} 元</span>，是否通过审核？`
			this.showConfrimAudit = true
		},
		toTransfer() {
			this.showConfrimWithdraw = true
		},
		handleClick(tab, event) {
			console.log(tab)
		},
		search() {
			this.getList()
		},
		getList() {
			// 请求列表
		},
		handleSizeChange(pageSize) {
			this.queryParams.pageSize = pageSize
			this.getList()
		},
		currentChange(pageNum) {
			this.queryParams.pageNum = pageNum
			this.getList()
		},
		handleRest() {
			this.queryParams.settleMonth = null
			this.queryParams.channelType = null
			this.queryParams.searchInput = null
			this.getList()
		},
	},
}
</script>

<style lang="scss" scoped>
.accountManagement {
	.accMent-tab {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.AddLayMent {
			color: white;
			padding: 6px 24px;
			font-size: 14px;
			background-color: #1989fa;
			cursor: pointer;
		}
		button {
			border: 1px solid #aaaaaa;
			background-color: #aaaaaa;
			color: white;
			font-size: 16px;
			font-weight: bold;
			padding: 12px 48px;
		}
	}
	.LayMent-table {
		.healthName {
			/deep/ .el-table__body-wrapper::-webkit-scrollbar {
				/*滚动条整体样式*/
				width: 10px;
				/*高宽分别对应横竖滚动条的尺寸*/
				height: 6px;
			}

			/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
				/*滚动条里面小方块*/
				border-radius: 10px;
				background-color: gainsboro;
				background-image: -webkit-linear-gradient(
					45deg,
					rgba(255, 255, 255, 0.2) 25%,
					transparent 25%,
					transparent 50%,
					rgba(255, 255, 255, 0.2) 50%,
					rgba(255, 255, 255, 0.2) 75%,
					transparent 75%,
					transparent
				);
			}

			/deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
				/*滚动条里面轨道*/
				-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			}
			.el-table__body-wrapper::-webkit-scrollbar {
				/*滚动条整体样式*/
				width: 10px;
				/*高宽分别对应横竖滚动条的尺寸*/
				height: 6px;
			}

			.el-table__body-wrapper::-webkit-scrollbar-thumb {
				/*滚动条里面小方块*/
				border-radius: 10px;
				background-color: gainsboro;
				background-image: -webkit-linear-gradient(
					45deg,
					rgba(255, 255, 255, 0.2) 25%,
					transparent 25%,
					transparent 50%,
					rgba(255, 255, 255, 0.2) 50%,
					rgba(255, 255, 255, 0.2) 75%,
					transparent 75%,
					transparent
				);
			}

			.el-table__body-wrapper::-webkit-scrollbar-track {
				/*滚动条里面轨道*/
				-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			}
			.operation {
				color: #1989fa;
				display: flex;
				div {
					cursor: pointer;
				}
			}
			/deep/.Roles {
				display: flex;
				flex-wrap: wrap;
			}
			/deep/.AdminStatus {
				display: flex;
			}
			.Roles {
				display: flex;
				flex-wrap: wrap;
			}
			.AdminStatus {
				display: flex;
			}
		}
	}
	.LayMent-input {
		display: flex;
		padding: 6px;
		border: 1px solid #d7d7d7;
		margin-top: 24px;
		flex-wrap: wrap;
		div {
			margin-bottom: 3px;
			margin-top: 3px;
		}
		.search {
			width: 350px;
			/deep/ .input-with-select {
				// border: 1px solid #DCDFE6;
				border-radius: 3px;
				/deep/ .el-input__inner {
					border-top: 1px solid #dcdfe6;
					border-left: 1px solid #dcdfe6;
					border-bottom: 1px solid #dcdfe6;
				}
			}
			/deep/ .el-input-group__append {
				background: unset;
			}
			.input-with-select {
				// border: 1px solid #DCDFE6;
				border-radius: 3px;
				.el-input__inner {
					border-top: 1px solid #dcdfe6;
					border-left: 1px solid #dcdfe6;
					border-bottom: 1px solid #dcdfe6;
				}
			}
			.el-input-group__append {
				background: unset;
			}
		}
	}
	.LayMent-pages {
		text-align: center;
	}
	.el-tabs {
		::v-deep {
			.is-active {
				background-color: #1989fa;
				color: #fff;
			}
		}
	}
}
</style>
<style scoped>
.input-with-select >>> .el-input__inner {
	border-top: 1px solid #dcdfe6;
	border-left: 1px solid #dcdfe6;
	border-bottom: 1px solid #dcdfe6;
	border-right: none;
}
.input-with-select >>> .el-input-group__append {
	border-top: 1px solid #dcdfe6 !important;
	border-right: 1px solid #dcdfe6 !important;
	border-bottom: 1px solid #dcdfe6 !important;
}
</style>
