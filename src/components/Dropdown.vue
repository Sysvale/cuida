<!-- eslint-disable vue/multi-word-component-names -->
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
			v-on-click-outside="hide"
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
import vClickOutside from 'click-outside-vue3';
import CdsChevron from './Chevron.vue';

export default {
	components: {
		CdsChevron,
	},

	directives: {
		'on-click-outside': vClickOutside.directive,
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
@import '../assets/sass/tokens.scss';

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
			background-color: $n-20;
			border: none;
			cursor: default;
		}

		&:hover:not(.filter-pill__container--disabled),
		&--active {
			border-color: transparent !important;
			box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
		}
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-regular;
		margin: mr(1);
		color: $n-500;
	}

	&__content {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-700;
		margin: mr(2);
	}

	&__dropdown {
		width: var(--width);
		background-color: $n-0;
		padding: pa(3);
		border-radius: $border-radius-extra-small;
		box-shadow: 0px 0px 8px rgba($n-900, .08);
		outline: 1px solid $n-30;
		z-index:999999999;
		color: $n-700;
		position: absolute;
		margin: mt(2);

	}
}

ion-icon {
	visibility: visible !important;
	font-size: 18px !important;
}
</style>
