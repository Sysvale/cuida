# Label

### Permite que o usuário adicione, remova e edite múltiplos inputs em uma lista dinâmica.
---
<br />

## Quando usar:
- Em conjunto com componentes que não apresentam nativamente a label;

<br />

## Quando não usar:
- Um componente já possui nativamente a label;
---

## Uso

```js
<CdsLabel />
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsLabel"
	:events
/>

---

## Props

<APITable
	name="Label"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Label"
	section="events"
/>
<br />

<script setup>
import { ref } from 'vue';
import CdsLabel from '@/components/Label.vue';

const events = [
	'supportLinkClick'
];

const args = ref({
	required: false,
	fluid: false,
	for: 'input-id',
	text: 'Label',
	tooltip: '',
	tooltipIcon: 'info-outline',
	supportLink: '',
	supportLinkUrl: '',
});
</script>
