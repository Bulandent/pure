<template>
	<div class="accountManagement">
		<div class="accMent-tab m1-margin-top-to-bottom">
			<!-- <el-button>回访名单</el-button> -->
			<div></div>
			<div class="AddLayMent" @click.stop="showConfrim = true">新增回访客户</div>
		</div>
		<div class="LayMent-input m1-margin-top-to-bottom">
			<div class="select-3 m1-margin-left-to-right">
				<el-select
					v-model="value1"
					placeholder="客户类型"
					class="select-default m1-margin-left-to-right"
				>
					<el-option
						v-for="item in options1"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
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
					placeholder="搜索客户名称/手机号"
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
					<el-table-column prop="UserName" label="客户名" width="100px"></el-table-column>
					<el-table-column prop="UserType" label="客户类型" width="100px">
						<template slot-scope="scope">
							<div v-if="scope.row.UserType == 1">个人</div>
							<div v-if="scope.row.UserType == 2">企业</div>
						</template>
					</el-table-column>
					<!-- :render-header="custom_header" -->
					<el-table-column prop="Mobile" label="手机号" width="150px"></el-table-column>

					<el-table-column prop="AdminName" label="客服" width="150px"></el-table-column>

					<el-table-column prop="AddTime" sortable label="添加时间" width="250px"></el-table-column>
					<el-table-column
						prop="VisitNum"
						label="回访次数"
						sortable
						width="150px"
					></el-table-column>

					<el-table-column
						prop="LastVisitTime"
						label="最后回访时间"
						sortable
						width="250px"
					></el-table-column>

					<el-table-column prop="VisitStatus" label="状态" width="150px">
						<template slot-scope="scope">
							<div v-if="scope.row.VisitStatus == 1">有意向</div>
							<div v-if="scope.row.VisitStatus == 2">无意向</div>
							<div v-if="scope.row.VisitStatus == 3">服务中</div>
							<div v-if="scope.row.VisitStatus == 4">服务到期</div>
						</template>
					</el-table-column>
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
		<div class="LayMent-pages m1-margin-top-to-bottom" v-if="page">
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
			<!-- <el-pagination
                layout="prev, pager, next"
                @current-change="currentChange"
                :total="Total">
            </el-pagination> -->
		</div>
		<con-alert
			v-if="showAlert"
			:alert_default_subtitle="alert_default_subtitle"
			:type="type"
			:alert_success_text="alert_success_text"
			:close_alert="close_alert"
			:alert_error_text="alert_error_text"
			close-time="3"
			@closeAlert="closeAlert"
		></con-alert>
		<ConfirmAdmin
			:alert-data="Alert_Data"
			v-if="showConfrim"
			@submitForm="submitForm"
			@closeForm="closeForm"
		></ConfirmAdmin>
	</div>
</template>

<script>
import { getVisitList, getVisitType, getVisitStatus, addVisitList } from '@/api/service/visitList'
import { validatorUserName, validatorUserIphone, getQueryVariable } from '@/utils/validate'
import ConfirmAdmin from '@/components/confirm'
import ConAlert from '@/components/alert'

