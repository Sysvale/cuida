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
	:component="CdsSegmentedControl"
	:events="cdsSegmentedControlEvents"
	:segments="['info-outline', 'copy-outline', 'edit-outline']"
	:segmentsTooltipText="['info', 'copiar', 'editar']"
/>

---

## Props

<APITable
	name="SegmentedControl"
	section="props"
/>
<br />

## Eventos

<APITable
	name="SegmentedControl"
	section="events"
/>
<br />

<script setup>
import CdsSegmentedControl from '@/components/SegmentedControl.vue';

const cdsSegmentedControlEvents = [
	'click'
];
</script>
