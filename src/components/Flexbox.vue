<template>
	<component
		:is="tag"
		class="flexbox"
	>
		<!-- @slot Slot com o conteúdo interno do FlexBox -->
		<slot />
	</component>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'CdsFlexbox' });

const props = defineProps({
	/**
	* Define a direção dos itens dentro do FlexBox. 
	* Valores aceitos: 'row', 'row-reverse', 'column', 'column-reverse'.
	* @values row, row-reverse, column, column-reverse
	*/
	direction: {
		type: String,
		default: 'row',
	},
	/**
	* Controla o comportamento de quebra de linha dos itens no FlexBox.
	* Valores aceitos: 'nowrap', 'wrap', 'wrap-reverse'.
	* @values nowrap, wrap, wrap-reverse
	*/
	wrap: {
		type: String,
		default: 'wrap',
	},
	/**
	* Define o espaçamento entre os itens no FlexBox. 
	* O valor setado é multiplicado por 4, assim como nos tokens scss do Cuida.
	* O valor padrão é 0, mas pode ser configurado para outros valores numéricos ou strings.
	*/
	gap: {
		type: [Number, String],
		default: 0,
	},
	/**
	* Controla a distribuição dos itens ao longo do eixo principal. 
	* Valores aceitos: 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'.
	* @values flex-start, flex-end, center, space-between, space-around, space-evenly
	*/
	justify: {
		type: String,
		default: 'flex-start',
	},
	/**
	* Define o alinhamento dos itens ao longo do eixo transversal.
	* Valores aceitos: 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'.
	* @values stretch, flex-start, flex-end, center, baseline
	*/
	align: {
		type: String,
		default: 'stretch',
	},
	/**
	* Define a tag que o componente deve utilizar na sua renderização. Valores aceitos: 'div', 'span', 'main', 'footer',
	* 'form', 'header', 'aside', 'ul',  e 'li'.
	* Por padrão o componente renderiza uma div.
	* @values div, span, main, footer, form, header, aside, ul, li
	*/
	tag: {
		type: String,
		default: 'div',
		validator: (value) => ['div', 'span', 'main', 'footer', 'form', 'header', 'aside', 'ul', 'li'].includes(value),
	},
	/**
	* Quando true, o flexbox irá ocupar 100% da largura disponível.
	*/
	fluid: {
		type: Boolean,
		default: false,
	},
});

const gapAsStringResolver = (gap) => {
	const match = gap.match(/^(\d+(\.\d+)?)(.*)$/);

	if (!match) {
		return null;
	}

	if (!match[3]) {
		return match ? `${(parseFloat(match[1]) * 4)}px` : null
	}

	return gap;
};

const gapResolver = computed(() => {
	let composedGap = '';

	if (props.gap && props.gap !== 0 && props.gap !== '0') {
		return Number.isFinite(props.gap) ? `${props.gap * 4}px` : gapAsStringResolver(props.gap);
	}

	if (props.rowGap) {
		if (Number.isFinite(props.rowGap)) {
			composedGap = `${props.rowGap * 4}px`;
		} else {
			composedGap = gapAsStringResolver(props.rowGap);
		}
	} else {
		composedGap = '0px';
	}

	if (props.colGap) {
		if (Number.isFinite(props.colGap)) {
			composedGap += ` ${props.colGap * 4}px`;
		} else {
			composedGap += ` ${gapAsStringResolver(props.colGap)}`;
		}
	} else {
		composedGap += ' 0px';
	}

	return composedGap;
});

// NOTE: O valor de fallback foi alterado de 'fit-content' para 'auto' para corrigir problemas
// de layout introduzidos após a adição da prop 'fluid'. Caso o uso de 'fit-content' seja necessário
// novamente no futuro, considerar a criação de uma nova prop mais genérica para controle de largura.
const fluidResolver = computed(() => {
	return props.fluid ? '100%' : 'auto';
});
	
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.flexbox {
	align-items: v-bind(align);
	display: flex;
	gap: v-bind(gapResolver);
	justify-content: v-bind(justify);
	flex-direction: v-bind(direction);
	flex-wrap: v-bind(wrap);
	width: v-bind(fluidResolver);
}
</style>
