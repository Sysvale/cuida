# FilterSelect <Badge type="danger">Deprecated</Badge>

### FilterSelect permitem que o usuário escolha opções como filtro de determinado conteúdo. São derivados dos Selects, mas têm implementação e aplicabilidade mais específicas. Ocupam menos conteúdo verticalmente e não possuem propriedades relacionadas à validação.
---
<br />

## Quando usar:
- O usuário tiver de escolher uma única opção em uma lista com diversos itens.
- Quando essas opções servierem de filtros a conteúdos em uma página, card, ou sidesheet,como
por exemplo para mapas, gráficose relatórios


<br />

## Quando não usar:
- Em substituição ao componente Select
- O usuário precisar selecionar mais de um item da lista. Nesse caso, utilize ClusteredMultiselects.

<br />

## Observações:
- Coloque as opções mais prováveis de serem selecionadas no topo do FilterSelect. Na dúvida, ordene-os em ordem alfanumérica.
- As labels dos selects devem ser sucintas (de uma a três palavras).
- ⚠️ **Importante:** Para que o FilterSelect funcione corretamente, a propriedade cujos valores serão exibidos no select, deve se chamar `value`, como indicado no exemplo abaixo na tabela de props.

---

## Uso

```js
<CdsFilterSelect
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
	:component="CdsFilterSelect"
/>

---

## Props

<APITable
	name="FilterSelect"
	section="props"
/>
<br />

## Eventos

<APITable
	name="FilterSelect"
	section="events"
/>
<br />

<script setup>
import { ref } from 'vue';
import CdsFilterSelect from '@/components/FilterSelect.vue';

const events = [
	'update:modelValue'
];

const options = ref([
	{
		value: 'Breaking Bad',
		id: '1',
	},
	{
		value: 'Game of Thrones ',
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
		value: 'Breaking Bad',
		id: '5',
	},
	{
		value: 'Game of Thrones ',
		id: '6',
	},
	{
		value: 'Dark',
		id: '7',
	},
	{
		value: '👀 Borat: o segundo melhor repórter do glorioso país Cazaquistão viaja à América',
		id: '8',
	},
	{
		value: 'The Office',
		id: '9',
	},
	{
		value: 'Black Mirror',
		id: '10',
	},
	{
		value: 'Westworld ',
		id: '11',
	},
	{
		value: 'Avatar: A Lenda de Aang',
		id: '12',
	},
	{
		value: 'The Boys',
		id: '13',
	},
	{
		value: 'Vikings',
		id: '14',
	},
	{
		value: 'Arcane',
		id: '15',
	},
]);

const args = ref({
	options,
	width: 'wide',
	id: "idzera",
	label: 'Séries',
	placeholder: 'Selecione uma das séries',
});
</script>
