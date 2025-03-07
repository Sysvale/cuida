<template>
	<CdsFlexbox
		direction="column"
		gap="3"
	>
		<TransitionGroup>
			<CdsFlexbox
				v-for="(item, index) in internalModel"
				:key="item.value"
				align="center"
				gap="3"
			>
				<CdsTextInput
					v-model="item.label"
					floating-label
					:label="inputLabel"
					@keyup.enter="addInput"
				/>
	
				<CdsClickable
					v-if="internalModel.length > 1"
					clickable
				>
					<CdsIcon
						height="20"
						width="20"
						name="x-outline"
						@click="removeInput(index)"
					/>
				</CdsClickable>
			</CdsFlexbox>
		</TransitionGroup>

		<CdsFlatButton
			:variant="variant"
			@click="addInput"
		>
			<CdsFlexbox
				align="center"
				gap="2"
			>
				<CdsIcon
					height="16"
					width="16"
					name="plus-outline"
				/>

				{{ buttonLabel }}
			</CdsFlexbox>
		</CdsFlatButton>
	</CdsFlexbox>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import CdsTextInput from './TextInput.vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';
import CdsFlatButton from './FlatButton.vue';
import CdsClickable from './Clickable.vue';
import generateKey from '../utils/methods/uuidv4';

const model = defineModel('modelValue', {
	type: Array,
	default: () => [
		{
			label: '',
			value: generateKey(),
		}
	],
});

defineProps({
	inputLabel: {
		type: String,
		default: 'Nova opção',
	},
	buttonLabel: {
		type: String,
		default: 'Adicionar',
	},
	variant: {
		type: String,
		default: 'dark',
	},
});


const internalModel = ref([]);

watch(model, (newValue) => {
	if (JSON.stringify(newValue) === JSON.stringify(internalModel.value)) return;

	internalModel.value = JSON.parse(JSON.stringify(model.value));
}, { immediate: true });

watch(internalModel, (newValue) => {
	if (JSON.stringify(newValue) === JSON.stringify(model.value)) return;

	model.value = JSON.parse(JSON.stringify(internalModel.value));
}, { deep: true });

function addInput() {
	internalModel.value.push({
		value: generateKey(),
		label: '',
	});
}

function removeInput(index) {
	internalModel.value.splice(index, 1);
}

function arrayOfValues() {
	return internalModel.value.map(item => item.value);
}

defineExpose({
	arrayOfValues: arrayOfValues,
});
</script>

<style lang="scss" scoped>
.v-move,
.v-enter-active,
.v-leave-active {
	transition: all 0.3s ease-in-out;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}

.v-leave-active {
	position: absolute;
	z-index: -1; 
}
</style>
