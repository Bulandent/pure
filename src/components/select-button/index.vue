<template>
	<div class="invoice-list">
		<div class="top-table" v-if="coms_data && coms_data.length > 0">
			<button
				:class="{
					'active-select-button': select_type == index,
					'active-border': index + 1 == coms_data.length,
				}"
				v-for="(item, index) in coms_data"
				:key="item.name"
				@click.stop="selectClick(item, index)"
			>
				<!-- :is-dot="item.showDot" -->
				<el-badge :is-dot="item.showDot" class="item">{{ item.name }}</el-badge>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		//select_type: 当前点击的索引 或者初始化的索引 从零开始 如需转化请在父组件+1
		select_type: {
			default: 0,
			type: Number,
		},
		//coms_data 需要遍历的tab  showDot为true则显示右上角小数点
		coms_data: {
			default: () => [],
			type: Array,
		},
	},
	methods: {
		selectClick(e, index) {
			this.$emit('sendCanback', index, e.other ? e.other : '')
		},
	},
}
</script>

<style lang="scss" scoped>
.active-select-button {
	background-color: #304156 !important;
	color: white !important;
	font-weight: bold;
}
.invoice-list {
	.top-table {
		button {
			width: 100px;
			height: 45px;
			outline: none;
			cursor: pointer;
			border-top: 1px solid #304156;
			border-left: 1px solid #304156;
			border-bottom: 1px solid #304156;
			background-color: #ffffff;
			color: #aaaaaa;
			border-right: none;
		}
	}
}
</style>
<style scoped>
.active-border {
	border-right: 1px solid #304156 !important;
}
</style>
