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
						:class="{ 'disabled-upload': isDisabled }"
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
		<div class="lecture-second" v-show="activeTab === 'second'">
			<div class="ls-tips">
				已有
				<span>{{ applyCount }}</span>
				报名，剩下
				<span>{{ restCount }}</span>
				个名额
			</div>
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
				<el-table-column prop="applyName" label="报名人名称"></el-table-column>
				<el-table-column prop="mobile" label="手机号"></el-table-column>
				<el-table-column prop="roleName" label="角色"></el-table-column>
				<el-table-column prop="countPerson" label="报名人数"></el-table-column>
				<el-table-column prop="payment" label="支付金额（元）"></el-table-column>
				<el-table-column prop="applyTime" label="报名时间"></el-table-column>
				<el-table-column prop="platform" label="报名平台"></el-table-column>
			</el-table>
			<div class="page-box" v-if="tableData.length > 0">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="currentChange"
					:page-sizes="[10, 20, 30, 40]"
					:current-page.sync="page"
					:page-size="pageSize"
					layout=" prev, pager, next, sizes, total,jumper"
					:total="Total"
				></el-pagination>
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
			lectureNo: '',
			activeTab: 'first',
			isDetail: false,
			isRequesting: false,
			isEdit: false,
			applyCount: 10,
			restCount: 12,
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
		console.log(this.$route)
		this.isDetail = this.$route.path.includes('detail')
		if (this.isDetail) {
			this.lectureNo = this.$route.query.lectureNo
			this.getDetail()
			this.getApplyList()
		}
	},
	methods: {
		getDetail() {
			// 获取详情
		},
		getApplyList() {
			// 获取报名列表
		},
		goBack() {
			this.$router.push({
				path: '/lecture/list',
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
	.lecture-first {
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
