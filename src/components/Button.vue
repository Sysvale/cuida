<template>
	<div
		class="divider"
	>
		<div
			v-if="withText"
			class="divider__container"
			@click="activeSelection"
		>
			<div
				class="dividerBefore"
			>
				{{ text }}
			</div>

			<div class="textDivider"/>

			<ion-icon
				v-if="expandable"
				name="chevron-down-outline"
				:class="(isActive && !disabled) ? 'filter-pill__chevron--up' : 'filter-pill__chevron--down'"
			>
			</ion-icon>

		</div>
		<div
			v-else
		>
			<div class="textDivider"/>
		</div>

		<div
			v-if="isActive && expandable"
			class="divider__slot"
		>
			<!-- @slot Slot usado para especificar o conteúdo a ser mostrado no divider
			expansível após clicado. -->
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isActive: false,
		};
	},

	props: {
		/**
		 * A variante do Highlight. São 3 variantes implementadas: 'info', 'success'
		 * e 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
		},
		/**
		 * Especifica se o Divider é do tipo padrão ou com texto à esquerda.
		 */
		withText: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica se o Divider é do tipo padrão ou com texto à esquerda.
		 */
		expandable: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica se o Divider é do tipo padrão ou com texto à esquerda.
		 */
		text: {
			type: String,
			default: 'Nenhum agendado',
		},
		/**
		 * Controla a disponibilidade do FilterPill
		 */
		disabled: {
			type: Boolean,
			default: false,
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
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.divider {
	margin: my(4);

	&__container {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	&__slot {
		margin: ma(3);
	}
}

.dividerBefore {
	text-transform: uppercase;
	@include caption;
	font-weight: $font-weight-semibold;
	color: $n-600;
	white-space: nowrap;
	margin: mr(3);
}

.textDivider {
	background-color: $n-100;
	height: 1px;
	width: 100%;
}

@keyframes highlight {
	0% {
		background-position: 100%;
	}
}

.filter-pill {
	&__chevron--up {
		margin-left: 8px;
		margin-bottom: -4px;
		color: $n-500;
		transition: all 0.25s ease-in-out;
		transform: rotate(180deg);
		font-size: 24px;
		margin-top: -2px;
		visibility: visible;
	}

	&__chevron--down {
		margin-left: 8px;
		margin-bottom: -4px;
		color: $n-500;
		font-size: 24px;
		margin-top: -2px;
		visibility: visible;
		transition: all 0.25s ease-in-out;
		transform: rotate(0deg);
	}
}
</style>
