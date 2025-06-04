<template>
	<div>
		<CdsLabel
			:text="label"
			:tooltip="tooltip"
			:tooltip-icon="tooltipIcon"
			:support-link="supportLink"
			:support-link-url="supportLinkUrl"
		/>

		<CdsFlexbox
			direction="column"
			gap="3"
		>
			<TransitionGroup>
				<CdsFlexbox
					v-for="(item, index) in internalModel"
					:key="item"
					align="center"
					gap="3"
				>
					<CdsTextInput
						ref="inputRefs"
						v-model="item.label"
						floating-label
						:label="inputLabel"
						:state="inputState(index)"
						error-message=""
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
							class="multiinput__x-icon"
							@click="removeInput(index)"
						/>
					</CdsClickable>
				</CdsFlexbox>
			</TransitionGroup>
	
			<CdsFlatButton
				:variant="buttonVariant"
				class="multiinput__add-button"
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
	
					{{ buttonText }}
				</CdsFlexbox>
			</CdsFlatButton>
		</CdsFlexbox>
	</div>
</template>

<script setup>
import { defineProps, ref, watch, nextTick } from 'vue';
import CdsTextInput from './TextInput.vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';
import CdsFlatButton from './FlatButton.vue';
import CdsClickable from './Clickable.vue';
import generateKey from '../utils/methods/uuidv4';
import CdsLabel from './Label.vue';

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
	/**
	* Label do DynamicInputList.
	*/
	label: {
		type: String,
		default: 'Adicione opções',
	},
	/**
	* Label usada em cada um dos inputs adicionados ao DynamicInputList.
	*/
	inputLabel: {
		type: String,
		default: 'Nova opção',
	},
	/**
	* Texto do botão de adição de inputs.
	*/
	buttonText: {
		type: String,
		default: 'Adicionar',
	},
	/**
	* Variante do botão de adição de inputs.
	*/
	buttonVariant: {
		type: String,
		default: 'dark',
	},
	/**
	* Define exibição e texto do tooltip do DynamicInputList.
	*/
	tooltip: {
		type: String,
		default: null,
	},
	/**
	* Especifica ícone do tooltip do DynamicInputList.
	*/
	tooltipIcon: {
		type: String,
		default: 'info-outline',
	},
	/**
	* Controla a exibição e o conteúdo do link de suporte exibido ao lado da label.
	*/
	supportLink: {
		type: String,
		default: null,
	},
	/**
	* Define a url a ser acessada no clique do link de suporte.
	*/
	supportLinkUrl: {
		type: String,
		default: 'https://cuida.framer.wiki/',
	},
});


const internalModel = ref([]);
const inputRefs = ref([]);
const triedToAddInput = ref(false);

watch(model, (newValue) => {
	if (JSON.stringify(newValue) === JSON.stringify(internalModel.value)) return;

	internalModel.value = JSON.parse(JSON.stringify(model.value));
}, { immediate: true });

watch(internalModel, (newValue) => {
	if (JSON.stringify(newValue) === JSON.stringify(model.value)) return;

	model.value = JSON.parse(JSON.stringify(internalModel.value));
}, { deep: true });

function addInput() {
	triedToAddInput.value = true
	if (internalModel.value[internalModel.value.length - 1].label === '') return

	internalModel.value.push({
		value: generateKey(),
		label: '',
	})

	triedToAddInput.value = false
	focusLastInput()
}

function focusLastInput() {
	nextTick(() => {
		if (inputRefs.value.length > 0) {
			const lastInput = inputRefs.value[inputRefs.value.length - 1]
			lastInput?.focus()
		}
	})
}

function inputState(index) {
	if (
		(index === internalModel.value.length - 1)
		&& (internalModel.value[internalModel.value.length - 1].label === '')
		&& triedToAddInput.value
	) {
		return 'invalid';
	}

	return 'default';
}

function removeInput(index) {
	internalModel.value.splice(index, 1);
}

function arrayOfValues() {
	return internalModel.value.map(item => item.label);
}

defineExpose({
	arrayOfValues: arrayOfValues,
});
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

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

.multiinput {
	&__x-icon {
		color: tokens.$n-800;
	
		&:hover {
			color: tokens.$n-900;
		}
	}

	&__add-button {
		margin: mt(2);
	}
}
</style>
