<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<component 
		:is="computedAs"
		ref="componentRef"
		class="text-alignment"
		:class="{'no-margin': noMargin}"
	>
		<slot />
	</component>
</template>

<script setup>
import { computed, useTemplateRef } from 'vue';

const props = defineProps({
	/**
	* A tag HTML que o componente deve renderizar.
	*/
	as: {
		type: String,
		default: 'span',
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
@import '../assets/sass/tokens.scss';

.text-alignment {
	text-align: v-bind(textAlign);
}

.no-margin {
	margin-top: 0;
	margin-bottom: 0;
}

h1 {
	@include heading-1;
}

h2 {
	@include heading-2;
}

h3 {
	@include heading-3;
}

h4 {
	@include subheading-1;
}

h5 {
	@include subheading-2;
}

h6 {
	@include subheading-3;
}

p {
	@include body-1;
}

span {
	@include body-2;
}

small {
	@include caption;
}

legend {
	@include overline;
}
</style>
