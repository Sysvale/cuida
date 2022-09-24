<template>
	<span id="cds-collapsible-container">
		<div
			class="cds-collapsible-container__item"
			@click="triggerExpanded"
		>
			<ion-icon
				name="chevron-down-outline"
				:class="internalValue ? 'cds-collapsible-container__icon--expanded' : 'cds-collapsible-container__icon--collapsed'"
			>
			</ion-icon>
			<!-- @slot Slot para renderização do conteúdo do header/title customizado do item
			-->
			<slot name="title">
				<span
					class="cds-collapsible-container__title"
				>
					{{ title }}
				</span>
			</slot>
		</div>
		<div
			v-if="internalValue"
			class="cds-collapsible-container__content"
		>
			<!-- @slot Slot para renderização conteúdo do container
				quando o componente está expandido
			-->
			<slot />
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * Representa o estado do componente. Quando 'false' o conteúdo não é mostrado
		 * e quando 'true' o conteúdo do container é exibido.
		 */
		value: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Título do item a ser expandido
		 */
		title: {
			type: String,
			default: 'Visualizar mais',
		},
	},

	data() {
		return {
			internalValue: this.value,
		};
	},

	watch: {
		internalValue(newValue) {
			/**
			* Evento emitido quando o conteúdo do item é exibido ('true') ou ocultado ('false').
			* @event expanded
			* @type {Event}
			*/
			this.$emit('input', newValue);
		},

		value(newValue) {
			this.internalValue = newValue;
		},
	},

	methods: {
		triggerExpanded() {
			this.internalValue = !this.internalValue;
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

.cds-collapsible-container {
	&__item {
		@include caption;
		color: $n-600;
		display: flex;
		align-items: start;
		cursor: pointer;

		& hr {
			border-color: $n-600 !important;
		}
	}

	&__title {
		font-weight: 700;
	}

	&__icon--collapsed {
		color: $n-600;
		margin: mr(2);
		transition: all 0.25s ease-in-out;
	}

	&__icon--expanded {
		@extend .cds-collapsible-container__icon--collapsed;
		transform: rotate(180deg);
	}
}

ion-icon {
	visibility: visible !important;
	font-size: 18px !important;
}
</style>
