<template>
	<div
		class="grid-item"
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
	colSpan: {
		type: [Number, String],
		default: 'auto',
	},
	/**
	* Torna o container scrollável horizontalmente
	*/
	rowSpan: {
		type: [Number, String],
		default: 'auto',
	},
	/**
	* Define altura como 'auto' para o container até o limite máximo
	*/
	colStart: {
		type: [Number, String],
		default: 'auto',
	},
	/**
	* Torna o container scrollável horizontalmente
	*/
	rowStart: {
		type: [Number, String],
		default: 'auto',
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
	* Altura máxima do container até ser scrollado
	*/
	subGrid: {
		type: Boolean,
		default: false,
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

const columnResolver = computed(() => {
	if (!props.colSpan && !props.colStart)  {
		return 'auto';
	}

	const start = props.colStart ? props.colStart : 1;
	const span = props.colSpan ? `span ${props.colSpan}` : 1;
	
	return `${start} / ${span}`;
});

const rowResolver = computed(() => {
	if (!props.rowSpan && !props.rowStart)  {
		return 'auto';
	}

	const start = props.rowStart ? props.rowStart : 1;
	const span = props.rowSpan ? `span ${props.rowSpan}` : 1;
	
	return `${start} / ${span}`;
});

const displayResolver = computed(() => {
	return props.subGrid ? 'grid' : 'block';
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

</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.grid-item {
	align-self: v-bind(align);
	display: v-bind(displayResolver);
	gap: v-bind(gapResolver);
	grid-column: v-bind(columnResolver);
	grid-row: v-bind(rowResolver);
	justify-self: v-bind(justify);
}
</style>
