# Wizard

Wizards são componentes utilizados para um processo passo a passo que permite ao usuário inserir informações em uma ordem prescrita e na qual as etapas subsequentes podem depender das informações inseridas nas etapas anteriores.

---
<br>

## Quando usar:
- Quando precisar completar etapas em uma determinada sequência.
- For necessário exibir informações em  blocos para simplificar o fluxo.

<br>

## Quando não usar:
- Quando o processo não for tão complexo, não havendo necessidade de divisão em etapas.
- Quando houver mais de três etapas, deve se considerar dividir em mais processos.
- Quando não houver necessidade de guiar o usuário numa sequência.

---

## Uso

```js
<CdsWizard
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="wizardClick = true"
/>
```

---

## Preview
<pre>{{args}}</pre>
<PreviewContainer>
	<CdsWizard
		v-bind="args"
		v-on="internalEvents"
		@step-change="(value) => args.activeStep = value"
		@next-action="(value) => args.activeStep = value.nextStep"
	>
		<template #step-1>
			<div style="height: 400px; gap: 16px; display: flex; flex-direction: column;">
				<CdsTextInput
					fluid
					label="Nome"
				/>
				<CdsTextInput
					fluid
					label="Sobrenome"
				/>
				<CdsTextInput
					fluid
					label="Nome da mãe"
				/>
			</div>
		</template>
		<template #step-2>
			<div style="height: 400px; gap: 16px; display: flex; flex-direction: column;">
				<CdsTextInput
					fluid
					label="CEP"
				/>
				<CdsTextInput
					fluid
					label="Rua"
				/>
				<CdsTextInput
					fluid
					label="Bairro"
				/>
				<CdsTextInput
					fluid
					label="Cidade"
				/>
			</div>
		</template>
		<template #step-3>
			<div style="height: 400px; gap: 16px; display: flex; flex-direction: column;">
				<CdsTextInput
					fluid
					label="Modalidade"
				/>
				<CdsTextInput
					fluid
					label="URL do site"
				/>
				<CdsTextInput
					fluid
					label="Informação Complementar"
				/>
			</div>
		</template>
	</CdsWizard>
	<LogBuilder ref="logBuilderRef" :events />
</PreviewContainer>

<PlaygroundBuilder
	:args
	:component="Wizard"
/>

---

## Props

<APITable
	name="CdsWizard"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsWizard"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsWizard"
	section="slots"
/>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import CdsWizard from '@/components/Wizard.vue';
import CdsTextInput from '@/components/TextInput.vue';

const logBuilder = useTemplateRef('logBuilderRef');

const events = [
	'step-change',
	'cancel-action',
	'next-action'
];

const internalEvents = ref({});

const steps = ref([
	{
		title: 'Informações gerais',
		subtitle: 'Insira as informações de identificação',
	},
	{
		title: 'Endereço de entrega',
	},
	{
		title: 'Informações complementares',
		subtitle: 'Adicione informações complementares para triagem',
		image: 'https://static.vecteezy.com/system/resources/previews/011/537/753/non_2x/box-empty-state-single-isolated-icon-with-flat-style-free-vector.jpg',
	},
]);

const args = ref({
	steps,
	activeStep: 0,
	nextButtonVariant: 'blue',
});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
</script>
