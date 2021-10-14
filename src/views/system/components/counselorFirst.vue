<template>
	<div class="counselor-first">
		<div v-for="(service, index) in serviceList" :key="index" class="service-item">
			<div class="service-index">{{ index + 1 }}</div>
			<div class="service-delete" v-if="serviceList.length > 1">
				<i class="el-icon-delete" @click="removeService(index)"></i>
			</div>
			<el-form :model="serviceList[index]" :rules="rules" ref="serviceForm" label-width="100px">
				<el-form-item label="服务类型" prop="serviceType">
					<el-input
						type="text"
						v-model="serviceList[index].serviceType"
						placeholder="请输入"
						:disabled="!isEdit"
					></el-input>
				</el-form-item>
				<el-form-item label="服务时长" required>
					<div v-for="item in serviceList[index].timeList" :key="item.label" class="time-item">
						<span
							:class="{ on: item.on, disabled: !isEdit }"
							@click="
								() => {
									if (!isEdit) return
									item.on = !item.on
								}
							"
						>
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
							<el-input
								type="text"
								v-model="serviceList[index].timeList[tIndex].price"
								:disabled="!isEdit"
								@input="
									val => (serviceList[index].timeList[tIndex].price = val.replace(/[^\d]/g, ''))
								"
							></el-input>
						</template>
					</div>
				</el-form-item>
				<el-form-item label="服务内容" class="service-con" required>
					<div class="tips">
						已选择的服务时长含“年”，服务内容为1年服务次数，2年翻倍，以此类推，若未选择“年”则单位为“月”；输入-1为不限次数。
					</div>
					<div class="sc-item">
						<span>线下咨询</span>
						<div class="flex-50">
							到甲方办公场所咨询
							<el-input
								class="w100-m10"
								type="text"
								v-model="serviceList[index].firstPartyCount"
								@input="val => (serviceList[index].firstPartyCount = val.replace(/[^\d]/g, ''))"
								:disabled="!isEdit"
							></el-input>
							次
						</div>
						<div class="flex-50">
							到乙方办公场所咨询
							<el-input
								class="w100-m10"
								type="text"
								v-model="serviceList[index].secondPartyCount"
								@input="val => (serviceList[index].secondPartyCount = val.replace(/[^\d]/g, ''))"
								:disabled="!isEdit"
							></el-input>
							次
						</div>
					</div>
					<div class="sc-item">
						<span>线上咨询</span>
						<div class="flex-50">
							微信
							<el-input
								class="w100-m10"
								type="text"
								v-model="serviceList[index].weixinCount"
								:disabled="!isEdit"
								@input="val => (serviceList[index].weixinCount = val.replace(/[^\d]/g, ''))"
								style="margin-left: 108px"
							></el-input>
							次
						</div>
						<div class="flex-50">
							电话
							<el-input
								class="w100-m10"
								type="text"
								v-model="serviceList[index].mobileCount"
								:disabled="!isEdit"
								@input="val => (serviceList[index].mobileCount = val.replace(/[^\d]/g, ''))"
								style="margin-left: 108px"
							></el-input>
							次
						</div>
					</div>
					<div class="sc-item">
						<span>合同/规章制度</span>
						<div class="contract-list">
							<span
								v-for="contract in serviceList[index].contractList"
								:key="contract.label"
								:class="{ on: contract.on, disabled: !isEdit }"
								@click="
									() => {
										if (!isEdit) return
										contract.on = !contract.on
									}
								"
							>
								{{ contract.label }}
							</span>
						</div>
						<div>
							<el-input
								class="w100-m10"
								type="text"
								v-model="serviceList[index].contractCount"
								:disabled="!isEdit"
								@input="val => (serviceList[index].contractCount = val.replace(/[^\d]/g, ''))"
							></el-input>
							次
						</div>
					</div>
					<div class="sc-item">
						<span>律师函/债权催收函</span>
						<div class="contract-list">
							<span
								v-for="letter in serviceList[index].letterList"
								:key="letter.label"
								:class="{ on: letter.on, disabled: !isEdit }"
								@click="
									() => {
										if (!isEdit) return
										letter.on = !letter.on
									}
								"
							>
								{{ letter.label }}
							</span>
						</div>
						<div>
							<el-input
								class="w100-m10"
								type="text"
								v-model="serviceList[index].letterCount"
								:disabled="!isEdit"
								@input="val => (serviceList[index].letterCount = val.replace(/[^\d]/g, ''))"
							></el-input>
							次
						</div>
						<div class="contract-switch">
							与合同/规章制度共用次数
							<el-switch v-model="serviceList[index].isShare" :disabled="!isEdit"></el-switch>
						</div>
					</div>
				</el-form-item>
				<el-form-item label="服务律师" prop="selecteLaywer">
					可自选
					<el-switch v-model="serviceList[index].selecteLaywer" :disabled="!isEdit"></el-switch>
				</el-form-item>
			</el-form>
		</div>
		<div class="add-service" v-if="isEdit">
			<el-button @click="addService" icon="el-icon-plus">添加服务类型</el-button>
		</div>
		<div class="action-area" v-if="isEdit">
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
					contractList: [
						{ label: '合同草拟', on: false },
						{ label: '合同审核', on: false },
						{ label: '规章制度草拟', on: false },
						{ label: '规章制度审核', on: false },
					],
					letterList: [
						{ label: '律师函', on: false },
						{ label: '债券催收函', on: false },
					],
					firstPartyCount: null,
					secondPartyCount: null,
					weixinCount: null,
					mobileCount: null,
					contractCount: null,
					letterCount: null,
					isShare: false,
					selecteLaywer: false,
				},
			],
			rules: {
				serviceType: [{ required: true, message: '必填', trigger: 'blur' }],
				selecteLaywer: [{ required: true, message: '必填', trigger: 'change' }],
			},
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		addService() {
			const service = {
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
				contractList: [
					{ label: '合同草拟', on: false },
					{ label: '合同审核', on: false },
					{ label: '规章制度草拟', on: false },
					{ label: '规章制度审核', on: false },
				],
				letterList: [
					{ label: '律师函', on: false },
					{ label: '债券催收函', on: false },
				],
				firstPartyCount: null,
				secondPartyCount: null,
				weixinCount: null,
				mobileCount: null,
				contractCount: null,
				letterCount: null,
				selecteLaywer: false,
			}
			this.serviceList.push(service)
		},
		removeService(index) {
			this.serviceList.splice(index, 1)
		},
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
		goBack() {
			this.$router.push({
				path: '/system/counselorList',
			})
		},
		submitForm() {
			if (!this.validateForm()) return

			if (this.isRequesting) return
			this.isRequesting = true

			console.log('接口提交中')
		},
		validateForm() {
			let flag = true
			for (let index = 0; index < this.serviceList.length; index++) {
				this.$refs.serviceForm[index].validate(valid => {
					if (!valid) {
						flag = false
					}
				})
				if (!flag) return

				const timeList = this.serviceList[index].timeList
				const checkedTimeList = timeList.filter(time => time.on)
				if (checkedTimeList.length === 0) {
					this.$message.warning('请选择服务时长')
					return
				}
				for (let index = 0; index < timeList.length; index++) {
					const time = timeList[index]
					if (time.on && !time.price && time.price !== 0) {
						this.$message.warning('服务时长的价格必填')
						return
					}
				}

				const params = [
					'firstPartyCount',
					'secondPartyCount',
					'weixinCount',
					'mobileCount',
					'contractCount',
					'letterCount',
				]
				for (let pIndex = 0; pIndex < params.length; pIndex++) {
					const keyValue = this.serviceList[index][params[pIndex]]
					if (!keyValue && keyValue !== 0) {
						this.$message.warning('服务内容中的次数必填')
						return
					}
				}
			}
			return true
		},
	},
}
</script>

