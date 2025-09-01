# GaugeChart

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
<CdsGaugeChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="gaugeChartClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsGaugeChart"
	:events="cdsGaugeChartEvents"
/>

---

## Props

<APITable
	name="GaugeChart"
	section="props"
/>
<br />

## Eventos

<APITable
	name="GaugeChart"
	section="events"
/>
<br />

## Slots

<APITable
	name="GaugeChart"
	section="slots"
/>

<script setup>
import CdsGaugeChart from '@/components/GaugeChart.vue';

const cdsGaugeChartEvents = [
	'gaugeChart-click'
];
</script>
