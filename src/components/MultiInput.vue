<template>
	<div>
		<CdsFlexbox
			direction="column"
			gap="3"
		>
			<CdsFlexbox
				v-for="(item, index) in internalModel"
				:key="item.id"
				align="center"
				gap="3"
			>
				<CdsTextInput
					v-model="item.value"
					floating-label
					:label="inputLabel"
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

			<CdsFlatButton
				secondary
				size="sm"
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
	</div>
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
			id: generateKey(),
			value: '',
		}
	],
});

const props = defineProps({
	inputLabel: {
		type: String,
		default: 'Nova opção',
	},
	buttonLabel: {
		type: String,
		default: 'Adicionar',
	},
});


const internalModel = ref([]);

watch(model, () => {
	internalModel.value = model.value;
}, { immediate: true });

watch(internalModel, () => {
	model.value = internalModel.value;
});

function addInput() {
	internalModel.value.push({
		id: generateKey(),
		value: '',
	});
}

function removeInput(index) {
	internalModel.value.splice(index, 1);
}
</script>
