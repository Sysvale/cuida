# TimelineItem

TimelineItems são componentes auxiliares utilizados para montar Timelines.

---
<br>

## Quando não usar:
- Fora de componentes `Timeline`.

---

## Uso

```js
<CdsTimelineItem
	variant="green"
	:loading="false"
	:hollowed="false"
>
	<template #opposite>
		24/01/20202
	</template>
	<template #title>
		Denis Ritchie
	</template>
	<template #content>
		Criador da linguagem de programação C
	</template>
</CdsTimelineItem>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsTimelineItem"
>
	<template #opposite>
		24/01/20202
	</template>
	<template #title>
		Denis Ritchie
	</template>
	<template #content>
		Criador da linguagem de programação C
	</template>
</PreviewBuilder>

---

## Props

<APITable
	name="CdsTimelineItem"
	section="props"
/>
<br>

## Slots

<APITable
	name="CdsTimelineItem"
	section="slots"
/>

---
<script setup>
import { ref } from 'vue';
import CdsTimelineItem from '@/components/TimelineItem.vue';

const args = ref({
	variant: 'green',
	loading: false,
	hollowed: false,
});
</script>
