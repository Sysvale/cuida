<template>
	<div>
		<div
			v-show="$attrs.fixedHeader && showVirtualHeader"
			:id="virtualHeaderID"
			class="virtual-header"
			:style="{width: `${virtualTheadWidth}px`}"
		>
			<div
				v-if="$attrs.allowSelection"
				class="virtual-header__selection-offset"
				:class="resolveHeaderItemClass(0)"
			/>

			<div
				v-for="(field, index) in $attrs.fields"
				:key="index"
				:class="resolveHeaderItemClass(index)"
				:style="{minWidth: `${virtualThWidths[index]}px`}"
			>
				{{ field.label ?? field }}
			</div>
		</div>

		<div
			class="data-table"
		>
			<div
				:id="dataTableHeaderID"
				class="data-table__header"
			>
				<CdsSearchInput
					v-if="withSearch"
					v-model="internalSearch"
					hide-label
					fluid
					:disabled="loading"
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
						:disabled="loading"
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

			<div
				:id="dataTableContainerID"
				class="data-table__table-container"
			>
				<div v-if="loading">
					<cds-table
						:fields="$attrs.fields"
						:items="[{}, {}, {}, {}]"
					>
						<template #table-item>
							<cds-skeleton
								width="100"
								height="20"
							/>
						</template>
					</cds-table>
				</div>
				<div
					v-else-if="isEmpty($attrs.items)"
				>
					<div
						v-if="hasStateEmpty"
						class="empty"
					>
						<slot name="empty" />
					</div>
					<div v-else>
						<CdsEmptyState
							:image="emptyImgResolver"
							:title="emptyTitle"
							hide-action-button
						>
							<template #text>
								{{ emptyDescription }}
							</template>
						</CdsEmptyState>
					</div>
				</div>
				<cds-table
					v-else
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
import { ref, watch, computed, useAttrs, onMounted, onUnmounted } from 'vue';
import { cloneDeep, isEmpty } from 'lodash';
import { useHasSlot } from '../utils/composables/useHasSlot';
import generateKey from '../utils/methods/uuidv4';
import CdsButton from './Button.vue';
import CdsTable from './Table.vue';
import CustomFieldsSideSheet from './InternalComponents/CustomFieldsSideSheet.vue';
import CdsFlexbox from './Flexbox.vue';
import CdsSearchInput from './SearchInput.vue';
import CdsSkeleton from './Skeleton.vue';
import CdsEmptyState from './EmptyState.vue'

const hasHeaderSlot = useHasSlot('header-item');
const hasStateEmpty = useHasSlot('empty');
const attrs = useAttrs();

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
	/**
	 * Ativa o estado de carregamento do componente, desabilitando as ações superiores e exibindo um Skeleton para a tabela.
	 */
	loading: {
		type: Boolean,
		default: false,
	},
	/**
	* Caminho da imagem que vai ser renderizada quando o estado for empty.
	*/
	emptySrcImg: {
		type: String,
		default: null,
	},
	/**
	 * Título que vai ser renderizado quando o estado for empty.
	 */
	emptyTitle: {
		type: String,
		default: 'Nenhum registro',
	},
	/**
	 * Descrição que vai ser renderizado quando o estado for empty.
	 */
	emptyDescription: {
		type: String,
		default: 'Certifique-se de ajustar os filtros para encontrar resultados.',
	},
	/**
	 * Tempo de atraso entre a digitação e a emissão do evento de busca (em ms).
	 */
	searchInputDelay: {
		type: Number,
		default: 500,
		validator: (value) => value >= 0,
	},
});

const emits = defineEmits(['update-fields-list', 'customize-click', 'search']);

const showVirtualHeader = ref(false);
const virtualTheadWidth = ref(0);
const virtualThWidths = ref(Array(attrs.fields.length).fill(0));
const scrollLeftOffset = ref(0);
const showSideSheet = ref(false);
const internalSearch = ref('');
const searchTimeout = ref(null);
const internalCustomFieldsList = ref(cloneDeep(props.customFieldsList));

const virtualHeaderID = generateKey();
const dataTableHeaderID = generateKey();
const dataTableContainerID = generateKey();

let isSyncingScroll = false;
let lastScrollY = 0;
let isScrollingDown = false;

let virtualHeaderEl;
let dataTabelEl;

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting && isScrollingDown) {
			showVirtualHeader.value = true;
		} else {
			showVirtualHeader.value = false;

		}
	});
}, {
	threshold: 0.1
});

