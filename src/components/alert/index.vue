<template>
	<div class="Alt" :class="{ 'active-Mask': showMask }" v-if="alert_default_show">
		<div class="alt-contaion">
			<!-- 标题 -->
			<div class="alt-contaion-title">
				<div v-if="alert_default_title">{{ alert_default_title }}</div>
				<img @click.stop="closeAlert" src="../../assets/alert/alert-close.png" />
			</div>
			<!-- 图片 -->
			<div class="alt-contaion-img">
				<img :src="type ? alert_default_suc_img : alert_default_ero_img" />
			</div>

			<!-- 提示内容 -->
			<div class="title">{{ type ? alert_success_text : alert_error_text }}</div>
			<div class="active-margin sub-title" v-if="alert_default_subtitle">
				{{ alert_default_subtitle }}
			</div>

			<!-- 备注 -->
			<div v-if="alert_default_remarks" class="alt-contaion-remarks active-margin">
				{{ alert_default_remarks }}
			</div>
			<div v-if="close_alert" class="alt-contaion-close-time active-margin">
				{{ closeTime }}秒后自动关闭
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		// showMask 是否显示遮罩
		showMask: {
			default: false,
			type: Boolean,
		},
		//类型 为真显示成功图标 为假显示失败图标
		type: {
			default: true,
			type: Boolean,
		},
		//alert_default_close_time  自动关闭的时间 默认3s
		alert_default_close_time: {
			default: 3000,
			type: Number,
		},
		// alert_success_text
		alert_success_text: {
			default: '操作成功',
			type: String,
		},
		alert_error_text: {
			default: '操作失败',
			type: String,
		},
		//  alert_default_remarks     是否显示操作完成自动关闭
		alert_default_remarks: {
			default: false,
			type: Boolean,
		},
		//标题内容
		alert_default_title: {
			default: '',
			type: String,
		},
		//副标题
		alert_default_subtitle: {
			default: '',
			type: String,
		},
		//alert_default_ero_img 失败icon
		alert_default_ero_img: {
			default: require('@/assets/alert/operation-ero.png'),
			type: String,
		},
		//alert_default_suc_img 成功icon
		alert_default_suc_img: {
			default: require('@/assets/alert/operation-suc.png'),
			type: String,
		},
		close_alert: {
			//是否自动关闭
			default: false,
			type: Boolean,
		},
	},
	data() {
		return {
			suc_img: '',
			alert_default_show: true,
			// close_alert:false
			closeTime: 3,
		}
	},
	mounted() {
		if (this.close_alert) {
			this.handleCloseTime()
		}
	},
	methods: {
		closeAlert() {
			this.alert_default_show = false
			this.$emit('closeAlert')
		},
		handleCloseTime() {
			let stavl = setInterval(() => {
				this.closeTime = this.closeTime - 1
				if (this.closeTime <= 0) {
					clearInterval(stavl)
					this.alert_default_show = false
					this.$emit('closeAlert')
					return
				}
			}, 1000)
		},
	},
}
</script>

<style lang="scss" scoped>
.Alt {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.5);
	.alt-contaion {
		padding: 24px;
		position: absolute;
		width: auto;
		height: auto;
		min-width: 400px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #ffffff;
		text-align: center;
		border-radius: 5px;
		.alt-contaion-title {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 35px;
				height: 35px;
				position: absolute;
				right: 10px;
				cursor: pointer;
			}
		}
		.alt-contaion-img {
			margin-bottom: 12px;
			img {
				width: 90px;
				height: 90px;
			}
		}
		.sub-title {
			color: #b6a1aa;
		}
		.sub-title {
			font-size: 14px;
			color: #b6a1aa;
		}
		.alt-contaion-close-time {
			color: grey;
			font-size: 13px;
		}
	}
}
</style>
<style scoped>
.active-Mask {
}
.active-margin {
	padding: 12px 0;
}
</style>
