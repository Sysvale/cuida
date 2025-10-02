<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="page-container__container">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'CdsPageContainer',
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.page-container__container {
	width: 100%;
	max-width: 1600px;
	margin: 0 auto;
	padding: tokens.pa(6);
}
</style>
