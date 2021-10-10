<template>
	<div class="submitBtn">
		<el-row>
			<el-col :span="12">
				<div class="submitConcation">
					<div class="submitBtn-left">
						<button>重置</button>
					</div>
					<div class="submitBtn-right">
						<el-radio-group v-model="radio">
							<el-radio :label="3">备选项</el-radio>
							<el-radio :label="6">备选项</el-radio>
							<el-radio :label="9">备选项</el-radio>
						</el-radio-group>
						<button>确定</button>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			radio: 3,
		}
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
$fontSize: 14px;
.submitBtn {
	.submitConcation {
		display: flex;
		justify-content: space-between;
		.submitBtn-left {
			button {
				background-color: #f39c12;
				cursor: pointer;
				box-sizing: border-box;
				&:hover {
					background-color: #e08e0b;
				}
			}
		}
		.submitBtn-right {
			/deep/ .el-radio {
				margin-right: 12px;
			}
			/deep/ .el-radio__input.is-checked + .el-radio__label {
				color: unset;
			}
			/deep/ .el-radio__input.is-checked .el-radio__inner {
				background-image: url('../../assets/common/correct.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				border-color: unset;
			}
			/deep/.el-radio__inner {
				background: none;
				border-radius: 0;
				&::after {
					background: none;
				}
			}
			button {
				background-color: #3c8dbc;
				color: white;
				cursor: pointer;
				box-sizing: border-box;
				margin-left: 12px;
				&:hover {
					background-color: #367fa9;
					box-sizing: border-box;
					border: 1px solid #204d74;
				}
			}
		}
	}
	div {
		button {
			outline: none;
			padding: 6px 12px;
			font-size: $fontSize;
			color: white;
			border-radius: 5px;
			border: 1px solid;
			box-sizing: border-box;
		}
	}
}
</style>
