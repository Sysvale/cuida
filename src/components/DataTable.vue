<template>
	<div>
		<div class="data-table">
			<div class="data-table__header">
				<CdsSearchInput
					v-if="withSearch"
					v-model="internalSearch"
					hide-label
					fluid
					@update:model-value="handleSearchInput"
				/>
				<div
					v-else
					class="data-table__items-counter"
				>
					{{ totalItems }} {{ totalItems === 1 ? 'registro encontrado' : 'registros encontrados' }}
				</div>

				<cds-flexbox
					class="data-table__actions"
					gap="3"
					align="center"
					justify="flex-end"
				>
					<!-- @slot Slot para renderização de conteúdo à direita do DataTable header. -->
					<slot name="right" />

					<cds-button
						v-if="!hideCustomizeButton"
						:size="withSearch ? 'md' : 'sm'"
						secondary
						@button-click="handleCustomizeButtonClick"
					>
						Personalizar tabela
					</cds-button>
				</cds-flexbox>
				<div
					v-if="withSearch"
					class="data-table__items-counter--below"
				>
					{{ totalItems }} {{ totalItems === 1 ? 'registro encontrado' : 'registros encontrados' }}
				</div>
			</div>

			<div class="data-table__table-container">
				<cds-table
					v-bind="$attrs"
					:selection-variant="selectionVariant"
				>
					<template
						v-if="hasHeaderSlot"
						#header-item="{ data, field }"
					>
						<slot
							name="header-item"
							:data="data"
							:field="field"
						/>
					</template>

					<template #table-item="{ data, field }">
						<slot
							name="table-item"
							:data="data"
							:field="field"
						/>
					</template>
				</cds-table>
			</div>
		</div>

		<custom-fields-side-sheet
			v-model="showSideSheet"
			:custom-fields-list="internalCustomFieldsList"
			:selection-variant="selectionVariant"
			:loading-custom-fields="loadingCustomFields"
			:min-fields="minVisibleFields"
			:max-fields="computedMaxVisibleFields"
			@update-fields-list="emits('update-fields-list', $event)"
			@customize-click="handleCustomizeButtonClick"
			@cancel="handleCancel"
			@ok="handleOk"
		/>
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { cloneDeep } from 'lodash';
import { useHasSlot } from '../utils/composables/useHasSlot';
import CdsButton from './Button.vue';
import CdsTable from './Table.vue';
import CustomFieldsSideSheet from './InternalComponents/CustomFieldsSideSheet.vue';
import CdsFlexbox from './Flexbox.vue';
import CdsSearchInput from './SearchInput.vue';

const hasHeaderSlot = useHasSlot('header-item');

const props = defineProps({
	/**
 	* Variante de cor usada na estilização do componente.
	*/
	selectionVariant: {
		type: String,
		default: 'green',
	},
	/**
	* Quantidade total de registros encontrados.
	*/
	totalItems: {
		type: Number,
		required: true,
	},
	/**
	* Lista de colunas que serão exibidas na tabela personalizada.
	*/
	customFieldsList: {
		type: Array,
		default: () => [],
	},
	/**
	* Especifica se o botão de personalizar tabela deve ser escondido.
	*/
	hideCustomizeButton: {
		type: Boolean,
		default: false,
	},
	/**
	* Ativa o feedback de loading no sidesheet de personalizar tabela.
	*/
	loadingCustomFields: {
		type: Boolean,
		default: false,
	},
	/**
 	* Especifica a quantidade mínima de colunas que devem ser visíveis na tabela.
	 */
	minVisibleFields: {
		type: Number,
		default: 1,
		validator: (value) => value >= 1,
	},
	/**
	 * Especifica a quantidade máxima de colunas que devem ser visíveis na tabela. Se for `0`, não há limite.
	*/
	maxVisibleFields: {
		type: Number,
		default: 0,
		validator: (value) => value >= 0,
	},
	/**
 	* Especifica se a barra de busca da tabela deve ser exibida.
	*/
	withSearch: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['update-fields-list', 'customize-click', 'search']);

const showSideSheet = ref(false);
const internalSearch = ref('');
const searchTimeout = ref(null);
const internalCustomFieldsList = ref(cloneDeep(props.customFieldsList));

const computedMaxVisibleFields = computed(() => {
	if (props.maxVisibleFields === 0) {
		return Infinity;
	}

	return props.maxVisibleFields > props.minVisibleFields ? props.maxVisibleFields : props.minVisibleFields;
});

watch(() => props.customFieldsList, () => {
	internalCustomFieldsList.value = cloneDeep(props.customFieldsList);
}, { immediate: true });

function handleCustomizeButtonClick() {
	emits('customize-click');
	showSideSheet.value = true;
}

function handleCancel() {
	internalCustomFieldsList.value = cloneDeep(props.customFieldsList);
	emits('cancel');
}

function handleOk(fieldsList) {
	emits('update-fields-list', fieldsList);
}

function handleSearchInput(value) {
	clearTimeout(searchTimeout.value);
	searchTimeout.value = setTimeout(() => {
		emits('search', value);
	}, 500);
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.data-table {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: spacer(3);

	&__actions {
		width: 100%;
	}

	&__header {
		display: grid;
		grid-template-columns: 1fr auto;
		column-gap: spacer(4);
		width: 100%;
		align-items: center;
	}

	&__items-counter {
		@include caption;
		color: $n-600;
		display: flex;
		align-items: flex-end;

		&--below {
			@extend .data-table__items-counter;
			margin: mt(3);
		}
	}

	&__table-container {
		overflow-x: auto;
	}
}

</style>
