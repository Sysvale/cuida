<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<span
			:id="id"
			ref="dropdownButtonRef"
			:class="{
				'filter-pill__container--disabled' : disabled,
				'filter-pill__container--active': isActive && !disabled,
			}"
			class="filter-pill__container"
			@click="activeSelection"
		>
			<span class="filter-pill__label">{{ label }}: </span>
			<span class="filter-pill__content">{{ content }} </span>

			<cds-chevron
				:key="isActive"
				animate
				size="sm"
				:direction="isActive? 'top' : 'bottom'"
			/>
		</span>

		<div
			v-if="isActive"
			ref="dropdownRef"
			:style="dynamicStyle"
			class="filter-pill__dropdown"
		>
			<!-- @slot Slot usado para inserção de conteúdo dentro do dropdown do FilterPill. -->
			<slot />
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import CdsChevron from './Chevron.vue';

export default {
	name: 'Dropdown',
	components: {
		CdsChevron,
	},

	props: {
		/**
		 * Conteúdo do Dropdown.
		 */
		content: {
			type: String,
			default: 'Conteúdo',
			required: true,
		},
		/**
		 * Label exibida ao lado do conteúdo
		 */
		label: {
			type: String,
			default: 'Label',
			required: true,
		},
		/**
		 * Controla a disponibilidade do Dropdown
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla o tamanho do popover do Dropdown (em pixels).
		 * O tamanho nunca é menor que a largura do Dropdown.
		 */
		dropdownWidth: {
			type: Number,
			default: 0,
		},
	},

	data() {
		return {
			id: null,
			isActive: false,
		};
	},

	computed: {
		dynamicStyle() {
			const filterPillDomReference = document.getElementById(this.id);

			if (!filterPillDomReference) {
				return null;
			}

			const filterWidth = parseFloat(window.getComputedStyle(filterPillDomReference).width);

			if (filterWidth > this.dropdownWidth) {
				return {
					'--width': `${filterWidth}px`,
				};
			}

			return {
				'--width': `${this.dropdownWidth}px`,
			};
		},
	},

	mounted() {
		this.id = `filter-pill$-${this._uid}`;

		document.querySelector('body').addEventListener('click', this.closeDropdown);
	},

	methods: {
		activeSelection() {
			if (this.disabled) {
				return;
			}

			this.isActive = !this.isActive;

			/**
			* Evento que indica que o FilterPill foi clicado
			* @event click
			* @type {Event}
			*/
			this.$emit('click', true);
		},

		hide() {
			this.isActive = !this.isActive;
		},

		closeDropdown(event) {
			if (
				this.$refs.dropdownRef
				&& !this.$refs.dropdownRef.contains(event.target)
				&& this.$refs.dropdownButtonRef
				&& !this.$refs.dropdownButtonRef.contains(event.target)
			) {
				this.hide();
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.filter-pill {
	&__container {
		display: inline-flex;
		align-items: center;
		padding: tokens.mx(4);
		border: 1px solid tokens.$n-50;
		border-radius: tokens.$border-radius-extra-small;
		cursor: pointer;
		height: 40px;

		&--disabled {
			background-color: tokens.$n-20;
			border: none;
			cursor: default;
		}

		&:hover:not(.filter-pill__container--disabled),
		&--active {
			border-color: transparent !important;
			box-shadow: 0 0 0 0.2rem rgba(tokens.$bn-300, .45);
		}
	}

	&__label {
		@include tokens.body-2;
		font-weight: tokens.$font-weight-regular;
		margin: tokens.mr(1);
		color: tokens.$n-500;
	}

	&__content {
		@include tokens.body-2;
		font-weight: tokens.$font-weight-semibold;
		color: tokens.$n-700;
		margin: tokens.mr(2);
	}

	&__dropdown {
		width: var(--width);
		background-color: tokens.$n-0;
		padding: tokens.pa(3);
		border-radius: tokens.$border-radius-extra-small;
		box-shadow: 0px 0px 8px rgba(tokens.$n-900, .08);
		outline: 1px solid tokens.$n-30;
		z-index:999999999;
		color: tokens.$n-700;
		position: absolute;
		margin: tokens.mt(2);

	}
}

ion-icon {
	visibility: visible !important;
	font-size: 18px !important;
}
</style>
