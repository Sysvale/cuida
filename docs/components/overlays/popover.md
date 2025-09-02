# Popover

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
<CdsPopover
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="popoverClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsPopover"
	:events="cdsPopoverEvents"
/>

---

## Props

<APITable
	name="Popover"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Popover"
	section="events"
/>
<br />

## Slots

<APITable
	name="Popover"
	section="slots"
/>

<script setup>
import CdsPopover from '@/components/Popover.vue';

const cdsPopoverEvents = [
	'popover-click'
];
</script>
