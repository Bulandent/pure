<template>
	<div class="channel-first">
		<div v-if="isDisabled" class="edit-btn">
			<i @click="isEdit = !isEdit" class="el-icon-edit-outline"></i>
		</div>
		<el-form :model="channelForm" :rules="rules" ref="channelForm" label-width="140px">
			<h4 class="title-h4">基本规则</h4>
			<div class="channel-part">
				<el-form-item v-if="isDetail" label="渠道编号" prop="channelNo">
					<el-input type="text" v-model="channelForm.channelNo" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="渠道名称" prop="channelName">
					<el-input type="text" v-model="channelForm.channelName" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input type="text" v-model="channelForm.mobile" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="originType">
					<el-select
						v-model="channelForm.originType"
						:disabled="isDisabled"
						@change="changeOriginType"
					>
						<el-option
							v-for="item in originTypeList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="渠道等级" prop="channelLevel">
					<el-select v-model="channelForm.channelLevel" :disabled="isDisabled || isAddSub">
						<el-option
							v-for="item in channelLevelList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="渠道类型" prop="channelType">
					<el-select v-model="channelForm.channelType" :disabled="isDisabled">
						<el-option
							v-for="item in channelTypeList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="isAddSub" label="所属渠道" prop="channelOf">
					<el-input type="text" v-model="channelForm.channelOf" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item v-if="channelForm.originType === 1" label="统一信用代码" prop="creditCode">
					<el-input type="text" v-model="channelForm.creditCode" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item v-if="channelForm.originType === 1" label="营业执照副本" prop="licenseUrl">
					<el-upload
						class="upload-demo"
						action=""
						:disabled="isDisabled"
						:on-change="(file, fileList) => handleFileChange(file, fileList, 'licenseUrl')"
						:show-file-list="false"
						:accept="acceptFile"
						:before-upload="beforeUpload"
					>
						<el-input
							type="text"
							v-model="channelForm.licenseUrl"
							:disabled="isDisabled"
							placeholder="点击上传"
						></el-input>
					</el-upload>
				</el-form-item>
				<template v-if="channelForm.originType === 2">
					<el-form-item label="身份证号" prop="idCard">
						<el-input type="text" v-model="channelForm.idCard" :disabled="isDisabled"></el-input>
					</el-form-item>
					<el-form-item label="身份证正面" prop="IDCardFirstUrl">
						<el-upload
							class="upload-demo"
							action=""
							:disabled="isDisabled"
							:on-change="(file, fileList) => handleFileChange(file, fileList, 'IDCardFirstUrl')"
							:show-file-list="false"
							:accept="acceptFile"
							:before-upload="beforeUpload"
						>
							<el-input
								type="text"
								v-model="channelForm.IDCardFirstUrl"
								:disabled="isDisabled"
								placeholder="点击上传"
							></el-input>
						</el-upload>
					</el-form-item>
					<el-form-item label="身份证反面" prop="IDCardSecondUrl">
						<el-upload
							class="upload-demo"
							action=""
							:disabled="isDisabled"
							:on-change="(file, fileList) => handleFileChange(file, fileList, 'IDCardSecondUrl')"
							:show-file-list="false"
							:accept="acceptFile"
							:before-upload="beforeUpload"
						>
							<el-input
								type="text"
								v-model="channelForm.IDCardFirstUrl"
								:disabled="isDisabled"
								placeholder="点击上传"
							></el-input>
						</el-upload>
					</el-form-item>
				</template>
				<el-form-item label="收款银行" prop="collectBank">
					<el-input type="text" v-model="channelForm.collectBank" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="收款支行" prop="bankBranch">
					<el-input type="text" v-model="channelForm.bankBranch" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="银行卡号" prop="cardNo">
					<el-input type="text" v-model="channelForm.cardNo" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="签约时间" prop="signTime">
					<el-date-picker
						v-model="channelForm.signTime"
						type="date"
						:disabled="isDisabled"
						placeholder="选择日期"
					></el-date-picker>
				</el-form-item>
			</div>

			<h4 class="title-h4">分润规则</h4>
			<h5 class="part-title">企业法律顾问</h5>
			<div class="channel-part">
				<el-form-item label="分润方式" prop="company.profitTypeA">
					<el-select v-model="channelForm.company.profitTypeA" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.company.profitTypeA)"
					prop="company.profitA"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.company.profitA"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.company.profitTypeA) }}
					</el-col>
				</el-form-item>
				<el-form-item label="客户自动续费分润" prop="company.profitTypeB">
					<el-select v-model="channelForm.company.profitTypeB" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.company.profitTypeB)"
					prop="company.profitB"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.company.profitB"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.company.profitTypeB) }}
					</el-col>
				</el-form-item>
				<el-form-item label="被TA人代下单分润" prop="company.profitTypeC">
					<el-select v-model="channelForm.company.profitTypeC" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.company.profitTypeC)"
					prop="company.profitC"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.company.profitC"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.company.profitTypeC) }}
					</el-col>
				</el-form-item>
				<el-form-item label="自动续费分润时限" prop="company.time">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.company.time"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">年</el-col>
				</el-form-item>
			</div>

			<h5 class="part-title">企业可选包</h5>
			<div class="channel-part">
				<el-form-item label="首次购买分润" prop="package.profitTypeA">
					<el-select v-model="channelForm.package.profitTypeA" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.package.profitTypeA)"
					prop="package.profitA"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.package.profitA"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.package.profitTypeA) }}
					</el-col>
				</el-form-item>
				<el-form-item label="服务中购买分润" prop="package.profitTypeB">
					<el-select v-model="channelForm.package.profitTypeB" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.package.profitTypeB)"
					prop="package.profitB"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.package.profitB"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.package.profitTypeB) }}
					</el-col>
				</el-form-item>
			</div>

			<h5 class="part-title">个人法律顾问</h5>
			<div class="channel-part">
				<el-form-item label="分润方式" prop="personalPackage.profitTypeA">
					<el-select v-model="channelForm.personalPackage.profitTypeA" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.personalPackage.profitTypeA)"
					prop="personalPackage.profitA"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.personalPackage.profitA"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.personalPackage.profitTypeA) }}
					</el-col>
				</el-form-item>
				<el-form-item label="客户自动续费分润" prop="personalPackage.profitTypeB">
					<el-select v-model="channelForm.personalPackage.profitTypeB" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.personalPackage.profitTypeB)"
					prop="personalPackage.profitB"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.personalPackage.profitB"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.personalPackage.profitTypeB) }}
					</el-col>
				</el-form-item>
				<el-form-item label="被TA人代下单分润" prop="personalPackage.profitTypeC">
					<el-select v-model="channelForm.personalPackage.profitTypeC" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.personalPackage.profitTypeC)"
					prop="personalPackage.profitC"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.personalPackage.profitC"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.personalPackage.profitTypeC) }}
					</el-col>
				</el-form-item>
				<el-form-item label="自动续费分润时限" prop="personalPackage.time">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.personalPackage.time"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">年</el-col>
				</el-form-item>
			</div>

			<h5 class="part-title">个人可选包</h5>
			<div class="channel-part">
				<el-form-item label="首次购买分润" prop="personal.profitTypeA">
					<el-select v-model="channelForm.personal.profitTypeA" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.personal.profitTypeA)"
					prop="personal.profitA"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.personal.profitA"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.personal.profitTypeA) }}
					</el-col>
				</el-form-item>
				<el-form-item label="服务中购买分润" prop="personal.profitTypeB">
					<el-select v-model="channelForm.personal.profitTypeB" :disabled="isDisabled">
						<el-option
							v-for="item in profitList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					:label="getProfitLabel(channelForm.personal.profitTypeB)"
					prop="personal.profitB"
				>
					<el-col :span="21">
						<el-input
							type="text"
							v-model="channelForm.personal.profitB"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" :offset="1">
						{{ getProfitSuffix(channelForm.personal.profitTypeB) }}
					</el-col>
				</el-form-item>
			</div>

			<h5 class="part-title">其他</h5>
			<div class="channel-part">
				<el-form-item label="每月沙龙讲座票数" prop="monthCount">
					<el-input type="text" v-model="channelForm.monthCount" :disabled="isDisabled"></el-input>
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
			profitList: [
				{ label: '固定金额', value: 1 },
				{ label: '固定比率', value: 2 },
			],
			originTypeList: [
				{ label: '企业', value: 1 },
				{ label: '个人', value: 2 },
			],
			channelLevelList: [
				{ label: '上级渠道', value: 1 },
				{ label: '下级渠道', value: 2 },
			],
			channelTypeList: [
				{ label: '渠道类型一', value: 1 },
				{ label: '渠道类型二', value: 2 },
			],
			channelForm: {
				channelNo: null,
				channelName: null,
				mobile: null,
				originType: null,
				channelLevel: null,
				channelType: null,
				channelOf: null,
				creditCode: null,
				licenseUrl: null,
				idCard: null,
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
				channelNo: [{ required: true, message: '必填', trigger: 'blur' }],
				channelName: [{ required: true, message: '必填', trigger: 'blur' }],
				mobile: [{ required: true, message: '必填', trigger: 'blur' }],
				originType: [{ required: true, message: '必填', trigger: 'change' }],
				channelLevel: [{ required: true, message: '必填', trigger: 'change' }],
				channelType: [{ required: true, message: '必填', trigger: 'change' }],
				channelOf: [{ required: true, message: '必填', trigger: 'blur' }],
				creditCode: [{ required: true, message: '必填', trigger: 'blur' }],
				idCard: [{ required: true, message: '必填', trigger: 'blur' }],
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
			this.channelForm.channelLevel = 2
			this.channelForm.channelOf = this.$route.query.channelName
		}
	},
	methods: {
		changeOriginType(val) {
			console.log(val)
			if (val === 1) {
				this.channelForm.idCard = null
				this.channelForm.IDCardFirstUrl = null
				this.channelForm.IDCardSecondUrl = null
			} else {
				this.channelForm.creditCode = null
				this.channelForm.licenseUrl = null
			}
		},
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
			this.channelForm[param] = file.name
		},
		getProfitLabel(val) {
			return val === 1 ? '分润金额' : '分润比率'
		},
		getProfitSuffix(val) {
			return val === 1 ? '元' : '%'
		},
		handleTemplateFileChange(file, fileList) {
			console.log(file, fileList)
			this.channelForm.templateUrl = file.name
		},
		handlePreviewFileChange(file, fileList) {
			console.log(file, fileList)
			this.channelForm.previewUrl = file.name
		},
		getDetail() {
			// 获取详情
		},
		getApplyList() {
			// 获取报名列表
		},
		goBack() {
			this.$router.push({
				path: '/system/channelList',
			})
		},
		submitForm() {
			if (this.isRequesting) return
			this.isRequesting = true

			let flag = true
			this.$refs['channelForm'].validate(valid => {
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
.channel-first {
	position: relative;
	.channel-part {
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
