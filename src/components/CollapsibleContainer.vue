<template>
	<span id="collapsible-container">
		<div
			class="collapsible-container__item"
			@click="triggerExpanded"
		>
			<span
				:class="internalValue ? 'collapsible-container__chevron--opened' : 'collapsible-container__chevron--closed'"
			/>
			<!-- @slot Slot para renderização do conteúdo do header/title customizado do item
			-->
			<slot name="title">
				<span
					class="collapsible-container__title"
				>
					{{ title }}
				</span>
			</slot>
		</div>
		<div
			v-if="internalValue"
			class="collapsible-container__content"
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
		modelValue: {
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
			internalValue: this.modelValue,
		};
	},

	watch: {
		internalValue(newValue) {
			/**
			* Evento emitido quando o conteúdo do item é exibido ('true') ou ocultado ('false').
			* @event expanded
			* @type {Event}
			*/
			this.$emit('update:modelValue', newValue);
		},

		modelValue(newValue) {
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

.collapsible-container {
	&__content {
		padding: px(5);

		& p {
			margin: my(1);
		}
	}

	&__chevron--closed {
		top: 6px;
		right: 2px;
		display: block;
		height: 32px;
		width: 32px;
		pointer-events: none;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;

		&::before,
		&::after {
			content: '';
			width: 0;
			height: 0;
		}

		&::before {
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid $n-400;
			border-radius: $border-radius-small;
			transition: all 300ms ease-in-out;
			transform: rotate(-180deg);
		}
	}

	&__chevron--opened {
		top: 6px;
		right: 2px;
		display: block;
		height: 32px;
		width: 32px;
		pointer-events: none;
		border-radius: $border-radius-small;
		display: flex;
		align-items: center;
		justify-content: center;

		&::before,
		&::after {
			content: '';
			width: 0;
			height: 0;
		}

		&::before {
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid $n-400;
			border-radius: $border-radius-small;
			transition: all 300ms ease-in-out;
			transform: rotate(0deg);
		}
	}

	&__item {
		font-size: 14px;
		color: $n-600;
		display: flex;
		align-items: start;
		cursor: pointer;
		display: flex;
		align-items: baseline;
		margin: ml(n2);

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
		@extend .collapsible-container__icon--collapsed;
		transform: rotate(180deg);
	}
}
</style>
