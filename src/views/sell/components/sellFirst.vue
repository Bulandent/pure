<template>
	<div class="sell-first">
		<div v-if="isDisabled" class="edit-btn">
			<i @click="isEdit = !isEdit" class="el-icon-edit-outline"></i>
		</div>
		<el-form :model="sellForm" :rules="rules" ref="sellForm" label-width="140px">
			<h4 class="title-h4">基本规则</h4>
			<div class="sell-part">
				<el-form-item label="姓名" prop="userName">
					<el-input type="text" v-model="sellForm.userName" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="sellRole">
					<el-select v-model="sellForm.sellRole" :disabled="isDisabled">
						<el-option
							v-for="item in roleList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input type="text" v-model="sellForm.mobile" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="账号时间" prop="signTime">
					<el-date-picker
						v-model="sellForm.signTime"
						type="date"
						:disabled="isDisabled"
						placeholder="选择日期"
					></el-date-picker>
				</el-form-item>
			</div>

			<h4 class="title-h4">
				提成规则
				<span style="font-size: 12px; color: #222">根据角色展示该用户不同提成比例</span>
			</h4>
			<h5 class="part-title">企业法律顾问</h5>
			<div class="sell-part">
				<el-form-item label="分润方式" prop="company.profitTypeA">
					<el-select v-model="sellForm.company.profitTypeA" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="getProfitLabel(sellForm.company.profitTypeA)" prop="company.profitA">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.company.profitA"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.company.profitTypeA) }}
					</el-col>
				</el-form-item>
				<el-form-item label="客户自动续费分润" prop="company.profitTypeB">
					<el-select v-model="sellForm.company.profitTypeB" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="getProfitLabel(sellForm.company.profitTypeB)" prop="company.profitB">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.company.profitB"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.company.profitTypeB) }}
					</el-col>
				</el-form-item>
				<el-form-item label="被TA人代下单分润" prop="company.profitTypeC">
					<el-select v-model="sellForm.company.profitTypeC" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="getProfitLabel(sellForm.company.profitTypeC)" prop="company.profitC">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.company.profitC"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.company.profitTypeC) }}
					</el-col>
				</el-form-item>
				<el-form-item label="自动续费分润时限" prop="company.time">
					<el-col :span="21">
						<el-input type="text" v-model="sellForm.company.time" :disabled="isDisabled"></el-input>
					</el-col>
					<el-col :span="2" :offset="1">年</el-col>
				</el-form-item>
			</div>

			<h5 class="part-title">企业可选包</h5>
			<div class="sell-part">
				<el-form-item label="首次购买分润" prop="package.profitTypeA">
					<el-select v-model="sellForm.package.profitTypeA" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="getProfitLabel(sellForm.package.profitTypeA)" prop="package.profitA">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.package.profitA"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.package.profitTypeA) }}
					</el-col>
				</el-form-item>
				<el-form-item label="服务中购买分润" prop="package.profitTypeB">
					<el-select v-model="sellForm.package.profitTypeB" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="getProfitLabel(sellForm.package.profitTypeB)" prop="package.profitB">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.package.profitB"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.package.profitTypeB) }}
					</el-col>
				</el-form-item>
			</div>

			<h5 class="part-title">个人法律顾问</h5>
			<div class="sell-part">
				<el-form-item label="分润方式" prop="personalPackage.profitTypeA">
					<el-select v-model="sellForm.personalPackage.profitTypeA" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(sellForm.personalPackage.profitTypeA)"
					prop="personalPackage.profitA"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.personalPackage.profitA"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.personalPackage.profitTypeA) }}
					</el-col>
				</el-form-item>
				<el-form-item label="客户自动续费分润" prop="personalPackage.profitTypeB">
					<el-select v-model="sellForm.personalPackage.profitTypeB" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(sellForm.personalPackage.profitTypeB)"
					prop="personalPackage.profitB"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.personalPackage.profitB"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.personalPackage.profitTypeB) }}
					</el-col>
				</el-form-item>
				<el-form-item label="被TA人代下单分润" prop="personalPackage.profitTypeC">
					<el-select v-model="sellForm.personalPackage.profitTypeC" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(sellForm.personalPackage.profitTypeC)"
					prop="personalPackage.profitC"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.personalPackage.profitC"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.personalPackage.profitTypeC) }}
					</el-col>
				</el-form-item>
				<el-form-item label="自动续费分润时限" prop="personalPackage.time">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.personalPackage.time"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">年</el-col>
				</el-form-item>
			</div>

			<h5 class="part-title">个人可选包</h5>
			<div class="sell-part">
				<el-form-item label="首次购买分润" prop="personal.profitTypeA">
					<el-select v-model="sellForm.personal.profitTypeA" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(sellForm.personal.profitTypeA)"
					prop="personal.profitA"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.personal.profitA"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.personal.profitTypeA) }}
					</el-col>
				</el-form-item>
				<el-form-item label="服务中购买分润" prop="personal.profitTypeB">
					<el-select v-model="sellForm.personal.profitTypeB" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(sellForm.personal.profitTypeB)"
					prop="personal.profitB"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="sellForm.personal.profitB"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(sellForm.personal.profitTypeB) }}
					</el-col>
				</el-form-item>
			</div>

			<h5 class="part-title">其他</h5>
			<div class="sell-part">
				<el-form-item label="每月沙龙讲座票数" prop="monthCount">
					<el-input type="text" v-model="sellForm.monthCount" :disabled="isDisabled"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<div class="action-area" v-if="(isEdit && isDetail) || !isDetail">
			<el-button type="primary" @click="submitForm">保存</el-button>
			<el-button @click="goBack">返回</el-button>
		</div>
	</div>
