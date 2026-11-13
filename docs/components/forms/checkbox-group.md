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

### Customização com Slot de Escopo (Scoped Slot)
O `CheckboxGroup` expõe um único slot com escopo chamado `#append`. Ele permite customizar a área à direita de cada checkbox individual do grupo usando o objeto `option` atual.

#### Exemplo 1: Exibindo um elemento padrão em todas as opções
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
			variant="red"
			size="md"
		>
			Badge
		</CdsBadge>
	</template>
</CdsCheckboxGroup>
```

#### Exemplo 2: Renderização condicional para opções específicas
Para customizar de forma exclusiva apenas determinados checkboxes, você pode utilizar a renderização condicional baseada na propriedade `option.value`:

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
	<template #append="{ option }">
		<span v-if="option.value === 'test-1'">
			Texto exclusivo 1
		</span>

		<span v-if="option.value === 'test-2'">
			Texto exclusivo 2
		</span>
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
