# RadialBarChart

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
<CdsRadialBarChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="radialBarChartClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:component="CdsRadialBarChart"
	:events="cdsRadialBarChartEvents"
/>

---

## Props

<APITable
	name="RadialBarChart"
	section="props"
/>
<br />

## Eventos

<APITable
	name="RadialBarChart"
	section="events"
/>
<br />

## Slots

<APITable
	name="RadialBarChart"
	section="slots"
/>

<script setup>
import CdsRadialBarChart from '@/components/RadialBarChart.vue';

const cdsRadialBarChartEvents = [
	'radialBarChart-click'
];
</script>
