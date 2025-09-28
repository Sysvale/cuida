<template>
	<div
		ref="cds-combobox"
		class="combobox"
	>
		<div
			class="combobox__container"
			:class="fluid ? 'combobox__container--fluid' : 'combobox__container--fit'"
		>
			<CdsBaseInput
				:model-value="searchTerm"
				:enable-top-content="selected.size > 0"
				:label="label"
				:placeholder="`Buscar ${label.toLowerCase()}`"
				:state="state"
				:error-message="errorMessage"
				:required="required"
				:disabled="disabled"
				:fluid="fluid"
				:tooltip="tooltip"
				:tooltip-icon="tooltipIcon"
				@keydown.enter="handleKeyDown"
				@click="handleClick"
				@focus="openDropdownIfNeeded"
				@update:model-value="(value) => searchTerm = value"
			>
				<template #top-content>
					<div
						v-for="(option, index) in selected"
						:key="index"
					>
						<CdsBadge
							style="cursor: pointer;"
							:variant="variant"
							size="md"
							@click="toggleSelection(option)"
						>
							<div class="badge">
								<CdsTruncate width="220">
									{{ option[optionsValueField] }}
								</CdsTruncate>
								<CdsIcon
									class="badge__icon"
									name="x-outline"
									height="12"
									width="12"
								/>
							</div>
						</CdsBadge>
					</div>
				</template>
			</CdsBaseInput>
			<div
				v-if="isOpen"
				ref="combobox-options"
				class="combobox__options"
				:class="selectOptionsClass"
			>
				<div
					v-if="localOptions.length > 0"
					class="option__container"
				>
					<CdsCheckBox
						class="option__text"
						:variant="variant"
						:label="selectAllFancyMessage"
						:model-value="allSelect && hasSelect"
						:indeterminate="notAllSelect"
						@update:model-value="hasSelect ? deselectAll() : selectAll()"
					/>
					<CdsDivider light />
					<div
						v-for="(option, index) in filteredOptions"
						:key="option[optionsKeyField] || index"
						class="option__text"
						:class="{ 'option__text--selected': isSelected(option[optionsKeyField]) }"
						@click="toggleSelection(option, isSelected(option[optionsKeyField]))"
					>
						<CdsCheckBox
							:variant="variant"
							:label="option[optionsValueField]"
							:prominent="isSelected(option)"
							:model-value="isSelected(option)"
						/>
					</div>
				</div>
				<div
					v-if="isOpen && localOptions.length === 0 && searchTerm.length === 0"
					class="combobox__empty"
				>
					Nenhuma opção encontrada
				</div>
				<div
					v-if="!searchTermIsOnOptions && hasValueOnSearchTeam"
					class="option__button"
					@click="toggleAddNewOption"
				>
					Adicionar {{ searchTerm }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, useTemplateRef, watchEffect } from 'vue';
import { onClickOutside } from '@vueuse/core';
import CdsBaseInput from './BaseInput.vue';
import CdsDivider from './Divider.vue';
import CdsCheckBox from './Checkbox.vue';
import CdsBadge from './Badge.vue';
import CdsTruncate from './Truncate.vue';
import CdsIcon from './Icon.vue';

defineOptions({ name: 'ComboBox' });

const props = defineProps({
	/**
	 * Especifica o título do select.
	 */
	label: {
		type: String,
		default: 'Label',
	},
	/**
	 * 
	 * Array de objetos que especifica a lista de opções do select. Os valores
	 * a serem mostrado como opções do select devem estar atribuídos a chave
	 * `value` do objeto.
	 */
	options: {
		type: Array,
		default: () => [],
		required: true,
	},
	/**
	 * Controla a exibição do asterísco indicativo de campo obrigatório.
	 */
	required: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	 * Especifica se a largura do select deve ser fluida.
	 */
	fluid: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	 * Especifica o status de interação do select.
	 */
	disabled: {
		type: Boolean,
		default: false,
		required: false,
	},
	/**
	* Indica o nome da chave do objeto a ser considerada na renderização
	* das opções do select.
	*/
	optionsKeyField: {
		type: String,
		default: 'name',
		required: true,
	},
	/**
	 * Indicar o nome do valor do objeto a ser considerado na renderização
	 */
	optionsValueField: {
		type: String,
		default: 'value',
		required: true,
	},
	/**
	* Especifica o estado do input. As opções são 'default', 'valid', 'loading' e 'invalid'.
	* @values default, valid, invalid, loading
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
	* A variante de cor. São 10 variantes:
	* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
	*/
	variant: {
		type: String,
		default: 'green',
	},
});

const emit = defineEmits(['update:modelValue']);

/* REACTIVE DATA */
const localOptions = ref([]);
const selected = ref(new Set());
const isOpen = ref(false);
const searchTerm = ref('');

const modelValue = defineModel({ type: Array, default: () => [] });
const componentContainer = useTemplateRef('cds-combobox');

/* COMPUTED */
const selectContainerWidth = computed(() => {
	return props.fluid ? '100%' : 'fit-content';
})

const optionContainerWidth = computed(() => {
	return props.fluid ? '100%' : '266px';
});

const selectAllFancyMessage = computed(() => {
	return selected.value.size >= 1
		? 'Desfazer seleção'
		: 'Selecionar todos'
});

const hasSelect = computed(() => selected.value.size > 0);

const allSelect = computed(() => selected.value.size === localOptions.value.length);
const notAllSelect = computed(() => hasSelect.value && !allSelect.value);

const filteredOptions = computed(() => {
	if (!searchTerm.value) return localOptions.value;
	return localOptions.value.filter(option =>
		option[props.optionsValueField]
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase())
	);
});

