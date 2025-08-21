<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div :class="computedContainerClass">
		<div
			v-for="(page, index) in pages"
			:key="index"
			:class="resolveButtonClass(page)"
			@click="handlePageClick(page)"
		>
			<cds-chevron
				v-if="index === 0"
				direction="left"
				class="pagination__double-chevron--left"
			/>
			<cds-chevron
				v-if="index === 0"
				direction="left"
				class="pagination__double-chevron--left"
			/>

			<cds-chevron
				v-if="index === 1"
				direction="left"
			/>

			<span v-if="index >= 2 && index <= pages.length - 3">{{ page.text }}</span>

			<cds-chevron
				v-if="index === pages.length - 2"
				direction="right"
			/>
			<cds-chevron
				v-if="index === pages.length - 1"
				direction="right"
				class="pagination__double-chevron--right"
			/>
			<cds-chevron
				v-if="index === pages.length - 1"
				direction="right"
				class="pagination__double-chevron--right"
			/>
		</div>
	</div>
</template>

<script setup>
/* eslint-disable no-plusplus */
import PaginationItem from '../entities/PaginationItem';
import CdsChevron from './Chevron.vue';
import variantClassResolver from '../utils/methods/variantClassResolver';
import { computed, onBeforeMount, watch, ref } from 'vue';

const props = defineProps({
	/**
	 * Prop utilizada para receber a página atual.
	 */
	modelValue: {
		type: [Number, String],
		default: 1,
	},
	/**
	 * Prop utilizada para receber o número total de registros a serem paginados.
	 */
	total: {
		type: Number,
		default: 1,
		validator: (value) => value >= 1,
	},
	/**
	 * Prop utilizada para receber o número de registros a serem exibidos
	 * por página.
	 */
	perPage: {
		type: Number,
		default: 1,
		validator: (value) => value >= 1,
	},
	/**
	 * Prop que indica se o componente deverá ocupar 100% do espaço disponível.
	 */
	fluid: {
		type: Boolean,
		default: false,
	},
	/**
	 * A variante de cor. São 10 variantes:
	 * @values 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark'
	 */
	variant: {
		type: String,
		default: 'green',
	},
});

const selectedPage = ref(
	new PaginationItem(null, parseInt(props.modelValue, 10), true)
);

const pages = ref([]);

const emit = defineEmits([
	/**
	 * Evento que indica que a página atual foi alterada.
	 *
	 * Altera o valor do v-model.
	 *
	 * Emite o número referente à página selecionada.
	 * @event update:modelValue
	 * @type {Event}
	 */
	'update:modelValue',
]);

const pageCount = computed(() => {
	const pageNumber = props.total / props.perPage;
	return pageNumber < 1 ? 1 : Math.ceil(props.total / props.perPage);
});

const computedContainerClass = computed(() => {
	return props.fluid ? 'pagination__container--fluid' : 'pagination__container';
});

function resolveButtonClass(page) {
	switch (page.index) {
		case 0:
			return selectedPage.value.value === 1
				? 'pagination__button--first pagination__button--disabled'
				: 'pagination__button--first';
		case 1:
			return selectedPage.value.value === 1
				? 'pagination__button pagination__button--disabled'
				: 'pagination__button';
		case 7:
			return selectedPage.value.value === pageCount.value
				? 'pagination__button pagination__button--disabled'
				: 'pagination__button';
		case 8:
			return selectedPage.value.value === pageCount.value
				? 'pagination__button--last pagination__button--disabled'
				: 'pagination__button--last';
		default:
			return page.selected
				? variantClassResolver('pagination__button--active', props.variant)
				: 'pagination__button';
	}
}

function resolvePages() {
	pages.value = [
		new PaginationItem(0, 'first', false, '<<'),
		new PaginationItem(1, 'back', false, '<'),
		...mountPagesArray(),
		new PaginationItem(7, 'forward', false, '>'),
		new PaginationItem(8, 'last', false, '>>'),
	];
}

