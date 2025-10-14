# Select

Selects permitem que o usuário escolha uma opção a partir de uma lista de itens.

---
<br>

## Quando usar:
- O usuário tiver de escolher uma única opção em uma lista com diversos itens.


<br>

## Quando não usar:
- A lista de opções possuir 3 itens ou menos. Nesses casos, recomendamos a utilização de radio buttons.
- O usuário precisar selecionar mais de um item da lista. Nesse caso, utilize <a href="https://sysvale.github.io/cuida/?path=/docs/componentes-forms-clusteredmultiselect--clustered-multiselect">ClusteredMultiselects</a>.

<br>

## Observações:
- Coloque as opções mais prováveis de serem selecionadas no topo do select. Na dúvida, ordene-os em ordem alfanumérica.
- As labels dos selects devem ser sucintas (de uma a três palavras).
- As labels devem ser ser escritas com a primeira letra maiúscula e as restantes minúsculas.
- ⚠️ **Importante:** Para que o select funcione corretamente, a propriedade cujos valores serão exibidos no select, deve se chamar `value`, como indicado no exemplo abaixo na tabela de props.

<br>

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

<PreviewBuilder
	:args
	:events 
	:component="CdsSelect"
/>

---

## Props

<APITable
	name="CdsSelect"
	section="props"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsSelect from '@/components/Select.vue';

const events = [
	'update:modelValue',
	'click',
	'change',
	'focus',
	'blur',
	'keydown'
];

const options = ref([
	{
		value: 'Breaking Bad',
		id: '1',
	},
	{
		value: 'Game of Thrones',
		id: '2',
	},
	{
		value: 'The Umbrella Academy',
		id: '3',
	},
	{
		value: 'Fringe',
		id: '4',
	},
	{
		value: 'Dark',
		id: '5',
	},
	{
		value: 'Borat: o segundo melhor repórter do glorioso país Cazaquistão viaja à América',
		id: '6',
	},
	{
		value: 'Black Mirror',
		id: '7',
	},
	{
		value: 'Westworld',
		id: '8',
	},
	{
		value: 'Avatar: A Lenda de Aang',
		id: '9',
	},
	{
		value: 'Vikings',
		id: '10',
	},
	{
		value: 'Arcane',
		id: '11',
	},
]);

const args = ref({
	options,
	label: 'Séries',
	placeholder: 'Selecione uma das séries',
	required: true,
	disabled: false,
	state: 'default',
	required: false,
	searchable: false,
	addable: false,
	fluid: false,
	mobile: false,
	floatingLabel: false,
	errorMessage: 'Campo obrigatório',
	tooltip: '',
	tooltipIcon: 'info-outline',
	linkText: '',
	linkUrl: '',
	supportingText: null,
	supportLink: '',
	supportLinkUrl: '',
});
</script>
