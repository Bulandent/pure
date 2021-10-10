<template>
	<div class="ViewLawyers">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="客户信息" name="first">
				<div class="addlayer-title m2-margin-top-to-bottom">
					<img v-show="isEdit" @click.stop="isEdit = false" src="@/assets/common/edit.png" />
				</div>
				<div class="addlayer-information">
					<el-form
						:model="ruleForm"
						status-icon
						:rules="rules"
						ref="ruleForm"
						label-width="110px"
						class="demo-ruleForm"
						:disabled="isEdit"
					>
						<el-form-item label="手机号：" prop="Mobile">
							<el-input v-model="ruleForm.Mobile" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="用户名：" prop="UserName">
							<el-input v-model="ruleForm.UserName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="客户类型：" prop="age">
							<el-select v-model="ruleForm.UserType" placeholder="请选择" class="select-default">
								<el-option
									v-for="item in options1"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item label="手机号：" prop="Mobile">
                            <el-input v-model.number="ruleForm.Mobile"></el-input>
                        </el-form-item> -->
						<el-form-item label="微信：" prop="WechatNo">
							<el-input v-model="ruleForm.WechatNo" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="邮箱：" prop="Email">
							<el-input v-model="ruleForm.Email" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label=""></el-form-item>
					</el-form>
				</div>
				<div class="addlayer-drawer-bott-fixed" v-show="!isEdit">
					<el-button type="primary" @click.stop="entDrawer">保存</el-button>
					<el-button @click.stop="closeEdit()">取消</el-button>
					<!-- <el-button @click.stop="resetForm('ruleForm')">重置</el-button> -->
				</div>
			</el-tab-pane>
			<el-tab-pane label="回访记录" name="second">
				<div class="tips">
					<div>
						已回访
						<span>{{ Total }}</span>
						次，累计回访时长
						<span>{{ Time }}</span>
						分钟
					</div>
					<div class="AddLayMent" @click.stop="addVisitRecord">新增回访记录</div>
				</div>
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
						<el-table-column prop="ID" label="序号" width="100px"></el-table-column>

						<el-table-column prop="AdminName" label="回访人" width="150px"></el-table-column>

						<el-table-column prop="VisitType" label="回访方式" width="150px">
							<template slot-scope="scope">
								<div v-if="scope.row.VisitType == 1">电话</div>
								<div v-if="scope.row.VisitType == 2">微信</div>
								<div v-if="scope.row.VisitType == 3">到甲方指定地点</div>
								<div v-if="scope.row.VisitType == 4">到乙方办公场</div>
							</template>
						</el-table-column>

						<el-table-column prop="AddTime" label="回访时间" width="250px"></el-table-column>

						<el-table-column prop="VisitTime" label="耗时（分钟）" width="150px"></el-table-column>
						<el-table-column label="当前状态" width="100px">
							<template slot-scope="scope">
								<div v-if="scope.row.Intentional == 1">有意向</div>
								<div v-if="scope.row.Intentional == 2">无意向</div>
							</template>
						</el-table-column>
						<el-table-column prop="VisitContent" label="回访结果" width="200px"></el-table-column>
					</el-table>
				</div>
				<div class="LayMent-pages m1-margin-top-to-bottom">
					<el-pagination
						background
						@size-change="handleSizeChange"
						@current-change="currentChange"
						:page-sizes="[10, 20, 30, 40]"
						:page-size="10"
						layout=" prev, pager, next, sizes,  jumper"
						:total="Total"
					></el-pagination>
				</div>
			</el-tab-pane>
		</el-tabs>
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
			ref="crm"
			:alert-data="Alert_Data"
			v-if="showConfrim"
			@submitForm="submitForm"
			@closeForm="closeForm"
		></ConfirmAdmin>
	</div>
</template>

<script>
import {
	getDetails,
	getVisitList,
	editVisit,
	getVisitStatusis,
	getVisitDetailType,
	addVisit,
} from '@/api/service/visitListDetails'
import { getVisitType } from '@/api/service/visitList'
import { validatorUserName, validatorUserIphone, validEmail } from '@/utils/validate'
import ConfirmAdmin from '@/components/confirm'
import ConAlert from '@/components/alert'

