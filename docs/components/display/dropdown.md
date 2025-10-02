# Dropdown

### Dropdown são componentes utilizados para ativar popovers contendo filtros para listas e views.
---
<br>

## Quando usar:
- Para utilizar com filtros.
- Houver popovers contendo opções de filtragem.


<br>

## Quando não usar:
- Em substituição à um Multiselect ou Select.

---

## Uso

```js
<CdsDropdown
	label="Idade"
	content="0 a 120 anos"
	@click="isActive = !isActive"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:events="events"
	:component="CdsDropdown"
>
	<p>Slot do dropdown do Dropdown</p>
</PreviewBuilder>

---

## Props

<APITable
	name="CdsDropdown"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsDropdown"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsDropdown"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsDropdown from '@/components/Dropdown.vue';

const events = [
	'click'
];

const args = ref({
	label: 'Idade',
	content: '0 a 120 anos',
});
</script>
