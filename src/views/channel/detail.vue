<template>
	<div class="channel-detail">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="渠道信息" name="first"></el-tab-pane>
			<template v-if="isDetail">
				<el-tab-pane label="下属渠道" name="second"></el-tab-pane>
				<el-tab-pane label="邀请记录" name="third"></el-tab-pane>
				<el-tab-pane label="客户下单记录" name="four"></el-tab-pane>
				<el-tab-pane label="分润记录" name="five"></el-tab-pane>
			</template>
		</el-tabs>
		<div class="channel-content">
			<div v-show="activeTab === 'first'">
				<div v-if="isDetail" class="channel-statistics">
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
				<channel-first :is-edit="isEdit"></channel-first>
			</div>
			<template v-if="isDetail">
				<div v-show="activeTab === 'second'">
					<channel-second :is-edit="isEdit"></channel-second>
				</div>
				<div v-show="activeTab === 'third'">
					<channel-third :is-edit="isEdit"></channel-third>
				</div>
				<div v-show="activeTab === 'four'">
					<channel-four :is-edit="isEdit"></channel-four>
				</div>
				<div v-show="activeTab === 'five'">
					<channel-five :is-edit="isEdit"></channel-five>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import channelFirst from './components/channelFirst.vue'
import channelSecond from './components/channelSecond.vue'
import channelThird from './components/channelThird.vue'
import channelFour from './components/channelFour.vue'
import channelFive from './components/channelFive.vue'
export default {
	name: 'ChannelDetail',
	components: {
		channelFirst,
		channelSecond,
		channelThird,
		channelFour,
		channelFive,
	},
	data() {
		return {
			channelNo: '',
			activeTab: 'first',
			isEdit: false,
			isDetail: false,
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
				{ label: '累计佣金', value: 10, suffix: '元' },
				{ label: '待结算佣金', value: 10, suffix: '元' },
				{ label: '已结算佣金', value: 10, suffix: '元' },
			],
		}
	},
	created() {
		this.isDetail = this.$route.path.includes('detail')
	},
	methods: {
		changeCsTab(index) {
			if (index === this.currIndex) return
			this.currIndex = index
		},
	},
}
</script>

<style lang="scss" scoped>
.channel-detail {
	.channel-content {
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
	.channel-statistics {
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
			width: 700px;
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
