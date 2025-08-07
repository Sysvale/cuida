<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<!--
		Evento emitido quando o wrapper é clicado
		@event cds-click
		@type {Event}
	-->
	<div
		:class="{
			'clickable__container--clickable': clickable,
			'clickable__container--not-clickable': !clickable,
		}"
		@click="$emit('cds-click', true)"
	>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Clickable',
	props: {
		/**
		 * Ativa ou desativa o clique no componente
		 */
		clickable: {
			type: Boolean,
			default: false,
		},
		/**
		 * Permite que o clickable se expanda de forma fluida
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	computed: {
		widthResolver() {
			return this.fluid ? '100%' : 'fit-content';
		},
	},
}
</script>

<style lang="scss">
.clickable__container {
	width: v-bind(widthResolver);

	&--clickable {
		@extend .clickable__container;
		cursor: pointer;
	}

	&--not-clickable {
		@extend .clickable__container;
		cursor: default;
	}
}
</style>