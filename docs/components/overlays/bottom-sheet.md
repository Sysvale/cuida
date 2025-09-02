# BottomSheet

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
<CdsBottomSheet
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="bottomSheetClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsBottomSheet"
	:events="cdsBottomSheetEvents"
/>

---

## Props

<APITable
	name="BottomSheet"
	section="props"
/>
<br />

## Eventos

<APITable
	name="BottomSheet"
	section="events"
/>
<br />

## Slots

<APITable
	name="BottomSheet"
	section="slots"
/>

<script setup>
import CdsBottomSheet from '@/components/BottomSheet.vue';

const cdsBottomSheetEvents = [
	'bottomSheet-click'
];
</script>
