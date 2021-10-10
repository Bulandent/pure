<template>
	<div class="accountManagement">
		<div class="accMent-tab m1-margin-top-to-bottom">
			<!-- <el-button>回访名单</el-button> -->
			<div></div>
			<div class="AddLayMent" @click.stop="addLecture">新增沙龙讲座</div>
		</div>
		<div class="LayMent-input m1-margin-top-to-bottom">
			<div class="select-3 m1-margin-left-to-right">
				<el-select v-model="value2" placeholder="状态" class="select-default">
					<el-option
						v-for="item in options2"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
			<div class="search m1-margin-left-to-right">
				<el-input
					:clearable="true"
					placeholder="搜索讲座名称"
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
					:default-sort="{ prop: 'LastVisitTime', prop: 'AddTime' }"
					style="width: 100%"
				>
					<el-table-column prop="aaa" label="讲座编号"></el-table-column>
					<el-table-column prop="bbb" label="讲座名称"></el-table-column>
					<el-table-column prop="ccc" label="主办方"></el-table-column>
					<el-table-column prop="ddd" label="可报名人数" sortable></el-table-column>
					<el-table-column prop="eee" label="状态"></el-table-column>
					<el-table-column prop="fff" label="已报名人数" sortable></el-table-column>
					<el-table-column prop="ggg" label="活动开始时间"></el-table-column>
					<el-table-column label="操作" width="70px" fixed="right">
						<template slot-scope="scope">
							<div class="operation">
								<div class="m1-margin-left-to-right" @click.stop="anthLook(scope)">查看</div>
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
				:current-page.sync="page"
				:page-size="pageSize"
				layout=" prev, pager, next, sizes, total,jumper"
				:total="Total"
			></el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LectureList',
	components: {},
	data() {
		return {
			options2: [
				{
					label: '未开始',
					value: 0,
				},
				{
					label: '报名中',
					value: 1,
				},
				{
					label: '截止报名',
					value: 2,
				},
				{
					label: '已结束',
					value: 3,
				},
			],
			value2: '',
			input3: '',
			Total: 0,
			tableData: [
				{
					aaa: '1200001',
					bbb: '讲座名称讲座名称',
					ccc: '小宇宙公司',
					ddd: 30,
					eee: '未开始',
					fff: 12,
					ggg: '2021.12.12 13:02',
				},
			],
			copytableData: [],
			pageSize: 10,
			page: 1,
			inputNum: '',
		}
	},
	created() {
		this.initData()
	},
	methods: {
		addLecture() {
			this.$router.push({
				path: '/lecture/add',
			})
		},
		initData() {
			// if (!this.page) this.page = 1
			// let Data = {
			// 	visitstatus: parseInt(this.value2) || 0,
			// 	keyword: String(this.inputNum),
			// 	page: parseInt(this.page),
			// 	pageSize: parseInt(this.pageSize),
			// }
			// getVisitList(Data)
			// 	.then(res => {
			// 		if (res.code == 20000) {
			// 			this.tableData = res.data.List
			// 			this.Total = res.data.Num
			// 		} else {
			// 			this.$message(res.msg)
			// 		}
			// 	})
			// 	.catch(err => {
			// 		this.$message({
			// 			type: 'error',
			// 			message: err.msg || '稍后重试!',
			// 		})
			// 	})
		},
		search() {
			this.initData()
			// this.handleRest()
		},
		handleSizeChange(e) {
			this.pageSize = e
			this.initData()
		},
		currentChange(e) {
			this.page = e
			this.initData()
		},
		handleRest() {
			this.inputNum = ''
			this.value2 = ''
			this.page = 1
			this.initData()
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
