# PieChart

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
<CdsPieChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="pieChartClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsPieChart"
	:events="cdsPieChartEvents"
/>

---

## Props

<APITable
	name="PieChart"
	section="props"
/>
<br />

## Eventos

<APITable
	name="PieChart"
	section="events"
/>
<br />

## Slots

<APITable
	name="PieChart"
	section="slots"
/>

<script setup>
import CdsPieChart from '@/components/PieChart.vue';

const cdsPieChartEvents = [
	'pieChart-click'
];
</script>
