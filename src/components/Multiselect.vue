<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span
		class="cds-multiselect"
		:data-cds-multiselect-identifier="uniqueKey"
	>
		<span>
			<span
				v-if="hasSlots"
			>
				<slot name="label" />
			</span>

			<label
				v-else
				class="clustered-multiselect__label"
			>
				<div
					class="label__content"
					:for="`clustered-multiselect-${uniqueKey}`"
				>
					<span>
						{{ label }}
					</span>

					<span
						v-if="required"
						class="label__required-indicator"
					>
						*
					</span>
				</div>
			</label>
		</span>

		<multiselect
			:id="`clustered-multiselect-${uniqueKey}`"
			ref="cds-multiselect"
			v-bind="attrs"
			v-model="selectedValue"
			:options="internalOptions"
			:label="optionsField"
			:track-by="trackBy"
			multiple
			:group-values="groupValues"
			:group-label="groupLabel"
			:close-on-select="false"
			:clear-on-select="false"
			select-label=""
			deselect-label=""
			selected-label=""
			:disabled="disabled"
			:placeholder="computedPlaceholder"
			:block-keys="['Delete', 'Enter']"
			@close="handleClose"
			@select="selectItem"
			@remove="unselectItem"
			@search-change="handleSearchChange"
		>
			<template
				#beforeList
			>
				<div
					v-show="!queryString && options.length"
				>
					<div
						v-if="!hideSelectAll"
						class="cds-multiselect__option multiselect__option"
						@click="toggleSelectAll"
					>
						<cds-spacer margin-left="2">
							<cds-checkbox
								:id="`select-all-input-id-${uniqueKey}`"
								v-model="selectAllValue"
								:label="selectAllFancyMessage"
								:indeterminate="indeterminate"
								:variant="variant"
							/>
						</cds-spacer>
					</div>

					<div
						v-if="!isGroupMode"
						class="cds-multiselect__grouped-divider"
					>
						<cds-divider dimmed />
					</div>
				</div>
			</template>

			<template
				#option="{ option }"
			>
				<div
					v-if="option.$isLabel"
					class="cds-multiselect__group-label"
				>
					<cds-divider
						:text="option.$groupLabel"
						inline
						dimmed
					/>
				</div>

				<div
					v-else
					class="cds-multiselect__option"
				>
					<div class="option__checkbox">
						<input
							:id="`input-${option[optionsField]}-${uniqueKey}`"
							v-model="option.isSelected"
							type="checkbox"
							:name="`input-${option[optionsField]}-${uniqueKey}`"
							:value="true"
						>
						<label
							:id="`checkbox-${option[optionsField]}`"
							:for="`input-${option[optionsField]}-${uniqueKey}`"
							:class="option.isSelected ? `option__checkbox--${variant}` : ''"
							@click="addItemViaCustomCheckbox(option)"
						/>
					</div>
					{{ option[optionsField] }}
				</div>
			</template>

			<template
				#selection="{ values, isOpen }"
			>
				<span
					v-if="values.length && !isOpen"
					class="multiselect__single"
				>
					{{ selectedFancyMessage(values.length) }}
				</span>
				<span v-else />
			</template>

			<template
				#noResult
			>
				Nenhum resultado encontrado para: "<strong>{{ queryString }} </strong>"
			</template>

			<template
				#noOptions
			>
				Não há nenhuma opção para ser exibida.
			</template>
		</multiselect>

		<div
			v-if="errorState && !disabled"
			class="clustered-multiselect__error-message"
		>
			{{ errorMessage }}
		</div>
	</span>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { generateKey } from '../utils';
import CdsDivider from './Divider.vue';
import CdsCheckbox from './Checkbox.vue';
import CdsSpacer from './Spacer.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';

