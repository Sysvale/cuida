<template>
	<span id="CdsIcon-button">
		<component
			:is="tooltipText ? 'cds-tooltip' : 'span'"
			:text="innerTooltipText"
		>
			<button
				class="CdsIcon-button__container"
				:class="computedModifiers"
				@click="clickHandler"
			>
				<CdsIcon
					:key="inputControlPanel"
					:name="internalIcon"
					class="CdsIcon-button__icon"
				/>
			</button>
		</component>
	</span>
</template>

<script>
import CdsIcon from './Icon.vue';
import CdsTooltip from './Tooltip.vue';

const predefinedSizes = [
	'sm',
	'md',
	'lg',
];

export default {
	name: 'CdsIconButton',
	components: {
		CdsIcon,
		CdsTooltip,
	},

	props: {
		/**
		 * Especifica o tamanho do botão. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 * @values sm, md, lg
		 */
		size: {
			type: String,
			default: 'md',
			validator: (value) => {
				return predefinedSizes.includes(value);
			},
		},
		/**
		* Especifica o `name` do ícone do cuida icons a ser apresentado no corpo do botão.
		*/
		icon: {
			type: String,
			default: 'create-outline',
		},
		/**
		 * Controla a disponibilidade do botão.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		* Texto a ser exibido como tooltip com o hover do botão.
		*/
		tooltipText: {
			type: String,
			default: null,
		},
		/**
		* Quando ativo, faz com que, após iteração do usuário, o ícone do botão seja temporariamente alterado.
		*/
		feedbackOnClick: {
			type: Boolean,
			default: false,
		},
		/**
		* Ícone mostrado após clique do usuário.
		*/
		feedbackIcon: {
			type: String,
			default: 'check-outline',
		},
		/**
		* A variante de cor. São 10 variantes:
		* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
		*/
		variant: {
			type: String,
			default: 'white',
		},
	},

	data() {
		return {
			predefinedSizes,
			innerTooltipText: this.tooltipText,
			internalIcon: this.icon,
			inputControlPanel: 0,
		};
	},

	computed: {
		predefinedSize() {
			return `CdsIcon-button--${this.size}`;
		},

		computedModifiers() {
			const status = this.disabled ? 'CdsIcon-button--disabled' : '';
			const variantClass = `CdsIcon-button__container--${this.variant}`;

			return `${status} ${this.predefinedSize} ${variantClass}`;
		},
	},

	watch: {
		tooltipText() {
			this.innerTooltipText = this.tooltipText;
		},
	},

	methods: {
		clickHandler(e) {
			if (this.disabled) {
				return;
			}

			if (this.feedbackOnClick) {
				this.inputControlPanel += 1;
				this.internalIcon = this.feedbackIcon;
				setTimeout(() => {
					this.internalIcon = this.icon;
					this.inputControlPanel += 1;
				}, 1000);

				this.inputControlPanel += 1;
			}

			/**
			* Evento que indica que o botão foi clicado
			* @event cds-click
			* @type {Event}
			*/
			this.$emit('cds-click', e);
		},
	},
};
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.CdsIcon-button {
	&__container {
		border: none !important;
		border-radius: tokens.$border-radius-extra-small;
		cursor: pointer;
		box-sizing: border-box;	

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .CdsIcon-button__container;
			background-color: $base-color;
			color: tokens.$n-0;

			@if ($color-name == 'gray') {
				background-color: $shade-100;
				color: tokens.$n-600;
			}

			@if ($color-name == 'white') {
				color: tokens.$n-600;
				outline: 1px solid tokens.$n-50 !important;

				&:hover {
					background-color: tokens.$n-10;
				}
			} @else {
				&:hover {
					background-color: $shade-500;
				}

				&:focus {
					outline: none !important;
				}
			}
		}
	}

	&--disabled {
		box-sizing: border-box;
		outline: 1px solid transparent !important;
		color: tokens.$n-300 !important;
		background-color: tokens.$n-20 !important;
		cursor: default !important;

		&:hover {
			outline: 1px solid transparent !important;
		}
	}

	&__icon {
		display: flex;
	}
}

.CdsIcon-button {
	&--sm {
		padding: tokens.pYX(2, 2);
		border-radius: tokens.$border-radius-lil;

		.CdsIcon-button__icon {
			transition: tokens.$hover;
			width: 16px;
			height: 16px;
		}
	}

	&--md {
		padding: tokens.pYX(2, 2);
		border-radius: tokens.$border-radius-extra-small;

		.CdsIcon-button__icon {
			transition: tokens.$hover;
			width: 20px;
			height: 20px;
		}
	}

	&--lg {
		padding: tokens.pYX(2, 2);
		border-radius: tokens.$border-radius-extra-small;

		.CdsIcon-button__icon {
			transition: tokens.$hover;
			width: 24px;
			height: 24px;
		}
	}
}
</style>
