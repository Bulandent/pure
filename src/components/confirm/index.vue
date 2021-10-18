<template>
	<div class="AlertAdmin">
		<el-dialog :visible.sync="alertData.centerDialogVisible" :before-close="closeForm1">
			<span slot="title">
				<div class="alert-title">{{ alertData.title }}</div>
			</span>
			<div class="alert-content" v-if="alertData.content" style="padding-bottom: 20px">
				<div v-html="alertData.content"></div>
			</div>
			<div class="alert-conation">
				<el-form
					:model="alertData.ruleForm"
					:rules="alertData.rules"
					ref="ruleForm"
					label-position="right"
					label-width="auto"
				>
					<div v-for="(item, index) in alertData.input" :key="index">
						<!-- 选择框 -->
						<el-form-item
							v-if="item.select && item.select.length > 0"
							class="alert-conation-for"
							:label="item.lable"
							:prop="item.prop"
						>
							<el-select
								v-model="alertData.ruleForm[item.prop]"
								:disabled="item.disabled"
								:multiple="item.multiple"
								@change="SelectChangeVal($event, item.changeName, index)"
								:placeholder="item.text || '请选择'"
								:clearable="true"
							>
								<el-option
									v-for="it in item.select"
									:key="it.value"
									:label="it.label"
									:prop="it.prop"
									:value="it.value"
									:disabled="it.disabled"
								></el-option>
							</el-select>
						</el-form-item>
						<!-- 文本域 -->
						<el-form-item v-else-if="item.type == 'textare'" :label="item.lable" :prop="item.prop">
							<el-input
								type="textarea"
								v-model="alertData.ruleForm[item.prop]"
								placeholder="请输入内容"
								show-word-limit
								rows="3"
								:maxlength="item.maxlenth ? item.maxlenth : 1000"
							></el-input>
						</el-form-item>
						<!-- 有单位选择框 -->
						<el-form-item v-else-if="item.type == 'time'" :label="item.lable" :prop="item.prop">
							<div class="type-number" v-if="!item.clearNumber">
								<el-input
									type="number"
									v-model="alertData.ruleForm[item.prop]"
									placeholder="请填写"
								></el-input>
							</div>
							<div class="type-number1" v-else>
								<input
									class="custom-clearNumer"
									v-model="alertData.ruleForm[item.prop]"
									placeholder="请填写"
									@keyup="clearNumer($event, item.clearNumber, item.prop)"
									@blur="rules($event, alertData.rules[item.prop][0].required, item.prop)"
								/>
								<div class="custom-clearNumer-div" v-if="showMessage">
									{{ alertData.rules[item.prop][0].message }}
								</div>
							</div>
							<div>
								<div class="ss" v-if="item.Company">{{ item.Company }}</div>
							</div>
						</el-form-item>
						<!-- 文件选择框 -->
						<el-form-item v-else-if="item.type == 'file'" :label="item.lable" :prop="item.prop">
							<div class="upload-file">
								<el-input
									type="text"
									v-model="alertData.ruleForm[item.prop]"
									placeholder="请上传附件"
								>
									<template slot="append" v-if="alertData.showFileBtn">
										<div>.com</div>
										<input class="appenfile" type="file" @change="uploadFile($event, item.prop)" />
									</template>
								</el-input>
								<input
									v-if="!alertData.showFileBtn"
									type="file"
									class="input-file"
									@change="uploadFile($event, item.prop)"
								/>
							</div>
						</el-form-item>
						<!-- 计数器 -->
						<el-form-item
							class="alert-conation-for"
							:label="item.lable"
							:prop="item.prop"
							v-else-if="item.type == 'InputNumber'"
						>
							<el-input-number v-model="item.val" :min="1"></el-input-number>
						</el-form-item>
						<!-- 时间选择器 -->
						<el-form-item
							class="alert-conation-for"
							:label="item.lable"
							:prop="item.prop"
							v-else-if="item.type == 'picker'"
						>
							<div class="block">
								<el-date-picker
									v-model="alertData.ruleForm[item.prop]"
									default-time=""
									type="datetime"
									clearable
									:placeholder="item.text"
								></el-date-picker>
							</div>
						</el-form-item>
						<!-- 文本框 -->
						<el-form-item class="alert-conation-for" :label="item.lable" :prop="item.prop" v-else>
							<el-input
								v-model="alertData.ruleForm[item.prop]"
								:placeholder="item.text"
								:type="item.type"
								:disabled="item.disabled"
							>
								<template slot="prepend" v-if="item.prependIcon">
									<div class="prepend-concation">
										<img :src="item.prependIcon" />
										<div v-if="item.prependText != ''" class="prepend-text">
											{{ item.prependText }}
										</div>
									</div>
								</template>
							</el-input>
						</el-form-item>
					</div>
				</el-form>
				<!-- <div v-for="(item,index) in alertData.input" :key="index" class="alert-conation-for">
                 <div class="alert-conation-laber">
                      <label>
                      <span v-if="item.must">*</span>
                      {{ item.name }}:
                  </label>

                 </div>
                 <div class="alert-conation-input">
                     <input
                        v-model="input_test"
                        placeholder=""
                        placeholder-class="input-placeholder"
                    />
                 </div>
             </div> -->
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeForm()">
					{{ alertData.closeText ? alertData.closeText : '取 消' }}
				</el-button>
				<el-button type="primary" @click="submitForm()">
					{{ alertData.enterText ? alertData.enterText : '确 定' }}
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'AlertAdmin',
	filters: {
		globalFilter(e) {
			console.log(e)
			return parseInt(e)
		},
	},
	props: {
		// alertData: {
		//     title: "", //标题
		//     centerDialogVisible: true, //为真则显示对话框 为假则关闭对话框
		//     showFileBtn:true, //是否显示右侧上传图片按钮（默认不显示）
		//     disabled:false
		//     ruleForm: {      //需要校验对象
		//       name: "",      //需要校验的字段名
		//     },
		//     rules: { //需要校验的字段名的规则 一般从ruleForm对象里面的属性去写规则
		//       name: [  //对应ruleForm.name 字段 以下是校验的规则 trigger一般对应事件的操作 比如 blur change focus
		//         { required: true,  //是否显示（*）符号
		//           message: "请输入活动名称",  //提示文字
		//           trigger: "blur" },  触发的规则
		//       ]
		//     },
		//     input: [         //文本数据
		//     { lable: "姓名ssddd:",  //key值
		//       prop: "name",   //属性 对应ruleForm.name
		//       text: "请输入",  //placeholder字段
		//       disabled
		//       clearNumber       //是否清除小数点
		//       Company:'分钟'   //type为time时 是否显示右边单位字段
		//       showPrepend:true,      //是否展示左边icon
		//       prependText:'',        //showPrepend为真左边的文字
		//       changeName:''          下拉框触发子传父的命名
		//       multiple              是否多选
		//       prependIcon:require('../../assets/common/iphone.png'), icon地址
		//       val: "",
		//       type:'text'      //文本类型 列入 select number InputNumber(计数器) file time(时间选择框) 默认为text piker 时间选择器
		//       maxlenth 文本框输入最大值
		//       select:[ type为select的时候才有这个数组
		//               {
		//                   value: "黄金糕",  //key值
		//                   label: "黄金糕",  //val 值
		//                 },
		//             ]
		//     },
		//   ]
		// },
		alertData: {
			default: () => {},
			type: Object,
		},
	},
	data() {
		return {
			select_value: '',
			showMessage: false,
		}
	},
	mounted() {},
	methods: {
		submitForm() {
			if (this.alertData.ruleForm) {
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.$emit('submitForm')
					} else {
						console.log('error submit!!')
						return false
					}
				})
			} else {
				this.$emit('submitForm')
			}
		},
		closeForm1() {
			this.$emit('closeForm')
		},
		closeForm() {
			this.$emit('closeForm')
		},
		input_handle() {},
		SelectChangeVal(e, name, index) {
			if (name) {
				this.$emit(name, e)
			} else {
				this.$emit('componentChange', e, index)
			}
		},
		uploadFile(e, prop) {
			if (e.target.files.length < 1) return
			let Data = {
				file: e.target.files[0],
				fileName: e.target.files[0].name,
				fileType: prop,
			}
			this.$emit('uploadFile', Data)
		},
		clearNumer(e, type, prop) {
			if (!type) return
			this.alertData.ruleForm[prop] = this.alertData.ruleForm[prop].replace(/\.+|[^\d.]/gi, '')
		},
		rules(e, type, prop) {
			if (type) {
				if (this.alertData.ruleForm[prop]) {
					if (this.alertData.ruleForm[prop].trim().length > 0) {
						this.showMessage = false
						// this.$emit('rules',1)
					} else {
						// this.$emit('rules',2)
						this.showMessage = true
					}
				} else {
					// this.$emit('rules',2)
					this.showMessage = true
				}
			}
		},
		enterClick() {
			for (var i = 0; i < this.alertData.input.length; i++) {
				if (this.alertData.input[i].must && this.alertData.input[i].val == '') {
					alert(`请输入${this.alertData.select[i].lable.replace(/:/gi, '')}`)
					return
				}
			}
		},
	},
}
</script>
<style scoped lang="scss">
.AlertAdmin {
	// position: fixed;
	// width: 100%;
	// height: 100%;
	// top: 0;
	// right: 0;
	// bottom: 0;
	// left: 0;
	// background-color: rgba(0,0,0,0.5);
	// z-index: 999;
	// .alert-container{
	//     position: absolute;
	//     top: 50%;
	//     left: 50%;
	//     transform: translate(-50%,-50%);
	//     background-color: white;
	//     width: 200px;
	//     height: 200px;
	// }
	// /deep/.el-dialog{
	//   top: 50%;
	//   left: 50%;
	//   transform: translate(-50%, -50%);
	//   margin: unset !important;
	// }
	/deep/ .el-dialog__body {
		border-top: 1px solid #ebebeb;
		border-bottom: 1px solid #ebebeb;
	}
	.el-dialog__body {
		border-top: 1px solid #ebebeb;
		border-bottom: 1px solid #ebebeb;
	}
	.alert-title {
		text-align: left;
	}
	.custom-clearNumer-div {
		height: 5px;
		color: #f56c6c;
		font-size: 12px;
		margin-top: -8px;
	}
	.alert-conation {
		/deep/ .block {
			width: 100%;
			.el-date-editor {
				width: 100%;
			}
			/deep/ .el-input__inner {
				padding-left: 12px;
			}
			/deep/ .el-input__icon {
				width: 0;
			}
			/deep/.el-input__icon::before {
				display: none;
			}
		}
		/deep/.custom-clearNumer {
			width: 100%;
			border-radius: 3px;
			border: 1px solid #dcdfe6;
			outline: none;
			padding: 5px 15px;
			height: 36px;
		}
		/deep/.custom-clearNumer:focus {
			border: 1px solid #409eff;
		}
		.custom-clearNumer:focus {
			border: 1px solid #409eff;
		}
		/deep/.custom-clearNumer:hover {
			border: 1px solid #c0c4cc;
		}
		.custom-clearNumer:hover {
			border: 1px solid #c0c4cc;
		}
		.custom-clearNumer::placeholder {
			color: #c0c9db;
		}
		/deep/ .custom-clearNumer::placeholder {
			color: #c0c9db;
		}
		.custom-clearNumer {
			outline-color: #409eff;
			width: 100%;
			border-radius: 3px;
			border: 1px solid #dcdfe6;
			outline: none;
			padding: 5px 15px;
			height: 36px;
		}
		.block {
			width: 100%;
			.el-date-editor {
				width: 100%;
			}
			/deep/ .el-input__inner {
				padding-left: 12px;
			}
			/deep/ .el-input__icon {
				width: 0;
			}
			/deep/.el-input__icon::before {
				display: none;
			}
		}
		width: 100%;
		/deep/ .el-input-group__prepend {
			background-color: white;
		}
		.el-input-group__prepend {
			background-color: white;
		}
		/deep/.upload-file {
			width: 100%;
			position: relative;
			/deep/ .el-input-group__append {
				.appenfile {
					position: absolute;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					top: 0;
					bottom: 0;
					right: 0;
				}
			}
			/deep/.input-file {
				position: absolute;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
		.upload-file {
			width: 100%;
			position: relative;
			.el-input-group__append {
				.appenfile {
					position: absolute;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					top: 0;
					bottom: 0;
					right: 0;
				}
			}
			.input-file {
				position: absolute;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
		/deep/ .el-input__count {
			height: 16px;
			bottom: 11px;
		}
		/deep/ .el-input__inner::-webkit-inner-spin-button,
		.el-input__inner::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		.el-input__count {
			height: 16px;
			bottom: 11px;
		}
		.el-input__inner::-webkit-inner-spin-button,
		.el-input__inner::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		/deep/ .el-form-item__content {
			display: flex;
			/deep/ .type-number {
				display: flex;
				flex: 1;
				margin-right: 12px;
			}
			/deep/ .type-number1 {
				display: flex;
				flex: 1;
				margin-right: 12px;
				flex-direction: column;
			}
		}
		/deep/ .el-row {
			display: flex;

			/deep/ .el-input__inner {
				display: flex;
			}
		}
		/deep/ .el-textarea__inner {
			min-height: 60px !important;
		}
		.el-form-item__content {
			display: flex;
			.type-number {
				display: flex;
				flex: 1;
				margin-right: 12px;
			}
			.type-number1 {
				display: flex;
				flex: 1;
				margin-right: 12px;
				flex-direction: column;
			}
		}
		.el-row {
			display: flex;
			.el-input__inner {
				display: flex;
			}
		}
		.el-textarea__inner {
			min-height: 60px !important;
		}
	}
	// .alert-content {
	// 	padding: 50px;
	// 	text-align: center;
	// }
	.alert-conation-for {
		/deep/ .el-input-group__prepend {
			padding: 0 12px;
		}
		/deep/ .prepend-concation {
			display: flex;
			align-items: center;
			img {
				width: 15px;
				height: 15px;
			}
			.prepend-text {
				margin-left: 6px;
			}
		}
		/deep/ .el-form-item__content {
			height: 36px;
			display: flex;
			flex: auto;
			/deep/ .el-select {
				width: 100%;
			}
			/deep/ .el-input__inner {
				-moz-appearance: textfield;
			}
			/deep/ .el-input__inner::-webkit-inner-spin-button,
			.el-input__inner::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
			.alert-conation-laber {
				height: 36px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				width: auto;
				min-width: 50px;
				label {
					span {
						color: red;
					}
				}
				margin-right: 12px;
			}
			.alert-conation-input {
				display: flex;
				flex: 1;
				input {
					display: flex;
					flex: 1;
					width: 100%;
					outline: none;
					border: 1px solid #d9d9d9;
					padding: 0 6px;
					overflow: hidden;
					border-radius: 3px;
				}
			}
		}
		.el-input-group__prepend {
			padding: 0 12px;
		}
		.prepend-concation {
			display: flex;
			align-items: center;
			img {
				width: 15px;
				height: 15px;
			}
			.prepend-text {
				margin-left: 6px;
			}
		}
		.el-form-item__content {
			height: 36px;
			display: flex;
			flex: auto;
			.el-select {
				width: 100%;
			}
			.el-input__inner {
				-moz-appearance: textfield;
			}
			.el-input__inner::-webkit-inner-spin-button,
			.el-input__inner::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
			.alert-conation-laber {
				height: 36px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				width: auto;
				min-width: 50px;
				label {
					span {
						color: red;
					}
				}
				margin-right: 12px;
			}
			.alert-conation-input {
				display: flex;
				flex: 1;
				input {
					display: flex;
					flex: 1;
					width: 100%;
					outline: none;
					border: 1px solid #d9d9d9;
					padding: 0 6px;
					overflow: hidden;
					border-radius: 3px;
				}
			}
		}
	}
	.dialog-footer {
	}
}
</style>
<style scoped>
input[type='number'] {
	-moz-appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
