<template>
	<div class="ComTable" v-if="Array_tableData && Array_tableData.length > 0">
		<el-table
			:data="Array_tableData"
			:cell-style="
				() => {
					return 'color:#7F7F7F'
				}
			"
			header-row-class-name="updatecolumn"
		>
			<el-table-column
				v-for="item in Array_tableData_for"
				:key="item.id"
				:prop="item.prop"
				:label="item.label"
				:width="item.width"
				:align="item.align"
			></el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'ComTable',
	props: {
		Array_tableData_for: {
			default: () => [],
			type: Array,
		},
		Array_tableData: {
			default: () => [],
			type: Array,
		},
	},
	data() {
		return {
			fit_type: false,
		}
	},
	mounted() {},
	methods: {
		getData(arr, e, index) {
			console.log(arr[index][e.data])
			return arr[e.data]
		},
	},
}
</script>

<style scoped lang="scss">
.ComTable {
}
</style>
<style scoped>
.ComTable >>> .updatecolumn {
	color: black;
	font-size: 16px;
}
.ComTable >>> .updatecolumn th {
	font-weight: 500;
}
</style>