export default {
	name: 'VisitList',
	components: {
		ConfirmAdmin,
		ConAlert,
	},
	data() {
		return {
			options1: [],
			options2: [],
			value1: '',
			value2: '',
			input3: '',
			Total: 0,
			tableData: [],
			copytableData: [],
			pageSize: 10,
			page: 0,
			inputNum: '',
			inputName: '',
			drawer: true,
			showClose: false,
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
					mobile: [
						{ validator: validatorUserIphone, required: true, message: '请输入', trigger: 'blur' },
					],
				},
				input: [
					{ lable: '客户名:', prop: 'name', text: '请输入', val: '' },
					{ lable: '客户类型:', prop: 'type', text: '请输入', val: '', select: [] },
					{ lable: '手机号:', prop: 'mobile', text: '请输入', val: '' },
				],
			},
			close_alert: false,
			type: false,
			showAlert: false,
			alert_default_subtitle: '',
			alert_success_text: '',
			alert_error_text: '',
		}
	},
	created() {
		this.initSearchData()
		// this.getPage().then(res=>{
		this.initData()
		// })
	},
	methods: {
		initData() {
			// if(e){
			//     this.page = e.page
			//     this.pageSize = e.pageSize
			// }else{
			//     this.page = 1
			// }
			if (!this.page) this.page = 1
			let Data = {
				usertype: parseInt(this.value1) || 0,
				visitstatus: parseInt(this.value2) || 0,
				keyword: String(this.inputNum),
				page: parseInt(this.page),
				pageSize: parseInt(this.pageSize),
			}
			getVisitList(Data)
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
		initSearchData() {
			getVisitType()
				.then(res => {
					this.options1 = this.toKeys(res.data)
					this.Alert_Data.input[1].select = this.toKeys(res.data)
				})
				.catch(err => {
					this.$message({
						type: 'error',
						message: err.msg || '稍后重试!',
					})
				})
			getVisitStatus()
				.then(res => {
					this.options2 = this.toKeys(res.data)
				})
				.catch(err => {
					this.$message({
						type: 'error',
						message: err.msg || '稍后重试!',
					})
				})
		},
		// custom_header(h, { column, $index }){
		//     return h(
		//         // 添加一个span    标签 class类为renderHead 父级标签 最外层标签
		//         'span',
		//         {
		//         class: 'renderHead'
		//         },
		//         [
		//         // 把节点添加为table的头部信息单元格中
		//         h('span', column.label), // table 显示的label值
		//         //  第二个节点 el-icon-question 标签（elemen图标） el-tooltip 为显示数据容器element中
		//         h(
		//             'el-tooltip',
		//             {
		//             attrs: {
		//                 content: '可编辑',
		//                 placement: 'top'
		//             }
		//             },
		//             // 添加span节点 定义class为el-icon-question
		//             [
		//             h('span', [
		//                 h('span', {
		//                 attrs: { class: 'el-icon-edit' }
		//                 })
		//             ])
		//             ],
		//         )
		//         ],
		//     )
		// },
		addServices() {},
		anthLook(e) {
			this.$router.push({
				path: decodeURI('/service/visitList/visitListDetails'),
				query: { id: e.row.ID },
			})
		},
		submitForm() {
			this.showConfrim = false
			let Data = {
				mobile: this.Alert_Data.ruleForm.mobile,
				username: this.Alert_Data.ruleForm.name,
				usertype: parseInt(this.Alert_Data.ruleForm.type),
			}
			addVisitList(Data)
				.then(res => {
					if (res.code == 20000) {
						// this.$message({
						//     type:'success',
						//     message:res.msg||'添加成功!'
						// })
						this.close_alert = true
						this.type = true
						this.alert_success_text = res.msg || '添加成功!'
						this.showAlert = true
						this.initData()
						this.Alert_Data.ruleForm.name = ''
						this.Alert_Data.ruleForm.type = ''
						this.Alert_Data.ruleForm.mobile = ''
					} else {
						// this.$message({
						//     type:'warning',
						//     message:res.msg||'添加失败'
						// })
						this.close_alert = false
						this.type = false
						this.alert_error_text = res.msg || '添加失败!'
						this.showAlert = true
					}
				})
				.catch(err => {
					// this.$message({
					//     type:'error',
					//     message:err.msg||'稍后重试!'
					// })
					this.close_alert = false
					this.type = false
					this.alert_error_text = err.msg || '稍后重试!'
					this.showAlert = true
				})
		},
		closeAlert() {
			this.showAlert = false
		},
		closeForm() {
			this.showConfrim = false
		},
		search() {
			this.initData()
			this.handleRest()
		},
		handleSizeChange(e) {
			this.pageSize = e
			this.initData()
			// this.tableData = []
			// this.$router.push({path:`/service/visitList#page=${this.page}&pageSize=${e}`})
		},
		currentChange(e) {
			this.page = e
			this.initData()
			// this.tableData = []
			// this.$router.push({path:`/service/visitList#page=${e}&pageSize=${this.pageSize}`})
		},
		toKeys(Ob, isKey) {
			if (Ob && Ob.length < 1) return []
			let newOb = []
			let ind = 0
			for (const i in Ob) {
				newOb[ind] = {
					value: isKey ? Ob[i] : i,
					label: Ob[i],
				}
				ind = ind + 1
			}
			return newOb
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
