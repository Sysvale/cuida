<template>
	<div>
		<label
			class="switch"
			:class="toggleSwitchSize"
		>
			<input
				v-model="isActive"
				type="checkbox"
				:disabled="disabled"
				@click="hadleClick"
			>
			<span
				tabindex="0"
				@focusout="internalFocus = false"
				@focusin="internalFocus = true"
				class="switch__slider"
				:class="{
					'switch__slider--active-focused': (internalFocus && isActive) && !disabled,
					'switch__slider--inactive-focused': (internalFocus && !isActive) && !disabled,
					'switch__slider--small': small && small !== large,
					'switch__slider--large': large && small !== large,
					'switch__slider--medium': small === large,
				}"
			/>
		</label>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isActive: this.value,
			internalFocus: this.focused,
		};
	},

	props: {
		/**
		* Prop utilizada como v-model. Controla a o estado do ToggleSwitch.
		*/
		value: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		* Torna o ToggleSwitch pequeno.
		*/
		small: {
			type: Boolean,
			default: false,
		},
		/**
		* Torna o ToggleSwitch grande.
		*/
		large: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla a disponibilidade do ToggleSwitch
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla o focus do ToggleSwitch
		 */
		focused: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		toggleSwitchSize() {
			if (this.small === this.large) {
				return 'switch--medium';
			}

			if (this.small) {
				return 'switch--small';
			}

			return 'switch--large';
		},
	},

	methods: {
		hadleClick() {
			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
				*/
			this.$emit('input', !this.isActive);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.switch {
	position: relative;
	display: inline-block;

	&--small {
		width: 28px;
		height: 16px;
	}

	&--medium {
		width: 40px;
		height: 23px;
	}

	&--large {
		width: 56px;
		height: 30px;
	}

	input {
		opacity: 0;
		width: 0;
		height: 0;

		&:checked + .switch__slider {
			background-color: $g-400;
		}

		&:checked + .switch__slider--small:before {
			-webkit-transform: translateX(12px);
			-ms-transform: translateX(12px);
			transform: translateX(12px);
		}

		&:checked + .switch__slider--medium:before {
			-webkit-transform: translateX(16px);
			-ms-transform: translateX(16px);
			transform: translateX(16px);
		}

		&:checked + .switch__slider--large:before {
			-webkit-transform: translateX(24px);
			-ms-transform: translateX(24px);
			transform: translateX(24px);
		}

		&:disabled + .switch__slider {
			cursor: default;
			background-color: $cinza-4;
		}

		&:disabled + .switch__slider:before {
			background-color: $cinza-3;
		}
	}

	&__slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $cinza-4;
		-webkit-transition: .35s;
		transition: .35s;
		border-radius: 80px;

		&--small {
			&:before {
				position: absolute;
				content: "";
				height: 12px;
				width: 12px;
				left: 2px;
				bottom: 2px;
				background-color: $branco;
				-webkit-transition: .35s;
				border-radius: $border-radius-circulo;
				transition: .35s;
			}
		}

		&--medium {
			&:before {
				position: absolute;
				content: "";
				height: 18px;
				width: 18px;
				left: 3px;
				bottom: 2.7px;
				background-color: $branco;
				-webkit-transition: .35s;
				border-radius: $border-radius-circulo;
				transition: .35s;
			}
		}

		&--large {
			&:before {
				position: absolute;
				content: "";
				height: 24px;
				width: 24px;
				left: 4px;
				bottom: 3px;
				background-color: $branco;
				-webkit-transition: .35s;
				border-radius: $border-radius-circulo;
				transition: .35s;
			}
		}

		&--medium:focus {
			outline: none;
		}

		&--active-focused {
			box-shadow: 0 0 0 0.2rem rgba($g-300, 45);
		}

		&--inactive-focused {
			box-shadow: 0 0 0 0.2rem rgba($b-300, .45);
		}
	}
}
</style>
