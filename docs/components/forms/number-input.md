# NumberInput

### O componente NumberInput permite que os usuários insiram e editem valores numéricos em uma interface.
---
<br>

## Quando usar:
- Precisar de um campo para que os usuários insiram informações exclusivamente numéricas, como:
	- Quantidades (por exemplo, número de itens em um carrinho de compras).
	- Valores monetários (por exemplo, preços, descontos).
	- Idades, medidas, ou qualquer outro dado que seja estritamente numérico.
- A entrada de dados for numérica e não exigir texto livre ou seleção de opções pré-definidas.
<br>

## Quando não usar:
- O dado a ser inserido for textual. Nesse caso, considere usar o componente `TextInput`.
- O tipo de uso envolver valores incrementais. Nesse caso, considere usar o componente `StepperInput`.

<br>

---

## Uso

```js
<CdsNumberInput
	v-model="inputValue"
/>
```

---

## Preview

<PreviewBuilder
	:args
	:component="CdsNumberInput"
	:events
/>

---

## Props

<APITable
	name="CdsNumberInput"
	section="props"
/>
<br>

## Eventos

<APITable
	name="CdsNumberInput"
	section="events"
/>
<br>

---


<script setup>
import { ref } from 'vue';
import CdsNumberInput from '@/components/NumberInput.vue';

const events = [
	'update:modelValue',
	'update:unmaskedValue',
	'change',
	'focus',
	'blur',
];

const args = ref({
	money: true,
	label: 'Valor',
	mobile: false,
	disabled: false,
	required: false,
	fluid: false,
	floatingLabel: false,
	lazy: false,
	errorMessage: 'Campo obrigatório',
	state: 'default',
	placeholder: 'Digite algo...',
	mask: null,
	tooltip: '',
	tooltipIcon: 'info-outline',
	linkText: '',
	linkUrl: '',
	supportingText: 'supportingText',
	supportLink: '',
	supportLinkUrl: '',
});
</script>
