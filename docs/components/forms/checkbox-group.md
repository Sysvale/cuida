# CheckboxGroup

CheckboxGroups são componentes de formulário que permitem seleções binárias e múltiplas.

---

<br>

## Quando usar:

- Quando precisar de um componente de formulário para seleções binárias com várias opções.

<br>

## Quando não usar:

- Quando for preciso que o efeito da interação com o Checkbox seja imediato. Checkboxes devem ser usados sempre em conjunto com um botão de submissão. Para contornar casos como esse, use Switches.

---

## Uso

### Slot de append com escopo (Scoped Slot)
Permite customizar o append de todas as opções de forma genérica a partir do objeto `option`:

```js
<CdsCheckboxGroup
	v-model="value"
	label="CheckboxGroup"
	variant="green"
	state="default"
	:options="[
		{
			label: 'Teste 1',
			value: 'test-1',
		},
		{
			label: 'Teste 2',
			value: 'test-2',
		},
		{
			label: 'Teste 3',
			value: 'test-3',
		},
	]"
	:disabled="false"
>
	<template #append="{ option }">
		<CdsBadge
			v-if="option.value === 'test-2'"
			variant="red"
			size="md"
		>
			Badge
		</CdsBadge>
	</template>
</CdsCheckboxGroup>
```

### Slots de append específicos por opção (Dynamic Slots)
Permite customizar o append de uma opção específica informando o valor da opção (`value`) no nome do slot:

```js
<CdsCheckboxGroup
	v-model="value"
	label="CheckboxGroup"
	:options="[
		{
			label: 'Teste 1',
			value: 'test-1',
		},
		{
			label: 'Teste 2',
			value: 'test-2',
		},
	]"
>
	<template #append-test-1>
		<span>Texto exclusivo 1</span>
	</template>

	<template #append-test-2>
		<span>Texto exclusivo 2</span>
	</template>
</CdsCheckboxGroup>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsCheckboxGroup"
	:events
/>

---

## Props

<APITable
	name="CdsCheckboxGroup"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsCheckboxGroup"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsCheckboxGroup"
	section="slots"
/>
<br>

<script setup>
	import { ref } from 'vue';
import CdsCheckboxGroup from '@/components/CheckboxGroup.vue';

const events = [
	'update:modelValue',
];

const args = ref({
	label: 'Checkbox Group',
	modelValue: ['test-1'],
	state: 'default',
	options: [
		{
			label: 'Teste 1',
			value: 'test-1',
		},
		{
			label: 'Teste 2',
			value: 'test-2',
		},
		{
			label: 'Teste 3',
			value: 'test-3',
		},
	],
	disabled: false,
	variant: 'green',
});
</script>
