# RadioButtonGroup

RadioButtonsGroup são radio buttons customizados para facilitar a seleção e feedback.

---
<br>

## Quando usar:
- As opções que o componente busca prover são mutuamente exclusivas.
- For necessário utilizar um ```<input type="radio"``` />.

<br>

## Quando não usar:
- Duas ou mais opções puderem ser selecionadas ao mesmo tempo.
- Houver 4 ou mais opções. Prefira Dropdowns nesses casos.

## Obs.:
- Você pode desabilitar cada um dos radio buttons passando a propriedade ```disable: true```, no respectivo objeto
no array de opções. Caso você queira desabilitar todo o grupo, você pode setar a prop ```disabled``` como true no componente.

<br>

---

## Uso

```js
<CdsRadioButtonGroup
	:options="options"
	:value="value"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsRadioButtonGroup"
	:events
/>

---

## Props

<APITable
	name="CdsRadioButtonGroup"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsRadioButtonGroup"
	section="events"
/>
<br>

---

<script setup>
import { ref } from 'vue';
import CdsRadioButtonGroup from '@/components/RadioButtonGroup.vue';

const events = [
	'update:modelValue',
];

const options = [
	{
		text: 'Opção desabilitada',
		label: 'Opção desabilitada',
		value: 'value1',
		disabled: true,
	},
	{
		text: 'Opção habilitada 1',
		label: 'Opção habilitada 1',
		body: 'Adicione um texto descritivo/explicativo referente a essa opção',
		value: 'value2',
	},
	{
		text: 'Opção habilitada 2',
		label: 'Opção habilitada 2',
		value: 'value3',
	},
];

const args = ref({
	options,
	disabled: false,
	required: false,
	variant: 'green',
	state: 'default',
	errorMessage: 'Valor inválido',
	inline: false,
	label: 'Label',
	supportLink: '',
	supportLinkUrl: '',
	tooltip: '',
	tooltipIcon: 'info-outline',
	allowsExpand: false,
	fluid: false,
});
</script>
