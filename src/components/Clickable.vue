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
		:role="clickable ? 'button' : undefined"
		:tabindex="clickable ? 0 : undefined"
		@click="handleClick"
		@keydown.enter.prevent="handleClick"
		@keydown.space.prevent="handleClick"
	>
		<!-- @slot Slot default.-->
		<slot />
	</div>
</template>

<script>
export default {
	name: 'CdsClickable',
	emits: ['cds-click'],
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

	methods: {
		handleClick() {
			if (this.clickable) {
				this.$emit('cds-click', true);
			}
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