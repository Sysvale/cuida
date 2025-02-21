<template>
	<div class="multi-file-input">
		<div class="multi-file-input__file-container">
			<file-input
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
				<badge
					v-for="badge in filesOptions"
					:key="badge"
					:variant="badge.active ? 'green' : 'gray'"
				>
					<div class="multi-file-input__badge-content">
						<icon
							v-if="badge.active"
							name="check-outline"
							height="16"
							width="16"
						/>

						<div>
							{{ badge.value }}
						</div>
					</div>
				</badge>
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
						<div class="multi-file-input__item">
							{{ item.file.name }}

							<div>
								<div class="multi-file-input__actions">
									<cds-select
										v-model="item.selectedLabel"
										:options="filesOptions"
										label=""
										style="display: flex;"
									/>

									<cds-icon-button
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
		</div>
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import FileInput from './FileInput.vue';
import Badge from './Badge.vue';
import Icon from './Icon.vue';
import CdsIconButton from './IconButton.vue';
import CdsSelect from './Select.vue';
import { kebabCase } from 'lodash';

const props = defineProps({
	/**
	 * Especifica os itens que serão exibidos nas badges.
	 */
	badges: {
		type: Array,
		required: true,
	},
});

const fileInputKey = ref(0);
const newFile = ref({});
const addedFilesList = ref([]);
const filesOptions = ref(
	props.badges.map((badge) => ({
		id: kebabCase(badge.name),
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

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.multi-file-input {
	display: flex;
	flex-direction: column;
	gap: spacer(5);
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
		background-color: $n-0;
		border: 1px solid $n-30;
		border-radius: $border-radius-medium;
		padding: pYX(5, 4);
	}

	&__description {
		@include overline;
		color: $n-600;
	}

	&__badges_section {
		display: flex;
		flex-direction: row;
		gap: spacer(1);
		align-items: center;
		width: 100%;
		margin: mt(3);
	}

	&__badge-content {
		display: flex;
		gap: spacer(1);
		align-items: center;
	}

	&__list-container {
		margin: mt(6);
		display: flex;
		flex-direction: column;
		gap: spacer(2);
	}

	&__empty-state {
		height: 15vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		@include caption;
		color: $n-300;
	}

	&__list-title {
		@include body-2;
		font-weight: $font-weight-semibold;
		color: $n-800;
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: spacer(2);
	}

	&__item {
		align-self: center;
		background-color: $n-10;
		border: 1px solid $n-30;
		border-radius: $border-radius-small;
		padding: pYX(4, 4);
		display: flex;
		justify-content: space-between;
		align-items: center;
		@include body-1;
		font-weight: $font-weight-semibold;
		color: $bn-600;
	}

	&__actions {
		display: flex;
		gap: spacer(2);
		align-items: center;
	}

	&__alert {
		@include overline;
		color: $rc-500;
		margin: mt(1);
	}
}

</style>
