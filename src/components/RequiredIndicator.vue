<template>
	<strong
		class="required-indicator"
	>
		*
	</strong>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.required-indicator {
	color: tokens.$rc-600;
}
</style>
