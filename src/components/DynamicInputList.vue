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
						:disabled="disabled || disableEdit"
						error-message=""
						@keyup.enter="addInput"
					/>
		
					<CdsClickable
						v-if="internalModel.length > 1"
						:clickable="!disabled"
					>
						<CdsIcon
							height="20"
							width="20"
							name="x-outline"
							:class="disabled ? `multiinput__x-icon--disabled` : `multiinput__x-icon`"
							@click="removeInput(index)"
						/>
					</CdsClickable>
				</CdsFlexbox>
			</TransitionGroup>
	
			<CdsFlatButton
				:variant="buttonVariant"
				:disabled="disabled"
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

defineOptions({ name: 'DynamicInputList' });

import { ref, watch, nextTick } from 'vue';
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

const props = defineProps({
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
	* A variante de cor. São 10 variantes:
	* @values 'green', 'teal', 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'dark'
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
	/**
	* Define estado de desabilitação do componente.
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	* Define método para geração de novos itens. Deve retornar um objeto com `label` e `value`. Sobrescreve o método padrão de geração de novos itens.
	*/
	incrementResolver: {
		type: Function,
		default: () => ({
			label: '',
			value: generateKey(),
		}),
	},
	/**
	* Define se o usuário pode preencher manualmente o conteúdo. Utilize-o apenas quando o conteúdo dos inputs forem gerados programaticamente, via incrementResolver.
	*/
	disableEdit: {
		type: Boolean,
		default: false,
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
	if (props.disabled) return
	triedToAddInput.value = true
	if (internalModel.value[internalModel.value.length - 1].label === '') return

	internalModel.value.push(props.incrementResolver());

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
	if (props.disabled) return;
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

		&--disabled {
			color: tokens.$n-300;
		}
	}

	&__add-button {
		margin: tokens.mt(2);
	}
}
</style>