const SELECTED = 0;
const NOT_SELECTED = 1;
const clone = (el) => {
	if(el === undefined) return {};
	return JSON.parse(JSON.stringify(el));
};
export default {
	components: {
		Multiselect,
		CdsDivider,
		CdsCheckbox,
		CdsSpacer,
	},

	props: {
		/**
		* Guarda o valor selecionado do multiselect.
		*/
		modelValue: {
			type: Array,
			required: true,
		},
		/**
		* Especifica a label do input.
		*/
		label: {
			type: String,
			default: 'text',
		},
		/**
		* A variante da Checkbox. São 10 variantes: 'turquoise', 'green', 'blue',
		* 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* Utilizada para comparar objetos. Seu valor deve ser único.
		*/
		trackBy: {
			type: String,
			default: 'value',
		},
		/**
		* Exibe asterisco indicativo de obrigatoriedade (obs.: não faz a validação)
		*/
		required: {
			type: Boolean,
			default: false,
		},
		/**
		* Desabilita o Multiselect.
		*/
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		* Especifica a mensagem de erro, que será exibida caso o estado seja inválido
		*/
		errorMessage: {
			type: String,
			default: 'Valor inválido',
		},
		/**
		* Especifica o estado do TextInput. As opções são 'default' e 'invalid'.
		*/
		state: {
			type: String,
			default: 'default',
		},
		/**
		* Lista de opções do Multiselect.
		*/
		options: {
			type: Array,
			required: true,
		},
		/**
		* Indica o nome da chave do objeto a ser considerada na renderização das opções do select.
		*/
		optionsField: {
			type: String,
			default: 'value',
			required: false,
		},
		/**
		* Permite ocultar o botão "selecionar todos"
		*/
		hideSelectAll: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			selectedValue: this.$attrs.modelValue || [],
			internalOptions: clone(this.options),
			groupValues: null,
			groupLabel: null,
			selectAllValue: false,
			queryString: '',
			indeterminate: false,
			sassColorVariables,
			uniqueKey: generateKey(),
		};
	},

	computed: {
		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		errorState() {
			return this.state === 'invalid';
		},

		selectedFancyMessage() {
			return (qty) => {
				if (qty === 1) {
					return this.selectedValue[0][this.optionsField];
				}
				return `${qty} opções selecionadas`;
			};
		},

		selectAllFancyMessage() {
			if (!this.hasSelectedValues) {
				return 'Selecionar todos';
			}

			return 'Desfazer seleção';
		},

		hasSelectedValues() {
			return this.selectedValue.length > 0;
		},

		isAllItemsSelected() {
			return this.selectedValue.length === this.options.length;
		},

		computedPlaceholder() {
			if (this.$attrs.placeholder) {
				return this.$attrs.placeholder;
			}

			return 'Selecione uma ou mais opções';
		},

		isGroupMode() {
			return (this.internalOptions[SELECTED] && this.internalOptions[SELECTED].$status)
				|| (this.internalOptions[NOT_SELECTED] && this.internalOptions[NOT_SELECTED].$status);
		},

		attrs() {
			const { label, trackBy, options, ...attrs } = this.$attrs;
			return attrs;
		},

		inputBackgroundColor() {
			return this.disabled ? this.sassColorVariables['n20'] : this.sassColorVariables['n0'];
		},
	},
	watch: {
		selectedValue(values) {
			const cleanedValues = clone(values);
			cleanedValues.forEach((val) => delete val.isSelected);
			this.indeterminate = values.length > 0 && values.length < this.options.length;
			/**
			 * Evento utilizado para implementar o v-model.
			* @event input
			* @type {Event}
			*/
			this.$emit('input', cleanedValues);

			/**
			* Evento que indica que o valor do Multiselect foi alterado
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', cleanedValues);
		},

		isAllItemsSelected(newValue) {
			if (!newValue && this.selectAllValue) {
				this.selectAllValue = false;
				return;
			}

			if (newValue && !this.selectAllValue) {
				this.selectAllValue = true;
			}
		},

		indeterminate(newValue) {
			const input = document.getElementById(`select-all-input-id-${this.uniqueKey}`);
			input.indeterminate = newValue;
		},
	},

	mounted() {
		if (this.modelValue === null || this.modelValue.length === 0) {
			return;
		}

		this.selectedValue = this.modelValue;
		this.updateRenderOptions();
		this.indeterminate = this.hasSelectedValues && this.selectedValue.length < this.options.length;
	},

	methods: {
		unselectItem(option) {
			this.handleSelectItem(option);
			/**
			 * Evento disparado quando um item é deselecionado.
			* @event remove
			* @type {Event}
				*/
			this.$emit('remove', option);
		},

		selectItem(option) {
			this.handleSelectItem(option);
			/**
			 * Evento disparado quando um item é selecionado.
			* @event select
			* @type {Event}
				*/
			this.$emit('select', option);
		},

		handleSelectItem(option) {
			if (this.isGroupMode) {
				this.internalOptions[SELECTED].options.forEach(item => {
					if (item[this.optionsField] === option[this.optionsField]) {
						item.isSelected = !item.isSelected;
					}
				});

				this.internalOptions[NOT_SELECTED].options.forEach(item => {
					if (item[this.optionsField] === option[this.optionsField]) {
						item.isSelected = !item.isSelected;
					}
				});
			} else {
				this.internalOptions.forEach(item => {
					if (item[this.optionsField] === option[this.optionsField]) {
						item.isSelected = !item.isSelected;
					}
				});
			}
		},

		toggleSelectAll() {
			this.selectAllValue = !this.hasSelectedValues;
			if (this.selectAllValue) {
				this.selectedValue = this.options;
			} else {
				this.selectedValue = [];
			}

			this.$nextTick().then(() => {
				if (this.isGroupMode) {

					this.internalOptions[SELECTED].options = this.internalOptions[SELECTED].options.map((item) => ({
						...item,
						isSelected: this.selectAllValue,
					}));

					this.internalOptions[NOT_SELECTED].options = this.internalOptions[NOT_SELECTED].options.map((item) => ({
						...item,
						isSelected: this.selectAllValue,
					}));
				} else {
					this.internalOptions = this.internalOptions.map((item) => ({
						...item,
						isSelected: this.selectAllValue,
					}));
				}
			});
		},

		addItemViaCustomCheckbox(option) {
			option.isSelected = !option.isSelected;
			this.selectedValue = [
				...this.selectedValue,
				option,
			];
		},

		handleClose() {
			this.updateRenderOptions();
			this.setContentWrapperScrollToTop();
			/**
			 * Evento disparado quando o select é fechado.
			* @event close
			* @type {Event}
				*/
			this.$emit('close');
		},

		updateRenderOptions() {
			if (!this.hasSelectedValues) {
				this.internalOptions = clone(this.options.map(item => ({
					...item,
					isSelected: false,
				})));

				this.groupValues = null;
				this.groupLabel = null;
				return;
			}

			this.selectedValue.forEach((item) => {
				item.isSelected = true;
			});

			let rawOptions = clone(this.options);
			rawOptions = rawOptions.map((item) => {
				const containsItem = this.selectedValue.some(
					value => value[this.optionsField] === item[this.optionsField]
				);

				if (containsItem) {
					item.isSelected = true;
				} else {
					item.isSelected = false;
				}

				return item;
			});

			this.internalOptions = [
				{
					$status: 'Selecionados',
					options: [],
				},
				{
					$status: 'Não selecionados',
					options: [],
				},
			];

			this.internalOptions[SELECTED].options = this.selectedValue;
			this.internalOptions[NOT_SELECTED].options = rawOptions.filter(item => !item.isSelected);
			this.groupValues = 'options';
			this.groupLabel = '$status';
		},

		handleSearchChange(queryString) {
			this.queryString = queryString;
		},

		setContentWrapperScrollToTop() {
			document.querySelector(`span[data-cds-multiselect-identifier='${this.uniqueKey}']`)
				.getElementsByClassName('multiselect__content-wrapper')[0]
				.scrollTo(0, 0);
		},
	},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
