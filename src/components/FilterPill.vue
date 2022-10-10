<template>
	<div>
		<span
			:id="id"
			:class="{
				'filter-pill__container--disabled' : disabled,
				'filter-pill__container--active': isActive && !disabled,
			}"
			class="filter-pill__container"
			@click="activeSelection"
		>
			<span class="filter-pill__label">{{ this.label }}: </span>
			<span class="filter-pill__content">{{ this.content }} </span>

			<ion-icon
				name="chevron-down-outline"
				:class="(isActive && !disabled) ? 'filter-pill__chevron--up' : 'filter-pill__chevron--down'"
			>
			</ion-icon>
		</span>

		<div
			v-if="isActive"
			:style="dynamicStyle"
			class="filter-pill__dropdown"
			v-on-click-outside="hide"
		>
			<!-- @slot Slot usado para inserção de conteúdo dentro do dropdown do FilterPill. -->
			<slot />
		</div>
	</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import { directive as onClickOutside } from 'vue-on-click-outside';

export default {
	directives: {
		'on-click-outside': onClickOutside,
	},

	data() {
		return {
			id: null,
			isActive: false,
		};
	},

	mounted() {
		this.id = `filter-pill$-${this._uid}`;
	},

	props: {
		/**
		 * Conteúdo do filter pill.
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
		 * Controla a disponibilidade do FilterPill
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla o tamanho do popover do FilterPill (em pixels).
		 * O tamanho nunca é menor que a largura do FilterPill.
		 */
		dropdownWidth: {
			type: Number,
			default: 0,
		},
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
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.filter-pill {
	&__container {
		display: inline-flex;
		align-items: center;
		padding: mx(4);
		border: 1px solid $n-50;
		border-radius: $border-radius-extra-small;
		cursor: pointer;
		height: 40px;

		&--disabled {
			background-color: $n-30;
			cursor: default;
		}

		&:hover:not(.filter-pill__container--disabled),
		&--active {
			border-color: transparent !important;
			box-shadow: 0 0px 0px 4px rgba($gp-400, 0.2);
		}
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-regular;
		color: $n-500;
	}

	&__content {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-700;
	}

	&__chevron--up {
		margin-left: 8px;
		margin-bottom: -4px;
		color: $n-500;
		transition: all 0.25s ease-in-out;
		transform: rotate(180deg);
	}

	&__chevron--down {
		margin-left: 8px;
		margin-bottom: -4px;
		color: $n-500;
		transition: all 0.25s ease-in-out;
	}

	&__dropdown {
		width: var(--width);
		position: absolute;
		background-color: white;
		padding: 20px;
		top: 94px;
		border-radius: $border-radius-extra-small;
		box-shadow: 0px 0px 8px rgba($n-900, .08);
		border: 1px solid $n-30;
		z-index:999999999;
		color: $n-600;
	}
}

ion-icon {
	visibility: visible !important;
	font-size: 18px !important;
}
</style>
