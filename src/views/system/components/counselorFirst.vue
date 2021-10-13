<template>
	<div class="counselor-first">
		<div v-for="(service, index) in serviceList" :key="index" class="service-item">
			<el-form :model="serviceList[index]" :rules="rules" label-width="120px">
				<el-form-item label="服务类型" prop="serviceType">
					<el-input
						type="text"
						v-model="serviceList[index].serviceType"
						placeholder="请输入"
						:disabled="!isEdit"
					></el-input>
				</el-form-item>
				<el-form-item label="服务时长" required="">
					<div v-for="item in serviceList[index].timeList" :key="item.label" class="time-item">
						<span :class="{ on: item.on }" @click="item.on = !item.on">
							{{ item.label }}
						</span>
					</div>
				</el-form-item>
				<el-form-item label="价格（元）" required>
					<div
						v-for="(item, tIndex) in serviceList[index].timeList"
						:key="tIndex"
						class="time-item"
					>
						<template v-if="item.on">
							<el-input type="text" v-model="serviceList[index].timeList[tIndex].price"></el-input>
						</template>
					</div>
				</el-form-item>
				<el-form-item label="服务内容" class="service-con" required>
					<div class="tips">
						已选择的服务时长含“年”，服务内容为1年服务次数，2年翻倍，以此类推，若未选择“年”则单位为“月”；输入-1为不限次数。
					</div>
					<div class="sc-item">
						<span>线下咨询</span>
						<div>
							到甲方办公场所咨询
							<el-input type="text" v-model="serviceList[index].firstPartyCount"></el-input>
							次
						</div>
						<div>
							到乙方办公场所咨询
							<el-input type="text" v-model="serviceList[index].secondPartyCount"></el-input>
							次
						</div>
					</div>
					<div class="sc-item">
						<span>线上咨询</span>
						<div>
							微信
							<el-input type="text" v-model="serviceList[index].weixinCount"></el-input>
							次
						</div>
						<div>
							电话
							<el-input type="text" v-model="serviceList[index].mobileCount"></el-input>
							次
						</div>
					</div>
					<div class="sc-item">
						<span>合同/规章制度</span>
						<div>
							<span
								v-for="contract in serviceList[index].contractList"
								:class="{ on: contract.on }"
								:key="contract.label"
								@click="contract.on = !contract.on"
							>
								{{ contract.label }}
							</span>
						</div>
						<div>
							<el-input type="text" v-model="serviceList[index].contractCount"></el-input>
							次
						</div>
					</div>
				</el-form-item>
			</el-form>
		</div>
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
			serviceList: [
				{
					serviceType: null,
					timeList: [
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
			],
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
.counselor-first {
	.time-item {
		display: inline-block;
		span {
			display: inline-block;
			width: 70px;
			border: 1px solid #dcdfe6;
			cursor: pointer;
			text-align: center;
			font-weight: 400;
			font-size: 12px;
			line-height: 30px;
			height: 30px;
			border-radius: 4px;
			transition: all 0.1;
		}
		span.on {
			color: #1890ff;
			background: #e8f4ff;
			border-color: #a3d3ff;
		}
	}
}
</style>
