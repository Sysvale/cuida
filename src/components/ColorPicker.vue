<template>
	<div v-if="inline">
		<div class="color-picker__label">
			{{ label }}
		</div>

		<div
			v-for="(swatchline, i) in swatch"
			:key="i"
			class="color-picker__container"
		>
			<div
				v-for="(color, j) in swatchline"
				:key="j"
			>
				<div
					:class="`color-picker__swatch--${color.replace('$', '')}`"
					@click="SwatchSelection(color)"
				>
					<CdsIcon
						v-if="isCurrentColorSelected(color)"
						height="22"
						width="22"
						name="check-outline"
						class="swatch__icon"
						:class="iconColorResolver"
					/>
				</div>
			</div>
		</div>
	</div>

	<div v-else>
		<div
			id="color-picker"
			class="color-picker__trigger"
			@click.stop="showPopover = !showPopover"
		>
			<div class="color-picker__preview" /> 
		</div>

		<CdsPopover
			v-model="showPopover"
			:right-aligned="false"
			target-id="color-picker"
			:height="popoverHeight"
			fit-content-width
		>
			<div
				v-for="(swatchline, i) in swatch"
				:key="i"
				class="popover__container"
			>
				<div
					v-for="(color, j) in swatchline"
					:key="j"
				>
					<div
						:class="`color-picker__swatch--${color.replace('$', '')}`"
						@click="SwatchSelection(color)"
					>
						<CdsIcon
							v-if="isCurrentColorSelected(color)"
							height="22"
							width="22"
							name="check-outline"
							class="swatch__icon"
							:class="iconColorResolver"
						/>
					</div>
				</div>
			</div>
		</CdsPopover>
	</div>
	<div
		v-if="hasError"
		class="error-text"
	>
		{{ errorMessage }}
	</div>
</template>

<script>
import CdsPopover from './Popover.vue';
import CdsIcon from './Icon.vue';
import sassColorVariables from '../assets/sass/tokens/colors.module.scss';
import ContrastChecker from '../utils/methods/contrastChecker';
import paleteBuilder from '../utils/methods/paleteBuilder.js';

export default {
	name: 'CdsColorPicker',
	components: {
		CdsPopover,
		CdsIcon,
	},

	props: {
		/**
		* Guarda a cor selecionada no Color Picker.
		*/
		modelValue: {
			type: String,
			required: true,
		},
		/**
		 * Especifica a label do ColorPicker.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		* Quando true passa a mostrar as opções de cores fora do popover.
		*/
		inline: {
			type: Boolean,
			default: false,
		},
		/**
		* Especifica a altura do popover. ⚠️ Quando a prop inline estiver ativa essa prop não surte efeito.
		*/
		popoverHeight: {
			type: Number,
			default: 190,
		},
		/**
		* Conjunto de cores a serem renderizadas no ColorPicker. A prop espera um Array de Array de tokens de cor. Ex.: tokens.$gp-400
		*/
		swatch: {
			type: Array,
			default: () => ([]),
		},
		/**
		* Especifica o estado do TextInput. As opções são 'default', 'valid', 'loading' e 'invalid'.
		* @values default, valid, loading, invalid
		*/
		state: {
			type: String,
			default: 'default',
		},
		/**
		* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
		*/
		errorMessage: {
			type: String,
			default: 'Valor inválido',
		},
	},

	data() {
		return {
			selectedColor: this.modelValue,
			sassColorVariables,
			showPopover: false,
		};
	},

	computed: {
		iconColorResolver() {
			return this.ContrastChecker(this.selectedColor, '#FFFFFF', 'POOR') 
				? 'swatch__icon--white'
				: 'swatch__icon--black';
		},

		palete() {
			return this.paleteBuilder(this.sassColorVariables.palete);
		},

		hasError() {
			return this.state === 'invalid';
		},
	},

	watch: {
		modelValue: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.selectedColor = newValue;
				}
			},
			immediate: true,
		},
	},

	methods:{
		paleteBuilder,
		ContrastChecker,

		SwatchSelection(color) {
			let selectedVariant = '';

			this.selectedColor = this.sassColorVariables[color.replace(/-|\$/gi, '')];
			this.palete.forEach(paleteColor => {
				if (paleteColor.colorTokens.find(token => token === color)) {
					selectedVariant = paleteColor.variantName.toLowerCase();
				}
			});

			this.showPopover = false;

			/**
			 * **Implementa v-model**. Evento utilizado para emitir a *cor* selecionada. A cor é emitida como uma string no formato HEX.
			 * @event update:modelValue
			 * @type {Event}
			*/
			this.$emit('update:modelValue', this.selectedColor);
			/**
			 * Evento utilizado para emitir a *variante* da cor selecionada. A variante é emitida como uma string. ⚠️ Importante: a variante emitida só irá mudar se a cor mudar. A mudança de shade dentro da mesma cor não altera a variante. Ex.: tokens.$gp-400 e tokens.$gp-600 emitirão a mesta variante, a saber, "green".
			 * @event update:colorVariant
			 * @type {Event}
			*/
			this.$emit('variant-chosen', selectedVariant);
		},

		isCurrentColorSelected(color) {
			return this.selectedColor === this.sassColorVariables[color.replace(/-|\$/gi, '')];
		},
	},
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.color-picker {
	&__container {
		display: flex;
	}

	&__label {
		margin: tokens.mb(1);
		@include tokens.label;
	}

	&__swatch {
		@include tokens.paleteResolver using ($color) {
			background-color: $color;
			height: 24px;
			width: 24px;
			border-radius: 4px;
			margin: tokens.mTRBL(1, 1, 0, 0);
			padding-top: 2px;
			padding-left: 1px;
			cursor: pointer;
			transition: tokens.$interaction;

			&:hover {
				transform: scale(1.1);
				transition: tokens.$interaction;
			}
		}
	}

	&__trigger {
		padding: tokens.pa(1);
		outline: 1px solid tokens.$n-50;
		width: fit-content;
		border-radius: tokens.$border-radius-lil;
		transition: tokens.$hover;
		cursor: pointer;

		&:hover {
			outline: 1px solid tokens.$n-200;
			transition: tokens.$hover;
		}
	}

	&__preview {
		height: 24px;
		width: 24px;
		border-radius: 4px;
		background-color: v-bind(selectedColor);
	}
}

.swatch {
	&__icon {
		&--white {
			color: tokens.$n-0;
		}

		&--black {
			color: tokens.$n-900;
		}
	}
}

.popover__container {
	display: flex;
}

.error-text {
	@include tokens.caption;
	color: tokens.$rc-600;
	margin: tokens.mt(1);
}
</style>
