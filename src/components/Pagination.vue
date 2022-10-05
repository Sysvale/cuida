<template>
	<div :class="computedContainerClass">
		<div
			v-for="(page, index) in pages"
			:key="index"
			:class="resolveButtonClass(page)"
			@click="handlePageClick(page)"
		>
			{{ page.text }}
		</div>
	</div>
</template>

<script>
/* eslint-disable no-plusplus */
import PaginationItem from '../entities/PaginationItem';

export default {
	props: {
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
	},

	data() {
		return {
			selectedPage: new PaginationItem(2, 1, true),
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
					return page.selected ? 'pagination__button--active' : 'pagination__button';
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
					* Emite o número referente à página selecionada.
					* @event page-change
					* @type {Event}
					*/
					this.$emit('page-change', 1);
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

					this.$emit('page-change', this.pageCount);
					this.resolvePages();
					return;
				case 'back':
					if (this.selectedPage.index === 1) {
						return;
					}
					this.$emit('page-change', this.selectedPage.value - 1);

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

					this.$emit('page-change', this.selectedPage.value + 1);

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

					this.$emit('page-change', page.value);
					this.resolvePages();
					break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

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
		border-width: 0.5px 0.5px 0.5px 0px;
		border-style: solid;
		border-color: $n-100;
		@include body-2;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;

		&:hover {
			background-color: $bn-300;
			border-color: $bn-300;
			color: $n-0;
		}

		&--active {
			@extend .pagination__button;
			@include button-2;
			background-color: $bn-400;
			color: $n-0;
			border-color: $bn-400;

			&:hover {
				background-color: $bn-400;
				color: $n-0;
				border-color: $bn-400;
			}
		}

		&--first {
			@extend .pagination__button;
			border-width: 0.5px;
			border-radius: $border-radius-button 0px 0px $border-radius-button;
		}

		&--last {
			@extend .pagination__button;
			border-radius: 0px $border-radius-button $border-radius-button 0px;
		}

		&--disabled {
			color: $n-300 !important;
			cursor: default;

			&:hover {
				background: none;
				color: $n-300 !important;
				cursor: default;
				border-color: $n-100 !important;
			}
		}
	}
}
</style>
