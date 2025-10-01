# ComboBox

### O ComboBox é um componente que permite ao usuário selecionar múltiplas opções filtráveis e opcionalmente, adicionar novas opções.

---

<br>

## Quando usar:
- Quando o usuário pode selecionar **múltiplos itens** a partir de uma lista.
- Quando as opções disponíveis podem **não contemplar todos os casos**, permitindo que o usuário adicione novas.
- Quando a lista de opções é extensa e se beneficia de um campo de busca.
- Em formulários onde se deseja flexibilidade e agilidade na entrada de dados.

<br>

## Quando não usar:
- Se não for permitido adicionar novos itens à lista.
- Quando o conjunto de opções é fixo e necessário selecionar mais de um item, considere usar o `Multiselect`.
- Se for necessário selecionar apenas um item, prefira o `Select`.


---

## Uso

```js
<CdsComboBox
	v-model="value"
	:options="options"
	:optionsKeyField="optionsKeyField"
	:optionsValueField="optionsValueField"
	:variant="green"
	width="wide"
	label="Séries"
	required
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsComboBox"
	:events
/>

---

## Props

<APITable
	name="CdsComboBox"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsComboBox"
	section="events"
/>
<br>

<script setup>
import { ref } from 'vue';
import CdsComboBox from '@/components/ComboBox.vue';

const events = [
	'update:modelValue',
	'focus',
	'blur',
];

const options = [
	{
		value: 'Breaking Bad',
		name: 'breaking-bad',
	},
	{
		value: 'Game of Thrones',
		name: 'game-of-thrones',
	},
];

const args = ref({
	options,
	optionsKeyField: 'name',
	optionsValueField: 'value',
});
</script>
