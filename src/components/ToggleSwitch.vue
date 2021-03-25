<template>
	<div>
		<label class="switch">
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
					'switch__slider--active-focused': internalFocus && isActive,
					'switch__slider--inactive-focused': internalFocus && !isActive,
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
	width: 56px;
	height: 30px;

	input {
		opacity: 0;
		width: 0;
		height: 0;

		&:checked + .switch__slider {
			background-color: $verde-piccolo-base;
		}

		&:checked + .switch__slider:before {
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

		&:focus {
			outline: none;
		}

		&:focus:before {
			bottom: 2.5px;
		}

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

		&--active-focused {
			box-shadow: 0 0 0 0.2rem rgba($verde-piccolo-light-1, .45);
			border: 1px solid $verde-piccolo-light-1;
		}

		&--inactive-focused {
			border: 1px solid $azul-bidu-light-1;
			box-shadow: 0 0 0 0.2rem rgba($azul-bidu-light-1, .45);
		}
	}
}
</style>
