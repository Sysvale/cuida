# InteractionBlockingOverlay

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
<CdsInteractionBlockingOverlay
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="interactionBlockingOverlayClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsInteractionBlockingOverlay"
	:events="cdsInteractionBlockingOverlayEvents"
/>

---

## Props

<APITable
	name="InteractionBlockingOverlay"
	section="props"
/>
<br />

## Eventos

<APITable
	name="InteractionBlockingOverlay"
	section="events"
/>
<br />

## Slots

<APITable
	name="InteractionBlockingOverlay"
	section="slots"
/>

<script setup>
import CdsInteractionBlockingOverlay from '@/components/InteractionBlockingOverlay.vue';

const cdsInteractionBlockingOverlayEvents = [
	'interactionBlockingOverlay-click'
];
</script>
