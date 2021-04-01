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

			<chevron-down-icon
				size="1.2x"
				:class="(isActive && !disabled) ? 'filter-pill__chevron--up' : 'filter-pill__chevron--down'"
			/>
		</span>

		<div
			v-if="isActive"
			:style="dynamicStyle"
			class="cds-modal-window"
			v-on-click-outside="hide"
		>
			<!-- @slot Slot usado para inserção de conteúdo dentro do Modal Window. -->
			<slot />
		</div>
	</div>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons';

export default {
	data() {
		return {
			filterPillOffsets: null,
			filterPillDomReference: null,
			id: null,
			isActive: false,
			showAgeFilter: false,
			showSortByFilter: false,
			sortingModalXPosition: 260,
			sortingModalWidth: 300,
		};
	},

	components: {
		ChevronDownIcon,
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
	},

	computed: {
		dynamicStyle() {
			const filterPillDomReference = document.getElementById(this.id);
			const sortingModalWidth = parseFloat(window.getComputedStyle(filterPillDomReference).width);

			return {
				'--height': `${this.height}px`,
				'--width': `${sortingModalWidth}px`,
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
		display: inline-block;
		padding: 8px 16px;
		border: 1px solid $cinza-4;
		border-radius: 8px;
		cursor: pointer;

		&--disabled {
			background-color: $cinza-3;
			cursor: default;
		}

		&:hover,
		&--active {
			border-color: transparent !important;
			box-shadow: 0 0px 0px 4px rgba($azul-sonic-base, 0.16);
		}
	}

	&__label {
		@include corpo-2;
		font-weight: $peso-de-fonte-regular;
		color: $cinza-7;
	}

	&__content {
		@include corpo-2;
		font-weight: $peso-de-fonte-semibold;
		color: $cinza-7;
	}

	&__chevron--up {
		color: $cinza-6;
		transition: all 0.25s ease-in-out;
		transform: rotate(180deg);
	}

	&__chevron--down {
		color: $cinza-6;
		transition: all 0.25s ease-in-out;
	}
}

.cds-modal-window {
	height: var(--height);
	width: var(--width);
	position: absolute;
	background-color: white;
	padding: 20px;
	top: 94px;
	border-radius: 8px;
	box-shadow: 0px 0px 8px rgba($cinza-9, .08);
	border: 1px solid $cinza-2;
	z-index:999999999;
}
</style>
