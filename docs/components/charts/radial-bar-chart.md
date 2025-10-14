# RadialBarChart

Um RadialBarChart é uma variação do BarChart plotado em um sistema de coordenadas polares, em vez de cartesiano.

---
<br>


## Quando usar:
- Exibir dados com apelo gráfico;
- Comparar dados;


<br>

## Quando não usar:
- Quando for necessária uma fidelidade elevada na exibição das informações, com o objetivo de realizar comparações precisas entre os dados;
- Quando os dados apresentarem categorias ou subcategorias;

---

<br>

---

## Uso

```js
<CdsRadialBarChart
	:data="chartData"
	:variant="variant"
	:labels="chartLabels"
/>
```

---

## Preview

Enviando um array de cores para a prop colors, as cores do RadialBarChart serão definidas
a partir desse array, com cada segemento do gráfico correspondendo à cor definida
na posição correspondente do array.

<PreviewContainer>
	<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px; height: 340px">
		<div style="height: 280px">
			<CdsRadialBarChart
				v-bind="args"
				v-on="internalEvents"
			/>
		</div>
	</div>
	<LogBuilder ref="logBuilderRef" :events />
</PreviewContainer>

<PlaygroundBuilder
	:args
	:component="FloatingActionButton"
/>

---

## Props

<APITable
	name="CdsRadialBarChart"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsRadialBarChart"
	section="events"
/>
<br>


<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import CdsRadialBarChart from '@/components/RadialBarChart.vue';

const logBuilder = useTemplateRef('logBuilderRef');

const events = [
	'chart-click',
];

const internalEvents = ref({});

const args = ref({
		theme: 'blue',
		data: [
			{
				datasets: [
					{
						
						label: 'Janeiro',
						data: [3000],
					},
				]
			},
			{
				datasets: [
					{
						
						label: 'Fevereiro',
						data: [2000],
					},
				],
			},
			{
				datasets: [
					{
						
						label: 'Março',
						data: [1500],
					},
				],
			},
		],
});

onMounted(() => {
	internalEvents.value = logBuilder.value.createEventListeners();
});
</script>