@import '../assets/sass/tokens.scss';

.label {
	&__required-indicator {
		color: $rc-600;
	}

	&__content {
		margin: mb(1);
	}
}

.cds-multiselect {
	&__grouped-divider {
		margin: mYX(2, 3);
	}
	.multiselect--disabled .multiselect__current, .multiselect--disabled .multiselect__select {
		background-color: transparent !important;
	}

	.multiselect--disabled {
		opacity: 1 !important;
	}

	.multiselect__tags {
		background-color: v-bind(inputBackgroundColor);
	}

	.multiselect__input, .multiselect__single {
		background-color: v-bind(inputBackgroundColor);
	}

	.multiselect__option--highlight {
		background: $n-20!important;
		outline: none!important;
		color: $n-700!important;
	}

	.multiselect__option--disabled.multiselect__option--group {
		background: $n-0 !important;
		color: $n-100!important;
		text-transform: uppercase!important;
		border-bottom: none!important;
	}

	input[type=checkbox] {
		visibility: hidden;
	}

	.cds-multiselect__option {
		display: flex;
		gap: 8px;
	}

	.cds-multiselect__group-label {
		@include caption;
		color: $n-400;
		text-transform: capitalize;
		font-weight: $font-weight-bold;
	}

	.option__checkbox {
		width: 15px;
		position: relative;
		margin-right: spacer(6);
		margin-left: spacer(n3);

		label {
			cursor: pointer;
			position: absolute;
			width: 16px;
			height: 16px;
			top: 0;
			border-radius: 4px;
			border: 0.5px solid $n-500;
			&:after {
				border: 2px solid $n-0;
				border-top: none;
				border-right: none;
				content: "";
				height: 5px;
				left: 4px;
				opacity: 0;
				position: absolute;
				top: 4.4px;
				transform: rotate(-45deg);
				width: 8px;
				border-radius: 0.4px;
			}
		}

		input[type=checkbox]:checked + label:after {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			filter: alpha(opacity=100);
			opacity: 1;
		}

		input[type="checkbox"]:indeterminate + label:after {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			filter: alpha(opacity=100);
			opacity: 1;
			border-left: none;
			top: 4px;
			width: 9px;
			transform: rotate(0deg);
		}

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color !important;
			border: none !important;
		}
	}

	.multiselect__single {
		@include body-2;
		color: $n-600 !important;
	}

	.multiselect__tags{
		border-bottom-left-radius: 8px !important;
		border-bottom-right-radius: 8px !important;
		border-top-right-radius: 8px !important;
		border-top-left-radius: 8px !important;
		border: 1px solid $n-50;
		height: 40px !important;
		align-items: center !important;
		display: flex !important;
		padding-right: spacer(8);
		padding-left: spacer(3);
	}

	.multiselect--active > .multiselect__tags {
		border-bottom-left-radius: 0px !important;
		border-bottom-right-radius: 0px !important;
	}

	.multiselect__tag {
		background: $n-20!important;
		color: $n-700!important;
		border: 1px solid $n-100!important;
	}

	.multiselect__tag-icon:after{
		color: $n-700!important;
	}

	.multiselect__tag-icon:focus,
	.multiselect__tag-icon:hover {
		background: $n-0 !important;
		color: $n-800!important;
	}

	.multiselect__tag-icon:focus:after,
	.multiselect__tag-icon:hover:after {
		color: $n-800!important;
	}

	.multiselect__select {
		top: 5px !important;
	}

	.multiselect__select:before {
		color: $n-100 !important;
		border-color: $n-100 transparent transparent !important;
	}

	.multiselect__option--selected.multiselect__option--highlight {
		background: $n-20!important;
		color: $n-800;
	}

	.multiselect__option--selected.multiselect__option--highlight:after {
		background: $n-20!important;
		color: $n-800!important;
	}

	.multiselect__option:not(.multiselect__option--selected) {
		background: $n-0 !important;
		color: $n-700!important;
		@include body-2;
	}

	.multiselect__option--selected {
		background: $n-0 !important;
		color: $n-800!important;
		@include body-2;
		font-weight: $font-weight-semibold;
	}

	.multiselect--disabled {
		background: transparent!important;
	}

	.multiselect__placeholder {
		color: $n-300 !important;
		@include body-2;
	}

	.multiselect__input {
		background-color: transparent !important;
		@include body-2;
		color: $n-700 !important;
	}

	.multiselect__content-wrapper {
		border-bottom-left-radius: $border-radius-extra-small !important;
		border-bottom-right-radius: $border-radius-extra-small !important;
		border: 1px solid $n-50;
		border-top: 0px !important;
	}

	.clustered-multiselect {
		&__label {
			@include label;
			display: flex;
		}
	}

	.clustered-multiselect__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}

	.multiselect__content:nth-child(1) {
		margin: mt(3) !important;
	}
}
</style>