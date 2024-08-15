<template>
	<div class="mobile__container">
		<input
			id="mobile-stepper-input"
			v-model="internalValue"
			:class="computedStepperClass"
			placeholder="0"
			type="number"
			:disabled="disabled"
		>
		<icon-button
			icon="minus-outline"
			size="lg"
			:disabled="disabled"
			@cds-click="$emit('minus')"
		/>
		<icon-button
			icon="plus-outline"
			size="lg"
			:disabled="disabled"
			@cds-click="$emit('plus')"
		/>
	</div>
</template>

<script>
import IconButton from './IconButton.vue';
import stateValidator from '../utils/validators/state';

export default {
	components: {
		IconButton,
	},

	props: {
		modelValue: {
			type: Number,
			default: 0,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		state: {
			type: String,
			default: 'default',
			validator: stateValidator,
		}
	},

	data() {
		return {
			internalValue: 0,
		};
	},

	computed: {
		computedStepperClass() {
			if (this.state === 'default') {
				return 'mobile__stepper';
			}

			return `mobile__stepper--${this.state}`;
		},
	},

	watch: {
		modelValue(newValue) {
			this.internalValue = newValue;
		},

		internalValue(newValue) {
			if (newValue === this.modelValue) {
				return;
			}

			this.$emit('update:modelValue', newValue);
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.mobile {
	&__container {
		display: flex;
		align-items: center;
		gap: spacer(2);
	}

	&__stepper {
		border: 1px solid $n-50;
		border-radius: $border-radius-extra-small;
		height: 42px;
		width: 70px;	
		padding: pYX(4, 3);
		color: $n-600;
		margin: mr(1);

		&:focus {
			outline: 0;
		}

		&--valid {
			@extend .mobile__stepper;
			outline: 1px solid $gp-500;
		}

		&--invalid {
			@extend .mobile__stepper;
			outline: 1px solid $rc-600;
		}
	}
}
</style>

