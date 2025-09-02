# DynamicInputList

Buttons são componentes clicáveis e que indicam ao usuário que ele pode realizar uma ação ao interagir com ele.

### Quando usar

- For necessário comunicar ao usuário que ele pode executar uma ação na interface,
  seja em dialogs, modais, formulários, cards, etc.

### Quando não usar

- Não utilize botões com apenas ícone. Para esses casos de uso recomenda-se utilizar o IconButton.
- Em redirecionamentos para páginas externas. Nesses casos utilize links.

---

## Uso

```js
<CdsDynamicInputList
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="dynamicInputListClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsDynamicInputList"
	:events="cdsDynamicInputListEvents"
/>

---

## Props

<APITable
	name="DynamicInputList"
	section="props"
/>
<br />

## Eventos

<APITable
	name="DynamicInputList"
	section="events"
/>
<br />

## Slots

<APITable
	name="DynamicInputList"
	section="slots"
/>

<script setup>
import CdsDynamicInputList from '@/components/DynamicInputList.vue';

const cdsDynamicInputListEvents = [
	'dynamicInputList-click'
];
</script>
