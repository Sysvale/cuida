<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<component 
		:is="computedAs"
		ref="componentRef"
		class="text-alignment"
		:class="{
			'no-margin': noMargin,
			[`${color}`]: color,
			[`${fontWeight}`]: fontWeight,
		}"
	>
		<slot />
	</component>
</template>

<script setup>
import { computed, useTemplateRef } from 'vue';

defineOptions({ name: 'CdsText' });

const props = defineProps({
	/**
	* A tag HTML que o componente deve renderizar.
	* @values h1, h2, h3, h4, h5, h6, heading-1, heading-2, heading-3, subheading-1, subheading-2, subheading-3, p, q, span, body-1, body-2, caption, overline, strong, em, del, small, legend
	*/
	as: {
		type: String,
		default: 'span',
	},
	/**
	* Define a cor do texto. Aceita os tokes de cor do design system da shade 'neutrals'. Para cores fora da paleta neutra, utilize uma classe personalizada.
	* @values n-0, n-10, n-20, n-30, n-40, n-50, n-100, n-200, n-300, n-400, n-500, n-600, n-700, n-800, n-900
	*/
	color: {
		type: String,
		default: 'n-800',
	},
	/**
	* Define o peso da fonte.
	*/
	fontWeight : {
		type: String,
		default: 'regular',
	},
	/**
	* Define o alinhamento do texto.
	*/
	textAlign: {
		type: String,
		default: 'start',
	},
	/**
	* Remove as margens padrão de tags HTML como `p`, `h1`, `h2`, `h3`, etc.
	*/
	noMargin : {
		type: Boolean,
		default: false,
	}
});	

const componentRef = useTemplateRef('componentRef');

const computedAs = computed(() => {
	switch (props.as) {
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6':
		case 'p':
		case 'q':
		case 'span':
		case 'strong':
		case 'em':
		case 'del':
		case 'small':
		case 'legend':
			return props.as;
		case 'heading-1':
			return 'h1';
		case 'heading-2':
			return 'h2';
		case 'heading-3':
			return 'h3';
		case 'subheading-1':
			return 'h4';
		case 'subheading-2':
			return 'h5';
		case 'subheading-3':
			return 'h6';
		case 'body-1':
			return 'p';
		case 'body-2':
			return 'span';
		case 'caption':
			return 'small';
		case 'overline':
			return 'legend';
		default:
			return 'span';
	}
});

defineExpose({ componentRef });

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.text-alignment {
	text-align: v-bind(textAlign);
}

.no-margin {
	margin-top: 0;
	margin-bottom: 0;
}

.n-900 {
	color: tokens.$n-900;
}

.n-800 {
	color: tokens.$n-800;
}

.n-700 {
	color: tokens.$n-700;
}

.n-600 {
	color: tokens.$n-600;
}

.n-500 {
	color: tokens.$n-500;
}

.n-400 {
	color: tokens.$n-400;
}

.n-300 {
	color: tokens.$n-300;
}	

.n-200 {
	color: tokens.$n-200;
}

.n-100 {
	color: tokens.$n-100;
}

.n-50 {
	color: tokens.$n-50;
}

.n-40 {
	color: tokens.$n-40;
}

.n-30 {
	color: tokens.$n-30;
}

.n-20 {
	color: tokens.$n-20;
}

.n-10 {
	color: tokens.$n-10;
}

.n-0 {
	color: tokens.$n-0;
}

h1 {
	@include tokens.heading-1;
}

h2 {
	@include tokens.heading-2;
}

h3 {
	@include tokens.heading-3;
}

h4 {
	@include tokens.subheading-1;
}

h5 {
	@include tokens.subheading-2;
}

h6 {
	@include tokens.subheading-3;
}

p {
	@include tokens.body-1;
}

span {
	@include tokens.body-2;
}

small {
	@include tokens.caption;
}

legend {
	@include tokens.overline;
}

.regular {
	font-weight: tokens.$font-weight-regular;
}

.semibold {
	font-weight: tokens.$font-weight-semibold;
}

.bold {
	font-weight: tokens.$font-weight-bold;
}
</style>