function mountPagesArray() {
	const pageNumber = pageCount.value < 5 ? pageCount.value + 2 : 7;
	const pagesArray = [];

	if (selectedPage.value.value <= 3 || pageCount.value <= 5) {
		selectedPage.value.index = selectedPage.value.value;

		for (let i = 2; i < pageNumber; i++) {
			pagesArray[i - 2] = new PaginationItem(
				i,
				i - 1,
				selectedPage.value.value === i - 1
			);
		}

		return pagesArray;
	}

	if (selectedPage.value.value <= pageCount.value - 2) {
		for (let i = 2; i < pageNumber; i++) {
			const currentValue = selectedPage.value.value - 4 + i;
			pagesArray[i - 2] = new PaginationItem(
				i + 1,
				currentValue,
				selectedPage.value.value === currentValue
			);
		}

		return pagesArray;
	}

	for (let i = 2; i < pageNumber; i++) {
		const currentValue = pageCount.value - 6 + i;
		pagesArray[i - 2] = new PaginationItem(
			i,
			currentValue,
			selectedPage.value.value === currentValue
		);
	}

	return pagesArray;
}

function handlePageClick(page) {
	switch (page.value) {
		case selectedPage.value.value:
			return;
		case 'first':
			if (selectedPage.value.index === 1) {
				return;
			}

			selectedPage.value = new PaginationItem(null, 1, true);

			emit('update:modelValue', 1);
			resolvePages();
			return;
		case 'last':
			if (selectedPage.value.index === pageCount.value) {
				return;
			}
			selectedPage.value = new PaginationItem(null, pageCount, true);

			emit('update:modelValue', pageCount.value);
			resolvePages();
			return;
		case 'back':
			if (selectedPage.value.index === 1) {
				return;
			}
			emit('update:modelValue', selectedPage.value.value - 1);

			selectedPage.value = new PaginationItem(
				null,
				selectedPage.value.value - 1,
				true
			);

			resolvePages();
			return;
		case 'forward':
			if (selectedPage.value.value === pageCount.value) {
				return;
			}

			emit('update:modelValue', selectedPage.value.value + 1);

			selectedPage.value = new PaginationItem(
				null,
				selectedPage.value.value + 1,
				true
			);

			resolvePages();
			return;
		default:
			selectedPage.value = new PaginationItem(null, page.value, true);

			emit('update:modelValue', page.value);
			resolvePages();
			break;
	}
}

watch([selectedPage, pages], ([newSelectedPage], [oldSelectedPage]) => {
	if (
		newSelectedPage === oldSelectedPage ||
		newSelectedPage === selectedPage.value
	) {
		return;
	}

	selectedPage.value = new PaginationItem(
		null,
		parseInt(newSelectedPage, 10),
		true
	);
	resolvePages();
});

onBeforeMount(() => {
	resolvePages();
});
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.pagination {
	&__container {
		display: flex;
		justify-content: center;
		width: fit-content;

		&--fluid {
			@extend .pagination__container;
			width: 100%;
		}
	}

	&__button {
		cursor: pointer;
		height: 34px;
		padding: tokens.pYX(2,3);
		width: 35px;
		@include tokens.caption;
		font-weight: tokens.$font-weight-semibold;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		background-color: tokens.$n-0;
		color: tokens.$n-600;
		border: 1px solid tokens.$n-40;
		margin: tokens.mx(1);
		border-radius: tokens.$border-radius-lil;
		transition: tokens.$interaction;

		&:hover:not(.pagination__button--disabled) {
			background-color: tokens.$n-30;
			border-color: tokens.$n-30;
			transition: tokens.$interaction;
		}

		&--active {
			@extend .pagination__button;
			@include tokens.button-2;
			color: tokens.$n-0;

			@include tokens.variantResolver using
				(
					$color-name,
					$shade-50,
					$shade-100,
					$shade-200,
					$shade-300,
					$base-color,
					$shade-500,
					$shade-600
				) {
				@extend .pagination__button--active;
				background-color: $base-color;
				border-color: $base-color;
	
				&:hover {
					background-color: $shade-500 !important;
					border-color: $shade-500 !important;
				}
			}
		}

		&--first {
			@extend .pagination__button;
			border-width: 0.5px;
		}

		&--last {
			@extend .pagination__button;
		}

		&--disabled {
			color: tokens.$n-300 !important;
			background-color: tokens.$n-20;
			border-color: tokens.$n-20;
			cursor: default;
		}
	}

	&__double-chevron {
		&--left {
			margin: tokens.ml(n1)
		}

		&--right {
			margin: tokens.mr(n1)
		}
	}
}
</style>
