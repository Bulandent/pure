<template>
	<div class="dashboard-container">
		首页
		<div>
			<!-- <common-table :ob="ob" :ob_title="ob_title"></common-table> -->
			<!-- <confirm-admin :Alert_Data="Alert_Data" @uploadFile="uploadFile" ref="confirm-admin"></confirm-admin> -->
			<!-- <alert-admin ref="alert-admin" :showMask="true"></alert-admin> -->
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
// import CommonTable from '@/components/ComTable'
// import ConfirmAdmin from '@/components/confirm'
// import AlertAdmin from '@/components/alert'

export default {
	name: 'Dashboard',
	components: {
		// CommonTable,
		// ConfirmAdmin,
		// AlertAdmin,
	},
	data() {
		return {
			currentRole: 'adminDashboard',
		}
	},
	computed: {
		...mapGetters(['roles']),
	},
	mounted() {},
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
	padding: 32px;
	background-color: rgb(240, 242, 245);
}
</style>
