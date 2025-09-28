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

<!-- <CdsMultiselect
	:options
	v-model="value"
	label="title"
/> -->

---

## Props

<APITable
	name="Multiselect"
	section="props"
/>
<br>

## Eventos

<APITable
	name="Multiselect"
	section="events"
/>
<br>

## Slots

<APITable
	name="Multiselect"
	section="slots"
/>

<script setup>
import { ref } from 'vue';
import CdsMultiselect from '@/components/Multiselect.vue';
import Multiselect from 'vue-multiselect';

const events = [
	'update:modelValue'
];

const value = ref([])

const options = [
    {
        "id": "hearing",
        "value": "Auditiva"
    },
    {
        "id": "physical",
        "value": "Física"
    },
    {
        "id": "intellectual",
        "value": "Intelectual"
    },
    {
        "id": "mental",
        "value": "Mental"
    },
    {
        "id": "dwarfism",
        "value": "Nanismo"
    },
    {
        "id": "visual",
        "value": "Visual"
    },
    {
        "id": "microcephaly",
        "value": "Microcefalia"
    }
];

const args = ref({
	options,
	label: 'Séries',
	optionsField: 'id',
	trackBy: 'value',
	variant: 'green',
});
</script>
