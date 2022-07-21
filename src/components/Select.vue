<template>
	<div
		id="cds-select"
	>
		<span
			class="select__label"
		>
			{{ label }}
		</span>

		<div class="select__container">
			<select class="select-dropdown">
				<option selected disabled hidden>
					{{ placeholder }}
				</option>
				<option
					v-for="option in options"
					:key="option.value"
				>
					{{ option.value }}
				</option>
			</select>
			<span class="custom-arrow"></span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Prop que especifica o título do select.
		 */
		label: {
			type: String,
			default: 'Label',
			required: true,
		},
		/**
		 * Prop que indica o texto que instrui o usuário a como interagir com o select.
		 */
		placeholder: {
			type: String,
			default: 'Selecione...',
		},
		/**
		 * Prop que indica o estado do select.
		 */
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Especifica a lista de opções do select.
		 */
		options: {
			type: Array,
			default: () => [],
			required: true,
		},
		/**
		 * Guarda o valor selecionado do select.
		 */
		value: {
			type: Object,
			default: () => {},
			required: true,
		},
	},

	data() {
		return {
			selected: this.value,
		};
	},

	computed: {
		predefinedStyle() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `badge--${this.variant}`;
			}
			return 'badge--gray';
		},
	},

	watch: {
		selected(currentOption) {
			this.$emit('input', currentOption);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.select {
	&-dropdown {
		border-radius: $border-radius-extra-small;
		max-width: 576px;
		height: 40px;
		border: 1px solid $n-50;
		background: $n-0;
		padding-right: spacer(5);
		padding-left: spacer(3);
		color: $n-600;
	}

	&__label {
		font-weight: $font-weight-semibold;
		color: $n-700;
		font-size: 14px;
		margin: mb(1);
	}

	&__container {
		width: fit-content;
		position: relative;
	}
}

.custom-arrow {
	position: absolute;
	top: 2px;
	right: 2px;
	display: block;
	background: $n-0;
	height: 36px;
	width: 36px;
	pointer-events: none;
	border-radius: $border-radius-small;
	display: flex;
	align-items: center;
	justify-content: center;
}

.custom-arrow::before,
.custom-arrow::after {
	content: '';
	width: 0;
	height: 0;
}

.custom-arrow::before {
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-bottom: 6px solid $n-100;
	border-radius: $border-radius-small;
	transition: all 0.25s ease-in-out;
	transform: rotate(180deg);
}
</style>
