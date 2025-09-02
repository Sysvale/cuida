# LineChart

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
<CdsLineChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="lineChartClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsLineChart"
	:events="cdsLineChartEvents"
/>

---

## Props

<APITable
	name="LineChart"
	section="props"
/>
<br />

## Eventos

<APITable
	name="LineChart"
	section="events"
/>
<br />

## Slots

<APITable
	name="LineChart"
	section="slots"
/>

<script setup>
import CdsLineChart from '@/components/LineChart.vue';

const cdsLineChartEvents = [
	'lineChart-click'
];
</script>
