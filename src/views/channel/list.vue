<template>
	<div class="accountManagement">
		<div class="accMent-tab m1-margin-top-to-bottom">
			<el-tabs v-model="queryParams.tabActive" type="card" @tab-click="handleClick">
				<el-tab-pane label="上级渠道" name="first"></el-tab-pane>
				<el-tab-pane label="下级渠道" name="second"></el-tab-pane>
			</el-tabs>
			<div class="AddLayMent" @click.stop="addChannel">新增渠道</div>
		</div>
		<div class="LayMent-input m1-margin-top-to-bottom">
			<div class="select-1 m1-margin-left-to-right">
				<el-select v-model="queryParams.channelType" placeholder="类型" class="select-default">
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
		<div class="total-tip">共有 {{ total }} 名上级渠道</div>
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
					<el-table-column prop="channelNo" label="渠道编号"></el-table-column>
					<el-table-column prop="channelName" label="渠道名称"></el-table-column>
					<el-table-column prop="mobile" label="手机号"></el-table-column>
					<el-table-column prop="channelType" label="渠道类型"></el-table-column>
					<el-table-column prop="channelCount" label="拥有渠道"></el-table-column>
					<el-table-column prop="personCount" label="邀请用户数"></el-table-column>
					<el-table-column prop="companyOrderCount" label="企业顾问下单数"></el-table-column>
					<el-table-column prop="personalOrderCount" label="个人顾问下单数"></el-table-column>
					<el-table-column label="操作" width="140px" fixed="right">
						<template slot-scope="scope">
							<div class="operation">
								<div class="m1-margin-left-to-right" @click.stop="toDetail(scope.row)">编辑</div>
								<div class="m1-margin-left-to-right" @click.stop="toEdit(scope.row)">删除</div>
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
			queryParams: {
				pageNum: 1,
				pageSize: 10,
				tabActive: 'first',
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
					channelNo: 'CH00001',
					channelName: '新宇宙公司',
					mobile: '13308201102',
					channelType: '合作',
					channelCount: 18,
					personCount: 10,
					companyOrderCount: 18,
					personalOrderCount: 18,
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
		addChannel() {
			this.$router.push({
				path: '/channel/add',
			})
		},
		toDetail({ id = '' }) {
			this.$router.push({
				path: `/channel/detail?id=${id}&action=detail`,
			})
		},
		toEdit({ id = '' }) {
			this.$router.push({
				path: `/channel/detail?id=${id}&action=edit`,
			})
		},
		handleClick(tab, event) {
			console.log(tab)
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
