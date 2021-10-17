<template>
	<div class="channel-second">
		<div class="cs-search">
			<div class="cs-flex">
				<div class="select-1 m1-margin-left-to-right">
					<el-date-picker
						v-model="queryParams.orderTime"
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="下单时间"
					></el-date-picker>
				</div>
				<div class="select-1 m1-margin-left-to-right">
					<el-select
						v-model="queryParams.counselorType"
						placeholder="顾问类型"
						class="select-default"
					>
						<el-option
							v-for="item in counselorTypeList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</div>
				<div class="search m1-margin-left-to-right">
					<el-input
						:clearable="true"
						placeholder="搜索负责渠道、客户名称、手机号"
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
		</div>
		<div class="total-tip">
			企业顾问服务
			<span style="color: #409eff">{{ companyTotal }}</span>
			单，私人顾问服务
			<span style="color: #409eff">{{ personalTotal }}</span>
			单
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
					<el-table-column prop="orderNo" label="订单号"></el-table-column>
					<el-table-column prop="orderName" label="订单名称"></el-table-column>
					<el-table-column prop="userName" label="客户名称"></el-table-column>
					<el-table-column prop="mobile" label="手机号"></el-table-column>
					<el-table-column prop="channel" label="负责渠道"></el-table-column>
					<el-table-column prop="orderType" label="下单方式"></el-table-column>
					<el-table-column prop="attachedService" label="附加服务"></el-table-column>
					<el-table-column prop="payMoney" label="实际支付金额"></el-table-column>
					<el-table-column prop="payPlatform" label="下单平台"></el-table-column>
					<el-table-column prop="price" label="分润"></el-table-column>
					<el-table-column prop="expireTime" label="服务到期时间"></el-table-column>
					<el-table-column label="操作" width="140px" fixed="right">
						<template slot-scope="scope">
							<div class="operation">
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
	</div>
</template>

<script>
export default {
	name: 'ChannelList',
	data() {
		return {
			total: 0,
			companyTotal: 120,
			personalTotal: 112,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
				orderTime: null,
				counselorType: null,
				searchInput: null,
			},
			counselorTypeList: [
				{ label: '企业法律顾问', value: 1 },
				{ label: '私人法律顾问', value: 2 },
			],
			tableData: [
				{
					id: 1,
					orderNo: 'OD0001',
					orderName: '买法律服务',
					userName: '李强',
					mobile: '18901800121',
					channel: '张敏',
					orderType: '注册后下单',
					attachedService: '暂无',
					payMoney: 1200,
					payPlatform: 'APP',
					price: 100,
					expireTime: '2021-10-12 12:02:23',
				},
			],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		submitForm() {
			console.log('submit')
		},
		toDetail() {
			console.log('查看详情')
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
			this.queryParams.orderTime = null
			this.queryParams.counselorType = null
			this.queryParams.searchInput = null
			this.getList()
		},
	},
}
</script>

<style lang="scss" scoped>
.channel-second {
	.cs-search {
		display: flex;
		justify-content: space-between;
	}
	.cs-flex {
		display: flex;
	}
	.add-channel {
		color: white;
		padding: 0 24px;
		font-size: 14px;
		background-color: #1989fa;
		cursor: pointer;
		line-height: 36px;
	}
	.total-tip {
		padding: 20px 0 10px;
	}
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
