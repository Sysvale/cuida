# DonutChart

### Um componente de gráfico reutilizável para exibir dados visualmente, de modo um pouco mais legível que o PieChart.
---
<br />

⚠️ Esse componente vai substituir o PieChart nas próximas versões do Cuida

<br />

## Quando usar:
- Exibir dados em formatos visuais;
- Visualizar tendências, proporções ou comparações em dados;
- Exibir proporções ou partes de um todo, onde cada fatia representa uma parcela do total;
- Funciona bem com categorias mutuamente exclusivas;

<br />

## Quando não usar:
- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Quando os dados apresentarem muitas categorias ou subcategorias;
- Não é apropriado para dados contínuos ou dados temporais.

---

## Uso

```js
<CdsDonutChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="donutChartClick = true"
/>
```

---

## Preview

<PreviewContainer
	:component="CdsDonutChart"
	:events="cdsDonutChartEvents"
  :labels
  :data
  variant="green"
/>

---

## Props

<APITable
	name="DonutChart"
	section="props"
/>
<br />

## Eventos

<APITable
	name="DonutChart"
	section="events"
/>
<br />


<script setup>
import { ref } from 'vue';
import CdsDonutChart from '@/components/DonutChart.vue';

const cdsDonutChartEvents = [
	'chart-click'
];

const labels = ref(['Janeiro','Fevereiro','Março', 'Abril', 'Maio'])
const data = ref([
  {
    name: 'Ecocardiograma',
    datasets: [
      {
        label: 'Exames realizados',
        data: [120, 220, 180, 20, 150],
      },
    ]
  },
]);
</script>
