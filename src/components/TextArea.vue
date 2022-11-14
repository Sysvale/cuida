<template>
	<div>
		<label
			v-if="label"
			class="textarea__label"
			for="cds-text-area"
		>
			<!--
				@slot Slot para renderização customizada da label
				(Obs: Também existe a prop label que pode ser usada
				quando não há necessidade de customização)
			-->
			<slot name="label">
				{{ label }}
				<span
					v-if="required"
					class="textarea__label--required-indicator"
				>
					*
				</span>
			</slot>
		</label>
		<div :class="stepperInputDynamicClass">
			<textarea
				id="textarea"
                class="textarea__input"
				v-model="internalValue"
				:placeholder="placeholder"
				:disabled="disabled"
			/>
			<div class="textarea__icon-container">
				<check-icon
					v-if="validState && !disabled"
					size="1x"
					class="textarea__icon--check-icon"
				/>
				<alert-circle-icon
					v-if="errorState && !disabled"
					size="1x"
					class="textarea__icon--alert-circle-icon"
				/>
                <cds-spinner
					v-if="loadingState && !disabled"
					size="sm"
					variant="blue"
					class="textarea__icon--spinner-icon"
				/>
			</div>
		</div>
		<div
			v-if="errorState && !disabled"
			class="textarea__error-message"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script>
import { CheckIcon, AlertCircleIcon } from 'vue-feather-icons';

export default {
	props: {
		/**
		* Prop utilizada como v-model.
		*/
		value: {
			type: String,
			default: '',
			required: true,
		},

		/**
		 * Especifica a label do textarea.
		 */
		label: {
			type: String,
			default: 'Label',
		},

        /**
		* Exibe asterisco que indica campo obrigatório (Obs: Não faz a validação)
		*/
		required: {
			type: Boolean,
			default: false,
		},

		/**
		 * Especifica o placeholder do textarea.
		 */
		placeholder: {
			type: String,
			default: 'Digite aqui a descrição',
		},

        /**
		 * Desabilita o input do textarea.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},

		/**
		 * Especifica o estado do textarea. As opções são 'default', 'valid', 'invalid' e 'loading'.
		 */
		state: {
			type: String,
			default: 'default',
		},

        /**
         * Desabilita o input do textarea.
         */
        disabled: {
            type: Boolean,
            default: false,
        },

		/**
		 * Especifica a mensagem de erro que será exibida, caso o estado do textarea seja inválido.
		 */
		errorMessage: {
			type: String,
			default: 'Valor inválido',
		},


        /**
		 * Especifica se a largura do textarea deve ser fluida.
		 */
		fluid: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

    components: {
		CheckIcon,
		AlertCircleIcon,
	},

	data() {
		return {
			internalValue: this.value,
		};
	},
	computed: {
		stepperInputDynamicClass() {
			let stepperInputClass = this.fluid ? 'textarea--fluid' : 'textarea';

			if (!this.isBeingFocused) {
				if (!this.disabled) {
					if (this.state === 'valid') {
						stepperInputClass += ' textarea--valid';
					} else if (this.state === 'invalid') {
						stepperInputClass += ' textarea--invalid';
					}
				} else {
					stepperInputClass += ' textarea--disabled';
				}
			}

			return stepperInputClass;
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
			return this.fluid ? 'textarea__field--fluid' : 'textarea__field';
		},
	},

	watch: {
		internalValue(value) {
			/**
			* Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
			*/
			this.$emit('input', value);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

textarea {
    padding: pa(3);
    resize: none;
    height: 130px;

    &:focus {
        outline: none;
    }
}
.textarea {
    display: flex;
	border: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: fit-content;
	width: -moz-fit-content;

    &__input {
        width: 429px;
		height: 130px;
		border-radius: $border-radius-extra-small;
		resize: none;
		padding: pa(3);
        border: none;

		&:focus {
			border: 1px solid $bn-300;
			box-shadow: 0 0 0 0.2rem rgba($bn-300, .45);
		}
    }

	&__icon-container {
		background-color: none;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 0;
        margin-top: 12px;
	}

    &__icon--check-icon {
        position: absolute;
        left: 429px;
        color: $gp-500;
    }

    &__icon--alert-circle-icon {
        position: absolute;
        left: 429px;
        color: $rc-600;
    }

    &__icon--spinner-icon {
        position: absolute;
        left: 420px;
    }

    &--fluid {
        @extend .textarea;
		width: 100%;

        .textarea__input {
            width: 100%;
        }

        .textarea__icon--alert-circle-icon, 
        .textarea__icon--check-icon {
            left: 1149px;
        }
        .textarea__icon--spinner-icon {
            left: 1140px;
        }
	}

    &__label {
        @include body-2;
        font-weight: $font-weight-semibold;
        color: $n-700;

        &--required-indicator {
            color: $rc-600;
        }
    }

    &__field {
        padding: pa(3);
        margin: mr(2);
        border-radius: $border-radius-extra-small;
        border: none;
        text-align: start;
        color: $n-600;

        &:focus {
            outline: 0;
        }

        &--fluid {
            @extend .textarea__field;
            width: 100%;
        }
    }

	&--valid {
        @extend .textarea;
		border: 1px solid $gp-500;

        .textarea__input {
            &:focus {
                border: transparent;
                box-shadow: 0 0 0 0.2rem rgba($gp-300, .45) !important;
            }
        }
	}

	&--invalid {
        @extend .textarea;
		border: 1px solid $rc-600;

        .textarea__input {
            &:focus {
                border: transparent;
                box-shadow: 0 0 0 0.2rem rgba($rc-300, .45);
            }
        }
	}

	&--disabled {
		background-color: $n-20;
		pointer-events: none;
		border: none;
	}

	&__error-message {
		@include caption;
		color: $rc-600;
        margin-top: 2px;
	}
}
</style>
