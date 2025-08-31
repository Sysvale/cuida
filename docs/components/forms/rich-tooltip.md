# RichTooltip

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
<CdsRichTooltip
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="richTooltipClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsRichTooltip"
	:events="cdsRichTooltipEvents"
/>

---

## Props

<APITable
	name="RichTooltip"
	section="props"
/>
<br />

## Eventos

<APITable
	name="RichTooltip"
	section="events"
/>
<br />

## Slots

<APITable
	name="RichTooltip"
	section="slots"
/>

<script setup>
import CdsRichTooltip from '@/components/RichTooltip.vue';

const cdsRichTooltipEvents = [
	'richTooltip-click'
];
</script>
