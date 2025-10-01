# SegmentedControl

### SegmentedControls são componentes que permitem que o usuário visualize versões alternativas de uma feature ou interface

---

## Uso

```js
<CdsSegmentedControl
	:segments="['info-outline', 'copy-outline', 'edit-outline']"
	:segmentsTooltipText="['info', 'copiar', 'editar']"
	:withIcon="true"
	@click="handleClick"
/>
```

---

## Preview

<PreviewBuilder
	:args
	component="CdsSegmentedControl"
	:events="cdsSegmentedControlEvents"
/>

---

## Props

<APITable
	name="CdsSegmentedControl"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsSegmentedControl"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsSegmentedControl from '@/components/SegmentedControl.vue';

const cdsSegmentedControlEvents = [
	'click'
];

const args = ref({
	segments: ['info-outline', 'copy-outline', 'edit-outline'],
	segmentsTooltipText: ['info', 'copiar', 'editar'],
});
</script>
