<template>
	<component
		:is="tag"
		class="grid"
	>
		<!-- @slot Slot com o conteúdo interno da grid -->
		<slot />
	</component>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'CdsGrid' });

const props = defineProps({
	cols: {
		type: [Number, String, Array],
		default: 1,
	},
	rows: {
		type: [Number, String, Array],
		default: 1,
	},
	autoCols: {
		type: [Number, String],
		default: 1,
	},
	autoRows: {
		type: [Number, String],
		default: 1,
	},
	gap: {
		type: [Number, String],
		default: 0,
	},
	rowGap: {
		type: [Number, String],
		default: 0,
	},
	colGap: {
		type: [Number, String],
		default: 0,
	},
	justify: {
		type: String,
		default: 'stretch',
	},
	align: {
		type: String,
		default: 'stretch',
	},
	tag: {
		type: String,
		default: 'div',
		validator: (value) => ['div', 'span', 'main', 'footer', 'form', 'header', 'aside', 'ul', 'li'].includes(value),
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

const gridResolver = (element) => {
	if (Array.isArray(element)) {
		return element.reduce((acc, curr) => `${acc} ${curr}`);
	}

	if (Number.isFinite(element)) {
		return `${('1fr ').repeat(element)}`;
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
@use '../assets/sass/tokens/index' as tokens;

.grid {
	align-items: v-bind(align);
	display: grid;
	gap: v-bind(gapResolver);
	grid-auto-columns: v-bind(gridAutoColsResolver);
	grid-auto-rows: v-bind(gridAutoRowsResolver);
	grid-template-columns: v-bind(gridTemplateColumnsResolver);
	grid-template-rows: v-bind(gridTemplateRowsResolver);
	justify-content: v-bind(justify);
}
</style>
