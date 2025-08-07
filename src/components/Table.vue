<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<table class="table__container">
		<thead>
			<tr class="table__header">
				<th
					v-if="allowSelection"
					class="table__select-item"
					:class="resolveHeaderItemClass(0)"
				>
					<cds-checkbox
						id="select-all-rows"
						v-model="selectAll"
						class="table__select-checkbox"
						label=""
						:variant="selectionVariant"
						@update:model-value="handleSelectAll"
					/>
				</th>
				<th
					v-for="(field, index) in computedFields"
					:key="index"
					:class="resolveHeaderItemClass(index)"
				>
					<div class="table__header-item-content">
						<!--
							@slot Slot usado para renderizar itens personalizados para o cabeçalho da tabela. Dados do item referente à coluna podem ser acessados através da propriedade `data`. Os dados do escopo do slot podem ser acessados no formato a seguir: slot-scope={ data }
						-->
						<slot
							v-if="hasSlot($slots, 'header-item')"
							name="header-item"
							:data="field"
						/>

						<cds-clickable
							v-else
							:id="`sort-icon-${field.key}`"
							:clickable="sortable"
							@click.stop="handleSortBy(field.key)"
						>
							{{ field.label }}
							<cds-icon
								v-if="(sortable && field.label) && field.key !== localSortBy"
								class="table__sort-icon"
								height="13"
								width="13"
								name="swap-vertical-arrows-outline"
							/>
							<cds-icon
								v-else-if="(sortable && field.label) && localSortDesc"
								class="table__sort-icon"
								height="13"
								width="13"
								name="sort-descending-duotone"
							/>
							<cds-icon
								v-else-if="(sortable && field.label)"
								class="table__sort-icon"
								height="13"
								width="13"
								name="sort-ascending-duotone"
							/>
						</cds-clickable>
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="(item, itemIndex) in localItems"
				:key="itemIndex"
				:class="resolveItemClass()"
			>
				<td
					v-if="allowSelection"
					class="table__select-item"
					:class="resolveContentItemClass(itemIndex, 0)"
				>
					<cds-checkbox
						:id="`select-row-${itemIndex}`"
						v-model="select[itemIndex]"
						class="table__select-checkbox"
						label=""
						:variant="selectionVariant"
						@update:model-value="handleSelectRow"
					/>
				</td>
				<td
					v-for="(field, fieldIndex) in computedFields"
					:id="field.key"
					:key="field"
					:class="resolveContentItemClass(itemIndex, fieldIndex)"
					:width="field.width ? field.width : 'auto'"
				>
					<!--
						@slot Slot usado para renderizar itens personalizados para o conteúdo da tabela. Dados do item referente à linha podem ser acessados através da propriedade `data`, enquanto a key referente à coluna pode ser acessada através da propriedade `field`. Os dados do escopo do slot podem ser acessados no formato a seguir: slot-scope={ `data`, `field`, `rowIndex` e `colIndex` }
					-->
					<slot
						name="table-item"
						:data="item"
						:field="field.key"
						:row-index="itemIndex"
						:col-index="fieldIndex"
					>
						{{ resolveValue(item, field) }}
					</slot>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import {
	startCase,
	findIndex,
	orderBy,
	isEqual,
} from 'lodash';
import hasSlot from '../utils/methods/hasSlot';
import CdsCheckbox from './Checkbox.vue';
import CdsIcon from '../components/Icon.vue';
import CdsClickable from '../components/Clickable.vue';

