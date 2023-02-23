<template>
	<div>
		<span>
			<span v-if="hasSlots">
				<slot name="label" />
			</span>
			<label
				v-else
				:class="labelDynamicClass"
			>
				<div
					class="password-input__label__content"
					for="cds-password-input"
				>
					<span>{{ label }}</span>

					<span
						v-if="required"
						class="password-input__label__required-indicator"
					>
						*
					</span>
					<cds-icon
						v-if="tooltip"
						v-cdstip="tooltip"
						:name="tooltipIcon"
						height="20"
						width="20"
						class="password-input__label__icon"
					/>
				</div>
			</label>
		</span>
		<div :class="stepperInputDynamicClass">
			<input
				id="cds-password-input"
				v-model="internalValue"
				:type="customInputType"
				:placeholder="placeholder"
				:disabled="disabled"
				:class="inputClass"
				@focus="isBeingFocused = true"
				@blur="isBeingFocused = false"
			>
			<div
				v-if="!disableTextPasswordInput"
				class="password-input__password-toogle"
			>
				<cds-clickable
					id="cds-clickable"
					clickable
					@click="handleShowPassword"
				>
					{{ customTextPasswordInput }}
				</cds-clickable>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="password-input__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import CdsIcon from './Icon.vue';
import Cdstip from '../utils/directives/cdstip';

export default {
	directives: {
		cdstip: Cdstip,
	},

	components: {
		CdsIcon
	},

	props: {
		/**
		* Prop utilizada como v-model.
		*/
		modelValue: {
			type: String,
			default: '',
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
		 * Especifica o estado do PasswordInput. As opções são 'default', 'valid' e 'invalid'.
		 */
		state: {
			type: String,
			default: 'default',
		},
		/**
		 * Exibe asterisco de campo obrigatório (obs.: não faz a validação).
		 */
		required: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica o placeholder do input.
		 */
		placeholder: {
			type: String,
			default: 'Digite aqui a informação',
		},
		/**
		 * Especifica a mensagem de erro, que será exibida caso o estado seja inválido.
		 */
		errorMessage: {
			type: String,
			default: 'Valor inválido',
		},
		/**
		 * Especifica se a largura do PasswordInput deve ser fluida.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
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
	},

	data() {
		return {
			internalValue: '',
			isBeingFocused: false,
			showPassword: false,
		};
	},

	computed: {
		customInputType() {
			return this.showPassword ? 'text' : 'password';
		},

		customTextPasswordInput() {
			return this.showPassword ? 'Ocultar' : 'Mostrar';
		},

		disableTextPasswordInput() {
			return this.internalValue.length < 1 || this.disabled;
		},

		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		stepperInputDynamicClass() {
			let stepperInputClass = this.fluid ? 'password-input--fluid' : 'password-input';

			if (!this.isBeingFocused) {
				if (!this.disabled) {
					if (this.state === 'valid') {
						stepperInputClass += ' password-input--valid';
					} else if (this.state === 'invalid') {
						stepperInputClass += ' password-input--invalid';
					}
				} else {
					stepperInputClass += ' password-input--disabled';
				}
			} else if (!this.disabled) {
				if (this.state === 'default') {
					stepperInputClass += ' password-input--focused';
				} else if (this.state === 'valid') {
					stepperInputClass += ' password-input--focused-valid';
				} else if (this.state === 'invalid') {
					stepperInputClass += ' password-input--focused-invalid';
				}
			}

			return stepperInputClass;
		},

		labelDynamicClass() {
			return this.fluid ? 'password-input__label--fluid' : 'password-input__label';
		},

		inputClass() {
			return this.fluid ? 'password-input__field--fluid' : 'password-input__field';
		},

		errorState() {
			return this.state === 'invalid';
		},
	},

	watch: {
		modelValue: {
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
			this.$emit('update:modelValue', value);
		},
	},

	methods: {
		handleShowPassword() {
			this.showPassword = !this.showPassword;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.password-input {
	display: flex;
	justify-content: space-between;
	outline: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: 266px;

	&--fluid {
		@extend .password-input;
		width: 100%;
	}

	&__label {
		@include label;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 266px;

		&--fluid {
			@extend .password-input__label;
			width: 100%;
		}

		&__required-indicator {
			color: $rc-600;
		}

		&__content {
			margin: mb(1);
		}

		&__icon {
			margin: mTRBL(0, 0, n1, 1);
			cursor: pointer;
		}
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
			@extend .password-input__field;
			width: 100%;
		}
	}

	&__password-toogle {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: $n-600;
		padding: pr(4);
		@include caption;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}

	&--focused {
		@extend .password-input;
		outline: 1px solid $bn-300;
		box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
	}

	&--valid {
		@extend .password-input;
		outline: 1px solid $gp-500;
	}

	&--invalid {
		@extend .password-input;
		outline: 1px solid $rc-600;
	}

	&--focused-valid {
		@extend .password-input--valid;
		box-shadow: 0 0 0 0.2rem rgba($gp-300, .45);
	}

	&--focused-invalid {
		@extend .password-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}
}

input:disabled {
	background: none !important;
}
</style>
