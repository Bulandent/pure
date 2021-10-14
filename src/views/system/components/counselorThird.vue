<template>
	<div class="counselor-third">
		<div v-for="(item, index) in packageList" :key="index" class="package-item">
			<div class="package-index">{{ index + 1 }}</div>
			<div class="package-delete" v-if="packageList.length > 1">
				<i class="el-icon-delete" @click="removePackage(index)"></i>
			</div>
			<el-form :model="packageList[index]" :rules="rules" ref="thirdForm" label-width="100px">
				<el-row>
					<el-col :span="11">
						<el-form-item label="可选包名称" prop="packageName">
							<el-input
								type="text"
								v-model="packageList[index].packageName"
								placeholder="请输入"
								:disabled="!isEdit"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :offset="2">
						<el-form-item label="价格" prop="packagePrice">
							<el-input
								type="text"
								v-model="packageList[index].packagePrice"
								placeholder="请输入：0为面谈"
								:disabled="!isEdit"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="简介" prop="packageDesc">
					<el-input
						type="text"
						v-model="packageList[index].packageDesc"
						placeholder="请输入"
						:disabled="!isEdit"
					></el-input>
				</el-form-item>
				<el-form-item label="可选包说明" required>
					<quill-editor
						ref="myQuillEditor"
						v-model="packageList[index].packageInfo"
						:options="editorOption"
						:disabled="!isEdit"
						@blur="onEditorBlur($event)"
						@focus="onEditorFocus($event)"
						@ready="onEditorReady($event)"
					/>
				</el-form-item>
			</el-form>
		</div>
		<div class="add-package" v-if="isEdit">
			<el-button @click="addPackage" icon="el-icon-plus">添加服务类型</el-button>
		</div>
		<div class="action-area" v-if="isEdit">
			<el-button type="primary" @click="submitForm">保存</el-button>
			<el-button @click="goBack">返回</el-button>
		</div>
	</div>
</template>

<script>
// https://github.com/surmon-china/vue-quill-editor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
	name: 'CounselorThird',
	components: {
		quillEditor,
	},
	props: {
		isEdit: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			packageList: [
				{
					packageName: null,
					packagePrice: null,
					packageDesc: null,
					packageInfo: null,
				},
			],
			isRequesting: false,
			editorOption: {},
			rules: {
				packageName: [{ required: true, message: '必填', trigger: 'blur' }],
				packagePrice: [
					{ required: true, message: '必填', trigger: 'blur' },
					{ pattern: /(?:^[0-9]$)|(?:^[1-9][0-9]+$)/, message: '格式不正确', trigger: 'blur' },
				],
				packageDesc: [{ required: true, message: '必填', trigger: 'blur' }],
			},
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		addPackage() {
			const p = {
				packageName: null,
				packagePrice: null,
				packageDesc: null,
				packageInfo: null,
			}
			this.packageList.push(p)
		},
		removePackage(index) {
			this.packageList.splice(index, 1)
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
			let flag = true

			for (let index = 0; index < this.packageList.length; index++) {
				this.$refs.thirdForm[index].validate(valid => {
					if (!valid) flag = false
				})
				if (!flag) return

				if (!this.packageList[index].packageInfo) {
					this.$message.warning('可选包说明不能为空')
					return
				}
			}

			if (this.isRequesting) return
			this.isRequesting = true

			console.log('接口提交中')
		},
		onEditorBlur(quill) {
			console.log('editor blur!', quill)
		},
		onEditorFocus(quill) {
			console.log('editor focus!', quill)
		},
		onEditorReady(quill) {
			console.log('editor ready!', quill)
		},
		onEditorChange({ quill, html, text }) {
			console.log('editor change!', quill, html, text)
			this.content = html
		},
	},
}
</script>

<style lang="scss" scoped>
.package-item {
	position: relative;
	.package-index {
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
	.package-delete {
		position: absolute;
		right: -50px;
		top: 0;
		i {
			font-size: 30px;
			cursor: pointer;
			color: #409eff;
		}
	}
}
.add-package {
	text-align: center;
	margin: 30px 0;
	.el-button {
		width: 300px;
	}
}
.quill-editor {
	::v-deep {
		.ql-container {
			height: 250px;
		}
	}
}
.action-area {
	text-align: center;
	margin-top: 50px;
}
</style>
