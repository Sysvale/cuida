# Timeline

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
<CdsTimeline
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="timelineClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsTimeline"
	:events="cdsTimelineEvents"
/>

---

## Props

<APITable
	name="Timeline"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Timeline"
	section="events"
/>
<br />

## Slots

<APITable
	name="Timeline"
	section="slots"
/>

<script setup>
import CdsTimeline from '@/components/Timeline.vue';

const cdsTimelineEvents = [
	'timeline-click'
];
</script>
