<template>
	<div class="counselor-detail">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="服务设置" name="first"></el-tab-pane>
			<el-tab-pane label="服务说明" name="second"></el-tab-pane>
			<el-tab-pane label="可选包" name="third"></el-tab-pane>
		</el-tabs>
		<div class="counselor-content">
			<div v-if="!isEdit" class="edit-btn">
				<i @click="isEdit = !isEdit" class="el-icon-edit-outline"></i>
			</div>
			<div v-show="activeTab === 'first'">
				<counselor-first :is-edit="isEdit"></counselor-first>
			</div>
			<div v-show="activeTab === 'second'">
				<counselor-second :is-edit="isEdit"></counselor-second>
			</div>
			<div v-show="activeTab === 'third'">
				<counselor-third :is-edit="isEdit"></counselor-third>
			</div>
		</div>
	</div>
</template>

<script>
import counselorFirst from './components/counselorFirst.vue'
import counselorSecond from './components/counselorSecond.vue'
import counselorThird from './components/counselorThird.vue'
export default {
	name: 'CounselorDetail',
	components: {
		counselorFirst,
		counselorSecond,
		counselorThird,
	},
	data() {
		return {
			counselorNo: '',
			activeTab: 'first',
			isEdit: false,
		}
	},
	created() {
		this.isDet
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
.counselor-detail {
	.counselor-content {
		position: relative;
		padding: 40px 100px 0 50px;
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
}
</style>
