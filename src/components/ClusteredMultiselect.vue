<template>
	<span
		id="cds-multiselect"
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
				for="clustered-multiselect"
			>
				<span>
					{{ inputLabel }}
				</span>
	
				<span
					v-if="required"
					class="clustered-multiselect__label--required-indicator"
				>
					*
				</span>
	
			</label>
		</span>

		<multiselect
			id="clustered-multiselect"
			v-model="selectedValue"
			v-bind="attrs"
			:options="internalOptions"
			:label="label"
			:track-by="trackBy"
			multiple
			:group-values="groupValues"
			:group-label="groupLabel"
			:close-on-select="false"
			:clear-on-select="false"
			select-label=''
			deselect-label=''
			selected-label=''
			:placeholder="computedPlaceholder"
			:block-keys="['Delete', 'Enter']"
			@close="handleClose"
			@select="selectItem"
			@remove="unselectItem"
			@search-change="handleSearchChange"
		>
			<template
				slot="beforeList"
				slot-scope="{}"
			>
				<div
					v-show="!queryString && options.length"
				>
					<div
						class="cds-multiselect__option multiselect__option mt-3"
						@click="toggleSelectAll"
					>
						<div class="option__checkbox">
							<input
								id="select-all-input-id"
								ref="select-all-ref"
								v-model="selectAllValue"
								type="checkbox"
								name="select-all-input-name"
								:value="true"
							>
							<label
								id="select-all-label"
								for="select-all-input-name"
								:class="{
									'option__checkbox--checked': selectAllValue,
									'option__checkbox--indeterminate': indeterminate,
								}"
								@click.stop="toggleSelectAll"
							/>
						</div>
						{{ selectAllFancyMessage }}
					</div>
					<div
						v-if="!isGroupMode"
						class="mx-2 my-3"
					>
						<hr class="my-0">
					</div>
				</div>
			</template>
			<template
				slot="option"
				slot-scope="{ option }"
			>
				<div
					v-if="option.$isLabel"
					class="cds-multiselect__group-label"
				>
					<small class="font-weight-bold">{{ option.$groupLabel }}</small>
					<div class="flex-grow-1 ml-2">
						<hr class="mx-0" />
					</div>
				</div>
				<div
					v-else
					class="cds-multiselect__option"
				>
					<div class="option__checkbox">
						<input
							v-model="option.isSelected"
							type="checkbox"
							:id="`input-${option[label]}`"
							:name="`input-${option[label]}`"
							:value="true"
						/>
						<label
							:id="`checkbox-${option[label]}`"
							:for="`input-${option[label]}`"
							:class="{ 'option__checkbox--checked': option.isSelected }"
							@click="addItemViaCustomCheckbox(option)"
						/>
					</div>
					{{ option[label] }}
				</div>
			</template>
			<template
				slot="selection"
				slot-scope="{ values, isOpen }"
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
				slot="noResult"
			>
				Nenhum resultado encontrado para: "<strong>{{ queryString }} </strong>"
			</template>
			<template
				slot="noOptions"
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
const SELECTED = 0;
const NOT_SELECTED = 1;
const clone = (el) => {
	if(el === undefined) return {};
	return JSON.parse(JSON.stringify(el));
};
export default {
	components: {
		Multiselect,
	},

	props: {
		label: {
			type: String,
			default: 'text',
		},
		trackBy: {
			type: String,
			default: 'value',
		},
		/**
		 * Exibe asterisco de obrigatório (obs.: não faz a validação)
		 */
		 required: {
			type: Boolean,
			default: false,
		},
		/**
		 * Desabilita o input.
		 */
		 disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica a label do input.
		 */
		inputLabel: {
			type: String,
			default: 'Label',
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
		options: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			selectedValue: this.$attrs.value || [],
			internalOptions: clone(this.options),
			groupValues: null,
			groupLabel: null,
			selectAllValue: false,
			queryString: '',
			indeterminate: false,
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
					return this.selectedValue[0][this.label];
				};
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
	},
	mounted() {
		this.updateRenderOptions();
		this.indeterminate = this.hasSelectedValues && this.selectedValue.length < this.options.length;
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
			const input = document.getElementById('select-all-input-id');
			input.indeterminate = newValue;
		},
	},
	methods: {
		unselectItem(option) {
			this.handleSelectItem(option);
			/**
			 * Evento disparado quando um item é deselecionado.
			* @event input
			* @type {Event}
				*/
			this.$emit('remove', option);
		},

		selectItem(option) {
			this.handleSelectItem(option);
			/**
			 * Evento disparado quando um item é selecionado.
			* @event input
			* @type {Event}
				*/
			this.$emit('select', option);
		},

		handleSelectItem(option) {
			if (this.isGroupMode) {
				this.internalOptions[SELECTED].options.forEach(item => {
					if (item[this.label] === option[this.label]) {
						item.isSelected = !item.isSelected;
					}
				});
				this.internalOptions[NOT_SELECTED].options.forEach(item => {
					if (item[this.label] === option[this.label]) {
						item.isSelected = !item.isSelected;
					}
				});
			} else {
				this.internalOptions.forEach(item => {
					if (item[this.label] === option[this.label]) {
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
					this.$set(
						this.internalOptions[SELECTED],
						'options',
						this.internalOptions[SELECTED].options.map((item) => ({
							...item,
							isSelected: this.selectAllValue,
						})),
					);
					this.$set(
						this.internalOptions[NOT_SELECTED],
						'options',
						this.internalOptions[NOT_SELECTED].options.map((item) => ({
							...item,
							isSelected: this.selectAllValue,
						})),
					);
				} else {
					this.$set(
						this,
						'internalOptions',
						this.internalOptions.map((item) => ({
							...item,
							isSelected: this.selectAllValue,
						})),
					);
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
			* @event input
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
					value => value[this.label] === item[this.label]
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
			this.internalOptions[SELECTED]
				.options = this.selectedValue;
			this.internalOptions[NOT_SELECTED]
				.options = rawOptions.filter(item => !item.isSelected);
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
<style src="vue-multiselect/dist/vue-multiselect.min.css" />
<style lang="scss">
@import '../assets/sass/app.scss';
#cds-multiselect {
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
	.cds-multiselect__option, .cds-multiselect__group-label {
		display: flex;
		align-items: center;
	}
	.cds-multiselect__group-label {
		@include subheading-3;
	}
	.option__checkbox {
		width: 15px;
		position: relative;
		margin-right: spacer(6);
		margin-left: spacer(n3);
		label {
			cursor: pointer;
			position: absolute;
			width: 15px;
			height: 15px;
			top: 0;
			border-radius: 4px;
			border: 0.5px solid $n-500;
			&:after {
				border: 2px solid $n-0;
				border-top: none;
				border-right: none;
				content: "";
				height: 5px;
				left: 3.1px;
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
	}
	.option__checkbox--checked {
		background-color: $gp-500 !important;
		border: none !important;
	}

	.option__checkbox--indeterminate {
		background-color: $gp-500 !important;
		border: none !important;
	}

	.multiselect__single {
		@include subheading-3;
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
	.multiselect__option--selected {
		background: $n-0 !important;
		color: $n-800!important;
		font-weight: 500!important;
	}
	.multiselect--disabled {
		background: transparent!important;
	}
	.multiselect__placeholder {
		color: $n-300 !important;
	}

	.multiselect__input {
		background-color: transparent !important;
		@include subheading-3;
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
			@include body-2;
			font-weight: $font-weight-semibold;
			color: $n-700;
	
			&--required-indicator {
				color: $rc-600;
			}
		}
	}

	.clustered-multiselect__error-message {
		@include caption;
		color: $rc-600;
		margin: mt(1);
	}
}
</style>
