# Radio

### O Radio permite que os usuários selecionem uma opção de um conjunto.
---
<br />

## Quando usar:
- As opções que o componente busca prover são mutuamente exclusivas.

<br />

## Quando não usar:
- Duas ou mais opções puderem ser selecionadas ao mesmo tempo.
- Houver 4 ou mais opções. Você pode usar o componente `Dropdown` nesses casos.

---

## Uso

```js
<CdsRadio
	v-model="selected"
	value="option-1"
	label="Opção 1"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsRadio"
	:events
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

<script setup>
import { ref } from 'vue';
import CdsRadio from '@/components/Radio.vue';

const events = [
	'update:modelValue'
];

const args = ref({
	value: 'option-1',
	label: 'Opção 1',
	disabled: false,
});
</script>
