<template>
	<div class="preview-container">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
	withBackground?: boolean,
}>(), {
	withBackground: false,
});

const containerBackground = computed(() => props.withBackground ? '#F8F9FA' : 'transparent');

export type PreviewContainerType = typeof import("./PreviewContainer.vue")["default"];
</script>

<style scoped>
.preview-container {
	position: relative;
	padding: 28px;
	border: 1px solid #DFE5EC;
	background-color: v-bind(containerBackground);
	border-radius: 12px;
	margin: 16px 0;
}
</style>
