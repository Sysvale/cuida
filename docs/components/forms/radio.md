# Radio

O Radio permite que os usuários selecionem uma opção de um conjunto.

### Quando usar

- As opções que o componente busca prover são mutuamente exclusivas.

### Quando não usar

- Duas ou mais opções puderem ser selecionadas ao mesmo tempo.
- Houver 4 ou mais opções. Você pode usar o componente `Dropdown` nesses casos.

---

## Uso

```js
<CdsRadio
	v-model="selected"
	value="option-1"
	label="Opção 1"
>
	Opção de destaque
</CdsRadio>
```

---

## Preview

<DemoContainer
	:component="CdsRadio"
	:events="cdsRadioEvents"
/>

---

## Props

<APITable
	name="Radio"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Radio"
	section="events"
/>
<br />

## Slots

<APITable
	name="Radio"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsRadio from '@/components/Radio.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsRadioEvents = [
	'update:modelValue'
];
</script>
