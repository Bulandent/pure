<template>
	<div class="lecture-detail">
		<el-tabs v-model="activeTab" @tab-click="handleClick">
			<el-tab-pane label="讲座信息" name="first"></el-tab-pane>
			<el-tab-pane v-if="isDetail" label="用户管理" name="second"></el-tab-pane>
		</el-tabs>
		<div v-show="activeTab === 'first'" class="lecture-first">
			<div v-if="isDisabled" class="edit-btn">
				<i @click="isEdit = !isEdit" class="el-icon-edit-outline"></i>
			</div>
			<el-form :model="lectureForm" :rules="rules" ref="lectureForm" label-width="120px">
				<el-form-item label="宣传图" prop="pictureUrl" style="width: 100%">
					<el-upload
						class="picture-uploader"
						:show-file-list="false"
						action=""
						:on-success="handlepictureSuccess"
						:before-upload="beforepictureUpload"
						:disabled="isDisabled"
					>
						<img v-if="lectureForm.pictureUrl" :src="lectureForm.pictureUrl" class="picture" />
						<i v-else class="el-icon-plus picture-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="讲座名称" prop="lectureName">
					<el-input type="text" v-model="lectureForm.lectureName" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="讲座主办方" prop="sponsor">
					<el-input type="text" v-model="lectureForm.sponsor" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="报名开始时间" prop="applyStartTime">
					<el-date-picker
						type="datetime"
						placeholder="选择时间"
						v-model="lectureForm.applyStartTime"
						:disabled="isDisabled"
						style="width: 100%"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="活动开始时间" prop="actStartTime">
					<el-date-picker
						type="datetime"
						placeholder="选择时间"
						v-model="lectureForm.actStartTime"
						:disabled="isDisabled"
						style="width: 100%"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="可参与人数" prop="countPerson">
					<el-col :span="21">
						<el-input
							type="text"
							v-model="lectureForm.countPerson"
							:disabled="isDisabled"
						></el-input>
					</el-col>
					<el-col :span="2" style="text-align: right">人</el-col>
				</el-form-item>
				<el-form-item label="活动地址" prop="address" style="float: right">
					<el-input type="text" v-model="lectureForm.address" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="详情" prop="lectureDetail" style="width: 100%">
					<el-input
						type="textarea"
						v-model="lectureForm.lectureDetail"
						:disabled="isDisabled"
						rows="4"
					></el-input>
				</el-form-item>
				<el-form-item label="须知模板" prop="lectureTemplate">
					<el-select v-model="lectureForm.lectureTemplate" :disabled="isDisabled">
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
		<div v-show="activeTab === 'second'"></div>
	</div>
</template>

<script>
export default {
	name: 'LectureDetail',
	components: {},
	data() {
		return {
			activeTab: 'first',
			isDetail: false,
			isRequesting: false,
			isEdit: false,
			lectureForm: {
				pictureUrl: null,
				lectureName: null,
				sponsor: null,
				applyStartTime: null,
				actStartTime: null,
				countPerson: null,
				address: null,
				lectureDetail: null,
				lectureTemplate: null,
			},
			templateList: [
				{
					label: '模板一',
					value: '1',
				},
				{
					label: '模板二',
					value: '2',
				},
			],
			rules: {
				pictureUrl: [{ required: true, message: '必填', trigger: 'change' }],
				lectureName: [{ required: true, message: '必填', trigger: 'blur' }],
				sponsor: [{ required: true, message: '必填', trigger: 'blur' }],
				applyStartTime: [{ required: true, message: '必填', trigger: 'change' }],
				actStartTime: [{ required: true, message: '必填', trigger: 'change' }],
				address: [{ required: true, message: '必填', trigger: 'blur' }],
				lectureDetail: [{ required: true, message: '必填', trigger: 'blur' }],
				lectureTemplate: [{ required: true, message: '必填', trigger: 'change' }],
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
		this.isDetail = this.$route.path.includes('detail')
	},
	methods: {
		goBack() {
			this.$router.push({
				path: '/lecture/list',
			})
		},
		submitForm() {
			if (this.isRequesting) return
			this.isRequesting = true

			let flag = true
			this.$refs['lectureForm'].validate(valid => {
				if (!valid) {
					flag = false
				}
			})
			if (!flag) return

			console.log('接口提交中')
		},
		resetForm() {
			this.$refs['lectureForm'].resetFields()
		},
		handleClick(tab, event) {
			console.log(tab, event)
		},
		handlepictureSuccess(res, file) {
			this.lectureForm.picture = URL.createObjectURL(file.raw)
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
.lecture-detail {
	.lecture-first {
		padding-top: 20px;
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
			.el-upload:hover {
				border-color: #409eff;
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
	}
	.edit-btn {
		text-align: right;
		padding: 30px 0 0;
		.el-icon-edit-outline {
			cursor: pointer;
			font-size: 30px;
			color: #409eff;
		}
	}
}
</style>
