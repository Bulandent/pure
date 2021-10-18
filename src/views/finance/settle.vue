<template>
	<div class="accountManagement">
		<div class="accMent-tab m1-margin-top-to-bottom">
			<el-tabs v-model="queryParams.tabActive" type="card" @tab-click="handleClick">
				<el-tab-pane label="待结算" name="first"></el-tab-pane>
				<el-tab-pane label="已结算" name="second"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="LayMent-input m1-margin-top-to-bottom">
			<div class="select-1 m1-margin-left-to-right">
				<el-date-picker
					v-model="queryParams.settleMonth"
					type="date"
					value-format="yyyy-MM"
					format="yyyy-MM"
					placeholder="结算月份"
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
					<el-table-column prop="settleMonth" label="结算月份"></el-table-column>
					<el-table-column prop="channelNo" label="渠道编号"></el-table-column>
					<el-table-column prop="channelName" label="渠道名称"></el-table-column>
					<el-table-column prop="mobile" label="手机号"></el-table-column>
					<el-table-column prop="level" label="等级"></el-table-column>
					<el-table-column prop="channelType" label="渠道类型"></el-table-column>
					<el-table-column prop="companyOrderCount" label="企业顾问下单数"></el-table-column>
					<el-table-column prop="companyPrice" label="分润（元）"></el-table-column>
					<el-table-column prop="personalOrderCount" label="个人顾问下单数"></el-table-column>
					<el-table-column prop="personalPrice" label="分润（元）"></el-table-column>
					<el-table-column prop="totalPrice" label="合计（元）"></el-table-column>
					<el-table-column label="操作" width="140px" fixed="right">
						<template slot-scope="scope">
							<div class="operation">
								<div class="m1-margin-left-to-right" @click.stop="toSettle(scope.row)">
									确认结算
								</div>
								<div class="m1-margin-left-to-right" @click.stop="toDetail(scope.row)">查看</div>
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
			:alert-data="Alert_Data"
			v-if="showConfrim"
			@submitForm="submitForm"
			@closeForm="closeForm"
		></ConfirmAdmin>
	</div>
</template>

<script>
import ConfirmAdmin from '@/components/confirm'
export default {
	name: 'SettleList',
	components: {
		ConfirmAdmin,
	},
	data() {
		return {
			total: 0,
			showConfrim: false,
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
					settleMonth: '2021年-10月',
					channelNo: 'CH00001',
					channelName: '新宇宙公司',
					mobile: '13308201102',
					level: '上级渠道',
					channelType: '合作',
					companyOrderCount: 18,
					companyPrice: 1000,
					personalOrderCount: 18,
					personalPrice: 2000,
					totalPrice: 3000,
				},
			],
			Alert_Data: {
				title: '确认结算',
				centerDialogVisible: true,
				showPrepend: false,
				type: 1,
				region: '',
				content: '',
			},
		}
	},
	created() {
		this.getList()
	},
	methods: {
		submitForm() {
			this.showConfrim = false
			console.log('提交成功')
		},
		closeForm() {
			this.showConfrim = false
		},
		toDetail() {
			console.log('跳转到详情')
		},
		toSettle({ channelName = '', settleMonth, totalPrice = 0 }) {
			this.Alert_Data.content = `渠道商【${channelName}】${settleMonth}的分润总金额为 ${totalPrice} 元，是否确认金额无误并确认结算？`
			this.showConfrim = true
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
