<template>
	<div
		class="pin-input__container"
	>
		<input
			v-for="(number, index) in length"
			:id="`pin-input${number}`"
			:key="index"
			:ref="`pin-input${number}`"
			v-model="innerValue[number - 1]"
			:type="visible ? 'text' : 'password'"
			maxlength="1"
			class="pin-input"
			:class="computedClass"
			autocomplete="off"
			@keydown.delete.stop="handleBack(number)"
			@keypress="(event) => changeInputContent(event, number)"
			@input="(event) => handleInput(event, number)"
			@focus="fixCursorPosition(number)"
		>
	</div>
</template>

<script>
export default {
	props: {
		modelValue: {
			type: String,
			default: '',
		},
		length: {
			type: Number,
			default: 4
		},
		/**
		 * Especifica o estado do TextInput. As opções são 'default', 'valid' e 'invalid'.
		 */
		state: {
			type: String,
			default: 'default',
		},
		visible: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			innerValue: this.modelValue.split(''),
		};
	},

	computed: {
		computedClass() {
			switch (this.state) {
				case 'valid':
					return 'pin-input--valid';
				case 'invalid':
					return 'pin-input--invalid';
				default:
					return 'pin-input';
			}
		},
	},

	watch: {
		modelValue(value) {
			this.innerValue = value.split('');
		},
	},

	methods: {
		handleInput(event, index) {
			let stringifiedPin = this.innerValue.join('');

			if (index < this.length && event.inputType !== 'deleteContentBackward') {
				let nextInput = this.$refs[`pin-input${index + 1}`][0];
				nextInput.focus();
			}

			if (stringifiedPin.length === this.length) {
				this.$emit('update:modelValue', stringifiedPin);
			}
		},

		handleBack(index) {
			if (index > 1) {
				this.innerValue[index - 1] = '';
				let previousInput = this.$refs[`pin-input${index - 1}`][0];

				setTimeout(() => {
					previousInput.focus();
				}, 150);
			}
		},

		fixCursorPosition(index) {
			let input = this.$refs[`pin-input${index}`][0];
			setTimeout(() => {
				input.setSelectionRange(1, 1);
			}, 3);
		},

		changeInputContent(event, index) {
			this.$refs[`pin-input${index}`][0].value = event.key;

			if (index < this.length) {
				this.$refs[`pin-input${index + 1}`][0].focus();
			}
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
	.pin-input {
		height: 40px;
		box-sizing: border-box;
		width: 36px;
		border-radius: $border-radius-extra-small;
		border: 1px solid $n-100;
		text-align: center;
		font-size: 1.5em;
		transition: $interaction;

		&__container {
			display: flex;
			gap: 8px;
		}

		&:focus-visible {
			outline-color: $bn-300;
			color: $bn-300;
			transition: $interaction;
		}

		&--valid {
			@extend .pin-input;
			border: 1px solid $gp-500;

			&:focus-visible {
				outline-color: $gp-500;
			}
		}

		&--invalid {
			@extend .pin-input;
			border: 1px solid $rc-500;

			&:focus-visible {
				outline-color: $rc-500;
			}
		}
	}
</style>