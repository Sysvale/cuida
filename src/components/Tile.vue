<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<box
		:variant="computedBoxVariant"
		:clickable="!disabled"
		padding="0"
		light
		@box-click="handleClick"
	>
		<div
			v-if="!loading"
			class="cds-tile__extra-container"
		>
			<div class="cds-tile__extra">
				<!-- @slot Slot para incluir conteúdo adicional no canto superior direito da tile.-->
				<slot name="extra" />
			</div>
		</div>
		<div
			v-if="loading"
			:class="computedLoaderClass"
		>
			<Skeleton fluid	/>
		</div>
		<div v-else>
			<div :class="computedImageClass">
				<icon
					v-if="computedIconType === 'icon'"
					class="cds-tile__icon"
					:name="icon"
				/>
				<CdsImage
					v-else
					:src="icon"
					:width="computedIconWidth"
					rounded-corners
					opacity="0.5"
				/>
			</div>
			<div :class="computedTextClass">
				{{ truncatedTitle }}
			</div>
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

defineOptions({ name: 'CdsTile' });

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
	 * @values sm, md, lg
	 */
	size: {
		type: String,
		default: 'md',
		validator: (value) => ['sm','md','lg'].includes(value),
	},
	/**
	* A variante de cor. São 10 variantes:
	* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
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

const computedBoxVariant = computed(() => (props.loading ? 'gray' : computedVariant.value));
const computedLoaderClass = computed(() => `cds-tile__loader--${props.size}`);
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
const truncatedTitle = computed(() => {
	const length = props.size === 'sm' ? 30 : 20;
	return props.title.length > length ? props.title.substring(0, length) + '...' : props.title;
});

function handleClick() {
	if (props.disabled || props.loading) {
		return;
	}

	emit('cdsClick');
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.cds-tile {
	&__image {
		background-color: tokens.$n-20;
		padding: tokens.pYX(4, 7);
		display: flex;
		align-items: center;
		justify-content: center;

		&--disabled {
			@extend .cds-tile__image;
			background-color: tokens.$n-100;
			color: tokens.$n-300;
			border-top-left-radius: 16px;
			border-top-right-radius: 16px;
		}

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .cds-tile__image;
			background-color: $shade-100;
			color: $base-color;

			@if ($color-name == 'gray' or $color-name == 'white') {
				background-color: $shade-100;
				color: tokens.$n-500;
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
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px !important;
		@include tokens.caption;
		font-weight: tokens.$font-weight-semibold;
		flex-wrap: true;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .cds-tile__text;
			color: $base-color;

			@if ($color-name == 'gray' or $color-name == 'white') {
				color: tokens.$n-500;
			}
		}

		&--disabled {
			@extend .cds-tile__text;
			color: tokens.$n-300;
		}

		&--sm {
			@include tokens.overline;
			padding: tokens.pYX(2,4);
			max-width: 96px;
		}

		&--md {
			padding: tokens.pYX(2,7);
			max-width: 106px;
		}

		&--lg {
			@include tokens.body-2;
			padding: tokens.pYX(2,7);
			font-weight: tokens.$font-weight-semibold;
			max-width: 116px;
		}
	}

	&__extra-container {
		position: relative;
	}

	&__extra {
		margin: tokens.mt(1);
		position: absolute;
		right: tokens.spacer(2);
		z-index: 9999;
	}

	&__loader {
		&--sm {
			width: 96px;
			height: 102px;
		}

		&--md {
			width: 106px;
			height: 114px;
		}

		&--lg {
			width: 116px;
			height: 126px;
		}
	}
}
</style>
