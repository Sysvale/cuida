<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="truncate__container"
	>
		<!-- @slot Slot default.-->
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Truncate',
	props: {
		/**
		* Largura do container. Define a partir de qual largura texto será truncado.
		*/
		width: {
			type: [String, Number],
			default: '20',
		}
	},

	computed: {
		widthResolver() {
			return `${this.width}px`;
		}
	},
}
</script>

<style lang="scss">
.truncate__container {
	text-overflow: ellipsis;
	max-width: v-bind(widthResolver);
	white-space: nowrap;
	overflow: hidden;
}
</style>