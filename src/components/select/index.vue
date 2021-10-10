<template>
	<div class="Components-select">
		<div
			class="select-2 m1-padding-right-to-left"
			:class="ClassStyle"
			v-for="item in options"
			:key="item"
		>
			<el-select v-model="item.value" placeholder="请选择类型" class="select-default active-margin">
				<el-option
					v-for="opt in options1"
					:key="opt.value"
					:label="opt.label"
					:value="opt.value"
				></el-option>
			</el-select>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		options: {
			default: () => {},
			type: Object,
		},
		ClassStyle: {
			default: '',
			type: String,
		},
	},
}
</script>

<style lang="scss" scoped></style>
