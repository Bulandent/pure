<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<keep-alive :include="cachedViews">
				<router-view :key="key" />
			</keep-alive>
		</transition>
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	computed: {
		cachedViews() {
			return this.$store.state.tagsView.cachedViews
		},
		key() {
			return this.$route.fullPath
		},
	},
}
</script>

<style scoped lang="scss">
.app-main {
	/*84 = navbar + tags-view = 50 +34 */
	min-height: calc(100vh - 84px);
	width: 100%;
	position: relative;
	overflow: hidden;
	padding: 24px;
	box-sizing: border-box;
}
.fixed-header + .app-main {
	padding-top: 50px;
}

.hasTagsView {
	.app-main {
		/* 84 = navbar + tags-view = 50 + 34 */
		min-height: calc(100vh - 84px);
	}

	.fixed-header + .app-main {
		padding-top: 84px;
	}
}
</style>
