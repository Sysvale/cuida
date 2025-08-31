# SideSheet

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
<CdsSideSheet
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="sideSheetClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsSideSheet"
	:events="cdsSideSheetEvents"
/>

---

## Props

<APITable
	name="SideSheet"
	section="props"
/>
<br />

## Eventos

<APITable
	name="SideSheet"
	section="events"
/>
<br />

## Slots

<APITable
	name="SideSheet"
	section="slots"
/>

<script setup>
import CdsSideSheet from '@/components/SideSheet.vue';

const cdsSideSheetEvents = [
	'sideSheet-click'
];
</script>
