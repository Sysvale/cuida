<template>
	<div>
		<div class="data-table">
			<div class="data-table__header">
				<div class="data-table__items-counter">
					{{ totalItems }} registros encontrados
				</div>

				<cds-flexbox
					gap="3"
					align="center"
				>
					<!-- @slot Slot para renderização de conteúdo à direita do DataTable header. -->
					<slot name="right" />

					<cds-button
						v-if="!hideCustomizeButton"
						size="sm"
						secondary
						@button-click="showSideSheet = true"
					>
						Personalizar tabela
					</cds-button>
				</cds-flexbox>
			</div>

			<cds-table
				v-bind="$attrs"
				:selection-variant="selectionVariant"
			>
				<template
					v-if="hasHeaderSlot"
					#header-item="data"
				>
					<slot
						name="header-item"
						:data="data"
					/>
				</template>

				<template #table-item="data">
					<slot
						name="table-item"
						:data="data"
					/>
				</template>
			</cds-table>
		</div>

		<cds-side-sheet
			v-model="showSideSheet"
			title="Personalizar tabela"
			ok-button-text="Salvar"
			cancel-button-text="Cancelar"
			:action-button-variant="selectionVariant"
			:disable-ok-button="shouldDisableOkButton"
			no-close-on-esc
			block-ok-button
			with-overlay
			no-close-on-backdrop
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<cds-flexbox
				direction="column"
				gap="1"
			>
				<div class="side-sheet__description">
					Selecione as colunas que deseja exibir na tabela.
				</div>

				<div>
					<div
						v-for="column in internalCustomFieldsList"
						:key="column"
						class="side-sheet__column-item"
						:class="[
							{ [`side-sheet__column-item--active--${selectionVariant}`] : column.visible },
							`side-sheet__column-item--${selectionVariant}`
						]"
						@click="column.visible = !column.visible"
					>
						<span
							class="side-sheet__item-label"
							:class="column.visible? `side-sheet__item-label--${selectionVariant}` : ''"
						>
							{{ column.label }}
						</span>

						<cds-icon
							v-if="column.visible"
							:class="`side-sheet__icon--${selectionVariant}`"
							name="pin-outline"
							width="16"
							height="16"
						/>

						<cds-icon
							v-else
							class="side-sheet__icon"
							name="pin-outline"
							width="16"
							height="16"
						/>
					</div>
				</div>
			</cds-flexbox>
		</cds-side-sheet>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CdsButton from './Button.vue';
import CdsTable from './Table.vue';
import CdsSideSheet from './SideSheet.vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';
import { useHasSlot } from '../utils/composables/useHasSlot';
import { cloneDeep } from 'lodash';

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
});

const emits = defineEmits(['update-fields-list']);

const showSideSheet = ref(false);
const internalCustomFieldsList = ref(cloneDeep(props.customFieldsList));

const shouldDisableOkButton = computed(() => !internalCustomFieldsList.value.some(column => column.visible));

function handleCancel() {
	internalCustomFieldsList.value = cloneDeep(props.customFieldsList);
}

function handleOk() {
	emits('update-fields-list', internalCustomFieldsList.value);
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.data-table {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: spacer(3);

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	&__items-counter {
		@include caption;
		color: $n-600;
	}
}

.side-sheet {

	&__description {
		@include body-2;
		color: $n-600;
		margin: mb(3);
	}

	&__item-label {
		@include body-2;
		color: $n-700;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $base-color;
			font-weight: 550;
		}
	}

	&__column-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: pa(5);
		border: 1px solid $n-30;
		border-radius: $border-radius-medium;
		margin: mb(2);
		cursor: pointer;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			&:hover {
				border: 1px solid $shade-300;
			}
		}

		&--active {
			@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				border: 1px solid $shade-300;
			}
		}
	}

	&__icon {
		color: $n-100;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $shade-300;
		}
	}
}

</style>
