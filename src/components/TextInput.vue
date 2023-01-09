<template>
	<div>
		<span>
			<span
				v-if="hasSlots"
			>
				<slot name="label" />
			</span>

			<label
				v-else
				:class="labelDynamicClass"
			>
				<div
					class="label__content"
					for="cds-text-input"
				>
					<span>
						{{ label }}
					</span>

					<span
						v-if="required"
						class="label__required-indicator"
					>
						*
					</span>

					<cds-icon
						v-if="tooltip"
						v-cdstip="tooltip"
						:name="tooltipIcon"
						height="20"
						width="20"
						class="label__icon"
					/>
				</div>

				<cds-link
					v-if="linkText"
					class="label__link"
					:href="linkUrl"
					:text="linkText"
					new-tab
				/>
			</label>

		</span>

		<div :class="stepperInputDynamicClass">
			<input
				v-if="mask"
				id="cds-text-input"
				v-model="internalValue"
				v-facade="mask"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				:type="castToNumber ? 'number' : 'text'"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
			/>

			<input
				v-else-if="money"
				id="cds-text-input"
				v-model.lazy="internalValue"
				v-money="moneyDirectiveConfig"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
			/>

			<input
				v-else
				id="cds-text-input"
				v-model="internalValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				:type="castToNumber ? 'number' : 'text'"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
			/>

			<div class="text-input__icon-container">
				<check-icon
					v-if="validState && !disabled"
					size="1x"
					class="text-input__icon--check-icon"
				/>
				<alert-circle-icon
					v-if="errorState && !disabled"
					size="1x"
					class="text-input__icon--alert-circle-icon"
				/>
				<cds-spinner
					v-if="loadingState && !disabled"
					size="sm"
					variant="blue"
					class="text-input__icon--spinner-icon"
				/>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="text-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { CheckIcon, AlertCircleIcon } from 'vue-feather-icons';
import { VMoney } from 'v-money';
import Link from '../components/Link.vue';

