<template>
	<div>
		<cds-side-sheet
			v-model="modelValue"
			title="Personalizar tabela"
			no-close-on-esc
			with-overlay
			no-close-on-backdrop
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<cds-flexbox
				direction="column"
				gap="1"
				fluid
			>
				<div class="side-sheet__description">
					{{ descriptionComputedText }}
				</div>

				<cds-flexbox
					v-if="loadingCustomFields"
					direction="column"
					gap="3"
				>
					<cds-skeleton
						v-for="skeleton in 8"
						:key="skeleton"
						:height="60"
						fluid
					/>
				</cds-flexbox>

				<div v-else>
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

			<template #footer>
				<div class="side-sheet__footer">
					<cds-button
						secondary
						@button-click="handleCancel"
					>
						Cancelar
					</cds-button>

					<cds-button
						v-cdstip="shouldDisableOkButton ? descriptionComputedText : ''"
						:variant="selectionVariant"
						:disabled="shouldDisableOkButton"
						block
						@button-click="handleOk"
					>
						Salvar
					</cds-button>
				</div>
			</template>
		</cds-side-sheet>
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import CdsIcon from '../Icon.vue';
import CdsSkeleton from '../Skeleton.vue';
import CdsSideSheet from '../SideSheet.vue';
import CdsFlexbox from '../Flexbox.vue';
import CdsButton from '../Button.vue';
import { cloneDeep } from 'lodash';

const modelValue = defineModel({
	type: Boolean,
	default: false
});

const props = defineProps({
	customFieldsList: {
		type: Array,
		default: () => []
	},
	selectionVariant: {
		type: String,
		default: 'primary'
	},
	loadingCustomFields: {
		type: Boolean,
		default: false
	},
	shouldDisableOkButton: {
		type: Boolean,
		default: false
	},
	minFields: {
		type: Number,
		required: true,
	},
	maxFields: {
		type: Number,
		required: true,
	},
});

const emits = defineEmits(['update-fields-list', 'cancel', 'ok']);

const internalCustomFieldsList = ref(cloneDeep(props.customFieldsList));

const shouldDisableOkButton = computed(() => {
	const visibleFieldsCount = internalCustomFieldsList.value.filter(field => field.visible).length;

	return visibleFieldsCount < props.minFields || visibleFieldsCount > props.maxFields;
});

const descriptionComputedText = computed(() => {
	const { minFields, maxFields } = props;

	const getDescription = (min, max) => {
		if (max === Infinity) {
			return min === 1
				? 'Selecione as colunas para exibir na tabela.'
				: `Selecione ao menos ${min} colunas para exibir na tabela.`;
		}

		if (min === max) {
			return min === 1
				? 'Selecione 1 coluna para exibir na tabela.'
				: `Selecione ${min} colunas para exibir na tabela.`;
		}

		if (min === 1) return `Selecione até ${max} colunas para exibir na tabela.`;

		return `Selecione entre ${min} e ${max} colunas para exibir na tabela.`;
	};

	return getDescription(minFields, maxFields);
});

watch(() => props.customFieldsList, (newList) => {
	internalCustomFieldsList.value = cloneDeep(newList);
}, { immediate: true });

function handleCancel() {
	internalCustomFieldsList.value = cloneDeep(props.customFieldsList);
	modelValue.value = false;
	emits('cancel');
}

function handleOk() {
	emits('update-fields-list', internalCustomFieldsList.value);
	modelValue.value = false;
}

</script>

<style lang="scss" scoped>
@use '../../assets/sass/tokens/index' as tokens;

.side-sheet {

	&__description {
		@include tokens.body-2;
		color: tokens.$n-600;
		margin: mb(3);
	}

	&__item-label {
		@include tokens.body-2;
		color: tokens.$n-700;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
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
		border: 1px solid tokens.$n-30;
		border-radius: tokens.$border-radius-medium;
		margin: mb(2);
		cursor: pointer;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			&:hover {
				border: 1px solid $shade-300;
			}
		}

		&--active {
			@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
				border: 1px solid $shade-300;
			}
		}
	}

	&__icon {
		color: tokens.$n-100;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $shade-300;
		}
	}

	&__footer {
		display: flex;
		justify-content: space-between;
		gap: spacer(3);
		width: 100%;
	}
}

</style>
