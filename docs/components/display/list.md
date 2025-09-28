# List

### O componente List é utilizado para exibir uma listagem de itens com um título e um conteúdo, permitindo personalização através de slots.
---
<br>

## Quando usar:
- Para exibir listas de itens com título e conteúdo de forma padronizada.
- Quando for necessário permitir a personalização da exibição dos itens através de slots.
- Para criar listagens interativas em aplicações web e mobile.

<br>

## Quando não usar:
- Se a lista precisar ter uma estrutura altamente customizada e dinâmica, onde um componente mais flexível como um table ou grid seria mais adequado.
- Quando não há necessidade de interação ou personalização dos itens exibidos.

---

## Uso

```js
<CdsList
	:items
	:clickable="false"
>
	<template #actions>
		<CdsIconButton icon="edit-outline" />
	</template>
</CdsList>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsList"
	:events
>
	<template #actions>
		<CdsIconButton icon="edit-outline" />
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="List"
	section="props"
/>
<br>

## Eventos

<APITable
	name="List"
	section="events"
/>
<br>

## Slots

<APITable
	name="List"
	section="slots"
/>


<script setup>
import { ref } from 'vue';
import CdsList from '@/components/List.vue';
import CdsIconButton from '@/components/IconButton.vue';

const events = [
	'click'
];

const items = ref([
	{
		title: 'Goku o maior de todos os tempos',
		content: 'Todo mundo sabe que ele é o mais forte do mundo (não é atoa o filme 2)'
	},
	{
		title: 'Invejosos dirão que é o Gohan',
		content: 'Mas também todo mundo sabe que ele é um banana depois da saga do Cell'
	},
	{
		title: 'Todo mundo gosta do Vegeta',
		content: 'Claro que sim, não tem como não gostar'
	},
]);

const args = ref({
	items,
	clickable: false,
});
</script>
