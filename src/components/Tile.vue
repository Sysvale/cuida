<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<box
		:variant="computedVariant"
		:clickable="!disabled"
		padding="0"
		light
		@box-click="handleClick"
	>
		<div class="cds-tile__extra-container">
			<div class="cds-tile__extra">
				<!-- @slot Slot para incluir conteúdo adicional no canto superior direito da tile.-->
				<slot name="extra" />
			</div>
		</div>
		<div :class="computedImageClass">
			<skeleton
				v-if="loading"
				:width="computedIconWidth"
				:height="computedIconWidth"
			/>
			<icon
				v-else-if="computedIconType === 'icon'"
				class="cds-tile__icon"
				:name="icon"
			/>
			<cds-image
				v-else
				:src="icon"
				:width="computedIconWidth"
				rounded-corners
				opacity="0.5"
			/>
		</div>
		<div
			v-if="loading"
			class="cds-tile__text--loading"
		>
			<skeleton-text
				:width="computedIconWidth"
			/>
		</div>
		<div
			v-else
			:class="computedTextClass"
		>
			{{ title }}
		</div>
	</box>
</template>

<script setup>
import { computed } from 'vue';
import variantValidator from '../utils/validators/variant';
import Box from './Box.vue';
import Icon from './Icon.vue';
import CdsImage from './Image.vue';
import Skeleton from './Skeleton.vue';
import SkeletonText from './SkeletonText.vue';

const props = defineProps({
	/**
	 * Ícone a ser exibido no componente. Caso seja um ícone do próprio cuida icons, informe apenas o nome do ícone. Também é possível informar a url do ícone.
	 */
	icon: {
		type: String,
		default: 'settings-outline',
	},
	/**
	 * Texto a ser exibido no componente.
	 */
	title: {
		type: String,
		default: '',
	},
	/**
	 * Especifica o tamanho do botão. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
	 */
	size: {
		type: String,
		default: 'md',
		validator: (value) => ['sm','md','lg'].includes(value),
	},
	/**
	 * A variante de cor. São 9 variantes implementadas: 'green', 'teal',
	 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray' e 'dark'.
	*/
	variant: {
		type: String,
		default: 'green',
		validator: variantValidator,
	},
	/**
	 * Controla o estado de desabilitação do componente.
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	 * Controla o estado de carregamento do componente.
	*/
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits([
	/**
	 * Evento que indica se a tile foi clicada.
	 * @event cdsClick
	 * @type {Event}
	*/
	'cdsClick',
]);

const computedVariant = computed(() => {
	if (props.disabled) {
		return 'disabled';
	}

	return props.variant;
});
const computedImageClass = computed(() => `cds-tile__image--${computedVariant.value} cds-tile__image--${props.size}`);
const computedTextClass = computed(() => `cds-tile__text--${computedVariant.value} cds-tile__text--${props.size}`);
const computedIconType = computed(() => (props.icon.includes('http') ? 'img' : 'icon'));
const computedIconWidth = computed(() => {
	switch (props.size) {
		case 'sm':
			return '40';
		case 'md':
			return '50';
		default:
			return '60';
	};
})

function handleClick() {
	if (props.disabled) {
		return;
	}

	emit('cdsClick');
}
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.cds-tile {
	&__image {
		background-color: $n-20;
		padding: pYX(4, 7);
		display: flex;
		align-items: center;
		justify-content: center;

		&--disabled {
			@extend .cds-tile__image;
			background-color: $n-100;
			color: $n-300;
			border-top-left-radius: 16px;
			border-top-right-radius: 16px;
		}

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .cds-tile__image;
			background-color: $shade-100;
			color: $base-color;

			@if ($color-name == 'gray' or $color-name == 'white') {
				background-color: $shade-100;
				color: $n-500;
			}
		}

		&--sm {
			.cds-tile__icon {
				width: 40px;
				height: 40px;
			}
		}

		&--md {
			.cds-tile__icon {
				width: 50px;
				height: 50px;
			}
		}

		&--lg {
			.cds-tile__icon {
				width: 60px;
				height: 60px;
			}
		}
	}

	&__text {
		text-align: center;
		@include caption;
		font-weight: $font-weight-semibold;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .cds-tile__text;
			color: $base-color;

			@if ($color-name == 'gray' or $color-name == 'white') {
				color: $n-500;
			}
		}

		&--disabled {
			@extend .cds-tile__text;
			color: $n-300;
		}

		&--loading {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: pa(2);
		}

		&--sm {
			@include overline;
			padding: pYX(2,4);
		}

		&--md {
			padding: pYX(2,7);
		}

		&--lg {
			@include body-2;
			padding: pYX(2,7);
			font-weight: $font-weight-semibold;
		}
	}

	&__extra-container {
		position: relative;
	}

	&__extra {
		margin: mt(1);
		position: absolute;
		right: spacer(2);
		z-index: 9999;
	}
}
</style>
