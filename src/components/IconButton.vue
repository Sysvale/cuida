<template>
	<span id="cds-icon-button">
		<cds-tooltip
			:text="innerTooltipText"
		>
			<button
				class="cds-icon-button__container"
				:class="computedModifiers"
				@click="clickHandler"
			>
				<cds-icon
					:name="icon"
					class="cds-icon-button__icon"
				/>
			</button>
		</cds-tooltip>
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
	components: {
		CdsIcon,
		CdsTooltip,
	},

	props: {
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
	},

	data() {
		return {
			predefinedSizes,
			innerTooltipText: this.tooltipText,
		};
	},

	computed: {
		predefinedSize() {
			return `cds-icon-button--${this.size}`;
		},

		computedModifiers() {
			const status = this.disabled ? 'cds-icon-button--disabled' : '';
			return `${status} ${this.predefinedSize}`;
		},
	},

	watch: {
		disabled: {
			handler(newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}

				if (newValue === true) {
					this.innerTooltipText = null;
				} else {
					this.innerTooltipText = this.tooltipText;
				}
			},
			immediate: true,
		},
	},

	methods: {
		clickHandler(e) {
			if (this.disabled) {
				return;
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
@import '../assets/sass/tokens.scss';

.cds-icon-button {
	&__container {
		color: $n-600;
		background-color: $n-0;
		border: 1px solid $n-50 !important;
		border-radius: $border-radius-extra-small;
		cursor: pointer;
		box-sizing: border-box;

		&:focus {
			outline: none !important;
		}

		&:hover {
			border-color: $n-100 !important;
		}
	}

	&--disabled {
		box-sizing: border-box;
		border: 1px solid transparent !important;
		color: $n-300 !important;
		background-color: $n-20 !important;
		cursor: default !important;

		&:hover {
			border: 1px solid transparent !important;
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
			width: 16px;
			height: 16px;
		}
	}

	&--md {
		padding: pYX(2, 2);
		border-radius: $border-radius-extra-small;

		.cds-icon-button__icon {
			width: 20px;
			height: 20px;
		}
	}

	&--lg {
		padding: pYX(2, 2);
		border-radius: $border-radius-extra-small;

		.cds-icon-button__icon {
			width: 24px;
			height: 24px;
		}
	}
}
</style>
