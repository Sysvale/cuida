# PieChart

Um componente de gráfico reutilizável para exibir dados visualmente.

---

⚠️ Esse componente vai ser substituído pelo DonutChart nas próximas versões do Cuida

<br>

## Quando usar:
- Exibir dados em formatos visuais;
- Visualizar tendências, proporções ou comparações em dados;
- Exibir proporções ou partes de um todo, onde cada fatia representa uma parcela do total;
- Funciona bem com categorias mutuamente exclusivas;

<br>

## Quando não usar:
- Para informações simples que podem ser exibidas em um formato tabular ou em texto;
- Quando os dados apresentarem muitas categorias ou subcategorias;
- Não é apropriado para dados contínuos ou dados temporais.

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
	:component="CdsPieChart"
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
import CdsPieChart from '@/components/PieChart.vue';

const args = ref({
	labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
	colors: ['teal', 'violet', 'amber', 'blue', 'red'],
	variant: 'green',
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
