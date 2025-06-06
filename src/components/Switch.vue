<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<span
			class="switch__label"
		>
			{{ label }}

			<CdsIcon
				v-if="tooltip"
				v-cdstip="tooltip"
				:name="tooltipIcon"
				height="18"
				width="18"
				class="label__icon"
			/>
		</span>


		<label
			class="switch"
			:class="switchSize"
		>
			<input
				v-model="isActive"
				type="checkbox"
				:disabled="disabled"
				@click="handleClick"
			>
			<span
				ref="componentRef"
				tabindex="0"
				class="switch__slider"
				:class="[
					`switch__slider--${variant}`,
					{
						[`switch__slider--active-focused--${variant}`]: (internalFocus && isActive) && !disabled,
						'switch__slider--inactive-focused': (internalFocus && !isActive) && !disabled,
						'switch__slider--small': small && small !== large,
						'switch__slider--large': large && small !== large,
						'switch__slider--medium': small === large,
					}
				]"
				@focusout="internalFocus = false"
				@focusin="internalFocus = true"
				@keydown.enter="handleClick"
			/>
		</label>

		<template
			v-if="supportingText"
		>
			<ul
				v-if="Array.isArray(supportingText)"
				class="switch__supporting-text-container"
			>
				<li
					v-for="text in supportingText"
					:key="text"
					class="switch__supporting-text-list"
				>
					{{ text }}
				</li>
			</ul>

			<div
				v-else
				class="switch__supporting-text"
			>
				{{ supportingText }}
			</div>
		</template>
	</div>
</template>

<script setup>
import { ref, computed, watch, useTemplateRef } from 'vue';
import CdsIcon from './Icon.vue';

const model = defineModel('modelValue', {
	type: Boolean,
});

const props = defineProps({
	/**
	* Especifica a label do Switch.
	*/
	label: {
		type: String,
		default: '',
	},
	/**
	* Torna o Switch pequeno.
	*/
	small: {
		type: Boolean,
		default: false,
	},
	/**
	* A variante da Checkbox. São 10 variantes: 'teal', 'green', 'blue',
	* 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
	*/
	variant: {
		type: String,
		default: 'green',
	},
	/**
	* Torna o Switch grande.
	*/
	large: {
		type: Boolean,
		default: false,
	},
	/**
	 * Controla a disponibilidade do Switch
	 */
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	 * Controla o focus do Switch
	 */
	focused: {
		type: Boolean,
		default: false,
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
	* Especifica mensagem de auxílio.
	*/
	supportingText: {
		type: [String, Array],
		default: '',
	},
});

const isActive = ref(props.modelValue);
const internalFocus = ref(props.focused);
const componentRef = useTemplateRef('componentRef');

const switchSize = computed(() => {
	if (props.small === props.large) {
		return 'switch--medium';
	}

	if (props.small) {
		return 'switch--small';
	}

	return 'switch--large';
});

watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		isActive.value = newValue;
	}
});

function handleClick() {
	model.value = !isActive.value;
};

defineExpose({ componentRef });
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;
@use'../assets/sass/placeholders.scss';

.switch {
	position: relative;
	display: inline-block;

	&__supporting-text-container {
		@extend %custom-ul;
	}

	&__supporting-text {
		&:nth-child(1) {
			margin: tokens.mt(2);
		}

		@include tokens.caption;
		color: tokens.$n-600;
		margin: tokens.mt(1);
	}

	&__supporting-text-list {
		@extend .switch__supporting-text;
		@extend %custom-li;
	}

	&__label {
		@include tokens.label;
	}

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
			@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				background-color: $base-color !important;
			}
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
			background-color: tokens.$n-40;
		}

		&:disabled + .switch__slider:before {
			background-color: tokens.$n-30;
		}
	}

	&__slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: tokens.$n-50;
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
				background-color: tokens.$n-0;
				-webkit-transition: .35s;
				border-radius: tokens.$border-radius-circle;
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
				bottom: 3px;
				background-color: tokens.$n-0;
				-webkit-transition: .35s;
				border-radius: tokens.$border-radius-circle;
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
				background-color: tokens.$n-0;
				-webkit-transition: .35s;
				border-radius: tokens.$border-radius-circle;
				transition: .35s;
			}
		}

		&--medium:focus {
			outline: none;
		}

		&--active-focused {
			@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				box-shadow: 0 0 0 0.2rem $shade-200;
			}
		}

		&--inactive-focused {
			box-shadow: 0 0 0 0.2rem tokens.$n-40;
		}
	}
}

.label__icon {
	margin: tokens.mTRBL(0, 0, n1, 1);
	cursor: default;
	color: tokens.$n-700;
}
</style>
