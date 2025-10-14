<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		:class="predefinedStyle"
	>
		<div
			:class="{
				'badge__content--sm': size === 'sm',
				'badge__content--md': size === 'md',
				'badge__content--lg': size === 'lg',
			}"
		>
			<!--
				Evento que indica se a Badge foi clicada
				@event click
				@type {Event}
			-->
			<CdsClickable
				v-if="clickable"
				@click.stop="$emit('click', true)"
			>
				<!-- @slot Slot padrão utilizado para exibir o conteúdo dentro da badge -->
				<slot />
			</CdsClickable>

			<slot v-else />
		</div>
	</div>
</template>

<script>
import CdsClickable from './Clickable.vue'

export default {
	name: 'CdsBadge',
	components: {
		CdsClickable,
	},

	props: {
		/**
		* A variante de cor. São 10 variantes:
		* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
		*/
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		* Especifica o tamanho da badge. São 3 tamanhos implementados.
		* @values sm, md, lg
		*/
		size: {
			type: String,
			default: 'md',
		},
		/**
		 * Especifica o tamanho da badge. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		clickable: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			predefinedColors: [
				'green',
				'teal',
				'turquoise',
				'blue',
				'indigo',
				'violet',
				'pink',
				'red',
				'orange',
				'amber',
				'gray',
				'white',
			],
			predefinedSizes: [
				'sm',
				'md',
				'lg',
			],
		};
	},

	computed: {
		predefinedStyle() {
			let dynamicClass = this.clickable ? 'badge__container--clickable ' : 'badge__container ';

			if (this.predefinedColors.indexOf(this.variant) > -1) {
				dynamicClass += `badge--${this.variant}`;
			}

			if (this.predefinedSizes.indexOf(this.size) > -1) {
				dynamicClass += ` badge--${this.size}`;
			}

			return dynamicClass;
		},
	},
};
</script>
<style lang="scss" scoped>
@use 'sass:color';
@use '../assets/sass/tokens/index' as tokens;

.badge {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
		cursor: default;

		&--clickable {
			@extend .badge__container;
			cursor: pointer;

			div {
				cursor: pointer;
			}
		}
	}

	&--sm {
		padding: tokens.pYX(1, 2);
	}

	&--md {
		padding: tokens.pYX(1, 2);
	}

	&--lg {
		padding: tokens.pYX(1, 3);
	}

	&__content {
		&--sm {
			@include tokens.overline;
		}

		&--md {
			@include tokens.caption;
			font-weight: tokens.$font-weight-semibold;
		}

		&--lg {
			@include tokens.button-1;
			font-weight: tokens.$font-weight-semibold;
		}
	}

	@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		color: color.adjust($shade-500, $lightness: -4%);
		background-color: $shade-100;
	}

	&--amber {
		color: tokens.$al-700;
		background-color: tokens.$al-100;
	}

	&--gray {
		color: tokens.$n-600;
		background-color: tokens.$n-20;
	}

	&--white {
		color: tokens.$n-600;
		background-color: tokens.$n-0;
		outline: 1px solid tokens.$n-50;
	}
}
</style>
