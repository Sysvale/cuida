# LineChart

### Um componente de gráfico reutilizável para exibir dados visualmente.
---
<br>

## Quando usar:
- Exibir dados em formatos visuais;
- Ideal para mostrar tendências ao longo do tempo;
- Comparação de múltiplas séries.

<br>

## Quando não usar:
- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Dados discretos sem sequência lógica;
- Grande quantidade de série de dados..

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
	:args
	component="CdsLineChart"
/>

---

## Props

<APITable
	name="CdsLineChart"
	section="props"
/>
<br>


<script setup>
import { ref } from 'vue';
import CdsLineChart from '@/components/LineChart.vue';

const args = ref({
	labels: [
		'2024-03-01','2024-03-02','2024-03-03', '2024-03-04', '2024-03-05',
		'2024-03-06','2024-03-07','2024-03-08', '2024-03-09', '2024-03-10',
		'2024-03-11','2024-03-12','2024-03-13', '2024-03-14', '2024-03-15',
		'2024-03-16','2024-03-17','2024-03-18', '2024-03-19', '2024-03-20',
		'2024-03-21','2024-03-22','2024-03-23', '2024-03-24', '2024-03-25',
		'2024-03-26','2024-03-27','2024-03-28', '2024-03-29', '2024-03-30',
	],
	theme: 'blue',
	fill: false,
	isDashed: false,
	borderDash: [5,5],
	smoothing: 0.3,
	showLabelName: true,
	scales: {
		x: {
			grid: {
				display: false
			},
		}
	},
	xAxisRange: [0, 100],
	yAxisRange: [0, 100],
	data: [
		{
			name: 'Ecocardiograma',
			datasets: [
				{
					label: 'Realizado',
					data: [
						0, 80, 70, 10, 12,
						250, 50, 100, 60, 55,
						110, 10, 0, 50, 30,
						250, 50, 100, 60, 55,
						2, 32, 69, 34, 23,
						24, 35, 96, 165, 132,
					],
				},
			]
		},
		{
			name: 'Raio-X',
			datasets: [
				{
					label: 'Realizado',
					data: [
						110, 10, 0, 50, 30,
						2, 32, 69, 34, 23,
						24, 35, 96, 165, 132,
						2, 32, 69, 34, 23,
						110, 10, 0, 50, 30,
						250, 50, 100, 60, 55,
					],
				},
			]
		},
		{
			name: 'Tomografia',
			datasets: [
				{
					label: 'Realizado',
					data: [
						150, 80, 70, 10, 12,
						250, 50, 100, 60, 55,
						2, 32, 69, 34, 23,
						110, 10, 0, 50, 30,
						250, 50, 100, 60, 55,
						24, 35, 96, 165, 295,
					],
				},
			]
		}
	],	
});
</script>
