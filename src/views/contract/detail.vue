<template>
	<div class="contract-detail">
		<el-tabs v-model="activeTab" @tab-click="handleClick">
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
				<el-form-item label="模板文件" prop="applyStartTime">
					<el-upload
						class="upload-demo"
						action=""
						:on-change="handleTemplateFileChange"
						:show-file-list="false"
					>
						<el-input
							type="text"
							v-model="contractForm.templateUrl"
							placeholder="点击上传"
						></el-input>
					</el-upload>
				</el-form-item>
				<el-form-item label="活动开始时间" prop="actStartTime">
					<el-date-picker
						type="datetime"
						placeholder="选择时间"
						v-model="contractForm.actStartTime"
						:disabled="isDisabled"
						style="width: 100%"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="可参与人数" prop="countPerson">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="contractForm.countPerson"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" style="text-align: right">人</el-col>
				</el-form-item>
				<el-form-item label="活动地址" prop="address" style="float: right">
					<el-input type="text" v-model="contractForm.address" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="详情" prop="contractDetail" style="width: 100%">
					<el-input
						type="textarea"
						v-model="contractForm.contractDetail"
						:disabled="isDisabled"
						rows="4"
					></el-input>
				</el-form-item>
				<el-form-item label="须知模板" prop="contractTemplate">
					<el-select v-model="contractForm.contractTemplate" :disabled="isDisabled">
						<el-option
							v-for="item in templateList"
							:label="item.label"
							:value="item.value"
							:key="item.value"
						></el-option>
					</el-select>
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
	name: 'LectureDetail',
	components: {},
	data() {
		return {
			contractNo: '',
			activeTab: 'first',
			isDetail: false,
			isRequesting: false,
			isEdit: false,
			applyCount: 10,
			restCount: 12,
			contractForm: {
				templateUrl: null,
				contractName: null,
				sponsor: null,
				applyStartTime: null,
				actStartTime: null,
				countPerson: null,
				address: null,
				contractDetail: null,
				contractTemplate: null,
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
			Total: 0,
			tableData: [
				{
					applyName: '张娜',
					mobile: '18908031120',
					roleName: '客户',
					countPerson: 1,
					payment: 30,
					applyTime: '2021.12.12 13:02',
					platform: 'APP',
				},
			],
			pageSize: 10,
			page: 1,
			rules: {
				pictureUrl: [{ required: true, message: '必填', trigger: 'change' }],
				contractName: [{ required: true, message: '必填', trigger: 'blur' }],
				sponsor: [{ required: true, message: '必填', trigger: 'blur' }],
				applyStartTime: [{ required: true, message: '必填', trigger: 'change' }],
				actStartTime: [{ required: true, message: '必填', trigger: 'change' }],
				address: [{ required: true, message: '必填', trigger: 'blur' }],
				contractDetail: [{ required: true, message: '必填', trigger: 'blur' }],
				contractTemplate: [{ required: true, message: '必填', trigger: 'change' }],
				countPerson: [
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
		console.log(this.$route)
		this.isDetail = this.$route.path.includes('detail')
		if (this.isDetail) {
			this.contractNo = this.$route.query.contractNo
			this.getDetail()
			this.getApplyList()
		}
	},
	methods: {
		handleTemplateFileChange(file, fileList) {},
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
		handleSizeChange(e) {
			this.pageSize = e
			this.getApplyList()
		},
		currentChange(e) {
			this.page = e
			this.getApplyList()
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
		handleClick(tab, event) {
			console.log(tab, event)
		},
		handlepictureSuccess(res, file) {
			this.contractForm.picture = URL.createObjectURL(file.raw)
		},
		beforepictureUpload(file) {
			const isJPG = file.type === 'image/jpeg'
			const isLt2M = file.size / 1024 / 1024 < 2

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!')
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		},
	},
}
</script>

<style lang="scss" scoped>
.contract-detail {
	.ls-tips {
		padding: 20px;
		span {
			color: #409eff;
		}
	}
	.page-box {
		text-align: center;
		padding-top: 10px;
	}
	.contract-first {
		position: relative;
		padding-top: 20px;
	}
	.el-select {
		width: 100%;
	}
	.el-form-item {
		display: inline-block;
		width: 50%;
	}
	.action-area {
		padding-top: 50px;
		text-align: center;
		button + button {
			margin-left: 30px;
		}
	}
	.picture-uploader {
		::v-deep {
			.el-upload {
				border: 1px solid #dcdfe6;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
			}
		}
	}
	.picture-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 150px;
		height: 150px;
		line-height: 150px;
		text-align: center;
	}
	.picture {
		width: 150px;
		height: 150px;
		display: block;
	}
	::v-deep {
		.el-tabs__item {
			font-size: 16px;
		}
		.disabled-upload .el-upload {
			background-color: #f5f7fa;
			border-color: #e4e7ed;
			color: #c0c4cc;
			cursor: not-allowed;
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
