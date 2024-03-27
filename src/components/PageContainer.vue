<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="page-container__container">
		<slot />
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.page-container__container {
	width: 100%;
	max-width: 1400px;
	margin: 0 auto;
	padding: px(6);
}
</style>
