<template>
	<div class="multi-file-input">
		<div class="multi-file-input__file-container">
			<CdsFileInput
				:key="fileInputKey"
				v-model="newFile"
				v-bind="$attrs"
				@update:model-value="onFileUpload"
			/>
		</div>

		<div class="multi-file-input__box">
			<div class="multi-file-input__description">
				Os arquivos marcados com o asterisco (*) são obrigatórios:
			</div>

			<div class="multi-file-input__badges_section">
				<CdsBadge
					v-for="badge in filesOptions"
					:key="badge"
					:variant="badge.active ? variant : 'gray'"
				>
					<div class="multi-file-input__badge-content">
						<CdsIcon
							v-if="badge.active"
							name="check-outline"
							height="16"
							width="16"
						/>

						<div>
							{{ badge.value }} {{ badge.required ? '*' : '' }}
						</div>
					</div>
				</CdsBadge>
			</div>

			<div
				v-if="addedFilesList.length == 0"
				class="multi-file-input__empty-state"
			>
				Os arquivos adicionados serão exibidos aqui
			</div>

			<div
				v-else
				class="multi-file-input__list-container"
			>
				<div class="multi-file-input__list-title">
					Arquivos anexados
				</div>

				<div class="multi-file-input__list">
					<div
						v-for="item in addedFilesList"
						:key="item"
						class="multi-file-input__list-item"
					>
						<div
							class="multi-file-input__item"
							:class="`multi-file-input__item--${variant}`"
						>
							{{ item.file.name }}

							<div>
								<div class="multi-file-input__actions">
									<CdsSelect
										v-model="item.selectedLabel"
										:options="filesOptions"
										label=""
										style="display: flex;"
									/>

									<CdsIconButton
										icon="trash-outline"
										size="lg"
										@click="removeFile(item)"
									/>
								</div>

								<div
									v-if="showAlert(item)"
									class="multi-file-input__alert"
								>
									Arquivo duplicado.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="multi-file-input__footer">
				<CdsButton
					:secondary="buttonSecondary"
					:variant="variant"
					:disabled="!shouldEnableButton"
					@button-click="submit"
				>
					{{ submitButtonText }}
				</CdsButton>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import CdsFileInput from './FileInput.vue';
import CdsBadge from './Badge.vue';
import CdsIcon from './Icon.vue';
import CdsIconButton from './IconButton.vue';
import CdsButton from './Button.vue';
import CdsSelect from './Select.vue';
import generateKey from '../utils/methods/uuidv4';

defineOptions({ name: 'CdsMultiFileInput' });

const props = defineProps({
	/**
	 * Especifica os itens que serão exibidos nas opções de arquivos. os itens devem conter, ao menos, os atributos `name` e `required`.
	 */
	documents: {
		type: Array,
		required: true,
	},
	/**
	 * Especifica a principal do componente. Essa cor será aplicada aos detalhes de estilo do componente, bem como em seu botão principal.
	 * São 10 variantes: 'teal', 'green', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
	 * @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
	 */
	variant: {
		type: String,
		default: 'green',
	},
	/** Especifica o texto do botão de submit. */
	submitButtonText: {
		type: String,
		default: 'Enviar',
	},
	/**
	 * Especifica se o botão de submit é do tipo secundário.
	 */
	buttonSecondary: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['submit']);

const fileInputKey = ref(0);
const newFile = ref({});
const addedFilesList = ref([]);
const filesOptions = ref(
	props.documents.map((badge) => ({
		id: generateKey(),
		value: badge.name,
		required: badge.required,
		active: false,
		file: null,
	}))
);

const activeBadges = computed(() => {
	return addedFilesList.value.filter((item) => item.selectedLabel?.id).map((item) => item.selectedLabel.id);
});

const repeatedBadges = computed(() => {
	const count = {};
	const repeated = [];

	activeBadges.value.forEach((id) => {
		if (count[id]) {
			count[id] += 1;
		} else {
			count[id] = 1;
		}
	});

	Object.keys(count).forEach((id) => {
		if (count[id] > 1) {
			repeated.push(id);
		}
	});

	return repeated;
});

const shouldEnableButton = computed(() => {
	return allFilesHaveSelectedLabels() && repeatedBadges.value.length == 0 && allRequiredLabelsAreSelected();
});

watch(() => addedFilesList.value, () => {
	filesOptions.value.forEach((item) => {
		item.active = activeBadges.value.includes(item.id);
	});
}, { deep: true });

function onFileUpload(file) {
	if (file.name) {
		addedFilesList.value.push({ file, selectedLabel: null });
		fileInputKey.value += 1;
		newFile.value = null;
	}
}

function removeFile(item) {
	const index = addedFilesList.value.indexOf(item);
	if (index > -1) {
		addedFilesList.value.splice(index, 1);
	}
}

function showAlert(item) {
	return repeatedBadges.value.includes(item.selectedLabel?.id)
}

function submit() {
	emits('submit', addedFilesList.value);
}

function allFilesHaveSelectedLabels() {
	return addedFilesList.value.every((item) => item.selectedLabel?.id);
}

function allRequiredLabelsAreSelected() {
	return filesOptions.value.filter((item) => item.required).every((item) => item.active);
}

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.multi-file-input {
	display: flex;
	flex-direction: column;
	gap: tokens.spacer(5);
	align-items: center;
	justify-content: center;
	width: 100%;

	&__file-container {
		width: 100%;
	}

	&__box {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: tokens.$n-0;
		border: 1px solid tokens.$n-30;
		border-radius: tokens.$border-radius-medium;
		padding: tokens.pYX(5, 4);
	}

	&__description {
		@include tokens.overline;
		color: tokens.$n-600;
	}

	&__badges_section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: tokens.spacer(2);
		align-items: center;
		width: 100%;
		margin: tokens.mt(3);
	}

	&__badge-content {
		display: flex;
		gap: tokens.spacer(1);
		align-items: center;
	}

	&__list-container {
		margin: tokens.mt(6);
		display: flex;
		flex-direction: column;
		gap: tokens.spacer(2);
	}

	&__empty-state {
		height: 15vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		@include tokens.caption;
		color: tokens.$n-300;
	}

	&__list-title {
		@include tokens.body-2;
		font-weight: tokens.$font-weight-semibold;
		color: tokens.$n-800;
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: tokens.spacer(2);
	}

	&__item {
		align-self: center;
		background-color: tokens.$n-10;
		border: 1px solid tokens.$n-30;
		border-radius: tokens.$border-radius-small;
		padding: tokens.pYX(4, 4);
		display: flex;
		justify-content: space-between;
		align-items: center;
		@include tokens.body-1;
		font-weight: tokens.$font-weight-semibold;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $shade-600;
		}
	}

	&__actions {
		display: flex;
		gap: tokens.spacer(2);
		align-items: center;
	}

	&__alert {
		@include tokens.overline;
		color: tokens.$rc-500;
		margin: tokens.mt(1);
	}

	&__footer {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		margin: tokens.mt(5);
	}
}
</style>
