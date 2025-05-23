<template>
	<div
		class="radio__button"
		:style="cssVars"
	>
		<CdsLabel
			:text="label"
			:tooltip="tooltip"
			:tooltip-icon="tooltipIcon"
			:required="required"
			:support-link="supportLink"
			:support-link-url="supportLinkUrl"
			:fluid="allowsExpand || fluid"
		/>

		<div
			:class="{'button-group': inline }"
		>
			<div
				v-for="(option, i) in options"
				:key="option.value"
				:class="{'radio-button__container--vertical': inline && i >= 0}"
				:style="allowsExpand || fluid ? 'width: 100%' : ''"
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
							{{ option.label }}
						</div>
						<div
							v-if="allowsExpand || fluid"
							class="content-body"
						>
							{{ option.body }}
						</div>
					</label>
				</label>
			</div>
		</div>

		<div
			v-if="hasError && !disabled"
			class="radio-button__error-text"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { colorHexCode, colorLightestHexCode } from '../utils/constants/colors';
import { generateKey } from '../utils';
import CdsLabel from './Label.vue';

const model = defineModel('modelValue', {
	type: [String, null],
});

const props = defineProps({
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
	* Define a quantidade de radio buttons a serem renderizados no grupo. Espera um array de objetos contendo, no mínimo, as propriedades `text` e `value`. Agora, a propriedade `label` também é suportada e pode ser usada no lugar de `text`. Na versão 4, apenas `label` e `value` serão aceitos.
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
		required: false,
	},
	/**
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser substituída pela prop `fluid` na v4. Quando verdadeiro, faz com que o button se adapte a expansão, podendo agora, adicionar uma descrição
	*/
	allowsExpand: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	* Quando verdadeiro, faz com que o button se adapte a expansão, podendo agora, adicionar uma descrição
	*/
	fluid: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	* Especifica o estado do RadioButtonGroup. As opções são 'default', 'valid', 'loading' e 'invalid'.
	*/
	state: {
		type: String,
		default: 'default',
	},
	/**
	* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	*/
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
	/**
	* A variante da Checkbox. São 10 variantes: 'teal', 'green', 'blue',
	* 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
	*/
	variant: {
		type: String,
		default: 'blue',
	},
	/**
	* Define exibição e texto do tooltip do DynamicInputList.
	*/
	tooltip: {
		type: String,
		default: null,
	},
	/**
	* Especifica ícone do tooltip do DynamicInputList.
	*/
	tooltipIcon: {
		type: String,
		default: 'info-outline',
	},
	/**
	* Controla a exibição e o conteúdo do link de suporte exibido ao lado da label.
	*/
	supportLink: {
		type: String,
		default: null,
	},
	/**
	* Define a url a ser acessada no clique do link de suporte.
	*/
	supportLinkUrl: {
		type: String,
		default: 'https://cuida.framer.wiki/',
	},
});

const selected = ref('');
const id = ref(`radio-group$-${generateKey()}`);

const cssVars = computed(() => {
	return {
		'--border-color-selected': colorHexCode(props.variant),
		'--background-color': colorLightestHexCode(props.variant),
		'--display-vertical': props.allowsExpand || props.fluid ? 'flex' : 'inline-flex',
		'--width-vertical': props.allowsExpand || props.fluid ? '100%' : null
	};
});

const radioButtonGroupWidth = computed(() => {
	return props.allowsExpand || props.fluid ? '100%' : '266px';
});

const hasError = computed(() => {
	return props.state === 'invalid';
});

watch(selected, (value) => {
	model.value = value;
});

watch(model, (newValue) => {
	selected.value = newValue;
}, { immediate: true });
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.radio-button {
	min-height: 46px;

	&__error-text {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}

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
	width: v-bind(radioButtonGroupWidth);

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
