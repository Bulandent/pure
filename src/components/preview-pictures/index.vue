<template>
	<div class="preview-pictures" @click="closePictures">
		<div class="preview-pictures-concation">
			<div class="preview-pictures-imgaes" v-if="pwps_imgage && pwps_imgage.length > 0">
				<el-carousel :autoplay="false" indicator-position="none">
					<el-carousel-item v-for="item in pwps_imgage" :key="item.url">
						<div class="ovscroll" v-if="getImage(item.url)">
							<img :src="getImage(item.url)" />
							<el-button
								class="downImage"
								@click.stop="downloadFile(item.url, item.name)"
								type="primary"
							>
								下载图片
							</el-button>
						</div>
						<!-- <div class="ovscroll" v-if="getImageUrl(item)==1">
                            <img :src="getImageUrl1(item)" @click.stop.prevent="ss" />
                        </div> -->
						<!-- <div class="ovscroll" v-else>
                            <pdf :src="getImageUrl(item)"></pdf>
                        </div> -->
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>
		<div v-if="showPDF"></div>
	</div>
</template>

<script>
//import pdf from 'vue-pdf'
import { base64ToBlob } from '@/api/custom/utils'

export default {
	components: {
		//pdf,
	},
	props: {
		pwps_imgage: {
			default: () => [],
			type: Array,
		},
		pwps_imgage_name: {
			default: '',
			type: String,
		},
	},
	data() {
		return {
			showPDF: false,
		}
	},
	methods: {
		getImage(url) {
			let str = url.substr(url.lastIndexOf('.') + 1, url.length)
			if (str == 'pdf') {
				window.open(url)
				this.$parent.showPictures = false
				return
				// return pdf.createLoadingTask(url)
			}
			return url
		},
		getImageUrl(url) {
			let str = url.substr(url.lastIndexOf('.') + 1, url.length)
			if (str == 'pdf') {
				// window.open(url)
				// this.$parent.showPictures = false
				return pdf.createLoadingTask(url)
			} else {
				return 1
			}
		},
		getImageUrl1(url) {
			return url
		},
		downloadFile(url, name) {
			let Data = {
				path: url,
			}
			base64ToBlob(Data)
				.then(res => {
					this.downloadFileByBase64(res.data, name)
				})
				.catch(err => {
					this.$message({
						type: 'error',
						message: err.msg || '稍后重试!',
					})
				})
		},
		downloadFileByBase64(base64, name = '') {
			if (!base64) return
			var myBlob = this.dataURLtoBlob('data:image/png;base64,' + base64)
			var myUrl = URL.createObjectURL(myBlob)
			this.download(myUrl, name)
		},
		dataURLtoBlob(dataurl) {
			var arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n)
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n)
			}
			return new Blob([u8arr], { type: mime })
		},
		download(url, name = '') {
			var a = document.createElement('a')
			a.setAttribute('href', url)
			a.setAttribute('download', name)
			a.setAttribute('target', '_blank')
			let clickEvent = document.createEvent('MouseEvents')
			clickEvent.initEvent('click', true, true)
			a.dispatchEvent(clickEvent)
		},
		closePictures() {
			this.$parent.showPictures = false
		},
	},
}
</script>

<style lang="scss" scoped>
.preview-pictures {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
	.preview-pictures-concation {
		position: relative;
		width: 100%;
		height: 100%;
		.preview-pictures-imgaes {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 780px;
			height: 100%;
			padding: 10% 0;
			.ovscroll {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				height: auto;
				overflow: scroll;
				// display: grid;
				// align-items: center;
				// justify-content: center;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: center;
				.downImage {
					margin-top: 12px;
					font-size: 14px;
				}
				img {
					height: auto;
					pointer-events: none;
					width: 100%;
				}
			}
			.ovscroll::-webkit-scrollbar {
				/*滚动条整体样式*/
				width: 0; /*高宽分别对应横竖滚动条的尺寸*/
				height: 0;
			}
			.ovscroll::-webkit-scrollbar-thumb {
				/*滚动条里面小方块*/
				border-radius: 10px;
				box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
				background: #535353;
			}
			.ovscroll::-webkit-scrollbar-track {
				/*滚动条里面轨道*/
				box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
				border-radius: 10px;
				background: #ededed;
			}
			/deep/ .el-carousel__container {
				height: 100%;
				width: 100%;
			}
			/deep/ .el-carousel__item {
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
			}
			/deep/ .el-carousel {
				height: 100%;
			}
		}
	}
}
</style>