export default {
	name: 'Table',
	components: {
		CdsCheckbox,
		CdsIcon,
		CdsClickable,
	},

	props: {
		/**
		 * Guarda os itens selecionados da tabela.
		 */
		modelValue: {
			type: Array,
			default: () => ([]),
		},
		/**
		 * Array contendo os itens a serem exibidos na tabela. Os itens devem estar no seguinte formato:
		 *
		 *
		 * ``{ 'exampleKey1': 'exampleValue1', 'exampleKey2': 'exampleValue2' }``
		 *
		 * Com a 'key' sendo a mesma do campo da tabela onde o valor deve ser exibido
		 */
		items: {
			type: Array,
			required: true,
			default: () => ([]),
		},
		/**
		 * Array contendo os campos a serem exibidos no cabeçalho da tabela. Os campos devem estar no seguinte formato:
		 *
		 * ``{ key: 'exampleKey1', label: 'exampleLabel1' }``
		 *
		 * Ou em formato de string simples (``'fieldkey'``). Neste caso, o valor exibido no cabeçalho da tabela será a string convertida para [Start Case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
		 *
		 * Caso essa propriedade não seja enviada, o cabeçalho da tabela será montado de acordo com as `keys` do primeiro objeto do array enviado através da prop `items`.
		 */
		fields: {
			type: Array,
			default: () => ([]),
		},
		/**
		 * Boolean, informa se o estilo será alterado no hover da linha.
		 */
		hover: {
			type: Boolean,
			default: false,
		},
		/**
		 * Boolean, informa se devem ser exibidas checkboxes para selecionar linhas.
		 */
		allowSelection: {
			type: Boolean,
			default: false,
		},
		/**
		 * A variante das checkboxes de seleção. São 10 variantes: 'teal', 'green', 'blue',
		 * 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
		 */
		selectionVariant: {
			type: String,
			default: 'green',
		},
		/**
		 * Boolean, informa se a UI de ordenação deve ser exibida nos itens
		 * do header
		 */
		sortable: {
			type: Boolean,
			default: false,
		},
		/**
		 * Específica a propriedade (chave da coluna) usada para ordenação.
		 * Por padrão os itens são exibidos na sequência definida pelo array `items`
		 */
		sortBy: {
			type: String,
			default: null,
		},
		/**
		 * Especifica se o cabeçalho da tabela deve ser fixo ou não.
		 */
		fixedHeader: {
			type: Boolean,
			default: false,
		},
		/**
		 * Boolean, informa que a ordenação deve ser descendente, por padrão
		 * a ordenação é ascendente (`sortDesc: false`).
		 */
		sortDesc: {
			type: Boolean,
			default: false,
		},
		/**
		 * Boolean, quando true, os textos do header e valores da tabela não terão quebra de linha.
		 * Por padrão, os textos do header e valores da tabela terão quebra de linha quando atingirem o tamanho máximo do container.
		 */
		noWrap: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			selectAll: false,
			select: [],
			localSortDesc: this.sortDesc,
			localSortBy: this.sortBy,
			localItems: this.items,
		};
	},

	computed: {
		computedFields() {
			if (this.fields.length > 0) {
				return this.fields.map(field => {
					if (typeof field === 'object') {
						return field;
					}

					return {
						key: field,
						label: startCase(field),
					};
				});
			}

			return this.items.length > 0
				? Object.keys(this.items[0]).map(key =>{
					return {
						key: key,
						label: startCase(key),
					}
				})
				: [];
		},
		resolveNoWarp() {
			return this.noWrap ? 'nowrap' : 'pre-line';
		},
		resolveFixedHeader() {
			return this.fixedHeader ? 'sticky' : '';
		},
		resolveHeaderShadow() {
			return this.fixedHeader ? '0px 1px 5px rgba(0, 0, 0, 0.07)' : '';
		}
	},

	watch: {
		modelValue: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					if (!newValue.length) {
						this.resetSelect();
						return;
					}

					newValue.forEach((item) => {
						const index = findIndex(this.localItems, item);
						if (index > -1) {
							this.select[index] = true;
						}
					});
				}
			},
			immediate: true,
		},

		items(newValue, oldValue) {
			if (!isEqual(newValue, oldValue)) {
				this.localItems = newValue;
				this.resetSelect();
			}
		},

		sortBy: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.handleSortBy(newValue);
				}
			},
			immediate: true,
		},

		select:{
			handler(newValue) {
				const selectedItems = this.localItems.filter((item, index) => newValue[index]);

				/**
				* Evento que indica que o valor do Select foi alterado
				* @event update:modelValue
				* @type {Event}
				*/
				this.$emit('update:modelValue', selectedItems);
			},
			deep: true,
		},
	},

	methods: {
		hasSlot,

		resetSelect() {
			this.selectAll = false;
			for (let index = 0; index < this.localItems.length; index++) {
				this.select[index] = false;
			}
		},

		handleSelectAll() {
			for (let index = 0; index < this.localItems.length; index++) {
				this.select[index] = this.selectAll;
			}
		},

		handleSelectRow(value) {
			if (this.selectAll && !value) {
				this.selectAll = false;
				return;
			}
			this.selectAll = this.select.reduce((allSelected, itemSelected ) => allSelected && itemSelected);
		},

		handleSortBy(sortBy) {
			if (!this.sortable) {
				return;
			}
			this.resetSelect();
			if (this.localSortBy === sortBy && this.localSortDesc) {
				this.localSortBy = null;
				this.localItems = this.items;
				return;
			}
			const orders = this.localSortDesc ? 'asc' : 'desc';
			this.localSortDesc = this.localSortBy === sortBy ? !this.localSortDesc : false;
			this.localSortBy = sortBy;
			this.localItems = orderBy(this.items, [this.localSortBy], [orders]);
		},

		resolveHeaderItemClass(index) {
			if (index !== 0 && index !== (this.fields.length - 1)) {
				return 'table__header-item';
			}

			return index === 0 ? 'table__header-item--first' : 'table__header-item--last';
		},

		resolveContentItemClass(itemIndex, index) {
			if (!(itemIndex === this.items.length - 1)) {
				return 'table__item';
			}

			if (index !== 0 && index !== (this.fields.length - 1)) {
				return 'table__item--common';
			}

			return index === 0 ? 'table__item--first' : 'table__item--last';
		},

		resolveItemClass() {
			return this.hover ? 'table__content--hoverable' : '';
		},

		resolveValue(item, field) {
			const value = this.getNestedValue(item, field.key);

			if (field.formatter && typeof field.formatter === 'function') {
				return field.formatter(value);
			}

			return value;
		},

		getNestedValue(obj, path) {
			return path.split('.').reduce((acc, part) => {
				if (acc && typeof acc === 'object') {
					return acc[part];
				}
				return undefined;
			}, obj);
		}
	},
};
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.table {
	&__container {
		position: relative;
		border: 1px solid tokens.$n-30;
		border-collapse: separate;
		border-radius: tokens.$border-radius-extra-small;
		border-spacing: 0px;
		width: 100%;
		background: tokens.$n-0;
	}

	&__select-item {
		width: 50px;
	}

	&__select-checkbox {
		scale: 0.75;
		margin-top: 1px;
	}

	&__sort-icon {
		color: tokens.$n-200;
		margin-left: 6px;
	}

	&__header {
		background-color: tokens.$n-10;
		position: v-bind('resolveFixedHeader');
		top: 0;
		box-shadow: v-bind('resolveHeaderShadow');
		z-index: tokens.$z-index-backdrop;

		&-item {
			@include tokens.body-2;
			border-bottom: 1px solid tokens.$n-30;
			font-weight: 700;
			padding: tokens.spacer(3) tokens.spacer(4);
			text-align: inherit;
			overflow: auto;
			word-wrap: break-word;
			white-space: v-bind('resolveNoWarp');

			&--first {
				border-top-left-radius: tokens.$border-radius-extra-small;

				@extend .table__header-item;
			}

			&--last {
				border-top-right-radius: tokens.$border-radius-extra-small;

				@extend .table__header-item;
			}
		}

		&-item-content {
			display: flex;
			align-items: center;
		}
	}

	&__content--hoverable {
		&:hover {
			background-color: rgba(tokens.$n-10, .7);
		}
	}

	&__item {
		@include tokens.body-2;
		border-bottom: 1px solid tokens.$n-30;
		font-size: 14px;
		max-width: 400px;
		padding: tokens.pa(4);
		vertical-align: top;
		overflow: auto;
		word-wrap: break-word;
		white-space: v-bind('resolveNoWarp');

		&--first {
			border-bottom: none;
			border-bottom-left-radius: tokens.$border-radius-extra-small;

			@extend .table__item;
		}

		&--common {
			border-bottom: none;

			@extend .table__item;
		}

		&--last {
			border-bottom: none;
			border-bottom-right-radius: tokens.$border-radius-extra-small;

			@extend .table__item;
		}
	}
}

</style>
