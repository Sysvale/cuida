# PolarAreaChart

### Um componente de gráfico reutilizável para exibir dados visualmente.
---
<br>

## Quando usar:
- Exibir dados em formatos visuais;
- Visualizar tendências ao longo de variáveis contínuas, como direções ou graus.

<br>

## Quando não usar:
- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Quando os dados apresentarem ênfase na comparação númerica de quantidades;
- Não recomendado para representar séries temporais ou dados discretos.

---

## Uso

```js
<CdsBarChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="barChartClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsPolarAreaChart"
/>

---

## Props

<APITable
	name="CdsBarChart"
	section="props"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsPolarAreaChart from '@/components/PolarAreaChart.vue';

const args = ref({
	labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
	variant: 'green',
	isVisiblePointNames: true,
	data: [
		{
			name: 'Ecocardiograma',
			datasets: [
				{
					label: 'Exames realizados',
					data: [120, 220, 180, 320, 150],
				},
			]
		},
	],
});
</script>
