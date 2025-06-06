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
				:id="`cds-password-input-${$attrs.id || generateKey()}`"
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
import CdsClickable from './Clickable.vue';
import { generateKey } from '../utils';


export default {
	directives: {
		cdstip: Cdstip,
	},

	components: {
		CdsIcon,
		CdsClickable,
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
		/**
		 * Define o tipo do input, se true será um input adaptador para o mobile
		 */
		mobile: {
			type: Boolean,
			default: false,
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
			const labelType = this.mobile ? 'mobile-label' : 'label';

			return this.fluid ? `password-input__${labelType}--fluid` : `password-input__${labelType}`;
		},

		inputClass() {
			const inputType = this.mobile ? 'mobile-field' : 'field';

			return this.fluid ? `password-input__${inputType}--fluid` : `password-input__${inputType}`;
		},

		errorState() {
			return this.state === 'invalid';
		},

		resolveInputWidth() {
			return this.mobile ? '300px' : '266px';
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
			 * @event update:modelValue
			 * @type {Event}
			 */
			this.$emit('update:modelValue', value);
		},
	},

	methods: {
		generateKey,
	
		handleShowPassword() {
			this.showPassword = !this.showPassword;
		},
	},
};
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;
.password-input {
	display: flex;
	justify-content: space-between;
	outline: 1px solid tokens.$n-50;
	border-radius: tokens.$border-radius-extra-small;
	width: v-bind(resolveInputWidth);
	background: tokens.$n-0;

	&--fluid {
		@extend .password-input;
		width: 100%;
	}

	&__label {
		@include tokens.label;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		width: 266px;

		&--fluid {
			@extend .password-input__label;
			width: 100%;
		}

		&__required-indicator {
			color: tokens.$rc-600;
		}

		&__content {
			margin: tokens.mb(1);
		}

		&__icon {
			margin: tokens.mTRBL(0, 0, n1, 1);
			cursor: pointer;
		}
	}

	&__mobile-label {
		@extend .password-input__label;
		font-size: 14px;
		font-weight: 700;

		&--fluid {
			@extend .password-input__mobile-label;
			width: 100%;
		}
	}

	&__field {
		padding: tokens.pa(3);
		margin: tokens.mr(2);
		height: 40px !important;
		border-radius: tokens.$border-radius-extra-small;
		border: none;
		text-align: start;
		color: tokens.$n-600;

		&::placeholder {
			color: tokens.$n-300;
		}

		&:focus {
			outline: 0;
		}

		&--fluid {
			@extend .password-input__field;
			width: 100%;
		}
	}

	&__mobile-field {
		@extend .password-input__field;
		@include tokens.body-2;
		font-weight: 400;
		height: 48px !important;
		border-radius: tokens.$border-radius-lil;


		&--fluid {
			@extend .password-input__mobile-field;
			width: 100%;
		}
	}

	&__password-toogle {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: tokens.$n-600;
		padding: tokens.pr(4);
		@include tokens.caption;
	}

	&__error-message {
		@include tokens.caption;
		color: tokens.$rc-600;
		margin: tokens.mt(1);
	}

	&--focused {
		@extend .password-input;
		outline: 1px solid tokens.$bn-300;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$bn-300, .45);
	}

	&--valid {
		@extend .password-input;
		outline: 1px solid tokens.$gp-500;
	}

	&--invalid {
		@extend .password-input;
		outline: 1px solid tokens.$rc-600;
	}

	&--focused-valid {
		@extend .password-input--valid;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$gp-300, .45);
	}

	&--focused-invalid {
		@extend .password-input--invalid;
		box-shadow: 0 0 0 0.2rem rgba(tokens.$rc-300, .45);
	}

	&--disabled {
		background-color: tokens.$n-20;
		pointer-events: none;
		border: none;
	}
}

input:disabled {
	background: none !important;
}
</style>
