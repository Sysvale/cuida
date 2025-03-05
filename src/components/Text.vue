<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<component 
		:is="as"
		ref="componentRef"
		class="text-alignment"
		:class="{'no-margin': noMargin}"
	>
		<slot />
	</component>
</template>

<script setup>
import { useTemplateRef } from 'vue';

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
