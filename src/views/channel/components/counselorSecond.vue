<template>
	<div class="counselor-second">
		<el-form :model="secondForm" :rules="rules" ref="secondForm" label-width="100px">
			<el-form-item label="服务名称" prop="serviceName">
				<el-input
					type="text"
					v-model="secondForm.serviceName"
					placeholder="请输入"
					:disabled="!isEdit"
				></el-input>
			</el-form-item>
			<el-form-item label="服务简介" prop="serviceDesc">
				<el-input
					type="text"
					v-model="secondForm.serviceDesc"
					placeholder="请输入"
					:disabled="!isEdit"
				></el-input>
			</el-form-item>
			<el-form-item label="服务说明" required>
				<quill-editor
					ref="myQuillEditor"
					v-model="secondForm.serviceInfo"
					:options="editorOption"
					:disabled="!isEdit"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@ready="onEditorReady($event)"
				/>
			</el-form-item>
		</el-form>
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
	name: 'CounselorSecond',
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
			secondForm: {
				serviceName: null,
				serviceDesc: null,
				serviceInfo: null,
			},
			isRequesting: false,
			editorOption: {},
			rules: {
				serviceName: [{ required: true, message: '必填', trigger: 'blur' }],
				serviceDesc: [{ required: true, message: '必填', trigger: 'blur' }],
			},
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
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
			this.$refs.secondForm.validate(valid => {
				if (!valid) flag = false
			})
			if (!flag) return
			if (!this.secondForm.serviceInfo) {
				this.$message.warning('服务说明不能为空')
				return
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