<style lang="scss" scoped>
.counselor-first {
	.service-item {
		position: relative;
	}
	.time-item {
		display: inline-block;
		width: 110px;
		.el-input {
			width: 100px;
		}
		span {
			display: inline-block;
			width: 100px;
			border: 1px solid #dcdfe6;
			cursor: pointer;
			text-align: center;
			font-weight: 400;
			font-size: 12px;
			line-height: 36px;
			height: 36px;
			border-radius: 4px;
			transition: all 0.1;
		}
		span.disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}
		span.on {
			color: #1890ff;
			background: #e8f4ff;
			border-color: #a3d3ff;
		}
	}
	.sc-item {
		display: flex;
		align-items: center;
		margin: 5px 0;
		&::before {
			display: inline-block;
			content: '';
			border: 6px solid #409eff;
			width: 0;
			height: 0;
			border-radius: 10px;
			margin-right: 10px;
		}
	}
	.service-index {
		position: absolute;
		left: -30px;
		top: 0;
		width: 30px;
		height: 30px;
		line-height: 30px;
		border: 1px solid #409eff;
		border-radius: 50px;
		color: #409eff;
		text-align: center;
	}
	.service-delete {
		position: absolute;
		right: -50px;
		top: 0;
		i {
			font-size: 30px;
			cursor: pointer;
			color: #409eff;
		}
	}
	.action-area {
		text-align: center;
		margin-top: 50px;
	}
	.add-service {
		text-align: center;
		margin: 30px 0;
		.el-button {
			width: 300px;
		}
	}
	.contract-list {
		padding: 0 6px 0 7px;
		span {
			display: inline-block;
			width: 100px;
			border: 1px solid #dcdfe6;
			cursor: pointer;
			text-align: center;
			font-weight: 400;
			font-size: 12px;
			line-height: 36px;
			height: 36px;
			border-radius: 4px;
			transition: all 0.1;
			margin: 0 5px;
		}
		span.disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}
		span.on {
			color: #1890ff;
			background: #e8f4ff;
			border-color: #a3d3ff;
		}
	}
	.contract-switch {
		margin-left: 50px;
		.el-switch {
			margin-left: 10px;
		}
	}
	.flex-50 {
		display: flex;
		margin-left: 50px;
	}
	.w100-m10 {
		width: 100px;
		margin: 0 10px;
	}
	.service-con {
		.tips {
			color: #999999;
		}
	}
}
</style>
