<template>
	<div class="counselor-first">
		<el-form :model="firstForm" :rules="rules" ref="firstForm" label-width="120px">
			<el-form-item label="服务类型" prop="serviceType">
				<el-input
					type="text"
					v-model="firstForm.serviceType"
					placeholder="请输入"
					:disabled="!isEdit"
				></el-input>
			</el-form-item>
			<el-form-item label="服务时长" prop="serviceDuration">
				<div v-for="(item, index) in firstForm.serviceList" :key="index">
					<el-button size="small" :class="{ on: item.on }" @click="item.on = true">
						{{ item.label }}
					</el-button>
				</div>
			</el-form-item>
			<el-form-item label="价格" prop="price">
				<div v-for="(item, index) in firstForm.serviceList" :key="index">
					<template v-if="item.on">
						<el-input type="text" v-model="item.price"></el-input>
					</template>
				</div>
			</el-form-item>
		</el-form>
		<div class="action-area" v-if="(isEdit && isDetail) || !isDetail">
			<el-button type="primary" @click="submitForm">保存</el-button>
			<el-button @click="goBack">返回</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CounselorFirst',
	components: {},
	props: {
		isEdit: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			contractNo: '',
			isRequesting: false,
			firstForm: {
				serviceType: null,
				serviceList: [
					{ label: '1个月', on: false, price: null },
					{ label: '3个月', on: false, price: null },
					{ label: '6个月', on: false, price: null },
					{ label: '1年', on: false, price: null },
					{ label: '2年', on: false, price: null },
					{ label: '3年', on: false, price: null },
					{ label: '4年', on: false, price: null },
					{ label: '5年', on: false, price: null },
				],
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

<style lang="scss" scoped></style>
