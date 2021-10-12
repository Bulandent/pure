<template>
	<div class="contract-detail">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="模板信息" name="first"></el-tab-pane>
		</el-tabs>
		<div class="contract-first">
			<div v-if="isDisabled" class="edit-btn">
				<i @click="isEdit = !isEdit" class="el-icon-edit-outline"></i>
			</div>
			<el-form :model="contractForm" :rules="rules" ref="contractForm" label-width="120px">
				<el-form-item label="模板名称" prop="templateName">
					<el-input
						type="text"
						v-model="contractForm.templateName"
						:disabled="isDisabled"
					></el-input>
				</el-form-item>
				<el-form-item label="模板类型" prop="templateType">
					<el-cascader
						v-model="contractForm.templateType"
						:options="templateList"
						:disabled="isDisabled"
						placeholder="模板类型"
					></el-cascader>
				</el-form-item>
				<el-form-item label="模板简介" prop="templateDesc">
					<el-input
						type="text"
						v-model="contractForm.templateDesc"
						:disabled="isDisabled"
						maxlength="80"
					></el-input>
				</el-form-item>
				<el-form-item label="模板文件" prop="templateUrl">
					<el-upload
						class="upload-demo"
						action=""
						:disabled="isDisabled"
						:on-change="handleTemplateFileChange"
						:show-file-list="false"
						:accept="templateAcceptFile"
						:before-upload="beforeTemplateUpload"
					>
						<el-input
							type="text"
							v-model="contractForm.templateUrl"
							:disabled="isDisabled"
							placeholder="点击上传"
						></el-input>
					</el-upload>
				</el-form-item>
				<el-form-item label="预览文件" prop="previewUrl">
					<el-upload
						class="upload-demo"
						action=""
						:disabled="isDisabled"
						:on-change="handlePreviewFileChange"
						:show-file-list="false"
						:accept="previewAcceptFile"
						:before-upload="beforePreviewUpload"
					>
						<el-input
							type="text"
							v-model="contractForm.previewUrl"
							:disabled="isDisabled"
							placeholder="点击上传"
						></el-input>
					</el-upload>
				</el-form-item>
				<el-form-item label="售价" prop="soldPrice">
					<el-col :span="22">
						<el-input
							type="text"
							v-model="contractForm.soldPrice"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" style="text-align: right">元</el-col>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-switch
						v-model="contractForm.status"
						:disabled="isDisabled"
						active-text="开启"
					></el-switch>
				</el-form-item>
			</el-form>
			<div class="action-area" v-if="(isEdit && isDetail) || !isDetail">
				<el-button type="primary" @click="submitForm">保存</el-button>
				<el-button @click="goBack">返回</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ContractDetail',
	components: {},
	data() {
		return {
			contractNo: '',
			activeTab: 'first',
			isDetail: false,
			isRequesting: false,
			isEdit: false,
			templateAcceptFile: '.doc,.docx,.xlsx,.pptx',
			previewAcceptFile: '.pdf',
			contractForm: {
				templateName: null,
				templateType: null,
				templateDesc: null,
				templateUrl: null,
				previewUrl: null,
				soldPrice: null,
				status: null,
			},
			templateList: [
				{
					value: 'a1',
					label: '一级a',
					children: [
						{
							value: 'a2',
							label: '二级a1',
						},
						{
							value: 'a3',
							label: '二级a2',
						},
					],
				},
				{
					value: 'b1',
					label: '一级b',
					children: [
						{
							value: 'b1',
							label: '二级b1',
						},
						{
							value: 'b2',
							label: '二级b2',
						},
					],
				},
			],
			rules: {
				templateName: [{ required: true, message: '必填', trigger: 'blur' }],
				templateType: [{ required: true, message: '必填', trigger: 'change' }],
				templateDesc: [{ required: true, message: '必填', trigger: 'blur' }],
				templateUrl: [{ required: true, message: '必填', trigger: 'change' }],
				previewUrl: [{ required: true, message: '必填', trigger: 'change' }],
				status: [{ required: true, message: '必填', trigger: 'change' }],
				soldPrice: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: /(?:^[0-9]$)|(?:^[1-9][0-9]+$)/, message: '格式不正确', trigger: 'blur' },
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
		if (this.isDetail) {
			this.contractNo = this.$route.query.contractNo
			this.getDetail()
			this.getApplyList()
		}
	},
	methods: {
		handleTemplateFileChange(file, fileList) {
			console.log(file, fileList)
			this.contractForm.templateUrl = file.name
		},
		handlePreviewFileChange(file, fileList) {
			console.log(file, fileList)
			this.contractForm.previewUrl = file.name
		},
		getDetail() {
			// 获取详情
		},
		getApplyList() {
			// 获取报名列表
		},
		goBack() {
			this.$router.push({
				path: '/contract/list',
			})
		},
		submitForm() {
			if (this.isRequesting) return
			this.isRequesting = true

			let flag = true
			this.$refs['contractForm'].validate(valid => {
				if (!valid) {
					flag = false
				}
			})
			if (!flag) return

			console.log('接口提交中')
		},
		resetForm() {
			this.$refs['contractForm'].resetFields()
		},
		beforeTemplateUpload(file) {
			const suffixs = /\.[^\.]+$/.exec(file.name)
			if (!this.templateAcceptFile.includes(suffixs[0])) {
				this.$message.warning(`限制上传 ${this.templateAcceptFile} 格式的图片`)
				return false
			}
			return true
		},
		beforePreviewUpload(file) {
			const suffixs = /\.[^\.]+$/.exec(file.name)
			if (!this.previewAcceptFile.includes(suffixs[0])) {
				this.$message.warning(`限制上传 ${this.previewAcceptFile} 格式的图片`)
				return false
			}
			return true
		},
	},
}
</script>

<style lang="scss" scoped>
.contract-detail {
	.contract-first {
		position: relative;
		padding-top: 40px;
	}
	.el-cascader {
		width: 100%;
	}
	.action-area {
		padding-top: 50px;
		text-align: center;
		button + button {
			margin-left: 30px;
		}
	}
	::v-deep {
		.el-upload {
			width: 100%;
		}
	}
	::v-deep {
		.el-tabs__item {
			font-size: 16px;
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