export default {
	props: {
		/**
		* Prop utilizada como v-model.
		*/
		value: {
			type: [String, Number],
			default: '',
		},
		/**
		* Prop utilizada para converter o valor do input de String para Number.
		*/
		castToNumber: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica a label do input.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		 * Desabilita o input.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica o estado do TextInput. As opções são 'default', 'valid', 'loading' e 'invalid'.
		 */
		state: {
			type: String,
			default: 'default',
		},
		/**
		 * Exibe asterisco de obrigatório (obs.: não faz a validação)
		 */
		required: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica o placeholder do input
		 */
		placeholder: {
			type: String,
			default: 'Digite aqui a informação',
		},
		/**
		 * Especifica a mensagem de erro, que será exibida caso o estado seja inválido
		 */
		errorMessage: {
			type: String,
			default: 'Valor inválido',
		},
		/**
		 * Especifica se a largura do TextInput deve ser fluida.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Especifica a máscara a ser aplicada ao TextInput.
		 * Exemplo: "(##) #####-####"
		 */
		mask: {
			type: [Array, String],
			default: null,
		},
		/**
		 * Define exibição e texto do tooltip do input
		 */
		tooltip: {
			type: String,
			default: null,
		},
		/**
		 * Especifica ícone do tooltip do TextInput.
		 */
		tooltipIcon: {
			type: String,
			default: 'info-outline',
		},

		/**
		 * Especifica se o input deve exibir uma máscara monetária.
		 * Exemplo: "(##) #####-####"
		 */
		money: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define exibição e texto do link do input (localizado à direita da label).
		 */
		linkText: {
			type: String,
		},
		/**
		 * Define a url a ser acessada no clique do link (no caso do link ser exibido).
		 */
		linkUrl: {
			type: String,
			default: 'https://cuida.framer.wiki/',
		},
	},

	directives: {
		money: VMoney,
	},

	components: {
		CheckIcon,
		AlertCircleIcon,
		Link,
	},

	data() {
		return {
			internalValue: '',
			isBeingFocused: false,
			moneyDirectiveConfig: {
				decimal: ',',
				thousands: '.',
				prefix: 'R$ ',
				precision: 2,
				masked: false,
			},
		};
	},

	computed: {
		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		stepperInputDynamicClass() {
			let stepperInputClass = this.fluid ? 'text-input--fluid' : 'text-input';

			if (!this.isBeingFocused) {
				if (!this.disabled) {
					if (this.state === 'valid') {
						stepperInputClass += ' text-input--valid';
					} else if (this.state === 'invalid') {
						stepperInputClass += ' text-input--invalid';
					}
				} else {
					stepperInputClass += ' text-input--disabled';
				}
			} else if (!this.disabled) {
				if (this.state === 'default') {
					stepperInputClass += ' text-input--focused';
				} else if (this.state === 'valid') {
					stepperInputClass += ' text-input--focused-valid';
				} else if (this.state === 'invalid') {
					stepperInputClass += ' text-input--focused-invalid';
				} else if (this.state === 'loading') {
					stepperInputClass += ' text-input--focused-loading';
				}
			}

			return stepperInputClass;
		},

		labelDynamicClass() {
			return this.fluid ? 'text-input__label--fluid' : 'text-input__label';
		},

		validState() {
			return this.state === 'valid';
		},

		errorState() {
			return this.state === 'invalid';
		},

		loadingState(){
			return this.state === 'loading';
		},

		inputClass() {
			return this.fluid ? 'text-input__field--fluid' : 'text-input__field';
		},
	},

	watch: {
		value: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.internalValue = newValue;
				}
			},

			immediate: true,
		},
		internalValue(value) {
			/**
			 * Evento utilizado para implementar o v-model.
			 * @event input
			 * @type {Event}
			 */
			if (this.castToNumber || this.money) {
				let sanitizedInput = value;

				if(this.money) {
					sanitizedInput = sanitizedInput.replaceAll(this.moneyDirectiveConfig.prefix, '');
					sanitizedInput = sanitizedInput.replaceAll(this.moneyDirectiveConfig.thousands, '');
					sanitizedInput = sanitizedInput.replaceAll(this.moneyDirectiveConfig.decimal, '.');
				}

				if (sanitizedInput.length > 15) {
					this.internalValue = sanitizedInput.slice(0, 15);
				} else {
					if (sanitizedInput.length === 1) {
						sanitizedInput = sanitizedInput.replace(',', '0');
					}
					sanitizedInput = sanitizedInput.replace(',', '.');
					this.$emit('input', Number(sanitizedInput));
				}
			} else {
				this.$emit('input', value);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.text-input {
	display: flex;
	outline: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: 266px;

	&--fluid {
		@extend .text-input;
		width: 100%;
	}

	&__label {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-700;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 266px;

		&--fluid {
			@extend .text-input__label;
			width: 100%;
		}
	}

	&__icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: mr(3);
		min-width: 15px;
	}

	&__field {
		padding: pa(3);
		margin: mr(2);
		height: 40px !important;
		border-radius: $border-radius-extra-small;
		border: none;
		text-align: start;
		color: $n-600;

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .text-input__field;
			width: 100%;
		}
	}

	&--focused {
		@extend .text-input;
		outline: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--valid {
		@extend .text-input;
		outline: 1px solid $gp-500;
	}

	&--invalid {
		@extend .text-input;
		outline: 1px solid $rc-600;
	}

	&--focused-valid {
		@extend .text-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($gp-300, .45);
	}

	&--focused-invalid {
		@extend .text-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}

	&__icon--check-icon {
		color: $gp-500;
		height: 50%;
	}

	&__icon--alert-circle-icon {
		color: $rc-600;
		height: 50%;
	}

	&__icon--spinner-icon {
		padding: 0px;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}

.label {
	&__required-indicator {
		color: $rc-600;
	}

	&__icon {
		margin: ml(1);
		cursor: pointer;
	}

	&__link {
		justify-self: end;
	}
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: ma(0);
}

input:disabled {
	background: none !important;
}
</style>
