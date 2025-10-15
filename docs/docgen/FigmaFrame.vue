<template>
	<iframe
		class="frame-container"
		:src
		allowfullscreen
	/>
</template>

<script setup lang="ts">

defineProps<{
	src: string
}>();
</script>

<style scoped>
.frame-container {
	border: 1px solid #DFE5EC;
	border-radius: 12px;
	margin-top: 24px;
	width: 700px;
	height: 450px;
}
</style>