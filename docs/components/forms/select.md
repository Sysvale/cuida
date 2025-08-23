# Select

Selects permitem que o usuário escolha uma opção a partir de uma lista de itens.

### Quando usar

- O usuário tiver de escolher uma única opção em uma lista com diversos itens.

### Quando não usar

- A lista de opções possuir 3 itens ou menos. Nesses casos, recomendamos a utilização de radio buttons.
- O usuário precisar selecionar mais de um item da lista. Nesse caso, utilize ClusteredMultiselects.

### Observações

- Coloque as opções mais prováveis de serem selecionadas no topo do select. Na dúvida, ordene-os em ordem alfanumérica.
- As labels dos selects devem ser sucintas (de uma a três palavras).
- As labels devem ser ser escritas com a primeira letra maiúscula e as restantes minúsculas.
- ⚠️ **Importante:** Para que o select funcione corretamente, a propriedade cujos valores serão exibidos no select, deve se chamar `value`, como indicado no exemplo abaixo na tabela de props.

---

## Uso

```js
<CdsSelect
	:value="value"
	:options="options"
	width="wide"
	label="Séries"
	placeholder="Selecione uma das séries"
	required
/>
```

---

## Preview

<DemoContainer
	:component="CdsSelect"
	:events="cdsSelectEvents"
/>

---

## Props

<APITable
	name="Select"
	section="props"
/>
<br />

## Eventos

<APITable
	name="Select"
	section="events"
/>
<br />

## Slots

<APITable
	name="Select"
	section="slots"
/>

---

## Figma

<FigmaFrame
	src="https://embed.figma.com/design/J5fTswomlHu7RXk1gwbUq6/Cuida?node-id=2040-370&embed-host=share"
/>

<script setup>
import { ref } from 'vue';
import CdsSelect from '@/components/Select.vue';
import APITable from '../../docgen/APITable.vue';
import DemoContainer from '../../docgen/DemoContainer.vue';
import FigmaFrame from '../../docgen/FigmaFrame.vue';

const cdsSelectEvents = [
	'update:modelValue',
	'click',
	'change',
	'focus',
	'blur',
	'keydown'
];
</script>
