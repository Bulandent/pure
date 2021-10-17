<template>
	<div class="sell-detail">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="销售信息" name="first"></el-tab-pane>
			<el-tab-pane label="邀请记录" name="third"></el-tab-pane>
			<el-tab-pane label="客户下单记录" name="four"></el-tab-pane>
			<el-tab-pane label="提成记录" name="five"></el-tab-pane>
		</el-tabs>
		<div class="sell-content">
			<div v-show="activeTab === 'first'">
				<div class="sell-statistics">
					<div class="cs-tab">
						<span
							v-for="(tab, index) in csTabList"
							:key="tab.label"
							@click="changeCsTab(index)"
							:class="{ on: index === currIndex }"
						>
							{{ tab.label }}
						</span>
					</div>
					<div class="cs-con">
						<div v-for="count in csCountList" :key="count.label">
							<label>{{ count.label }}</label>
							<div class="csc-count">
								<span>{{ count.value }}</span>
								{{ count.suffix }}
							</div>
						</div>
					</div>
				</div>
				<sell-first :is-edit="isEdit"></sell-first>
			</div>
			<div v-show="activeTab === 'third'">
				<sell-third :is-edit="isEdit"></sell-third>
			</div>
			<div v-show="activeTab === 'four'">
				<sell-four :is-edit="isEdit"></sell-four>
			</div>
			<div v-show="activeTab === 'five'">
				<sell-five :is-edit="isEdit"></sell-five>
			</div>
		</div>
	</div>
</template>

<script>
import sellFirst from './components/sellFirst.vue'
import sellThird from './components/sellThird.vue'
import sellFour from './components/sellFour.vue'
import sellFive from './components/sellFive.vue'
export default {
	name: 'ChannelDetail',
	components: {
		sellFirst,
		sellThird,
		sellFour,
		sellFive,
	},
	data() {
		return {
			sellNo: '',
			activeTab: 'first',
			isEdit: false,
			currIndex: 0,
			csTabList: [
				{ label: '全部', value: 1 },
				{ label: '今日', value: 2 },
				{ label: '昨日', value: 3 },
				{ label: '近7天', value: 4 },
				{ label: '上周', value: 5 },
				{ label: '本月', value: 6 },
				{ label: '上月', value: 7 },
			],
			csCountList: [
				{ label: '新用户注册数', value: 10, suffix: '个' },
				{ label: '企业顾问下单数', value: 10, suffix: '个' },
				{ label: '个人顾问下单数', value: 10, suffix: '个' },
			],
		}
	},
	created() {},
	methods: {
		changeCsTab(index) {
			if (index === this.currIndex) return
			this.currIndex = index
		},
	},
}
</script>

<style lang="scss" scoped>
.sell-detail {
	.sell-content {
		position: relative;
		padding: 30px 100px 0 50px;
	}
	.edit-btn {
		position: absolute;
		right: 0;
		top: 0;
		.el-icon-edit-outline {
			cursor: pointer;
			font-size: 30px;
			color: #409eff;
		}
	}
	.action-area {
		padding-top: 50px;
		text-align: center;
		button + button {
			margin-left: 30px;
		}
	}
	.sell-statistics {
		padding-bottom: 20px;
		.cs-tab {
			text-align: center;
			padding-bottom: 20px;
			span {
				color: #aaa;
				padding: 0 10px;
				cursor: pointer;
				&.on {
					color: #333;
				}
			}
		}
		.cs-con {
			display: flex;
			margin: 0 auto;
			width: 400px;
			text-align: center;
			justify-content: center;
			border-radius: 20px;
			padding: 20px 0;
			box-shadow: 1px 0px 12px 4px rgba(118, 118, 118, 0.3);
			& > div {
				width: 100px;
			}
			label {
				font-weight: 400;
				font-size: 13px;
				color: #aaa;
			}
			.csc-count {
				padding-top: 10px;
			}
			span {
				font-size: 18px;
				padding-right: 5px;
			}
		}
	}
	::v-deep {
		.el-tabs__item {
			font-size: 16px;
		}
	}
}
</style>
