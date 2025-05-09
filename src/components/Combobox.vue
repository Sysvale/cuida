<template>
	<div
		ref="cds-combobox"
		v-cds-click-outside="onClickOutside"
		class="combobox"
	>
		<div
			class="combobox__container"
			:class="fluid ? 'combobox__container--fluid' : 'combobox__container--fit'"
		>
			<cds-base-input
				v-model="searchTerm"
				enable-top-content
				:label="label"
				:placeholder="`Buscar ${label.toLowerCase()}`"
				:state="state"
				:error-message="errorMessage"
				:required="required"
				:disabled="disabled"
				:fluid="fluid"
				:tooltip="tooltip"
				:tooltip-icon="tooltipIcon"
				@keydown="handleKeyDown"
				@click="handleClick"
				@focus="openDropdownIfNeeded"
				@blur="emitBlur"
				@input="(e) => searchTerm = e.target.value"
			>
				<template #top-content>
					<div
						v-for="(option, index) in modelValue"
						:key="option[optionsKeyField] || index"
					>
						<cds-badge
							:variant="variant"
							size="md"
							@click="toggleSelection(option)"
						>
							{{ option[optionsValueField] }}
						</cds-badge>
					</div>
				</template>
			</cds-base-input>
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
					<cds-check-box
						class="option__text"
						:variant="variant"
						:label="selectAllFancyMessage"
						:model-value="allSelect && hasSelect"
						:indeterminate="notAllSelect"
						@update:model-value="hasSelect ? deselectAll() : selectAll()"
					/>
					<cds-divider light />
					<div
						v-for="(option, index) in filteredOptions"
						:key="option[optionsKeyField] || index"
						class="option__text"
						:class="{ 'option__text--selected': isSelected(option[optionsKeyField]) }"
					>
						<cds-check-box
							:variant="variant"
							:label="option.value"
							:prominent="isSelected(option[optionsKeyField])"
							:model-value="isSelected(option[optionsKeyField])"
							@update:model-value="checked => toggleSelection(option, checked)"
						/>
					</div>
				</div>

				<div
					v-if="!showAddNewOption && searchTerm.length !== 0"
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
import { ref, computed, watch } from 'vue';
import CdsBaseInput from './BaseInput.vue';
import CdsDivider from './Divider.vue';
import CdsCheckBox from './Checkbox.vue';
import CdsBadge from './Badge.vue';

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
	 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
	 * 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
	 */
	variant: {
		type: String,
		default: 'green',
	},
});

defineEmits(['update:modelValue']);

/* REACTIVE DATA */
const localOptions = ref([]);
const selected = ref(new Set());
const isOpen = ref(false);
const searchTerm = ref('');

const modelValue = defineModel({ type: Array, default: () => [] });


/* COMPUTED */
const selectContainerWidth = computed(() => {
	return props.fluid ? '100%' : 'fit-content';
})

const optionContainerWidth = computed(() => {
	return props.fluid ? '100%' : '266px';
});

const optionContainerHeight = computed(() => {
	return props.options.length !== 0 ? 'auto' : '44px'
});

const selectAllFancyMessage = computed(() => {
	return modelValue.value.length >= 1
		? 'Desfazer seleção'
		: 'Selecionar todos'
});

const hasSelect = computed(() => modelValue.value.length > 0);

const allSelect = computed(() => modelValue.value.length === localOptions.value.length);
const notAllSelect = computed(() => hasSelect.value && !allSelect.value);

const filteredOptions = computed(() => {
	if (!searchTerm.value) return localOptions.value;
	return localOptions.value.filter(option =>
		option[props.optionsValueField]
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase())
	);
});

const showAddNewOption = computed(() => {
	return localOptions.value.some(option => 
		option[props.optionsValueField]
			.toLowerCase() === searchTerm.value.toLowerCase()
	);
});

/* WATCHERS */
watch(() => props.options, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		localOptions.value = newValue;
	}
}, { immediate: true });

watch(selected, () => {
	modelValue.value = localOptions.value.filter(option => selected.value.has(option[props.optionsKeyField]))
}, { deep: true })

/* FUNCTIONS */
const isSelected = (option) => selected.value.has(option);

const toggleSelection = (option) => {
	if (isSelected(option[props.optionsKeyField])) {
		selected.value.delete(option[props.optionsKeyField])
		return;
	}
	selected.value.add(option[props.optionsKeyField]);
};

const selectAll = () => {
	selected.value = new Set(localOptions.value.map(option => option[props.optionsKeyField]));
};

const deselectAll = () => {
	selected.value.clear();
};

const toggleAddNewOption = () => {
	const newOption = {
		[props.optionsValueField]: searchTerm.value,
		[props.optionsKeyField]: searchTerm.value.toLowerCase().trim().replace(/ /g, '-'),
	};
	selected.value.add(newOption[props.optionsKeyField]);
	localOptions.value.push(newOption);
	searchTerm.value = '';
};

const handleKeyDown = (event) => {
	if (event.key === 'Enter'
		&& searchTerm.value.trim() !== ''
		&& !showAddNewOption.value) {
		toggleAddNewOption();
	}
};

const onClickOutside = () => {
	isOpen.value = false;
	searchTerm.value = '';
}

const toggleDropdown = () => {
	isOpen.value = !isOpen.value;
};

const openDropdownIfNeeded = () => {
	if (!isOpen.value && (!searchTerm.value || searchTerm.value.trim() !== '')) {
		isOpen.value = true;
	}
};

const handleClick = () => {
	toggleDropdown();
	openDropdownIfNeeded();
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
@import '../assets/sass/placeholders.scss';

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

		&__options {
			@include body-2;
			width: v-bind(optionContainerWidth);
			height: v-bind(optionContainerHeight) !important;
			color: $n-700;
			outline: 1px solid $n-40;
			display: flex;
			flex-direction: column;
			margin-top: 6px;
			justify-items: center;
			text-overflow: ellipsis;
			max-height: 296px;
			overflow: auto;
			position: absolute;
			z-index: 999;
			background-color: $n-0;
			border-radius: $border-radius-extra-small;
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
				background: $n-100;
				border-radius: 5px;
				border-right: 3px solid transparent;
				border-left: 3px solid transparent;
				background-clip: padding-box;
			}

			&::-webkit-scrollbar-thumb:hover {
				background: $n-50;
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
		padding: pa(3);
		text-overflow: ellipsis;

		&--selected {
			background: $n-0 !important;
			color: $n-800!important;
			@include body-2;
			font-weight: $font-weight-semibold;

			&:hover {
				background: $n-20 !important;
			}
		}

		&--muted {
			@extend .option__text;
			color: $n-400;
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
	}

	&__button {
		@extend .option__text;
		border-top: 1px solid $n-30;
		font-weight: $font-weight-semibold;
		background-color: $n-20;
		position: sticky; 
		bottom: 0;
		z-index: 1;
	}
}
</style>
