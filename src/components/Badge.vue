<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="badge__container"
		:class="predefinedStyle"
	>
		<div
			:class="{
				'badge__content--sm': size === 'sm',
				'badge__content--md': size === 'md',
				'badge__content--lg': size === 'lg',
			}"
		>
			<cds-clickable
				v-if="clickable"
				@click="$emit('click', true)"
			>
				<!-- @slot Slot padrão utilizado para exibir o conteúdo dentro da badge -->
				<slot />
			</cds-clickable>

			<slot v-else />
		</div>
	</div>
</template>

<script>
import CdsClickable from './Clickable.vue'

export default {
	components: {
		CdsClickable,
	},

	props: {
		/**
		 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		 * Especifica o tamanho da badge. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
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
			let dynamicClass = '';

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
@import '../assets/sass/tokens.scss';

.badge {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
		cursor: default;
	}

	&--sm {
		padding: pYX(1, 2);
	}

	&--md {
		padding: pYX(1, 2);
	}

	&--lg {
		padding: pYX(1, 3);
	}

	&__content {
		&--sm {
			@include overline;
		}

		&--md {
			@include caption;
			font-weight: $font-weight-semibold;
		}

		&--lg {
			@include button-1;
			font-weight: $font-weight-semibold;
		}
	}

	@include variantResolver using ($color-name, $base-color, $disabled, $muted, $dimed, $background, $hover, $text) {
		color: darken($hover, 4%);
		background-color: $dimed;
	}

	&--amber {
		color: $al-700;
		background-color: $al-100;
	}

	&--gray {
		color: $n-600;
		background-color: $n-20;
	}

	&--white {
		color: $n-600;
		background-color: $n-0;
		outline: 1px solid $n-50;
	}
}
</style>
