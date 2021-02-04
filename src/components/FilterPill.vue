<template>
	<div>
		<span
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
	</div>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons'

export default {
	components: {
		ChevronDownIcon
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
		 * Controla o comportamento de ativo ou inativo do FilterPill
		 */
		isActive: {
			type: Boolean,
			default: false,
		}
	},
	methods: {
		activeSelection() {
			if (this.disabled) {
				return;
			}
			/**
			* Evento que indica que o FilterPill foi clicado
			* @event click
			* @type {Event}
			*/
			this.$emit('click', true);
		}	
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.filter-pill {
	&__container {
		padding: 8px 16px;
		border: 1px solid $cinza-4;
		border-radius: 8px;
		cursor: pointer;
	
		&--disabled {
			background-color: $cinza-3;
			cursor: default;
		}

		&--active {
			border-color: transparent !important;
			box-shadow: 0 0px 0px 4px rgba($azul-sonic-base, 0.16);
		}
	}

	&__label {
		@include corpo-2;
		@include peso-de-fonte-regular;
		color: $cinza-7;
	}

	&__content {
		@include corpo-2;
		@include peso-de-fonte-semibold;
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
</style>
