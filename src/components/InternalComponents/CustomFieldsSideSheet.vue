<template>
	<div>
		<cds-side-sheet
			v-model="modelValue"
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
		</cds-side-sheet>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CdsIcon from '../Icon.vue';
import CdsSkeleton from '../Skeleton.vue';
import CdsSideSheet from '../SideSheet.vue';
import CdsFlexbox from '../Flexbox.vue';
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
	}
});

const emits = defineEmits(['update-fields-list', 'cancel', 'ok']);

const internalCustomFieldsList = ref(cloneDeep(props.customFieldsList));

watch(() => props.customFieldsList, (newList) => {
	internalCustomFieldsList.value = cloneDeep(newList);
}, { immediate: true });

function handleCancel() {
	internalCustomFieldsList.value = cloneDeep(props.customFieldsList);
	emits('cancel');
}

function handleOk() {
	emits('update-fields-list', internalCustomFieldsList.value);
	modelValue.value = false;
}

</script>

<style lang="scss" scoped>
@import '../../assets/sass/tokens.scss';

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
