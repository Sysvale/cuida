# GaugeChart

### O Gauge Chart é indicado para mostrar o progresso em direção a uma meta específica.
---
<br>

## Quando usar:
- Use "Gauge charts" quando precisar monitorar e comunicar de forma visual o status de métricas-chave ou indicadores de desempenho;
- Use "Gauge charts" para comunicar o estado geral de uma única métrica de maneira rápida e visualmente impactante.

<br>

## Quando não usar:
- Evite o uso de "Gauge charts" para representar conjuntos de dados complexos ou multidimensionais. Esse tipo de gráfico é mais eficaz ao exibir uma única métrica em relação a uma escala.

<br>

---

## Uso

```js
<CdsGaugeChart
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="gaugeChartClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsGaugeChart"
>
	<template #popover>
		<p style="margin: 0;"><strong>Em atendimento:</strong> 280</p>
		<p style="margin: 0;"><strong>Pendentes:</strong> 60</p>
		<p style="margin: 0;"><strong>Em acompanhamento:</strong> 600</p>
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="CdsGaugeChart"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsGaugeChart"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsGaugeChart from '@/components/GaugeChart.vue';

const args = ref({
	value: 79.2,
	showTarget: false,
	target: 85,
	variant: "green",
	size: 250,
	subtitle: 'aptos ao indicador',
});
</script>
