<template>
	<div
		class="grid"
	>
		<!-- @slot Slot com o conteúdo que você deseja que seja scrollable -->
		<slot />
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	/**
	* Define altura como 'auto' para o container até o limite máximo
	*/
	cols: {
		type: [Number, String, Array],
		default: 1,
	},
	/**
	* Torna o container scrollável horizontalmente
	*/
	rows: {
		type: [Number, String, Array],
		default: 1,
	},
	autoCols: {
		type: [Number, String, Array],
		default: 1,
	},
	/**
	* Torna o container scrollável horizontalmente
	*/
	autoRows: {
		type: [Number, String, Array],
		default: 1,
	},
	/**
	* Altura máxima do container até ser scrollado
	*/
	gap: {
		type: [Number, String],
		default: 0,
	},
	/**
	* Altura máxima do container até ser scrollado
	*/
	rowGap: {
		type: [Number, String],
		default: 0,
	},
	/**
	* Altura máxima do container até ser scrollado
	*/
	colGap: {
		type: [Number, String],
		default: 0,
	},
	/**
	* Torna o container scrollável horizontalmente
	*/
	justify: {
		type: String,
		default: 'stretch',
	},
	/**
	* Torna o container scrollável horizontalmente
	*/
	align: {
		type: String,
		default: 'stretch',
	},
});


const gapResolver = computed(() => {
	let composedGap = '';

	if (props.gap && props.gap !== 0 && props.gap !== '0') {
		return Number.isFinite(props.gap) ? `${props.gap}px` : props.gap;
	}

	if (props.rowGap) {
		if (Number.isFinite(props.rowGap)) {
			composedGap = `${props.rowGap}px`;
		} else {
			composedGap = props.rowGap;
		}
	} else {
		composedGap = '0px';
	}

	if (props.colGap) {
		if (Number.isFinite(props.colGap)) {
			composedGap += ` ${props.colGap}px`;
		} else {
			composedGap += ` ${props.colGap}`;
		}
	} else {
		composedGap += ' 0px';
	}

	return composedGap;
});

const gridResolver = (element) => {
	if (Array.isArray(element)) {
		return element.reduce((acc, curr) => `${acc} ${curr}`);
	}

	if (Number.isFinite(element)) {
		return `${(element + 'fr ').repeat(element)}`;
	}

	return `${element}`;
}

const gridTemplateColumnsResolver = computed(() => {
	return gridResolver(props.cols);
});

const gridTemplateRowsResolver = computed(() => {
	return gridResolver(props.rows);
});

const gridAutoColsResolver = computed(() => {
	return gridResolver(props.autoCols);
});

const gridAutoRowsResolver = computed(() => {
	return gridResolver(props.autoRows);
});
	
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.grid {
	align-items: v-bind(align);
	display: grid;
	gap: v-bind(gapResolver);
	grid-auto-columns: v-bind(gridAutoColsResolver);
	grid-auto-rows: v-bind(gridAutoRowsResolver);
	grid-template-columns: v-bind(gridTemplateColumnsResolver);
	grid-template-rows: v-bind(gridTemplateRowsResolver);
	justify-items: v-bind(justify);
}
</style>