export default {
	name: 'VisitListDetails',
	components: {
		ConfirmAdmin,
		ConAlert,
	},
	data() {
		return {
			activeName: 'first',
			showDrawer: false,
			showClose: false,
			tableData: [],
			options1: [],
			isEdit: true,
			page: 1,
			Time: '',
			pageSize: 10,
			Total: 0,
			showConfrim: false,
			ruleForm: {},
			locData: '',
			Alert_Data: {
				title: '新增回访记录',
				centerDialogVisible: true,
				showPrepend: false,
				ruleForm: {
					name: '',
					type: '',
					mode: '',
					result: '',
					time: '',
				},
				type: 1,
				region: '',
				rules: {
					name: [{ required: true, message: '请输入', trigger: 'blur' }],
					mode: [{ required: true, message: '请选择', trigger: 'change' }],
					time: [{ required: true, message: '请输入', trigger: 'blur' }],
					type: [{ required: true, message: '请输入', trigger: 'change' }],
					result: [{ message: '请输入', trigger: 'blur' }],
				},
				input: [
					{ lable: '回访人:', prop: 'name', text: '请输入', val: '', disabled: true },
					{ lable: '回访方式:', prop: 'mode', text: '请选择', val: '', select: [] },
					{
						lable: '耗时:',
						prop: 'time',
						type: 'time',
						text: '请输入',
						Company: '分钟',
						val: '',
						clearNumber: true,
					},
					{ lable: '当前状态:', prop: 'type', text: '请选择', val: '', select: [] },
					{
						lable: '回访结果:',
						prop: 'result',
						type: 'textare',
						text: '请输入',
						val: '',
						maxlenth: 500,
					},
				],
			},
			rules: {
				Mobile: [{ validator: validatorUserIphone, trigger: 'blur' }],
				Email: [{ validator: validEmail, trigger: 'blur' }],
			},
			value2: '',
			case1: [
				{
					title: '1',
				},
				{
					title: '2',
				},
			],
			close_alert: false,
			type: false,
			showAlert: false,
			alert_default_subtitle: '',
			alert_success_text: '',
			alert_error_text: '',
		}
	},
	created() {
		this.initData()
	},
	mounted() {},
	methods: {
		initData() {
			getDetails(this.$route.query.id)
				.then(res => {
					this.ruleForm = res.data
					sessionStorage.setItem('us', JSON.stringify(res.data))
					getVisitType()
						.then(res => {
							this.options1 = this.toKeys(res.data)
							//  this.value2 = this.getLabel(this.options1,this.ruleForm.UserType)
						})
						.catch(err => {
							this.$message({
								type: 'error',
								message: err.msg || '稍后重试!',
							})
						})
				})
				.catch(err => {
					this.$message({
						type: 'error',
						message: err.msg || '稍后重试!',
					})
				})
		},
		getListData() {
			if (this.tableData.length == 0) {
				let Data = {
					visitid: parseInt(this.$route.query.id),
					page: this.page,
					pageSize: this.pageSize,
				}
				getVisitList(Data)
					.then(res => {
						this.tableData = res.data.List
						this.Total = res.data.Num
						this.Time = res.data.TotalTime
					})
					.catch(err => {
						this.$message({
							type: 'error',
							message: err.msg || '稍后重试!',
						})
					})
			}
		},
		currentChange(e) {
			this.page = e
			this.tableData = []
			this.getListData()
		},
		handleSizeChange(e) {
			this.pageSize = e
			this.tableData = []
			this.getListData()
		},
		getLabel(arr, val) {
			let nowVal
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].value == val) {
					nowVal = arr[i].value
					break
				}
			}
			return nowVal
		},
		toKeys(Ob, isKey) {
			if (Ob && Ob.length < 1) return []
			let newOb = []
			let ind = 0
			for (const i in Ob) {
				newOb[ind] = {
					value: isKey ? Ob[i] : parseInt(i),
					label: Ob[i],
				}
				ind = ind + 1
			}
			return newOb
		},
		addVisitRecord() {
			this.Alert_Data.ruleForm.name = this.$store.state.user.name
			if (this.Alert_Data.input[3].select.length == 0) {
				getVisitStatusis()
					.then(res => {
						this.Alert_Data.input[3].select = this.toKeys(res.data)
					})
					.catch(err => {
						this.$message({
							type: 'error',
							message: err.msg || '稍后重试!',
						})
					})
			}
			if (this.Alert_Data.input[1].select.length == 0) {
				getVisitDetailType()
					.then(res => {
						this.Alert_Data.input[1].select = this.toKeys(res.data)
					})
					.catch(err => {
						this.$message({
							type: 'error',
							message: err.msg || '稍后重试!',
						})
					})
			}
			this.Alert_Data.ruleForm.name = this.$store.state.user.name
			this.showConfrim = true
		},
		closeAlert() {
			this.showAlert = false
		},
		submitForm() {
			this.showConfrim = false
			let Data = {
				uid: parseInt(this.$route.query.id),
				visittype: parseInt(this.Alert_Data.ruleForm.mode),
				visittime: parseInt(this.Alert_Data.ruleForm.time),
				intentional: parseInt(this.Alert_Data.ruleForm.type),
				visitcontent: String(this.Alert_Data.ruleForm.result),
			}
			addVisit(Data)
				.then(res => {
					if (res.code == 20000) {
						// this.$message({
						//     type:'success',
						//     message:res.msg||'添加成功!'
						// })
						this.close_alert = true
						this.type = true
						this.alert_success_text = '添加成功!'
						this.showAlert = true
						this.page = 1
						this.tableData = []
						this.getListData()
						this.restult()
						if (this.$refs['crm'].$refs['ruleForm'])
							this.$refs['crm'].$refs['ruleForm'].resetFields()
					} else {
						// this.$message({
						//     type:'warning',
						//     message:res.msg||'添加失败!'
						// })
						this.close_alert = false
						this.type = false
						this.alert_error_text = '添加失败!'
						this.showAlert = true
					}
				})
				.catch(err => {
					// this.$message({
					//     type:'error',
					//     message:err.msg||'稍后重试!'
					// })
					if (this.$refs['crm'].$refs['ruleForm']) this.$refs['crm'].$refs['ruleForm'].resetFields()
					this.close_alert = false
					this.type = false
					this.alert_error_text = '稍后重试!'
					this.showAlert = true
				})
		},
		closeForm() {
			this.showConfrim = false
			if (this.$refs['crm'].$refs['ruleForm']) this.$refs['crm'].$refs['ruleForm'].resetFields()
		},
		closeEdit() {
			// if(this.$refs['ruleForm']) this.$refs['ruleForm'].resetFields()
			// this.ruleForm.Mobile = ''
			// this.ruleForm.Mobile = this.ruleForm1.Mobile
			// this.ruleForm = this.ruleForm1
			let nowData = JSON.parse(sessionStorage.getItem('us'))
			this.ruleForm = nowData
			if (this.$refs['ruleForm']) this.$refs['ruleForm'].clearValidate()
		},
		entDrawer() {
			let Data = {
				id: parseInt(this.$route.query.id),
				mobile: String(this.ruleForm.Mobile),
				username: this.ruleForm.UserName,
				usertype: parseInt(this.ruleForm.UserType),
				wechatno: String(this.ruleForm.WechatNo),
				email: String(this.ruleForm.Email),
			}
			editVisit(Data)
				.then(res => {
					if (res.code == 20000) {
						// this.$message({
						//     type:'success',
						//     message:res.msg||'修改成功!'
						// })
						this.close_alert = true
						this.type = true
						this.alert_success_text = res.msg || '添加成功!'
						this.showAlert = true
						this.initData()
						this.isEdit = true
					} else {
						// this.$message({
						//     type:'warning',
						//     message:res.msg||'修改失败!'
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
					//     message:err.msg||'请稍后重试!'
					// })
					this.close_alert = false
					this.type = false
					this.alert_error_text = err.msg || '稍后重试!'
					this.showAlert = true
				})
		},
		getValue(arr, val) {
			let nowVal
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].label == val) {
					nowVal = arr[i].value
					break
				}
			}
			return nowVal
		},
		resetForm(formName) {
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields()
				this.value2 = ''
			}
		},

		Back() {
			this.$router.back()
		},
		handleClick(tab, event) {
			if (parseInt(tab.index) == 1) {
				this.getListData()
			}
		},
		restult() {
			this.Alert_Data.ruleForm.name = ''
			this.Alert_Data.ruleForm.type = ''
			this.Alert_Data.ruleForm.result = ''
			this.Alert_Data.ruleForm.time = ''
			this.Alert_Data.ruleForm.mode = ''
		},
	},
}
</script>

