# StackedBarChart

### Um componente de gráfico reutilizável para exibir dados visualmente.
---
<br>

## Quando usar:
- Exibir dados em formatos visuais;
- Comparação de dados como um todo;
- Tendências ao longo do tempo.

<br>

## Quando não usar:
- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Comparação absoluta;
- Muitas categorias.

---

## Uso

```js
<CdsStackedBarChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="stackedBarChartClick = true"
/>
```

---

## Preview

### __Stacked bar monocromática__

Quando a prop `variant` é especificada e não há propriedade de cor indicada no objeto de configuração,
o gráfico é gerado no modo monocromático, com as shades de variant mudando para cada dataset. 

<PreviewContainer>
	<div style="background-color: #FCFCFC; padding: 16px; border-radius: 4px; height: 500px">
		<CdsStackedBarChart
			v-bind="args"
		/>
	</div>
</PreviewContainer>

<br>

---

## Props

<APITable
	name="StackedBarChart"
	section="props"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsStackedBarChart from '@/components/StackedBarChart.vue';

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
			]
		},
		{
			name: 'Raio-X',
			datasets: [
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
					label: 'Não realizado',
					data: [38, 84, 120, 90, 45],
				}
			]
		}
	],
	barWidth: 1,
});
</script>
