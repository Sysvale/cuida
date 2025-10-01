# Multiselect

### Multiselects são componentes que permitem ao usuário selecionar múltiplas opções divididas em categorias.
---
<br>

## Quando usar:
- Houver a possibilidade de selecionar múltipos itens em um select.
- Se deseja classificar os itens do select em categorias.

<br>

## Quando não usar:
- Os itens do select não puderem ser classificados em categorias.
- Houver necessidade de detalhar no input as opções selecionadas, já que mostramos como resumo apenas quantas e não quais foram as opções escolhidas.

<br>

## Observações:
- O Multiselect do Cuida é um wrapper do <a href="https://vue-multiselect.js.org/">Vue Multiselect</a>
com a sua adequação aos nossos princípios e recomendações. Para informações detalhadas sobre o componente, recomendamos
leitura da documentação.

---

## Uso

```js
<CdsMultiselect
	variant="green"
	size="md"
	text="Lorem Ipsum"
	@click="multiselectClick = true"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:events
	:component="CdsMultiselect"
/>

---

## Props

<APITable
	name="CdsMultiselect"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsMultiselect"
	section="events"
/>
<br>

## Slots

<APITable
	name="CdsMultiselect"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsMultiselect from '@/components/Multiselect.vue';
import Multiselect from 'vue-multiselect';

const events = [
	'update:modelValue',
	'remove',
	'select',
	'close'
];

const options = [
	{ title: 'Avengers',},
	{ title: 'Naruto',},
	{ title: 'X-men',},
	{ title: 'The Simpsons',},
	{ title: 'Bananas de pijamas',},
	{ title: 'Pokemon',},
	{ title: 'Digimon',},
	{ title: 'Megamente',},
]

const args = ref({
	options,
	modelValue: [{ title: 'Naruto'}, {title: 'Pokemon'}],
	label: 'Séries',
	optionsField: 'title',
	trackBy: 'title',
	variant: 'green',
});
</script>
