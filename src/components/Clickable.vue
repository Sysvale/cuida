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
		@click.stop="$emit('cds-click', true)"
	>
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Ativa ou desativa o clique no componente
		 */
		clickable: {
			type: Boolean,
			default: false,
		}
	}
}
</script>

<style lang="scss">
.clickable__container {
	width: fit-content;

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