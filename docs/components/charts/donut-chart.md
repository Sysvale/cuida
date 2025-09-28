# DonutChart

### Um componente de gráfico reutilizável para exibir dados visualmente, de modo um pouco mais legível que o PieChart.
---
<br>

⚠️ Esse componente vai substituir o PieChart nas próximas versões do Cuida

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

<br>

#### ⚠️ O DonutChart aceita 3 tipos de configuração de cor: Por cores, por variant e por tema.

<br>

---

## Uso

```js
<CdsDonutChart
	:data="chartData"
	:variant="variant"
	:labels="chartLabels"
	@chart-click="logChartClick"
/>
```

---

<br>

## Por tema

Ao utilizar a configuração por temas, o DonutChart aplicará cores pré-definidas,
previamente testadas para garantir legibilidade e harmonia visual.
Por hora existem **2 temas** definidios, o `blue` e o `indigo`.
Cada cor possui 10 cores cada, de modo que funcionarão sem repetição para gráficos com até 10 datasets
Ex.: `:tema="blue"`

<PreviewContainer>
	<CdsDonutChart
		v-bind="themeExampleArgs"
	/>
</PreviewContainer>

## Por cores

Enviando um array de cores para a prop colors, as cores do Donut serão definidas
a partir desse array, com cada segemento do gráfico correspondendo à cor definida
na posição correspondente do array.

<PreviewContainer>
	<CdsDonutChart
		v-bind="colorsExampleArgs"
	/>
</PreviewContainer>


## Por variante

Caso deseje utilizar o gráfico no modo monocromático, o DonutChart possuia prop `variant`.
Essa prop aceita cores da paleta do Cuida e utiliza diferentes shades dessa cor para construir o gráfico.
Ex.: `:variant="green"`

<PreviewBuilder
	:args
	:events
	:component="CdsDonutChart"
/>

---

## Props

<APITable
	name="DonutChart"
	section="props"
/>
<br>

## Eventos

<APITable
	name="DonutChart"
	section="events"
/>
<br>


<script setup>
import { ref } from 'vue';
import CdsDonutChart from '@/components/DonutChart.vue';

const events = [
	'chart-click'
];

const args = ref({
	labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
	variant: 'blue',
	data: [
		{
			name: 'Ecocardiograma',
			datasets: [
				{
					label: 'Exames realizados',
					data: [120, 220, 180, 20, 150],
				},
			]
		},
	],
});

const themeExampleArgs = ref({
	labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
	theme:"blue",
	data: [
		{
			name: 'Ecocardiograma',
			datasets: [
				{
					label: 'Exames realizados',
					data: [120, 220, 180, 20, 150],
				},
			]
		},
	],
});

const colorsExampleArgs = ref({
	labels: ['Janeiro','Fevereiro','Março', 'Abril', 'Maio'],
	colors: ['teal', 'violet', 'amber', 'blue', 'red'],
	data: [
		{
			name: 'Ecocardiograma',
			datasets: [
				{
					label: 'Exames realizados',
					data: [120, 220, 180, 20, 150],
				},
			]
		},
	],
});
</script>
