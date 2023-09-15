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

<script>
/* eslint-disable no-plusplus */
import PaginationItem from '../entities/PaginationItem';
import CdsChevron from './Chevron.vue'
import variantClassResolver from '../utils/methods/variantClassResolver';

export default {
	components: {
		CdsChevron,
	},

	props: {
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
		 * Prop que indica se o componente deverá ocupar 100% do espaço disponível.
		 */
		variant: {
			type: String,
			default: 'green',
		},
	},

	data() {
		return {
			selectedPage: new PaginationItem(null, parseInt(this.modelValue, 10), true),
			pages: [],
		};
	},

	computed: {
		pageCount() {
			const pageNumber = this.total / this.perPage;
			return pageNumber < 1 ? 1 : Math.ceil(this.total / this.perPage);
		},

		computedContainerClass() {
			return this.fluid ? 'pagination__container--fluid' : 'pagination__container';
		},
	},

	watch: {
		modelValue(newValue, oldValue) {
			if (newValue === oldValue || newValue === this.selectedPage.value) {
				return;
			}

			this.selectedPage = new PaginationItem(null, parseInt(newValue, 10), true);
			this.resolvePages();
		},
	},

	beforeMount() {
		this.resolvePages();
	},

	methods: {
		resolveButtonClass(page) {
			switch (page.index) {
				case 0:
					return this.selectedPage.value === 1
						? 'pagination__button--first pagination__button--disabled'
						: 'pagination__button--first';
				case 1:
					return this.selectedPage.value === 1
						? 'pagination__button pagination__button--disabled'
						: 'pagination__button';
				case 7:
					return this.selectedPage.value === this.pageCount
						? 'pagination__button pagination__button--disabled'
						: 'pagination__button';
				case 8:
					return this.selectedPage.value === this.pageCount
						? 'pagination__button--last pagination__button--disabled'
						: 'pagination__button--last';
				default:
					return page.selected ? variantClassResolver('pagination__button--active', this.variant) : 'pagination__button';
			}
		},

		resolvePages() {
			this.pages = [
				new PaginationItem(0, 'first', false, '<<'),
				new PaginationItem(1, 'back', false, '<'),
				...this.mountPagesArray(),
				new PaginationItem(7, 'forward', false, '>'),
				new PaginationItem(8, 'last', false, '>>'),
			];
		},

		mountPagesArray() {
			const pageNumber = this.pageCount < 5 ? (this.pageCount + 2) : 7;
			const pagesArray = [];

			if (this.selectedPage.value <= 3 || this.pageCount <= 5) {
				this.selectedPage.index = this.selectedPage.value;

				for (let i = 2; i < (pageNumber); i++) {
					pagesArray[i - 2] = new PaginationItem(i, i - 1, this.selectedPage.value === i - 1);
				}

				return pagesArray;
			}

			if (this.selectedPage.value <= this.pageCount - 2) {
				for (let i = 2; i < (pageNumber); i++) {
					const currentValue = this.selectedPage.value - 4 + i;
					pagesArray[i - 2] = new PaginationItem(
						i + 1,
						currentValue,
						this.selectedPage.value === currentValue,
					);
				}

				return pagesArray;
			}

			for (let i = 2; i < (pageNumber); i++) {
				const currentValue = this.pageCount - 6 + i;
				pagesArray[i - 2] = new PaginationItem(
					i,
					currentValue,
					this.selectedPage.value === currentValue,
				);
			}

			return pagesArray;
		},

		handlePageClick(page) {
			switch (page.value) {
				case this.selectedPage.value:
					return;
				case 'first':
					if (this.selectedPage.index === 1) {
						return;
					}

					this.selectedPage = new PaginationItem(
						null,
						1,
						true,
					);

					/**
					* Evento que indica que a página atual foi alterada.
					*
					* Altera o valor do v-model.
					*
					* Emite o número referente à página selecionada.
					* @event input
					* @type {Event}
					*/
					this.$emit('update:modelValue', 1);
					this.resolvePages();
					return;
				case 'last':
					if (this.selectedPage.index === this.pageCount) {
						return;
					}

					this.selectedPage = new PaginationItem(
						null,
						this.pageCount,
						true,
					);

					this.$emit('update:modelValue', this.pageCount);
					this.resolvePages();
					return;
				case 'back':
					if (this.selectedPage.index === 1) {
						return;
					}
					this.$emit('update:modelValue', this.selectedPage.value - 1);

					this.selectedPage = new PaginationItem(
						null,
						this.selectedPage.value - 1,
						true,
					);

					this.resolvePages();
					return;
				case 'forward':
					if (this.selectedPage.value === this.pageCount) {
						return;
					}

					this.$emit('update:modelValue', this.selectedPage.value + 1);

					this.selectedPage = new PaginationItem(
						null,
						this.selectedPage.value + 1,
						true,
					);

					this.resolvePages();
					return;
				default:
					this.selectedPage = new PaginationItem(
						null,
						page.value,
						true,
					);

					this.$emit('update:modelValue', page.value);
					this.resolvePages();
					break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

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
		padding: pYX(2,3);
		width: 35px;
		@include caption;
		font-weight: $font-weight-semibold;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		background-color: $n-0;
		color: $n-600;
		border: 1px solid $n-40;
		margin: mx(1);
		border-radius: $border-radius-lil;
		transition: $interaction;

		&:hover:not(.pagination__button--disabled) {
			background-color: $n-30;
			border-color: $n-30;
			transition: $interaction;
		}

		&--active {
			@extend .pagination__button;
			@include button-2;
			color: $n-0;

			@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
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
			color: $n-300 !important;
			background-color: $n-20;
			border-color: $n-20;
			cursor: default;
		}
	}

	&__double-chevron {
		&--left {
			margin: ml(n1)
		}

		&--right {
			margin: mr(n1)
		}
	}
}
</style>