const hasValueOnSearchTeam = computed(() => !!searchTerm.value.trim());

const searchTermIsOnOptions = computed(() => {
	return localOptions.value.some(option => 
		option[props.optionsValueField]
			.toLowerCase() === searchTerm.value.trim().toLowerCase()
	)
});

/* WATCHERS */
watch(() => props.options, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		localOptions.value = newValue;
	}
}, { immediate: true });

watchEffect(() => {
	// Monitorando variáveis reativas : localOptions, modelValue e optionsKeyField
	const newSelected = new Set(
		localOptions.value.filter(option =>
			modelValue.value.some(
				item => item[props.optionsKeyField] === option[props.optionsKeyField]
			)
		)
	);

	// Monitorando alterações na variável reativa selected (Verifica se é diferente do que já está selecionado)
	const isDifferent = [...newSelected].some(option =>
		![...selected.value].some(
			sel => sel[props.optionsKeyField] === option[props.optionsKeyField]
		)
	);

	if (isDifferent) {
		selected.value = newSelected;
	}
});

watch(props.modelValue, (newValue) => {
	if (newValue && newValue.length > 0) {
		const preSelected = new Set(
			newValue.map(item => item[props.optionsKeyField])
		);
		selected.value = preSelected;
	}
}, { immediate: true });

watch(selected, () => {
	emit('update:modelValue', Array.from(selected.value));
}, { deep: true, immediate: true })

onClickOutside(componentContainer, () => {
	isOpen.value = false;
	searchTerm.value = '';
});

/* FUNCTIONS */
const isSelected = (option) => selected.value.has(option);

const toggleSelection = (option) => {
	if (isSelected(option)) {
		selected.value.delete(option)
		return;
	}
	selected.value.add(option);
};

const selectAll = () => {
	selected.value = new Set(localOptions.value);
};

const deselectAll = () => {
	selected.value.clear();
};

const toggleAddNewOption = () => {
	if (!hasValueOnSearchTeam.value || searchTermIsOnOptions.value) {
		return;
	}

	const newOption = {
		[props.optionsValueField]: searchTerm.value.trim(),
		[props.optionsKeyField]: searchTerm.value.toLowerCase().trim().replace(/ /g, '-'),
	};

	selected.value.add(newOption);
	localOptions.value.push(newOption);
	searchTerm.value = '';
};

const handleKeyDown = () => {
	toggleAddNewOption();
};

const toggleDropdown = () => {
	isOpen.value = !isOpen.value;
};

const openDropdownIfNeeded = () => {
	if (isOpen.value || (searchTerm.value && searchTerm.value.trim() === '')) {
		return;
	}

	isOpen.value = true;
};

const handleClick = () => {
	toggleDropdown();
	openDropdownIfNeeded();
};
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;
@use'../assets/sass/placeholders.scss';

	.combobox {
		width: v-bind(selectContainerWidth);

		&__input {
			&--default {
				width: 266px !important;
			}

			&--fluid {
				width: 100%;
			}
		}

		&__empty {
			padding: tokens.spacer(3);
			color: tokens.$n-300;
		}

		&__options {
			@include tokens.body-2;
			width: v-bind(optionContainerWidth);
			height: auto;
			color: tokens.$n-700;
			outline: 1px solid tokens.$n-40;
			display: flex;
			flex-direction: column;
			margin-top: 6px;
			justify-items: center;
			text-overflow: ellipsis;
			max-height: 296px;
			overflow: auto;
			position: absolute;
			z-index: 999;
			background-color: tokens.$n-0;
			border-radius: tokens.$border-radius-extra-small;
			animation: slide-down 0.2s ease-in-out;

			&--default {
				width: 300px;
			}

			&--fluid {
				width: 100%;
			}

			&::-webkit-scrollbar {
				width: 12px;
				border-radius: 20px;
			}

			&::-webkit-scrollbar-track {
				background: transparent;
			}

			&::-webkit-scrollbar-thumb {
				background: tokens.$n-100;
				border-radius: 5px;
				border-right: 3px solid transparent;
				border-left: 3px solid transparent;
				background-clip: padding-box;
			}

			&::-webkit-scrollbar-thumb:hover {
				background: tokens.$n-50;
			}

			&--up {
				bottom: 40px;
				width: 100%;
			}

			&--down {
				width: 100%;
			}
		}

		&__container {
			position: relative;

			&--fluid {
				width: 100%;
			}

			&--fit {
				width: fit-content;
			}
		}

		&__selected {
			display: flex;
			flex-direction: column;
			margin-top: 6px;
			justify-items: center;
			text-overflow: ellipsis;
			max-height: 296px;
			overflow: auto;

			&--label {
				font-size: 12px;
			}
		}
	}

.option {
	&__text {
		padding: tokens.pa(3);
		text-overflow: ellipsis;

		&--selected {
			background: tokens.$n-0 !important;
			color: tokens.$n-800!important;
			@include tokens.body-2;
			font-weight: tokens.$font-weight-semibold;

			&:hover {
				background: tokens.$n-20 !important;
			}
		}

		&--muted {
			@extend .option__text;
			color: tokens.$n-400;
		}

		&:last-of-type {
			position: sticky;
			top: 0;
		}
	}

	&__container {
		list-style-type: none;
		margin: 0;
		padding: 0;
		cursor: pointer;
	}

	&__button {
		@extend .option__text;
		cursor: pointer;
		border-top: 1px solid tokens.$n-30;
		font-weight: tokens.$font-weight-semibold;
		background-color: tokens.$n-20;
		position: sticky; 
		bottom: 0;
		z-index: 1;
	}
}

.badge {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: tokens.spacer(1);

	&__icon {
		margin-top: 1px;
	}
}
</style>
