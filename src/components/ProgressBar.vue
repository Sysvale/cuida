<template>
	<div
		class="progress-bar"
		:class="textLeft ? 'progress-bar__left' : ''"
	>
		<span
			v-if="showText"
			class="progress-bar__text"
		>
			<!-- @slot Slot padrão da progressBar. Pode ser utilizado para sobrescrever o valor de progresso. -->
			<slot>
				{{ formatedvalue }}
			</slot>
		</span>

		<div
			class="progress-bar__content"
		>
			<div
				:class="`progress-bar__indicator--${variant}`"
				:style="progressIndicatorStyle"
			/>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import sassColorVariables from '../assets/sass/tokens/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

defineOptions({ name: 'CdsProgressBar' });

/**
 * A variante de cor. São 9 variantes implementadas: 'green', 'teal', 'turquoise',
 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' e 'amber'.
 */
const props = defineProps({
	variant: {
		type: String,
		default: 'green',
	},
	/**
	 * Define o indicador de progresso da ProgressBar.
	 */
	value: {
		type: Number,
		default: 0,
		required: true,
	},
	/**
	 * Define se a porcentagem vai ser mostrada.
	 */
	showText: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	* Quando true, dispõe o texto à direita.
	*/
	textAside: {
		type: Boolean,
		default: false,
	},
	/**
	* Quando true, dispõe o texto à esquerda.
	*/
	textLeft: {
		type: Boolean,
		default: false,
	},
	/**
	* Ativa shades na progressBar que mudam com o value.
	* Aceita valores de 1 a 5, indicando a quantidade de gradações (shades) aplicadas
	*/
	shadeSteps: {
		type: Number,
		default: 1,
		validator: (value) => value <= 5 && value >= 1
	}
});

const indicatorColor = ref('#2db981');

const formatedvalue = computed(() => {
	return `${parseInt(props.value * 100, 10)}%`;
});

const palete = computed(() => paleteBuilder(sassColorVariables.palete));

const progressIndicatorStyle = computed(() => {
	return {
		'--width': formatedvalue.value,
		'--leftMargin': props.textAside ? '3' : '10',
		'--bottomMargin': props.textAside ? '10' : '2',
	};
});

const textDirection = computed(() => {
	return props.textAside && props.textLeft
		? 'row'
		: props.textAside
			? 'row-reverse'
			: 'column'
});

watch(() => props.value, () => {
	const filteredPallete = palete.value.filter((color) => color.variantName.toLowerCase() === props.variant)
	const colors = filteredPallete[0].colorShades.slice(2, filteredPallete[0].colorShades.length);
	const sanitizedShadeSteps = props.shadeSteps <= 5 && props.shadeSteps >= 1 ? props.shadeSteps : 5;
	
	if (props.shadeSteps === 1) return indicatorColor.value = colors[2];

	const scale = 100 / sanitizedShadeSteps;
	const normalizedValue = props.value * 100;

	const index = Math.floor(normalizedValue / scale) === sanitizedShadeSteps
		? sanitizedShadeSteps - 1 
		: Math.floor(normalizedValue / scale);

	indicatorColor.value = colors[index];

}, { immediate : true });
</script>

<style lang="scss" scoped>
@use './../assets/sass/tokens/index' as tokens;

.progress-bar {
	align-items: center;
	display: flex;
	flex-direction: v-bind(textDirection);

	&__content {
		background-color: tokens.$n-40;
		border-radius: tokens.$border-radius-extra-large;
		height: 7px;
		width: 100%;
	}

	&__indicator {
		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: v-bind(indicatorColor);
			border-radius: tokens.$border-radius-extra-large;
			height: 7px;
			width: var(--width);
		}
	}

	&__text--aside {
		font-weight: tokens.$font-weight-semibold;
		margin: tokens.ml(3);
	}

	&__text {
		font-weight: tokens.$font-weight-semibold;
		margin: tokens.mb(2);
	}

	&__left {
		align-items: initial;
	}
}
</style>
