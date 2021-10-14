<template>
	<div class="accountManagement">
		<div class="accMent-tab m1-margin-top-to-bottom">
			<el-tabs v-model="queryParams.tabActive" type="card" @tab-click="handleClick">
				<el-tab-pane label="个人" name="first"></el-tab-pane>
				<el-tab-pane label="企业" name="second"></el-tab-pane>
			</el-tabs>
			<div class="AddLayMent" @click.stop="addContract">新增合同分类</div>
		</div>
		<div class="LayMent-table m1-margin-top-to-bottom">
			<div class="healthName">
				<el-table
					:data="tableData"
					header-row-class-name="updatecolumn"
					:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
					row-key="id"
					:header-row-style="
						() => {
							return 'color:black;font-size:15px'
						}
					"
					style="width: 100%"
				>
					<el-table-column prop="firstName" label="分类名称"></el-table-column>
					<el-table-column prop="secondName" label="二级分类名称"></el-table-column>
					<el-table-column prop="secondCount" label="二级分类数（个）"></el-table-column>
					<el-table-column prop="hasCount" label="所属合同模板（个）"></el-table-column>
					<el-table-column label="操作" width="140px" fixed="right">
						<template slot-scope="scope">
							<div class="operation">
								<div class="m1-margin-left-to-right" @click.stop="toEdit(scope.row)">编辑</div>
								<div class="m1-margin-left-to-right" @click.stop="toDelete(scope.row)">删除</div>
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
	name: 'ContactList',
	components: {
		ConfirmAdmin,
	},
	data() {
		return {
			total: 0,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
				tabActive: 'first',
			},
			tableData: [
				{
					id: 1,
					firstName: '饮料',
					secondName: null,
					secondCount: 20,
					hasCount: 18,
					children: [
						{
							id: 2,
							firstName: null,
							secondName: '矿泉水',
							secondCount: null,
							hasCount: 18,
						},
						{
							id: 3,
							firstName: null,
							secondName: '脉动',
							secondCount: null,
							hasCount: 4,
						},
					],
				},
				{
					id: 4,
					firstName: '蔬菜',
					secondName: null,
					secondCount: '12',
					hasCount: 10,
				},
				{
					id: 5,
					firstName: '肉类',
					secondName: '',
					secondCount: '12',
					hasCount: 10,
					children: [
						{
							id: 6,
							firstName: null,
							secondName: '猪肉',
							secondCount: null,
							hasCount: 10,
						},
						{
							id: 7,
							firstName: null,
							secondName: '鸡肉',
							secondCount: 18,
							hasCount: 10,
						},
					],
				},
			],
			showConfrim: false,
			Alert_Data: {
				title: '新增回访客户',
				centerDialogVisible: true,
				showPrepend: false,
				ruleForm: {
					name: '',
					type: '',
					mobile: '',
				},
				type: 1,
				region: '',
				rules: {
					name: [{ required: true, message: '请输入', trigger: 'blur' }],
					type: [{ required: true, message: '请选择', trigger: 'change' }],
					// mobile: [
					// 	{ validator: validatorUserIphone, required: true, message: '请输入', trigger: 'blur' },
					// ],
				},
				input: [
					{ lable: '客户名:', prop: 'name', text: '请输入', val: '' },
					{ lable: '客户类型:', prop: 'type', text: '请输入', val: '', select: [] },
					{ lable: '手机号:', prop: 'mobile', text: '请输入', val: '' },
				],
			},
		}
	},
	created() {
		this.getList()
	},
	methods: {
		addContract() {
			this.showConfrim = true
		},
		toEdit(row) {},
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