<style lang="scss" scoped>
.ViewLawyers {
	/deep/ .el-tab-pane {
		.addlayer-title {
			text-align: right;
			height: 50px;
			img {
				width: 50px;
				height: 50px;
				cursor: pointer;
			}
		}
		/deep/ .anlie {
			width: 85% !important;
		}
		/deep/ .jieshao {
			width: 85% !important;
		}
	}
	.el-tab-pane {
		.addlayer-title {
			text-align: right;
			height: 50px;
			img {
				width: 50px;
				height: 50px;
				cursor: pointer;
			}
		}
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
		}
		.anlie {
			width: 85% !important;
		}
		.jieshao {
			width: 85% !important;
		}
	}
	.addlayer-title1 {
		/deep/ .el-form {
			margin: auto;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.el-form {
			margin: auto;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	.tips {
		font-size: 14px;
		padding: 24px 0;
		display: flex;
		justify-content: space-between;
		.AddLayMent {
			color: white;
			padding: 6px 24px;
			font-size: 14px;
			background-color: #1989fa;
			cursor: pointer;
		}
		span {
			color: #1989fa;
			font-size: 15px;
		}
	}
	.addlayer-addinfo {
		width: 100%;
		text-align: center;
		.addlayer-addinfo-option {
			width: 250px;
			margin: auto;
			display: flex;
			justify-content: space-between;
			padding: 0 12px;
			.save {
				background-color: #1989fa;
				color: white;
			}
			.back {
				background-color: white;
				color: #1989fa;
				border: 1px solid #1989fa;
			}
			button {
				width: 88px;
				height: 40px;
				outline: none;
				background-color: white;
				cursor: pointer;
				border: none;
			}
		}
	}
	.addlayer-information1 {
		.addlayer-information-concation {
		}
	}

	.addlayer-information {
		.demo-ruleForm1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			/deep/ .el-form-item {
				width: 85% !important;
				&:nth-of-type(2) {
					/deep/ .el-input__inner {
						width: 50%;
					}
				}
			}
			.el-form-item {
				width: 85% !important;
				&:nth-of-type(2) {
					/deep/ .el-input__inner {
						width: 50%;
					}
				}
			}
		}
		/deep/ .el-form {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			/deep/ .el-form-item {
				width: 35%;
				/deep/ .el-input-group__append {
					background-color: unset;
					border: none;
				}
				/deep/ .el-cascader,
				.el-select {
					width: 100%;
				}
			}
			/deep/ .jieshao {
				width: 85%;
			}
		}
		.el-form {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.el-form-item {
				width: 35%;
				.el-input-group__append {
					background-color: unset;
					border: none;
				}
				.el-cascader,
				.el-select {
					width: 100%;
				}
			}
			.jieshao {
				width: 85%;
			}
		}
		//     /deep/ .el-col{
		//          &:nth-of-type(odd){
		//              display: flex;
		//              justify-content: center;
		//          }
		// /deep/.el-form-item{
		//     width: 50%;

		//      }
		// }

		.addlayer-information-concation {
			display: flex;
			align-items: center;
		}
	}
	.LayMent-pages {
		margin-top: 36px;
		text-align: center;
	}
	.addlayer-drawer-bott-fixed {
		margin-top: 36px;
		text-align: center;
	}
	.addlayer-drawer {
		/deep/ .el-drawer__header {
			font-size: 18px;
			color: black;
		}
		/deep/ .el-drawer__body {
			border-top: 1px solid #f2f2f2;
			padding: 24px;
			box-sizing: border-box;
		}
		.el-drawer__header {
			font-size: 18px;
			color: black;
		}
		.el-drawer__body {
			border-top: 1px solid #f2f2f2;
			padding: 24px;
			box-sizing: border-box;
		}
		.addlayer-drawer-concation {
			margin-bottom: 50px;
			.concation-image {
				text-align: center;
				img {
					width: 100px;
					height: 100px;
					background: black;
				}
			}
			.concation-confirm {
				.concation-confirm-form-item {
					display: flex;
					/deep/.el-form-item__label {
						flex: 0 0 auto;
					}
					/deep/.el-form-item__content {
						flex: 1;
						margin-left: 0 !important;
						/deep/ .el-textarea__inner {
							resize: none;
						}
					}
					.el-form-item__label {
						flex: 0 0 auto;
					}
					.el-form-item__content {
						flex: 1;
						margin-left: 0 !important;
						.el-textarea__inner {
							resize: none;
						}
					}
				}
			}
		}
		.addlayer-drawer-bott-fixed {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: auto;
			border-top: 1px solid #f2f2f2;
			padding: 12px;
			text-align: right;
			background-color: white;
		}
	}
}
</style>
