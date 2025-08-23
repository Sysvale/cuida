# Chip

Chips ajudam as pessoas a inserir informações, fazer seleções, filtrar conteúdo ou disparar ações.

### Quando usar

- For necessário selecionar e/ou filtrar conteúdo.
- O conteúdo que a chip representa puder ser setado ou removido pelo usuário.

### Quando não usar

- O conteúdo a ser mostrado for *readonly* (nesse caso, é mais indicado utilizar o componente Badge).

---

## Uso

```js
<CdsChip
	v-model="select"
	variant="red"
	size="md"
>
	Chip
</CdsChip>
```

---

## Preview

<DemoContainer
	:component="CdsChip"
	:events="cdsChipEvents"
/>

---

## Props

<APITable
	name="Chip"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Chip"
	section="events"
/>
<br />

## Slots

<APITable
	name="Chip"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsChip from '@/components/Chip.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsChipEvents = [
	'click'
];
</script>
