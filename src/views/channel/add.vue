<template>
	<div class="channel-detail">
		<div v-if="isDisabled" class="edit-btn">
			<i @click="isEdit = !isEdit" class="el-icon-edit-outline"></i>
		</div>
		<el-form :model="channelForm" :rules="rules" ref="channelForm" label-width="140px">
			<el-form-item label="渠道名称" prop="channelName" style="width: 80%">
				<el-input type="text" v-model="channelForm.channelName" :disabled="isDisabled"></el-input>
			</el-form-item>

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
			isRequesting: false,
			isEdit: false,
			profitList: [
				{ label: '固定金额', value: 1 },
				{ label: '固定比率', value: 2 },
			],
			channelForm: {
				channelName: null,
				monthCount: null,
				company: {
					profitType: null,
				},
				package: {},
				personalPackage: {},
				personal: {},
			},
			rules: {
				channelName: [{ required: true, message: '必填', trigger: 'blur' }],
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
		this.isDetail = this.$route.path.includes('channelDetail')
		if (this.isDetail) {
			this.id = this.$route.query.id
			this.getDetail()
		}
	},
	methods: {
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
.channel-detail {
	position: relative;
	padding: 40px 50px 0;
	.channel-part {
		display: flex;
		flex-wrap: wrap;
		.el-form-item {
			width: 50%;
		}
		.el-select {
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
