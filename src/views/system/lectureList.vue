<template>
	<div class="accountManagement">
		<div class="accMent-tab m1-margin-top-to-bottom">
			<div></div>
			<div class="AddLayMent" @click.stop="toAdd">新增须知模板</div>
		</div>
		<div class="LayMent-input m1-margin-top-to-bottom">
			<div class="search m1-margin-left-to-right">
				<el-input
					:clearable="true"
					placeholder="搜索名称、内容"
					v-model="queryParams.lectureName"
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
					<el-table-column prop="lectureName" label="须知名称"></el-table-column>
					<el-table-column prop="lectureContent" label="须知内容"></el-table-column>
					<el-table-column prop="editTime" label="最后编辑时间"></el-table-column>
					<el-table-column label="操作" width="70px" fixed="right">
						<template slot-scope="scope">
							<div class="operation">
								<div class="m1-margin-left-to-right" @click.stop="toEdit(scope.row)">编辑</div>
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
	name: 'SystemLectureList',
	components: {
		ConfirmAdmin,
	},
	data() {
		return {
			total: 0,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
				lectureName: '',
			},
			tableData: [
				{
					lectureName: '标题标题',
					lectureContent: '内容内容',
					editTime: '2021.12.08 12:02',
				},
			],
			showConfrim: false,
			Alert_Data: {
				title: '新增须知模板',
				centerDialogVisible: true,
				showPrepend: false,
				ruleForm: {
					lectureName: '',
					lectureContent: '',
				},
				type: 1,
				region: '',
				rules: {
					lectureName: [{ required: true, message: '请输入', trigger: 'blur' }],
					lectureContent: [{ required: true, message: '请输入', trigger: 'blur' }],
				},
				input: [
					{ lable: '须知名称:', prop: 'lectureName', text: '请输入', val: '' },
					{ lable: '须知内容:', prop: 'lectureContent', text: '请输入', val: '', type: 'textare' },
				],
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
		toEdit(row) {
			const { lectureName, lectureContent } = row
			this.Alert_Data.title = '编辑须知模板'
			this.Alert_Data.ruleForm.lectureName = lectureName
			this.Alert_Data.ruleForm.lectureContent = lectureContent
			this.showConfrim = true
		},
		toAdd() {
			this.Alert_Data.title = '新增须知模板'
			this.Alert_Data.ruleForm.lectureName = ''
			this.Alert_Data.ruleForm.lectureContent = ''
			this.showConfrim = true
		},
		getList() {
			// 请求列表
		},
		search() {
			this.getList()
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
			this.queryParams.lectureName = ''
			this.queryParams.pageNum = 1
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
