# List

O componente List é utilizado para exibir uma listagem de itens com um título e um conteúdo, permitindo personalização através de slots.

### Quando usar

- Para exibir listas de itens com título e conteúdo de forma padronizada.
- Quando for necessário permitir a personalização da exibição dos itens através de slots.
- Para criar listagens interativas em aplicações web e mobile.

### Quando não usar

- Se a lista precisar ter uma estrutura altamente customizada e dinâmica, onde um componente mais flexível como um table ou grid seria mais adequado.
- Quando não há necessidade de interação ou personalização dos itens exibidos.

---

## Uso

```js
<CdsList
	:items="[
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
	]"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsList"
	:events="cdsListEvents"
/>

---

## Props

<APITable
	name="List"
	section="props"
/>
<br />

## Eventos

<APITable
	name="List"
	section="events"
/>
<br />

## Slots

<APITable
	name="List"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsList from '@/components/List.vue';

const cdsListEvents = [
	'click'
];
</script>
