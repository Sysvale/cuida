# ActionsList

Actions lists são componentes usados para mostrar uma lista de ações em linha, podendo algumas delas serem ocultas.

## Quando usar

- Houver ações associadas a um item de uma lista ou linha de tabela.
- Houver várias ações possíveis em determinada situação, mas algumas delas puderem ser colapsadas.

## Quando não usar

- For necessário o uso de botões.
- For necessário construir componentes de navegação (Menu, navbar, etc).
- As ações listadas afetam toda a view ou mais que um conjunto de dados relacionados.

---

## Uso

```js
<CdsActionsList
	:actions="actions"
	:numberOfExpandedActions="2"
>
	<template
		#action="{ list }"
	>
		{{ list.title }}
	</template>
</CdsActionsList>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsActionsList"
	:events="cdsActionsListEvents"
>
	<template
		#action="{ list }"
	>
		{{ list.title }}
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="ActionsList"
	section="props"
/>
<br />

## Eventos

<APITable
	name="ActionsList"
	section="events"
/>
<br />

## Slots

<APITable
	name="ActionsList"
	section="slots"
/>

---

<!-- ## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/> -->

<script setup>
import { ref } from 'vue';
import CdsActionsList from '@/components/ActionsList.vue';

const actions = [
	{
		"title": "Icon1",
		"disabled": true
	},
	{
		"title": "Icon2",
	},
	{
		"title": "Icon3",
	},
	{
		"title": "Icon4",
	}
];

const cdsActionsListEvents = [
	'expanded',
	'action-clicked'
];

const args = ref({
	actions,
	numberOfExpandedActions: 2
});
</script>
