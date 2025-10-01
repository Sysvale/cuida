# BarChart

### Um componente de gráfico reutilizável para exibir dados visualmente.
---
<br>

## Quando usar:
- Exibir dados em formatos visuais;
- É eficaz ao exibir muitas categorias;
- Visualizar tendências, proporções ou comparações em dados.

<br>

## Quando não usar:
- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Não é recomendado para comparação percentual ou partes de um todo.

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
	component="CdsBarChart"
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
import CdsBarChart from '@/components/BarChart.vue';

const args = ref({
	labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
	variant: 'green',
	data: [
		{
			name: 'Ecocardiograma',
			datasets: [
				{
					label: 'Realizado',
					data: [50, 50, 50, 50, 50],
				},
				{
					label: 'Pendente',
					data: [200, 180, 250, 190, 280],
				},
				{
					label: 'Não realizado',
					data: [38, 84, 120, 90, 185],
				}
			]
		},
		{
			name: 'Raio-X',
			datasets: [
				{
					label: 'Realizado',
					data: [120, 220, 180, 320, 150],
				},
				{
					label: 'Pendente',
					data: [98, 145, 160, 190, 175],
				},
				{
					label: 'Não realizado',
					data: [49, 84, 120, 78, 130],
				}
			]
		},
		{
			name: 'Tomografia',
			datasets: [
				{
					label: 'Realizado',
					data: [55, 40, 33, 90, 120],
				},
				{
					label: 'Pendente',
					data: [25, 30, 90, 45, 20],
				},
				{
					label: 'Não realizado',
					data: [38, 84, 120, 90, 45],
				}
			]
		}
	],
	barWidth: 1,
});
</script>
