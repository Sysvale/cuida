<template>
	<span
		class="radio__button"
		:style="cssVars"
	>
		<div class="radio-button__label">
			<span>{{ label }}</span>

			<span
				v-if="required && label"
				class="radio-button__required"
			>
				*
			</span>
		</div>

		<div
			:class="{'button-group': inline }"
		>
			<div
				v-for="(option, i) in options"
				:key="option.value"
				:class="{'radio-button__container--vertical': inline && i >= 0}"
				:style="allowsExpand ? 'width: 100%' : ''"
			>
				<label
					class="radio-button"
					:disabled="option.disabled || disabled"
					:for="`${$attrs.id || id}-${option.value}`"
				>
					<input
						:id="`${$attrs.id || id}-${option.value}`"
						v-model="selected"
						type="radio"
						:value="option.value"
						:disabled="option.disabled || disabled"
					>
					<label
						class="radio-button__content"
						:for="`${$attrs.id || id}-${option.value}`"
					>
						<div class="content-title">
							{{ option.text }}
						</div>
						<div
							v-if="allowsExpand"
							class="content-body"
						>
							{{ option.body }}
						</div>
					</label>
				</label>
			</div>
		</div>
	</span>
</template>

<script>
import { colorHexCode, colorLightestHexCode } from '../utils/constants/colors';
import { generateKey } from '../utils';

export default {
	props: {
		/**
		 * A prop usada como v-model para monitorar a seleção do RadioButton
		*/
		modelValue: {
			type: [String, null],
			default: null,
			required: true,
		},
		/**
		 * Especifica o título do grupo de radio buttons
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		 * Especifica se o grupo de radio buttons é obrigatório
		 */
		required: {
			type: Boolean,
			default: false,
		},
		/**
		 * O número de radio buttons a ser renderizado no grupo
		 */
		options: {
			type: Array,
			default: () => [],
			required: true,
		},
		/**
		 * Controla o status do grupo de radio buttons
		 */
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Quando verdadeira, faz com que os radio buttons sejam renderizados um ao lado do outro
		 */
		inline: {
			type: Boolean,
			default: false,
			description: `When true, the radio buttons will be displayed in a row.`,
			required: false,
		},
		/**
		 * Quando verdadeiro, faz com que o button se adapte a expansão, podendo agora, adicionar uma descrição
		 */
		allowsExpand: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		* A variante da Checkbox. São 10 variantes: 'teal', 'green', 'blue',
		* 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
		*/
		variant: {
			type: String,
			default: 'blue',
		},
	},

	data() {
		return {
			selected: this.modelValue,
			id: `radio-group$-${generateKey()}`,
		};
	},

	computed: {
		cssVars() {
			return {
				'--border-color-selected': colorHexCode(this.variant),
				'--background-color': colorLightestHexCode(this.variant),
				'--display-vertical': this.allowsExpand ? 'flex' : 'inline-flex',
				'--width-vertical': this.allowsExpand ? '100%' : null
			}
		},
	},

	watch: {
		selected(value) {
			/**
			 * Evento utilizado para implementar o v-model.
			 * @event update:modelValue
			 * @type {Event}
			 */
			this.$emit('update:modelValue', value);
		},

		modelValue: {
			handler(newValue) {
				this.selected = newValue;
			},
			immediate: true,
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.radio__button [type="radio"]:checked,
.radio__button [type="radio"]:not(:checked) {
	position: absolute;
	left: -9999px;
}

.radio__button [type="radio"]:checked + label,
.radio__button [type="radio"]:not(:checked) + label {
	@include body-2;
	position: relative;
	padding: pl(7);
	cursor: pointer;
	line-height: 20px;
	color: $n-600;
	font-weight: $font-weight-semibold;
}

.radio__button [type="radio"]:checked + label:before,
.radio__button [type="radio"]:not(:checked) + label:before {
	content: '';
	position: absolute;
	left: -0.5px;
	top: 0.4px;
	width: 19px;
	height: 19px;
	border: 1px solid $n-600;
	border-radius: 100%;
}

.radio__button [type="radio"]:checked + label:after,
.radio__button [type="radio"]:not(:checked) + label:after {
	content: '';
	width: 10px;
	height: 10px;
	background: var(--border-color-selected);
	position: absolute;
	top: 5px;
	left: 4px;
	border-radius: 100%;
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.radio__button [type="radio"]:not(:checked) + label:after {
	opacity: 0;
	-webkit-transform: scale(0);
	transform: scale(0);
}

.radio__button [type="radio"]:checked + label:after {
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}

.radio__button .button-group {
	display: flex;
}

.radio__button .radio-button {
	border: 1px solid $n-50;
	padding: pYX(3, 4);
	border-radius: $border-radius-extra-small;
	cursor: pointer;
	display: var(--display-vertical);
	flex-direction: row;
	justify-content: space-between;
	gap: 20px;
	margin: mb(2);

	&__label {
		@include label;
		margin: mb(3);
		color: $n-700;
	}

	&__required {
		color: $rc-600;
	}

	&__container--vertical {
		margin: mr(4);
		&:last-child {
			margin-right: 0px;
		}
	}

	&__container--vertical-expanded {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
}

.radio__button .radio-button:hover {
	background-color: $n-10;
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.radio__button .radio-button:disabled {
	background-color: $n-100;
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.radio__button .radio-button:disabled
	[type="radio"]:checked + label:before,
.radio__button .radio-button:disabled
	[type="radio"]:not(:checked) + label:before {
	background: transparent;
}

.radio__button .radio-button:has(input[type="radio"]:disabled) {
	background-color: $n-20;
}

.radio__button .radio-button:has(input[type="radio"]:checked) {
	border-color: var(--border-color-selected);
	background-color: var(--background-color);
}

.radio__button .radio-button:has(input[type="radio"]:checked){
	label::before {
		border-color: var(--border-color-selected) !important;
	}
}

.radio__button .radio-button:has(input[type="radio"]:disabled) {
	label::before {
		border-color: $n-300;
	}

	.content-title {
		color: $n-300;
	}
}

.content-body {
	@include caption;
}
</style>
