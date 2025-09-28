# Timeline

### Timelines são componentes utilizados para apresentar informações em ordem cronológica.
---
<br>

## Quando usar:
- Se há um conjunto de informações que pode ser categorizado por data.

<br>

## Quando não usar:
- Se precisa de um componente de stepper.
- A ordem das informações que você está apresentando é irrelevante.

<br>

## Observações:
- O componente `Timeline` é um wrapper e é utilizado para agrupar uma série de `TimelineItems` em um mesmo compoente
via slots. Para mais informações acesse a documentação do componente.

---

## Uso

```js
<CdsTimeline
	:reverse="false"
>
	<CdsTimelineItem variant="blue" loading>
		<template #title>
			Item 1
		</template>
		<template #content>
			Desta maneira, a determinação clara de objetivos estimula
			a padronização das novas proposições.
		</template>
	</CdsTimelineItem> 
	<CdsTimelineItem variant="blue">
		<template #title>
			Item 2
		</template>
		<template #content>
			O que temos que ter sempre em mente é que o consenso sobre
			a necessidade de qualificação assume importantes posições
			no estabelecimento das regras de conduta normativas.
		</template>
	</CdsTimelineItem>
	<CdsTimelineItem variant="blue">
		<template #title>
			Item 3
		</template>
		<template #content>
			A prática cotidiana prova que a complexidade dos estudos
			efetuados estimula a padronização dos paradigmas corporativos.
		</template>
	</CdsTimelineItem>
</CdsTimeline>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTimeline"
>
	<CdsTimeline
		v-bind="args" 
	>
		<CdsTimelineItem variant="blue" loading>
			<template #title>
				Item 1
			</template>
			<template #content>
				Desta maneira, a determinação clara de objetivos estimula
				a padronização das novas proposições.
			</template>
		</CdsTimelineItem> 
		<CdsTimelineItem variant="blue">
			<template #title>
				Item 2
			</template>
			<template #content>
				O que temos que ter sempre em mente é que o consenso sobre
				a necessidade de qualificação assume importantes posições
				no estabelecimento das regras de conduta normativas.
			</template>
		</CdsTimelineItem>
		<CdsTimelineItem variant="blue">
			<template #title>
				Item 3
			</template>
			<template #content>
				A prática cotidiana prova que a complexidade dos estudos
				efetuados estimula a padronização dos paradigmas corporativos.
			</template>
		</CdsTimelineItem>
	</CdsTimeline>
</PreviewBuilder>

---

## Props

<APITable
	name="Timeline"
	section="props"
/>
<br>

## Slots

<APITable
	name="Timeline"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsTimeline from '@/components/Timeline.vue';
import CdsTimelineItem from '@/components/TimelineItem.vue';

const args = ref({
	reverse: false,
});
</script>
