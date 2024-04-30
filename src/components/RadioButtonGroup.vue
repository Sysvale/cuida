<template>
	<span
		id="radioButton"
		:style="cssVars"
	>
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
					:for="option.value"
				>
					<input
						:id="option.value"
						v-model="selected"
						type="radio"
						:value="option.value"
						:disabled="option.disabled || disabled"
					>
					<label
						class="radio-button__content"
						:for="option.value"
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
		}
	},

	data() {
		return {
			selected: this.modelValue,
		};
	},

	computed: {
		cssVars() {
			return {
				'--border-color-selected': this.allowsExpand ? '#2db981' : '#2051a7',
				'--background-color': this.allowsExpand ? '#FAFCFE' : '#FFFFFF',
				'--display-vertical': this.allowsExpand ? 'flex' : 'inline-flex',
				'--width-vertical': this.allowsExpand ? '100%' : null
			}
		}
	},

	watch: {
		selected(value) {
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
<style lang="scss">
@import '../assets/sass/tokens.scss';

#radioButton [type="radio"]:checked,
#radioButton [type="radio"]:not(:checked) {
	position: absolute;
	left: -9999px;
}

#radioButton [type="radio"]:checked + label,
#radioButton [type="radio"]:not(:checked) + label {
	@include body-2;
	position: relative;
	padding: pl(7);
	cursor: pointer;
	line-height: 20px;
	color: $n-600;
	font-weight: $font-weight-semibold;
}

#radioButton [type="radio"]:checked + label:before,
#radioButton [type="radio"]:not(:checked) + label:before {
	content: '';
	position: absolute;
	left: -0.5px;
	top: 0.4px;
	width: 19px;
	height: 19px;
	border: 1px solid $n-600;
	border-radius: 100%;
}

#radioButton [type="radio"]:checked + label:after,
#radioButton [type="radio"]:not(:checked) + label:after {
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

#radioButton [type="radio"]:not(:checked) + label:after {
	opacity: 0;
	-webkit-transform: scale(0);
	transform: scale(0);
}

#radioButton [type="radio"]:checked + label:after {
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}

#radioButton .button-group {
	display: flex;
}

#radioButton .radio-button {
	border: 1px solid $n-50;
	padding: pYX(3, 4);
	border-radius: $border-radius-extra-small;
	cursor: pointer;
	display: var(--display-vertical);
	flex-direction: row;
	justify-content: space-between;
	gap: 20px;
	margin: mb(2);

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

#radioButton .radio-button:hover {
	background-color: $n-10;
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

#radioButton .radio-button:disabled {
	background-color: $n-100;
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

#radioButton .radio-button:disabled
	[type="radio"]:checked + label:before,
#radioButton .radio-button:disabled
	[type="radio"]:not(:checked) + label:before {
	background: transparent;
}

#radioButton .radio-button:has(input[type="radio"]:disabled) {
	background-color: $n-20;
}

#radioButton .radio-button:has(input[type="radio"]:checked) {
	border-color: var(--border-color-selected);
	background-color: var(--background-color);
}

#radioButton .radio-button:has(input[type="radio"]:checked){
	label::before {
		border-color: var(--border-color-selected) !important;
	}
}

#radioButton .radio-button:has(input[type="radio"]:disabled) {
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
