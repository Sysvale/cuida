# PolarAreaChart

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
<CdsPolarAreaChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="polarAreaChartClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsPolarAreaChart"
	:events="cdsPolarAreaChartEvents"
/>

---

## Props

<APITable
	name="PolarAreaChart"
	section="props"
/>
<br />

## Eventos

<APITable
	name="PolarAreaChart"
	section="events"
/>
<br />

## Slots

<APITable
	name="PolarAreaChart"
	section="slots"
/>

<script setup>
import CdsPolarAreaChart from '@/components/PolarAreaChart.vue';

const cdsPolarAreaChartEvents = [
	'polarAreaChart-click'
];
</script>
