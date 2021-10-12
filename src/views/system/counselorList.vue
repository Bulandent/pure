<template>
	<div class="accountManagement">
		<div class="LayMent-table m1-margin-top-to-bottom">
			<div class="healthName">
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
					<el-table-column prop="channelType" label="类型"></el-table-column>
					<el-table-column prop="channelName" label="顾问服务名称"></el-table-column>
					<el-table-column prop="channelDesc" label="服务简介"></el-table-column>
					<el-table-column prop="buyCount" label="已购次数"></el-table-column>
					<el-table-column label="操作" width="70px" fixed="right">
						<template slot-scope="scope">
							<div class="operation">
								<div class="m1-margin-left-to-right" @click.stop="toDetail(scope.row.templateNo)">
									查看
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ChannelList',
	components: {},
	data() {
		return {
			tableData: [
				{
					id: 1,
					channelType: '企业',
					channelName: '企业常年法律顾问',
					channelDesc: '企业服务简介',
					buyCount: 102,
				},
				{
					id: 2,
					channelType: '个人',
					channelName: '个人常年法律顾问',
					channelDesc: '个人服务简介',
					buyCount: 209,
				},
			],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		toDetail(id) {
			this.$router.push({
				path: `/system/counselorDetail?id=${id}`,
			})
		},
		getList() {
			// 请求列表
		},
	},
}
</script>
<style lang="scss" scoped>
.operation {
	color: #1989fa;
	display: flex;
	div {
		cursor: pointer;
	}
}
</style>
