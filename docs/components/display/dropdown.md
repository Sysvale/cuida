# Dropdown

Dropdown são componentes utilizados para ativar popovers contendo filtros para listas e views.

### Quando usar

- Para utilizar com filtros.
- Houver popovers contendo opções de filtragem.

### Quando não usar

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

<DemoContainer
	:component="CdsDropdown"
	:events="cdsDropdownEvents"
/>

---

## Props

<APITable
	name="Dropdown"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Dropdown"
	section="events"
/>
<br />

## Slots

<APITable
	name="Dropdown"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsDropdown from '@/components/Dropdown.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsDropdownEvents = [
	'click'
];
</script>
