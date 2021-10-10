<template>
	<div class="lawfirmMangement LawyerManagement">
		<!-- <div class="LayMent-tab m1-margin-top-to-bottom">
            <el-button>支付记录</el-button>
        </div> -->
		<div class="LayMent-input">
			<div class="select-3">
				<el-select
					v-model="value1"
					placeholder="订单名称"
					class="select-default m1-margin-right-to-left"
				>
					<el-option
						v-for="item in options1"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
				<el-select
					v-model="value2"
					placeholder="支付状态"
					class="select-default m1-margin-right-to-left"
				>
					<el-option
						v-for="item in options2"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
			<div class="search m1-margin-right-to-left">
				<el-input
					:clearable="true"
					placeholder="搜索订单号/支付人/支付人手机号"
					v-model="inputNum"
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
			<div class="custom-flex m1-margin-right-to-left">
				<el-button @click.stop="search">搜索</el-button>
			</div>
			<div class="custom-flex rester m1-margin-right-to-left">
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
					<el-table-column prop="OrderNo" label="订单号" width="150px"></el-table-column>
					<el-table-column prop="OrderTitle" label="订单名称" width="240px"></el-table-column>
					<el-table-column prop="PayMoneny" label="支付金额（元）" width="150px"></el-table-column>

					<el-table-column prop="PayWay" label="支付渠道">
						<template slot-scope="scope">
							<div class="operation">
								<div v-if="scope.row.PayWay == 1">微信</div>
								<div v-if="scope.row.PayWay == 2">支付宝</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="Payer" label="支付人"></el-table-column>
					<el-table-column prop="PayerMobile" label="支付人手机号" width="150px"></el-table-column>
					<el-table-column prop="PayStartTime" label="开始时间" width="200px"></el-table-column>
					<el-table-column prop="PayEndTime" label="结束时间" width="200px"></el-table-column>

					<el-table-column prop="OrderStatus" label="支付状态" width="150px">
						<template slot-scope="scope">
							<div class="operation">
								<div
									v-if="scope.row.OrderStatus == -4 || scope.row.OrderStatus == 0"
									class="m1-margin-left-to-right"
								>
									待支付
								</div>
								<div v-if="scope.row.OrderStatus == -5" class="m1-margin-left-to-right">
									支付失败
								</div>
								<div v-if="scope.row.OrderStatus == -3" class="m1-margin-left-to-right">
									支付取消
								</div>
								<div v-if="scope.row.OrderStatus == 1" class="m1-margin-left-to-right">
									支付完成
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="LayMent-pages m1-margin-top-to-bottom" v-if="page">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="currentChange"
				:page-sizes="[10, 20, 30, 40]"
				:current-page.sync="page"
				:page-size="pageSize"
				layout=" prev, pager, next, sizes,total,  jumper"
				:total="Total"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import {
	getPaymentList,
	getPaymentListStatus,
	getPaymentListTitle,
} from '@/api/payment/paymentRecords'
import { toKeys, getQueryVariable } from '@/utils/validate'
export default {
	name: 'PaymentRecords',
	components: {},
	data() {
		return {
			options1: [],
			options2: [],
			value1: '',
			value2: '',
			input3: '',
			Total: 0,
			tableData: [],
			pageSize: 10,
			page: 0,
			inputNum: '',
			inputName: '',
			drawer: true,
			showClose: false,
			confirmID: '',
		}
	},
	created() {
		this.initSearchData()
		// this.getPage().then(res=>{
		this.initData()
		// })
	},
	methods: {
		getPage() {
			return new Promise((resovle, reject) => {
				if (getQueryVariable('page') && getQueryVariable('pageSize')) {
					resovle({
						page: parseInt(getQueryVariable('page')),
						pageSize: parseInt(getQueryVariable('pageSize')),
					})
				} else {
					resovle({ page: 1, pageSize: this.pageSize })
				}
			})
		},
		initData(e) {
			// if(e){
			//      this.page = e.page
			//      this.pageSize = e.pageSize
			// }else{
			//     this.page = 1
			// }
			if (!this.page) this.page = 1
			let Data = {
				ordertitle: parseInt(this.value1) || '',
				orderstatus: parseInt(this.value2) || 0,
				keyword: String(this.inputNum),
				page: parseInt(this.page),
				pageSize: this.pageSize,
			}
			getPaymentList(Data)
				.then(res => {
					if (res.code == 20000) {
						this.tableData = res.data.List
						this.Total = res.data.Num
					} else {
						this.$message(res.msg)
					}
				})
				.catch(err => {
					this.$message({
						type: 'error',
						message: err.msg || '稍后重试!',
					})
				})
		},
		initSearchData() {
			getPaymentListTitle()
				.then(res => {
					this.options1 = toKeys(res.data, true)
				})
				.catch(err => {
					this.$message({
						type: 'error',
						message: err.msg || '稍后重试!',
					})
				})
			getPaymentListStatus()
				.then(res => {
					this.options2 = toKeys(res.data)
				})
				.catch(err => {
					this.$message({
						type: 'error',
						message: err.msg || '稍后重试!',
					})
				})
		},
		options2change(e) {
			console.log(e)
		},
		getCaseTypeDesc(e) {
			return e.row.CaseTypeDesc.join(',')
		},
		search() {
			this.page = 1
			let Data = {
				ordertitle: String(this.value1) || '',
				orderstatus: parseInt(this.value2) || 0,
				keyword: String(this.inputNum),
				page: this.page,
				pageSize: this.pageSize,
			}
			getPaymentList(Data)
				.then(res => {
					if (res.code == 20000) {
						this.tableData = res.data.List
						// this.handleRest()
					} else {
						this.$message(res.msg)
					}
				})
				.catch(err => {
					this.$message({
						type: 'error',
						message: err.msg || '稍后重试!',
					})
				})
		},
		handleSizeChange(e) {
			this.pageSize = e
			this.initData()
			// this.tableData = []
			// this.$router.push({path:`/payment/records#page=${this.page}&pageSize=${e}`})
		},
		currentChange(e) {
			this.page = e
			this.initData()
			// this.tableData = []
			// this.$router.push({path:`/payment/records#page=${e}&pageSize=${this.pageSize}`})
		},
		addLawfirm() {
			this.showConfrim = true
		},
		handleSearch(e) {
			this.search()
		},
		handleRest() {
			this.inputNum = ''
			this.value1 = ''
			this.value2 = ''
			this.page = 1
			this.initData()
		},
	},
}
</script>

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
<style lang="scss" scoped>
.LawyerManagement {
	.LayMent-tab {
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
	.LayMent-input {
		display: flex;
		padding: 6px 0;
		border: 1px solid #d7d7d7;
		flex-wrap: wrap;
		div {
			padding: 3px 0;
		}
		.custom-flex {
			display: flex;
			align-items: center;
		}
	}
	.LayMent-table {
		border: 1px solid #d7d7d7;
		margin-top: 12px;
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
			.healthName::-webkit-scrollbar {
				/*滚动条整体样式*/
				width: 10px;
				/*高宽分别对应横竖滚动条的尺寸*/
				height: 6px;
			}
			.healthName::-webkit-scrollbar-thumb {
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

			.healthName::-moz-scrollbar-track {
				/*滚动条里面轨道*/
				-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			}
			.el-table__body-wrapper::-webkit-scrollbar {
				/*滚动条整体样式*/
				width: 10px;
				/*高宽分别对应横竖滚动条的尺寸*/
				height: 6px;
			}

			.el-table__body-wrapper::-moz-scrollbar-thumb {
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

			.el-table__body-wrapper::-moz-scrollbar-track {
				/*滚动条里面轨道*/
				-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			}
			.operation {
				color: #1989fa;
				display: flex;
				div {
					cursor: pointer;
				}
				.delete {
					color: #db0d27;
				}
			}
		}
	}
	.LayMent-input {
		display: flex;
		// padding: 6px 0 ;
		border: 1px solid #d7d7d7;
		margin-top: 24px;
		flex-wrap: wrap;
		.search {
			width: 350px;
			/deep/ .input-with-select {
				border-radius: 3px;
			}
			/deep/ .el-input-group__append {
				background: unset;
			}
			.input-with-select {
				border-radius: 3px;
			}
			.el-input-group__append {
				background: unset;
			}
		}
	}
	.LayMent-pages {
		text-align: center;
	}
	.LayMent-pages {
		text-align: center;
	}
	.LayMent-drawer {
		/deep/ .el-drawer__header {
			padding: 0;
			margin: 0;
		}
		.el-drawer__header {
			padding: 0;
			margin: 0;
		}
		.LayMent-drawer-title {
			height: 0px;
		}
	}
}
</style>
