<template>
	<span id="cds-icon-button">
		<button
			class="cds-icon-button__container"
			:class="computedModifiers"
			:style="computedStyle"
			@click="clickHandler()"
		>
			<ion-icon
				:name="icon"
				class="cds-icon-button__icon"
			/>
		</button>
	</span>
</template>

<script>
import { colorOptions, colorHexCode, colorLighterHexCode } from '../utils/constants/colors';

const predefinedSizes = [
		'sm',
		'md',
		'lg',
	];

export default {
	props: {
		/**
		 * A variante de cor. São 9 variantes implementadas: 'green', 'teal',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' e 'amber'.
		 */
		variant: {
			type: String,
			default: 'green',
			validator: (value) => {
				return colorOptions.includes(value);
			},
		},
		/**
		 * Especifica o tamanho do botão. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
			validator: (value) => {
				return predefinedSizes.includes(value);
			},
		},
		/**
		 * Especifica o `name` do ícone do ion-icons a ser apresentado no corpo do botão.
		 */
		icon: {
			type: String,
			default: 'create-outline',
			required: true,
		},
		/**
		 * Controla a disponibilidade do botão.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			predefinedColors: colorOptions,
			predefinedSizes,
		};
	},

	computed: {
		predefinedSize() {
			return `cds-icon-button--${this.size}`;
		},

		computedModifiers() {
			const status = this.disabled ? 'disabled' : 'active';
			return `cds-icon-button--${status} ${this.predefinedSize}`;
		},

		computedStyle() {
			return {
				'--hoverColor': this.colorHexCode(this.variant),
				'--hoverBorderColor': this.colorLighterHexCode(this.variant),
			};
		},
	},

	methods: {
		colorHexCode,
		colorLighterHexCode,

		clickHandler() {
			if (this.disabled) {
				return;
			}
			/**
			* Evento que indica que o botão foi clicado
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

.cds-icon-button {
	&__container {
		color: $n-600;
		background-color: $n-0;
		border: 1px solid $n-40 !important;
		border-radius: $border-radius-extra-small;
		border: none;
		cursor: pointer;

		&:focus {
			outline: none !important;
		}

		&:hover {
			color: var(--hoverColor);
			border-color: var(--hoverBorderColor) !important;
		}
	}

	&__icon {
		display: flex;
	}
}

.cds-icon-button {
	&--sm {
		padding: pYX(2, 2);
		border-radius: $border-radius-lil;

		.cds-icon-button__icon {
			width: 14px;
			height: 14px;
		}
	}

	&--md {
		padding: pYX(3, 3);
		border-radius: $border-radius-extra-small;

		.cds-icon-button__icon {
			width: 16px;
			height: 16px;
		}
	}

	&--lg {
		padding: pYX(3, 3);
		border-radius: $border-radius-extra-small;

		.cds-icon-button__icon {
			width: 18px;
			height: 18px;
		}
	}
}
</style>