</template>

<script>
const regExp = /(?:^[0-9]$)|(?:^[1-9][0-9]+$)/

export default {
	name: 'ContractDetail',
	components: {},
	data() {
		return {
			id: '',
			activeTab: 'first',
			isDetail: false,
			isAddSub: false,
			isRequesting: false,
			isEdit: false,
			acceptFile: '.pdf,.png,.jpeg,.jpg',
			roleList: [
				{ label: '销售经理', value: 1 },
				{ label: '电话经理', value: 2 },
			],
			profitList: [
				{ label: '固定金额', value: 1 },
				{ label: '固定比率', value: 2 },
			],
			originTypeList: [
				{ label: '企业', value: 1 },
				{ label: '个人', value: 2 },
			],
			sellLevelList: [
				{ label: '上级渠道', value: 1 },
				{ label: '下级渠道', value: 2 },
			],
			sellTypeList: [
				{ label: '渠道类型一', value: 1 },
				{ label: '渠道类型二', value: 2 },
			],
			sellForm: {
				sellNo: null,
				sellName: null,
				mobile: null,
				originType: null,
				sellLevel: null,
				sellType: null,
				sellOf: null,
				creditCode: null,
				licenseUrl: null,
				IDCardFirstUrl: null,
				IDCardSecondUrl: null,
				collectBank: null,
				bankBranch: null,
				cardNo: null,
				signTime: null,
				monthCount: null,
				company: {
					profitType: null,
				},
				package: {},
				personalPackage: {},
				personal: {},
			},
			rules: {
				sellNo: [{ required: true, message: '必填', trigger: 'blur' }],
				sellName: [{ required: true, message: '必填', trigger: 'blur' }],
				mobile: [{ required: true, message: '必填', trigger: 'blur' }],
				originType: [{ required: true, message: '必填', trigger: 'change' }],
				sellLevel: [{ required: true, message: '必填', trigger: 'change' }],
				sellType: [{ required: true, message: '必填', trigger: 'change' }],
				sellOf: [{ required: true, message: '必填', trigger: 'blur' }],
				creditCode: [{ required: true, message: '必填', trigger: 'blur' }],
				licenseUrl: [{ required: true, message: '必填', trigger: 'change' }],
				IDCardFirstUrl: [{ required: true, message: '必填', trigger: 'change' }],
				IDCardSecondUrl: [{ required: true, message: '必填', trigger: 'change' }],
				collectBank: [{ required: true, message: '必填', trigger: 'blur' }],
				bankBranch: [{ required: true, message: '必填', trigger: 'blur' }],
				cardNo: [{ required: true, message: '必填', trigger: 'blur' }],
				signTime: [{ required: true, message: '必填', trigger: 'change' }],
				monthCount: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'company.profitTypeA': [{ required: true, message: '必填', trigger: 'change' }],
				'company.profitTypeB': [{ required: true, message: '必填', trigger: 'change' }],
				'company.profitTypeC': [{ required: true, message: '必填', trigger: 'change' }],
				'company.profitA': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'company.profitB': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'company.profitC': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'company.time': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'package.profitTypeA': [{ required: true, message: '必填', trigger: 'change' }],
				'package.profitTypeB': [{ required: true, message: '必填', trigger: 'change' }],
				'package.profitA': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'package.profitB': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'personalPackage.profitTypeA': [{ required: true, message: '必填', trigger: 'change' }],
				'personalPackage.profitTypeB': [{ required: true, message: '必填', trigger: 'change' }],
				'personalPackage.profitTypeC': [{ required: true, message: '必填', trigger: 'change' }],
				'personalPackage.profitA': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'personalPackage.profitB': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'personalPackage.profitC': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'personalPackage.time': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'personal.profitTypeA': [{ required: true, message: '必填', trigger: 'change' }],
				'personal.profitTypeB': [{ required: true, message: '必填', trigger: 'change' }],
				'personal.profitA': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
				'personal.profitB': [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: regExp, message: '格式不正确', trigger: 'blur' },
				],
			},
		}
	},
	computed: {
		isDisabled() {
			return this.isDetail && !this.isEdit
		},
	},
	created() {
		this.isDetail = this.$route.path.includes('detail')
		this.isAddSub = this.$route.path.includes('addSubChannel')
		if (this.isDetail) {
			this.id = this.$route.query.id
			this.getDetail()
		}
		if (this.isAddSub) {
			this.sellForm.sellLevel = 2
			this.sellForm.sellOf = this.$route.query.sellName
		}
	},
	methods: {
		beforeUpload(file) {
			const suffixs = /\.[^\.]+$/.exec(file.name)
			if (!this.templateAcceptFile.includes(suffixs[0])) {
				this.$message.warning(`限制上传 ${this.templateAcceptFile} 格式的图片`)
				return false
			}
			return true
		},
		handleFileChange(file, fileList, param) {
			console.log(file, fileList)
			this.sellForm[param] = file.name
		},
		getProfitLabel(val) {
			return val === 1 ? '分润金额' : '分润比率'
		},
		getProfitSuffix(val) {
			return val === 1 ? '元' : '%'
		},
		handleTemplateFileChange(file, fileList) {
			console.log(file, fileList)
			this.sellForm.templateUrl = file.name
		},
		handlePreviewFileChange(file, fileList) {
			console.log(file, fileList)
			this.sellForm.previewUrl = file.name
		},
		getDetail() {
			// 获取详情
		},
		getApplyList() {
			// 获取报名列表
		},
		goBack() {
			this.$router.push({
				path: '/system/sellList',
			})
		},
		submitForm() {
			if (this.isRequesting) return
			this.isRequesting = true

			let flag = true
			this.$refs['sellForm'].validate(valid => {
				if (!valid) {
					flag = false
				}
			})
			if (!flag) return

			console.log('接口提交中')
		},
	},
}
</script>

<style lang="scss" scoped>
.sell-first {
	position: relative;
	.sell-part {
		display: flex;
		flex-wrap: wrap;
		.el-form-item {
			width: 50%;
		}
		.el-select,
		.el-date-editor {
			width: 100%;
		}
	}
	::v-deep {
		.el-upload {
			width: 100%;
		}
	}
	.part-title {
		position: relative;
		padding-left: 20px;
		color: #aaa;
		&::before {
			display: block;
			content: '';
			width: 10px;
			height: 10px;
			border-radius: 30px;
			background-color: #409eff;
			position: absolute;
			left: 0;
			top: 3px;
		}
	}
	.title-h4 {
		border-left: 3px solid #409eff;
		padding-left: 10px;
	}
	.action-area {
		padding-top: 50px;
		text-align: center;
		button + button {
			margin-left: 30px;
		}
	}
	.edit-btn {
		position: absolute;
		right: 0;
		top: 0;
		.el-icon-edit-outline {
			cursor: pointer;
			font-size: 30px;
			color: #409eff;
		}
	}
}
</style>