const computedMaxVisibleFields = computed(() => {
	if (props.maxVisibleFields === 0) {
		return Infinity;
	}

	return props.maxVisibleFields > props.minVisibleFields ? props.maxVisibleFields : props.minVisibleFields;
});

const emptyImgResolver = computed(() => props.emptySrcImg ?? 'https://cdn-icons-png.flaticon.com/512/7486/7486747.png');

const computedTopLeftBorderRadius = computed(() => scrollLeftOffset.value > 0 ? '0px' : '8px');

watch(() => props.customFieldsList, () => {
	internalCustomFieldsList.value = cloneDeep(props.customFieldsList);
}, { immediate: true });

onMounted(() => {
	if (!attrs.fixedHeader) return;

	lastScrollY = window.scrollY;
	virtualHeaderEl = document.getElementById(virtualHeaderID);
	dataTabelEl = document.getElementById(dataTableContainerID);

	if(virtualHeaderEl) {
		virtualHeaderEl.addEventListener('scroll', () => syncScroll(virtualHeaderEl, dataTabelEl));
	}

	if(dataTabelEl) {
		dataTabelEl.addEventListener('scroll', () => syncScroll(dataTabelEl, virtualHeaderEl));
	}

	window.addEventListener('scroll', handleScroll);

	virtualThWidths.value = attrs.fields.map((field) => {
		return document.getElementById(field?.key ?? field).getBoundingClientRect().width;
	})

	observer.observe(document.getElementById(dataTableHeaderID));

	virtualTheadWidth.value = document.getElementById(dataTableContainerID).getBoundingClientRect().width;
});

onUnmounted(() => {
	if (observer) observer.disconnect();

	if(virtualHeaderEl) {
		virtualHeaderEl.removeEventListener('scroll', syncScroll);
	}

	if(dataTabelEl) {
		dataTabelEl.removeEventListener('scroll', syncScroll);
	}

	window.removeEventListener('scroll', handleScroll);
});

function syncScroll(source, target) {
	if (isSyncingScroll) return;
	isSyncingScroll = true;
	target.scrollLeft = source.scrollLeft;
	scrollLeftOffset.value = target.scrollLeft;
	isSyncingScroll = false;
}

function handleScroll() {
	const currentY = window.scrollY;
	isScrollingDown = currentY > lastScrollY;
	lastScrollY = currentY;
};

function resolveHeaderItemClass(index) {
	if (index !== 0 && index !== (attrs.fields.length - 1)) {
		return 'virtual-header__th';
	}

	return index === 0 ? 'virtual-header__th--first' : 'virtual-header__th--last';
};

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
	}, props.searchInputDelay);
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.data-table {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: tokens.spacer(3);

	&__actions {
		width: 100%;
	}

	&__header {
		display: grid;
		grid-template-columns: 1fr auto;
		column-gap: tokens.spacer(4);
		width: 100%;
		align-items: center;
	}

	&__items-counter {
		@include tokens.caption;
		color: tokens.$n-600;
		display: flex;
		align-items: flex-end;

		&--below {
			@extend .data-table__items-counter;
			margin: tokens.mt(3);
		}
	}

	&__table-container {
		overflow-x: auto;
	}
}

.empty {
	margin: tokens.mt(4);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.virtual-header {
	background-color: tokens.$n-10;
	position: sticky;
	top: 0px;
	box-shadow: tokens.$shadow-sm;
	z-index: tokens.$z-index-toolbar;
	display: flex;
	overflow-x: scroll;
	scrollbar-width: none;
	-ms-overflow-style: none;
	border-radius: tokens.$border-radius-extra-small 0 0;
	border-top-left-radius: v-bind(computedTopLeftBorderRadius);
	border: 1px solid tokens.$n-30;
	border-bottom: none;

	&::-webkit-scrollbar {
		display: none;
	}

	&__selection-offset {
		padding: 0px 28px !important;
	}

	&__th {
		@include tokens.body-2;
		border-bottom: 1px solid tokens.$n-30;
		font-weight: 700;
		padding: tokens.spacer(3) tokens.spacer(4);
		text-align: inherit;
		word-wrap: break-word;

		&--first {
			border-top-left-radius: tokens.$border-radius-extra-small;
			@extend .virtual-header__th;
		}

		&--last {
			border-top-right-radius: tokens.$border-radius-extra-small;
			@extend .virtual-header__th;
		}
	}
}
</style>
